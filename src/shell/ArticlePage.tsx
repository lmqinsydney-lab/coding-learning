import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getArticle } from '../content/registry'
import { CATEGORY_LABEL } from '../content/types'
import { Blocks } from '../modules/Blocks'
import { Markdown } from '../modules/Markdown'
import { ModuleGraph } from './ModuleGraph'
import { ModuleDrawer } from './ModuleDrawer'
import { Icon } from './Icon'

export function ArticlePage() {
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const article = id ? getArticle(id) : undefined

  if (!article) {
    return (
      <div className="article-wrap">
        <p style={{ color: 'var(--text-secondary)' }}>没找到这篇文章。</p>
        <Link to="/" className="back-link">
          <Icon name="arrow-left" size={14} /> 返回目录
        </Link>
      </div>
    )
  }

  const activeId = params.get('m')
  const openModule = (mid: string) => setParams({ m: mid })
  const closeDrawer = () => setParams({})

  return (
    <div className="article-wrap">
      <StickyBar title={article.title} />

      <div className="article-head">
        <span className={`card-cat cat-${article.category}`}>
          <Icon name={article.category === 'code' ? 'code' : 'sparkles'} size={12} />{' '}
          {CATEGORY_LABEL[article.category]}
        </span>
        <h1 id="article-title">{article.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>{article.summary}</p>
      </div>

      {/* 第一层：内容模块 coverflow */}
      <div className="outline-label">
        <Icon name="layout-grid" size={14} /> 快速学习
      </div>
      <ModuleGraph modules={article.contentModules} onOpen={openModule} />

      {/* 双栏：左原文随页滚动，右模块面板常驻、内部滚动 */}
      <div className={`article-split ${activeId ? 'has-panel' : ''}`}>
        <div className="origin-col">
          <div className="origin-label">
            <Icon name="file-text" size={14} /> 原文
          </div>
          <article className="origin-body">
            {article.bodyMarkdown ? (
              <Markdown content={article.bodyMarkdown} assetMap={article.assetMap} />
            ) : (
              <Blocks blocks={article.body} />
            )}
          </article>
        </div>

        {activeId && (
          <div className="module-col">
            <ModuleDrawer article={article} activeId={activeId} onClose={closeDrawer} onNavigate={openModule} />
          </div>
        )}
      </div>
    </div>
  )
}

/** 贴顶二级栏：「目录」始终在；文章大标题滑出视口后，自动在「目录」后补上标题。 */
function StickyBar({ title }: { title: string }) {
  const [showTitle, setShowTitle] = useState(false)
  useEffect(() => {
    const el = document.getElementById('article-title')
    if (!el) return
    const ob = new IntersectionObserver(([e]) => setShowTitle(!e.isIntersecting), {
      rootMargin: '-56px 0px 0px 0px',
      threshold: 0,
    })
    ob.observe(el)
    return () => ob.disconnect()
  }, [title])

  return (
    <div className="article-bar">
      <Link to="/" className="back-link">
        <Icon name="arrow-left" size={14} /> 目录
      </Link>
      {showTitle && (
        <>
          <span className="bar-sep">/</span>
          <span className="bar-title">{title}</span>
        </>
      )}
    </div>
  )
}
