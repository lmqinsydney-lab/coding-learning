#!/usr/bin/env node
/**
 * 用速创 GPT-Image-2 为模块「导读」生成信息总结图，下载并压成 WebP 存进文章 assets。
 *
 * 用法（密钥在 scripts/.env，Node 24+ 用 --env-file 注入）：
 *   node --env-file=scripts/.env scripts/gen-summary-images.mjs [jobsFile]
 * 默认 jobsFile = scripts/summary-jobs.json
 *
 * 产物：src/content/articles/<slug>/assets/summary-<moduleId>.webp
 *       src/content/articles/<slug>/assets/_summary-manifest.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toWebp, humanSize } from './lib-images.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://api.wuyinkeji.com'
const KEY = process.env.WUYIN_API_KEY
if (!KEY) {
  console.error('缺少 WUYIN_API_KEY，请用：node --env-file=scripts/.env scripts/gen-summary-images.mjs')
  process.exit(1)
}

const jobsFile = process.argv[2] || resolve(ROOT, 'scripts/summary-jobs.json')
const jobs = JSON.parse(readFileSync(jobsFile, 'utf8'))
const headers = { Authorization: KEY, 'Content-Type': 'application/json' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function submit(prompt, size) {
  const res = await fetch(`${BASE}/api/async/image_gpt`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ prompt, size }),
  })
  const j = await res.json()
  if (!j?.data?.id) throw new Error('提交失败：' + JSON.stringify(j))
  return j.data.id
}

/** 深度扫描返回对象里的图片 URL */
function findImageUrl(obj) {
  let found = null
  const walk = (v) => {
    if (found) return
    if (typeof v === 'string') {
      if (/^https?:\/\/\S+\.(png|jpe?g|webp)/i.test(v)) found = v
      else if (/^https?:\/\//i.test(v) && /image|img|oss|cdn|file/i.test(v)) found = found || v
    } else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  walk(obj)
  return found
}

async function poll(id, debug) {
  for (let i = 0; i < 120; i++) {
    await sleep(3000)
    let j
    try {
      const res = await fetch(`${BASE}/api/async/detail?id=${encodeURIComponent(id)}`, { headers })
      j = await res.json()
    } catch {
      continue // 单次轮询失败不致命
    }
    const status = j?.data?.status
    if (debug && i === 0) console.log('  首个返回样例：', JSON.stringify(j).slice(0, 500))
    if (status === 2) return j
    if (status === 3) throw new Error('生成失败：' + JSON.stringify(j?.data))
    process.stdout.write(`  …轮询中 status=${status} (${(i + 1) * 3}s)\r`)
  }
  throw new Error('超时未完成(360s)')
}

async function genOne(it, assetsDir, debug) {
  const prompt = `${it.prompt}\n\n${jobs.styleSuffix || ''}`
  const id = await submit(prompt, jobs.size || '16:9')
  console.log(`  id=${id}，轮询结果…`)
  const result = await poll(id, debug)
  const url = findImageUrl(result)
  if (!url) throw new Error('未找到图片 URL：' + JSON.stringify(result).slice(0, 300))
  const raw = Buffer.from(await (await fetch(url)).arrayBuffer())
  const webp = await toWebp(raw, { maxWidth: 1280 })
  const file = `summary-${it.moduleId}.webp`
  writeFileSync(resolve(assetsDir, file), webp)
  console.log(`  ✓ ${file}  ${humanSize(raw.length)}→${humanSize(webp.length)}`)
  return file
}

async function main() {
  const assetsDir = resolve(ROOT, 'src/content/articles', jobs.slug, 'assets')
  mkdirSync(assetsDir, { recursive: true })
  const manifest = {}
  const failed = []
  for (let k = 0; k < jobs.items.length; k++) {
    const it = jobs.items[k]
    console.log(`\n▶ [${it.moduleId}] 提交生成…`)
    let ok = false
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      try {
        manifest[it.moduleId] = await genOne(it, assetsDir, k === 0 && attempt === 1)
        ok = true
      } catch (e) {
        console.warn(`  ✗ 第 ${attempt} 次失败：${e.message}`)
      }
    }
    if (!ok) failed.push(it.moduleId)
  }
  writeFileSync(resolve(assetsDir, '_summary-manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\n✔ 完成 ${Object.keys(manifest).length} 张 → ${jobs.slug}/assets/`)
  if (failed.length) console.log(`✗ 失败 ${failed.length} 个：${failed.join(', ')}（可重跑这些）`)
}

main().catch((e) => {
  console.error('\n', e.message || e)
  process.exit(1)
})
