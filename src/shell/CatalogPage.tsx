import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../content/registry'
import { CATEGORY_LABEL, type Category } from '../content/types'
import { HeroBackground } from './HeroBackground'
import { Icon } from './Icon'

type Filter = 'all' | Category

const FILTERS: { key: Filter; label: string; icon?: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'basics', label: '代码基础', icon: 'book' },
  { key: 'practice', label: '代码实践', icon: 'code' },
]

export function CatalogPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const list = useMemo(() => {
    const sorted = [...articles].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) // 创建时间倒序
    return filter === 'all' ? sorted : sorted.filter((a) => a.category === filter)
  }, [filter])

  return (
    <div>
      <section className="hero">
        <HeroBackground />
        <div className="hero-inner">
          <h1 className="hero-title">Code Learning</h1>
          <p className="hero-sub">把代码与 AI，拆成设计师看得懂的样子</p>
          <button className="hero-cta" onClick={() => alert('上传 / 粘贴链接：敬请期待（二期）')}>
            <Icon name="upload" size={15} /> 上传文章 / 粘贴链接
          </button>
        </div>
      </section>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`chip ${filter === f.key ? 'chip-on' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.icon && <Icon name={f.icon} size={13} />} {f.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {list.map((a) => (
          <Link to={`/article/${a.id}`} key={a.id} className={`card cat-${a.category}`}>
            <div className="card-cat">
              <Icon name={a.category === 'basics' ? 'book' : 'code'} size={12} />{' '}
              {CATEGORY_LABEL[a.category]}
            </div>
            <div className="card-title">{a.title}</div>
            <div className="card-summary">{a.summary}</div>
            <div className="card-meta">
              <span className="card-count">
                <Icon name="calendar" size={12} /> {a.createdAt.slice(0, 10)}
              </span>
            </div>
            {a.highlights?.length ? (
              <div className="card-tags">
                {a.highlights.map((h) => (
                  <span className="tag" key={h}>
                    {h}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  )
}
