import { useEffect, useRef, useState } from 'react'
import type { ContentModule, TechMotif } from '../content/types'
import { TechGlyph } from '../modules/TechGlyph'

const PURPLE = '#6d5dfc'
const TEAL = '#5fd0a8'
const DEFAULT_MOTIFS: TechMotif[] = [
  'grid', 'prototype', 'auth', 'storage', 'deploy', 'backend', 'finish', 'cube', 'terminal', 'api', 'branch',
]

const CARD_W = 224
const CARD_H = 132
const RADIUS_X = 322
const RADIUS_Y = 238
const CANVAS_W = CARD_W + RADIUS_X * 2 + 8 // 900
const CANVAS_H = CARD_H + RADIUS_Y * 2 + 8 // 640

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(CANVAS_W)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

function motifOf(m: ContentModule, i: number): TechMotif {
  return m.motif ?? DEFAULT_MOTIFS[i % DEFAULT_MOTIFS.length]
}

export function ModuleGraph({
  modules,
  onOpen,
}: {
  modules: ContentModule[]
  onOpen: (id: string) => void
}) {
  const [ref, width] = useContainerWidth()
  const sorted = [...modules].sort((a, b) => a.order - b.order)
  const isList = width < 600

  return (
    <div className="module-graph-wrap" ref={ref}>
      {isList ? (
        <RadialList sorted={sorted} onOpen={onOpen} />
      ) : (
        <Radial sorted={sorted} onOpen={onOpen} width={width} />
      )}
    </div>
  )
}

function Radial({
  sorted,
  onOpen,
  width,
}: {
  sorted: ContentModule[]
  onOpen: (id: string) => void
  width: number
}) {
  const scale = Math.min(1, width / CANVAS_W)
  const center = sorted[0]
  const ring = sorted.slice(1)
  const cx = CANVAS_W / 2
  const cy = CANVAS_H / 2

  const pts = ring.map((_, i) => {
    const ang = (-90 + i * (360 / ring.length)) * (Math.PI / 180)
    return { x: cx + RADIUS_X * Math.cos(ang), y: cy + RADIUS_Y * Math.sin(ang) }
  })

  return (
    <div
      className="graph-radial"
      style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})`, marginBottom: (scale - 1) * CANVAS_H }}
    >
      <svg className="graph-lines" viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} width={CANVAS_W} height={CANVAS_H}>
        <defs>
          <filter id="mg-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#mg-glow)">
          {pts.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke={i % 2 === 0 ? PURPLE : TEAL}
              strokeOpacity="0.5"
              strokeWidth="2"
            />
          ))}
        </g>
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={i % 2 === 0 ? PURPLE : TEAL} />
        ))}
        <circle cx={cx} cy={cy} r="4" fill={PURPLE} />
      </svg>

      <PositionedCard mod={center} index={0} accent={PURPLE} highlight x={cx} y={cy} onOpen={onOpen} />
      {ring.map((m, i) => (
        <PositionedCard
          key={m.id}
          mod={m}
          index={i + 1}
          accent={i % 2 === 0 ? PURPLE : TEAL}
          x={pts[i].x}
          y={pts[i].y}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}

function PositionedCard({
  mod,
  index,
  accent,
  highlight,
  x,
  y,
  onOpen,
}: {
  mod: ContentModule
  index: number
  accent: string
  highlight?: boolean
  x: number
  y: number
  onOpen: (id: string) => void
}) {
  return (
    <div style={{ position: 'absolute', left: x - CARD_W / 2, top: y - CARD_H / 2, width: CARD_W }}>
      <ModuleCard mod={mod} index={index} accent={accent} highlight={highlight} onOpen={onOpen} />
    </div>
  )
}

function RadialList({ sorted, onOpen }: { sorted: ContentModule[]; onOpen: (id: string) => void }) {
  return (
    <div className="graph-list">
      {sorted.map((m, i) => (
        <div className="graph-list-item" key={m.id}>
          <ModuleCard mod={m} index={i} accent={i % 2 === 0 ? PURPLE : TEAL} highlight={i === 0} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}

function ModuleCard({
  mod,
  index,
  accent,
  highlight,
  onOpen,
}: {
  mod: ContentModule
  index: number
  accent: string
  highlight?: boolean
  onOpen: (id: string) => void
}) {
  return (
    <button
      className={`module-card ${highlight ? 'module-card-hl' : ''}`}
      onClick={() => onOpen(mod.id)}
      style={highlight ? { borderColor: accent } : undefined}
    >
      <div className="mc-glyph">
        <TechGlyph motif={motifOf(mod, index)} accent={accent} />
      </div>
      <div className="mc-body">
        <span className="mc-no" style={{ color: accent }}>
          {String(mod.order).padStart(2, '0')}
          {highlight ? ' · 起点' : ''}
        </span>
        <span className="mc-title">{mod.title}</span>
        {mod.brief && <span className="mc-brief">{mod.brief}</span>}
      </div>
    </button>
  )
}
