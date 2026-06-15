#!/usr/bin/env node
/**
 * 压缩一个目录下的图片为 WebP（限宽 1200），删除原 png/jpg。
 * 用法：node scripts/optimize-images.mjs <dir>
 * 例：  node scripts/optimize-images.mjs src/content/articles/miaochuang/assets
 */
import { readdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { resolve, extname, basename } from 'node:path'
import { toWebp, humanSize } from './lib-images.mjs'

const dir = process.argv[2]
if (!dir) {
  console.error('用法: node scripts/optimize-images.mjs <dir>')
  process.exit(1)
}

const exts = new Set(['.png', '.jpg', '.jpeg'])
const files = readdirSync(dir).filter((f) => exts.has(extname(f).toLowerCase()))
if (!files.length) {
  console.log('没有可压缩的 png/jpg。')
  process.exit(0)
}

let rawTotal = 0,
  outTotal = 0
const renames = {}
for (const f of files) {
  const inPath = resolve(dir, f)
  const name = basename(f, extname(f))
  const outPath = resolve(dir, `${name}.webp`)
  const raw = readFileSync(inPath)
  const webp = await toWebp(raw)
  writeFileSync(outPath, webp)
  unlinkSync(inPath)
  rawTotal += raw.length
  outTotal += webp.length
  renames[f] = `${name}.webp`
  console.log(`  ✓ ${f} → ${name}.webp  ${humanSize(raw.length)}→${humanSize(webp.length)}`)
}

console.log(`\n✔ 压缩 ${files.length} 张：${humanSize(rawTotal)} → ${humanSize(outTotal)} （省 ${Math.round((1 - outTotal / rawTotal) * 100)}%）`)
console.log('提醒：把引用这些图的 import 后缀从 .png/.jpg 改成 .webp。')
