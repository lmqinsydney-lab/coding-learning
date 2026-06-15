import sharp from 'sharp'

export const MAX_WIDTH = 1200
export const QUALITY = 80

/** 把图片 buffer 压成 WebP（限宽 + 质量），返回输出 buffer。 */
export async function toWebp(input, { maxWidth = MAX_WIDTH, quality = QUALITY } = {}) {
  const img = sharp(input, { failOn: 'none' })
  const meta = await img.metadata()
  if (meta.width && meta.width > maxWidth) img.resize({ width: maxWidth })
  return img.webp({ quality }).toBuffer()
}

export function humanSize(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'MB'
  if (bytes > 1024) return (bytes / 1024).toFixed(0) + 'KB'
  return bytes + 'B'
}

/** 从一段 markdown/文本里抽取所有图片 URL（去重） */
export function extractImageUrls(text) {
  const urls = text.match(/https?:\/\/[^)\s"']+?\.(?:png|jpg|jpeg|gif)[^)\s"']*/gi) || []
  return [...new Set(urls)]
}

/** 由图片 URL 推导一个稳定的文件名（不含扩展名） */
export function nameFromUrl(url, i) {
  const m = url.match(/\/f\/([^.?/]+)\./)
  if (m) return m[1]
  return 'img' + String(i + 1).padStart(2, '0')
}
