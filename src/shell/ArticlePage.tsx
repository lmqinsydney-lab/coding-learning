import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getArticle } from '../content/registry'
import { CATEGORY_LABEL, type ContentModule } from '../content/types'
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

  // 切换模块时，左侧原文联动锚定到对应章节
  useEffect(() => {
    if (!activeId || !article) return
    const anchor = article.contentModules.find((m) => m.id === activeId)?.originAnchor
    if (!anchor) return
    const raf = requestAnimationFrame(() => {
      const heads = document.querySelectorAll<HTMLElement>('.origin-body :is(h1, h2, h3, h4)')
      const target = [...heads].find((h) => h.textContent?.includes(anchor))
      if (!target) return
      const top = window.scrollY + target.getBoundingClientRect().top - 108
      window.scrollTo({ top, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [activeId, article])

  return (
    <div className="article-wrap">
      <StickyBar title={article.title} modules={article.contentModules} activeId={activeId} onNavigate={openModule} />

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
            <ModuleDrawer article={article} activeId={activeId} onClose={closeDrawer} />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 贴顶二级栏：「目录」始终在；文章大标题滑出后补上标题；
 * 当 coverflow（快速学习）滑出视口后，右侧出现上/下模块切换。
 */
function StickyBar({
  title,
  modules,
  activeId,
  onNavigate,
}: {
  title: string
  modules: ContentModule[]
  activeId: string | null
  onNavigate: (id: string) => void
}) {
  const [showTitle, setShowTitle] = useState(false)
  const [carouselGone, setCarouselGone] = useState(false)

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

  useEffect(() => {
    const el = document.querySelector('.carousel-wrap')
    if (!el) return
    const ob = new IntersectionObserver(([e]) => setCarouselGone(!e.isIntersecting), {
      rootMargin: '-100px 0px 0px 0px',
      threshold: 0,
    })
    ob.observe(el)
    return () => ob.disconnect()
  }, [activeId])

  const sorted = [...modules].sort((a, b) => a.order - b.order)
  const idx = sorted.findIndex((m) => m.id === activeId)
  const cur = idx >= 0 ? sorted[idx] : null
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null
  const showNav = !!cur && carouselGone

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
      {showNav && cur && (
        <div className="bar-modnav">
          <button
            className="bar-mod-btn"
            disabled={!prev}
            aria-label="上一个模块"
            title={prev?.title}
            onClick={() => prev && onNavigate(prev.id)}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <span className="bar-mod-cur">{cur.shortTitle ?? cur.title}</span>
          <button
            className="bar-mod-btn"
            disabled={!next}
            aria-label="下一个模块"
            title={next?.title}
            onClick={() => next && onNavigate(next.id)}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
