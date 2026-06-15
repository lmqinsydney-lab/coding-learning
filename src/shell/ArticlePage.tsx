import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getArticle } from '../content/registry'
import { CATEGORY_LABEL } from '../content/types'
import { Blocks } from '../modules/Blocks'
import { Markdown } from '../modules/Markdown'
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
      <Link to="/" className="back-link">
        <Icon name="arrow-left" size={14} /> 目录
      </Link>

      <div className="article-head">
        <span className={`card-cat cat-${article.category}`}>
          <Icon name={article.category === 'code' ? 'code' : 'sparkles'} size={12} />{' '}
          {CATEGORY_LABEL[article.category]}
        </span>
        <h1 style={{ marginTop: 10 }}>{article.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>{article.summary}</p>
      </div>

      {/* 第一层：内容模块大纲（信息图总览） */}
      <div className="outline-label">
        <Icon name="layout-grid" size={14} /> 内容模块 · 点击进入学习
      </div>
      <div className="outline-grid">
        {[...article.contentModules]
          .sort((a, b) => a.order - b.order)
          .map((m) => (
            <button key={m.id} className="outline-card" onClick={() => openModule(m.id)}>
              <span className="outline-no">{String(m.order).padStart(2, '0')}</span>
              <span className="outline-title">{m.title}</span>
              {m.brief && <span className="outline-brief">{m.brief}</span>}
              <span className="outline-lenses">
                {m.lenses.map((l) => l.title).join(' · ')}
              </span>
            </button>
          ))}
      </div>

      {/* 原文铺底 */}
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

      <ModuleDrawer article={article} activeId={activeId} onClose={closeDrawer} onNavigate={openModule} />
    </div>
  )
}
