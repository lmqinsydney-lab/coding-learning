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
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2
const RADIUS_X = 340
const RADIUS_Y = 240
const PAD = 24

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(960)
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

type Pt = { x: number; y: number }

function connectorPath(c: Pt, p: Pt) {
  const dx = p.x - c.x
  const dy = p.y - c.y
  const sx = Math.sign(dx) || 1
  const sy = Math.sign(dy) || 1
  if (Math.abs(dx) >= Math.abs(dy)) {
    const start = { x: c.x + sx * HALF_W, y: c.y }
    const end = { x: p.x - sx * HALF_W, y: p.y }
    const mx = (end.x - start.x) * 0.5
    return { d: `M${start.x},${start.y} C${start.x + mx},${start.y} ${end.x - mx},${end.y} ${end.x},${end.y}`, end }
  }
  const start = { x: c.x, y: c.y + sy * HALF_H }
  const end = { x: p.x, y: p.y - sy * HALF_H }
  const my = (end.y - start.y) * 0.5
  return { d: `M${start.x},${start.y} C${start.x},${start.y + my} ${end.x},${end.y - my} ${end.x},${end.y}`, end }
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
  const ring = sorted.slice(1)
  const n = ring.length

  // 相对中心(0,0)布点 + 错落
  const raw: Pt[] = ring.map((_, i) => {
    const baseAng = -90 + i * (360 / Math.max(n, 1))
    const angOff = i % 2 === 0 ? -5 : 5
    const ang = ((baseAng + angOff) * Math.PI) / 180
    const rxF = i % 2 === 0 ? 0.96 : 1.08
    const ryF = i % 2 === 0 ? 1.08 : 0.95
    return { x: RADIUS_X * rxF * Math.cos(ang), y: RADIUS_Y * ryF * Math.sin(ang) }
  })

  // 计算范围（含卡片半尺寸与中心），归一化到画布
  const all = [{ x: 0, y: 0 }, ...raw]
  const minX = Math.min(...all.map((p) => p.x)) - HALF_W
  const maxX = Math.max(...all.map((p) => p.x)) + HALF_W
  const minY = Math.min(...all.map((p) => p.y)) - HALF_H
  const maxY = Math.max(...all.map((p) => p.y)) + HALF_H
  const canvasW = maxX - minX + PAD * 2
  const canvasH = maxY - minY + PAD * 2
  const ox = -minX + PAD
  const oy = -minY + PAD

  const center = { x: ox, y: oy }
  const pts = raw.map((p) => ({ x: p.x + ox, y: p.y + oy }))
  const conns = pts.map((p) => connectorPath(center, p))
  const scale = Math.min(1, width / canvasW)

  return (
    <div
      className="graph-radial"
      style={{
        width: canvasW,
        height: canvasH,
        transform: `scale(${scale})`,
        marginBottom: (scale - 1) * canvasH,
      }}
    >
      <svg className="graph-lines" viewBox={`0 0 ${canvasW} ${canvasH}`} width={canvasW} height={canvasH}>
        <defs>
          <filter id="mg-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {conns.map((c, i) => {
          const col = i % 2 === 0 ? PURPLE : TEAL
          return (
            <g key={i}>
              <path d={c.d} fill="none" stroke={col} strokeOpacity="0.3" strokeWidth="6" filter="url(#mg-glow)" />
              <path d={c.d} fill="none" stroke={col} strokeOpacity="0.85" strokeWidth="1.6" strokeLinecap="round" />
              <path d={c.d} className="flow-dash" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          )
        })}
        {conns.map((c, i) => (
          <circle key={`e${i}`} cx={c.end.x} cy={c.end.y} r="3.2" fill={i % 2 === 0 ? PURPLE : TEAL} />
        ))}
        <circle cx={center.x} cy={center.y} r="4.5" fill={PURPLE} filter="url(#mg-glow)" />
        <circle cx={center.x} cy={center.y} r="3" fill={PURPLE} />
      </svg>

      <PositionedCard mod={sorted[0]} index={0} accent={PURPLE} highlight x={center.x} y={center.y} onOpen={onOpen} />
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
    <div style={{ position: 'absolute', left: x - HALF_W, top: y - HALF_H, width: CARD_W }}>
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
