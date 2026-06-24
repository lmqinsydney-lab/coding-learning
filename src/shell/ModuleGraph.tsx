import { useEffect, useRef, useState } from 'react'
import type { ContentModule, TechMotif } from '../content/types'
import { TechGlyph } from '../modules/TechGlyph'

const PURPLE = '#6d5dfc'
const TEAL = '#5fd0a8'
const DEFAULT_MOTIFS: TechMotif[] = [
  'grid', 'prototype', 'auth', 'storage', 'deploy', 'backend', 'finish', 'cube', 'terminal', 'api', 'branch',
]

function motifOf(m: ContentModule, i: number): TechMotif {
  return m.motif ?? DEFAULT_MOTIFS[i % DEFAULT_MOTIFS.length]
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(900)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

export function ModuleGraph({
  modules,
  onOpen,
}: {
  modules: ContentModule[]
  onOpen: (id: string) => void
}) {
  const sorted = [...modules].sort((a, b) => a.order - b.order)
  const n = sorted.length
  const [ref, width] = useContainerWidth()
  const [active, setActive] = useState(0)

  // 文章切换时回到第一张
  const firstId = sorted[0]?.id
  useEffect(() => setActive(0), [firstId])

  const go = (dir: number) => setActive((a) => (a + dir + n) % n)

  // 键盘左右
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  // 拖拽/滑动
  const drag = useRef({ x: 0, moved: false, down: false })
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false, down: true }
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    if (Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true
  }
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    const dx = e.clientX - drag.current.x
    drag.current.down = false
    if (dx > 45) go(-1)
    else if (dx < -45) go(1)
  }

  const cardW = Math.round(Math.min(272, Math.max(200, width * 0.36)))
  const step1 = cardW * 0.74 // ±1 卡：露出更多
  const step2 = cardW * 0.46 // ±2 卡：在 ±1 之外也多露一些
  const step = step1 // 点击横坐标→步数 的映射基准

  const styleFor = (i: number) => {
    let off = i - active
    if (off > n / 2) off -= n
    if (off < -n / 2) off += n
    const abs = Math.abs(off)
    const sign = Math.sign(off)
    if (abs >= 3) {
      return {
        width: cardW,
        transform: `translate(-50%, -50%) translateX(${sign * (step1 + step2 * 1.5)}px) translateZ(-460px) scale(0.68)`,
        opacity: 0,
        zIndex: 100 - abs,
        pointerEvents: 'none' as const,
      }
    }
    const tx = abs === 0 ? 0 : abs === 1 ? sign * step1 : sign * (step1 + step2)
    const tz = abs === 0 ? 0 : abs === 1 ? -150 : -310
    const ry = off === 0 ? 0 : -sign * (abs === 1 ? 36 : 46)
    const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.76
    const opacity = abs === 0 ? 1 : abs === 1 ? 1 : 0.52
    return {
      width: cardW,
      transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - abs,
      pointerEvents: 'auto' as const,
    }
  }

  // 按点击横坐标判定（不依赖 3D 命中测试）：中心区开抽屉，两侧区把对应卡归中
  const onStageClick = (e: React.MouseEvent) => {
    if (drag.current.moved) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    if (Math.abs(dx) <= cardW * 0.5) {
      onOpen(sorted[active].id)
      return
    }
    const steps = Math.max(-3, Math.min(3, Math.round(dx / step)))
    if (steps !== 0) setActive((a) => (a + steps + n) % n)
  }

  return (
    <div className="carousel-wrap" ref={ref}>
      <div
        className="carousel"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClick={onStageClick}
      >
        <div className="carousel-stage">
          {sorted.map((m, i) => {
            let off = i - active
            if (off > n / 2) off -= n
            if (off < -n / 2) off += n
            return (
              <div className="carousel-item" key={m.id} style={styleFor(i)}>
                <ModuleCard mod={m} index={i} accent={i % 2 === 0 ? PURPLE : TEAL} highlight={off === 0} />
              </div>
            )
          })}
        </div>

        <button
          className="carousel-arrow carousel-prev"
          aria-label="上一个"
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
        >
          <i className="ti ti-chevron-left" aria-hidden="true" />
        </button>
        <button
          className="carousel-arrow carousel-next"
          aria-label="下一个"
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
        >
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      </div>

      <div className="carousel-dots">
        {sorted.map((m, i) => (
          <button
            key={m.id}
            className={`carousel-dot ${i === active ? 'on' : ''}`}
            aria-label={`第 ${i + 1} 个`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}

function ModuleCard({
  mod,
  index,
  accent,
  highlight,
}: {
  mod: ContentModule
  index: number
  accent: string
  highlight?: boolean
}) {
  return (
    <div className={`module-card ${highlight ? 'module-card-hl' : ''}`}>
      <div className="mc-glyph">
        <TechGlyph motif={motifOf(mod, index)} accent={accent} />
      </div>
      <div className="mc-body">
        <div className="mc-text">
          <span className="mc-title">{mod.shortTitle ?? mod.title}</span>
          {mod.brief && <span className="mc-brief">{mod.brief}</span>}
        </div>
        <span className="mc-no" style={{ color: accent }}>
          {String(mod.order).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
