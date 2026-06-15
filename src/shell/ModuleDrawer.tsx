import { useEffect, useMemo, useRef, useState } from 'react'
import type { Article, LensType } from '../content/types'
import { LENS_ICON } from '../content/types'
import { Blocks } from '../modules/Blocks'
import { AnchorNav } from '../modules/AnchorNav'
import { Icon } from './Icon'

/** 每个视角的强调色 */
const LENS_ACCENT: Record<LensType, string> = {
  intro: 'var(--accent-text)',
  concept: 'var(--cat-ai)',
  reference: 'var(--accent)',
  pitfall: 'var(--warn)',
}

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

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeLens, setActiveLens] = useState<string | null>(null)

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

  // scrollspy：滚动时高亮当前视角
  useEffect(() => {
    const root = scrollRef.current
    if (!open || !mod || !root) return
    setActiveLens(mod.lenses[0]?.type ?? null)
    root.scrollTop = 0

    const sections = mod.lenses
      .map((l) => root.querySelector<HTMLElement>(`#lens-${l.type}`))
      .filter((x): x is HTMLElement => !!x)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveLens(visible[0].target.id.replace('lens-', ''))
      },
      { root, rootMargin: '0px 0px -65% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [open, mod])

  if (!open || !mod) return null

  const prev = index > 0 ? sorted[index - 1] : null
  const next = index < sorted.length - 1 ? sorted[index + 1] : null

  const jump = (type: string) => {
    const root = scrollRef.current
    root?.querySelector(`#lens-${type}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={mod.title}>
        <header className="drawer-head">
          <div className="drawer-head-row">
            <div>
              <div className="drawer-kicker">模块详情 · {String(mod.order).padStart(2, '0')}</div>
              <h2 className="drawer-title">{mod.title}</h2>
            </div>
            <button className="icon-btn" aria-label="关闭" onClick={onClose}>
              <Icon name="x" size={18} />
            </button>
          </div>
          <AnchorNav lenses={mod.lenses} active={activeLens} onJump={jump} />
        </header>

        <div className="drawer-body" id="drawer-scroll" ref={scrollRef}>
          {mod.lenses.map((lens) => (
            <section className="lens" id={`lens-${lens.type}`} key={lens.type}>
              <h2 className="lens-title">
                <Icon
                  name={lens.icon || LENS_ICON[lens.type]}
                  size={16}
                  style={{ color: LENS_ACCENT[lens.type] }}
                />
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
