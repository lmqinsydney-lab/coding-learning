#!/usr/bin/env node
/**
 * 一键导入 Cooper 文章：拉正文 + 下全部图 + 压成 WebP 限宽 + 落到该文章 assets。
 *
 * 用法：
 *   node scripts/import-cooper.mjs <pageId> <slug>
 * 例：
 *   node scripts/import-cooper.mjs 2208173569642 miaochuang
 *
 * 产物：
 *   docs/source-articles/<slug>.md              原文 markdown（gitignored）
 *   src/content/articles/<slug>/assets/*.webp   压缩后的图片
 *   src/content/articles/<slug>/assets/_manifest.json  url→本地文件 映射
 * 然后由人/Claude 据此撰写 <slug>/index.ts（按两层模型拆模块）。
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toWebp, humanSize, extractImageUrls, nameFromUrl } from './lib-images.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [pageId, slug] = process.argv.slice(2)
if (!pageId || !slug) {
  console.error('用法: node scripts/import-cooper.mjs <pageId> <slug>')
  process.exit(1)
}

function readCooper(id) {
  const out = execFileSync(
    'mcporter',
    ['call', 'Cooper.readContent', `resourceId=${id}`, 'appId=4', 'range=', '--output', 'json'],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  )
  // mcporter 返回的是 JSON 字符串（外层就是一个被 JSON 编码的 markdown 字符串）
  return JSON.parse(out)
}

async function main() {
  console.log(`▶ 拉取 Cooper 文章 pageId=${pageId} …`)
  const md = readCooper(pageId)
  const srcDir = resolve(ROOT, 'docs/source-articles')
  mkdirSync(srcDir, { recursive: true })
  writeFileSync(resolve(srcDir, `${slug}.md`), md)
  console.log(`  原文已存：docs/source-articles/${slug}.md (${humanSize(Buffer.byteLength(md))})`)

  const urls = extractImageUrls(md)
  console.log(`▶ 发现 ${urls.length} 张图片，下载并压缩为 WebP（限宽 1200）…`)

  const assetsDir = resolve(ROOT, 'src/content/articles', slug, 'assets')
  mkdirSync(assetsDir, { recursive: true })

  const manifest = {}
  let okN = 0,
    failN = 0,
    rawTotal = 0,
    outTotal = 0
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const name = nameFromUrl(url, i)
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const raw = Buffer.from(await res.arrayBuffer())
      const webp = await toWebp(raw)
      writeFileSync(resolve(assetsDir, `${name}.webp`), webp)
      manifest[url] = `${name}.webp`
      rawTotal += raw.length
      outTotal += webp.length
      okN++
      process.stdout.write(`  ✓ ${name}.webp  ${humanSize(raw.length)}→${humanSize(webp.length)}\n`)
    } catch (e) {
      failN++
      console.warn(`  ✗ ${name}  (${url.slice(0, 50)}…) ${e.message}`)
    }
  }

  writeFileSync(resolve(assetsDir, '_manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\n✔ 完成：成功 ${okN}，失败 ${failN}`)
  if (okN) console.log(`  体积：${humanSize(rawTotal)} → ${humanSize(outTotal)} （省 ${Math.round((1 - outTotal / rawTotal) * 100)}%）`)
  console.log(`  映射：src/content/articles/${slug}/assets/_manifest.json`)
  console.log(`\n下一步：据原文与 _manifest 撰写 src/content/articles/${slug}/index.ts，`)
  console.log(`图片用 import x from './assets/<name>.webp' 引入，挂到对应模块的 img 块。`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
