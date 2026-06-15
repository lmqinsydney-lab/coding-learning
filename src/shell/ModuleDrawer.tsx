import { useEffect, useMemo, useState } from 'react'
import type { Article, Lens } from '../content/types'
import { LENS_ICON } from '../content/types'
import { Blocks } from '../modules/Blocks'
import { Icon } from './Icon'

export function ModuleDrawer({
  article,
  activeId,
  onClose,
  onNavigate,
}: {
  article: Article
  activeId: string | null
  onClose: () => void
  onNavigate: (id: string) => void
}) {
  const sorted = useMemo(
    () => [...article.contentModules].sort((a, b) => a.order - b.order),
    [article],
  )
  const index = sorted.findIndex((m) => m.id === activeId)
  const mod = index >= 0 ? sorted[index] : null
  const open = !!mod

  // Esc 关闭 + 打开时锁背景滚动
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open || !mod) return null

  const prev = index > 0 ? sorted[index - 1] : null
  const next = index < sorted.length - 1 ? sorted[index + 1] : null

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={mod.title}>
        <DrawerHeader order={mod.order} title={mod.title} onClose={onClose} lenses={mod.lenses} />
        <div className="drawer-body" id="drawer-scroll">
          {mod.lenses.map((lens) => (
            <section className="lens" id={`lens-${lens.type}`} key={lens.type}>
              <h2 className="lens-title">
                <Icon name={lens.icon || LENS_ICON[lens.type]} size={16} style={{ color: 'var(--accent-text)' }} />
                {lens.title}
              </h2>
              <Blocks blocks={lens.blocks} />
              {lens.custom}
            </section>
          ))}
        </div>
        <footer className="drawer-foot">
          <button className="foot-btn" disabled={!prev} onClick={() => prev && onNavigate(prev.id)}>
            <Icon name="arrow-left" size={14} /> {prev ? prev.title : '已是第一个'}
          </button>
          <button className="foot-btn" disabled={!next} onClick={() => next && onNavigate(next.id)}>
            {next ? next.title : '已是最后一个'} <Icon name="arrow-right" size={14} />
          </button>
        </footer>
      </aside>
    </>
  )
}

function DrawerHeader({
  order,
  title,
  lenses,
  onClose,
}: {
  order: number
  title: string
  lenses: Lens[]
  onClose: () => void
}) {
  const [active, setActive] = useState(lenses[0]?.type)
  const jump = (type: string) => {
    setActive(type as Lens['type'])
    document.getElementById(`lens-${type}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <header className="drawer-head">
      <div className="drawer-head-row">
        <div>
          <div className="drawer-kicker">模块详情 · {String(order).padStart(2, '0')}</div>
          <h2 className="drawer-title">{title}</h2>
        </div>
        <button className="icon-btn" aria-label="关闭" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>
      <div className="anchor-nav">
        {lenses.map((l) => (
          <button
            key={l.type}
            className={`anchor ${active === l.type ? 'anchor-on' : ''}`}
            onClick={() => jump(l.type)}
          >
            {l.title}
          </button>
        ))}
      </div>
    </header>
  )
}
