import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './markdown.css'

/**
 * 渲染原文 markdown（原封不动）。
 * 图片用 asset:<file> 占位，经 assetMap 解析为打包后的本地 URL。
 */
export function Markdown({ content, assetMap = {} }: { content: string; assetMap?: Record<string, string> }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        urlTransform={(url) => (url.startsWith('asset:') ? url : url)}
        components={{
          img: ({ src, alt }) => {
            const key = typeof src === 'string' && src.startsWith('asset:') ? src.slice('asset:'.length) : ''
            const resolved = key ? assetMap[key] : (src as string)
            if (!resolved) return null
            return <img src={resolved} alt={alt || ''} loading="lazy" />
          },
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
