import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ContentModule, TechMotif } from '../content/types'
import { TechGlyph } from '../modules/TechGlyph'

const PURPLE = '#6d5dfc'
const TEAL = '#5fd0a8'
const DEFAULT_MOTIFS: TechMotif[] = [
  'grid', 'prototype', 'auth', 'storage', 'deploy', 'backend', 'finish', 'cube', 'terminal', 'api', 'branch',
]

const RADIUS_X = 420
const RADIUS_Y = 166
const PAD = 14
const MAX_SCALE = 0.9

type Size = { w: number; h: number }
type Pt = { x: number; y: number }

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(980)
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

/** 首屏估算尺寸（测量前用），减少跳动 */
function estimate(m: ContentModule): Size {
  const t = Math.max((m.shortTitle ?? m.title).length, m.brief?.length ?? 0)
  const w = Math.min(360, Math.max(190, t * 15 + 28 + 40))
  return { w, h: 140 }
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

/** 正交折线圆角化 */
function roundedPath(points: Pt[], r = 14): string {
  if (points.length < 2) return ''
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const next = points[i + 1]
    const len1 = Math.hypot(cur.x - prev.x, cur.y - prev.y)
    const len2 = Math.hypot(next.x - cur.x, next.y - cur.y)
    const rr = Math.min(r, len1 / 2, len2 / 2)
    if (rr < 0.5) {
      d += ` L${cur.x},${cur.y}`
      continue
    }
    const bx = cur.x - ((cur.x - prev.x) / (len1 || 1)) * rr
    const by = cur.y - ((cur.y - prev.y) / (len1 || 1)) * rr
    const ax = cur.x + ((next.x - cur.x) / (len2 || 1)) * rr
    const ay = cur.y + ((next.y - cur.y) / (len2 || 1)) * rr
    d += ` L${bx},${by} Q${cur.x},${cur.y} ${ax},${ay}`
  }
  const last = points[points.length - 1]
  d += ` L${last.x},${last.y}`
  return d
}

/** 正交走线（水平/垂直），按各卡实际半尺寸吸附边缘 */
function connectorPath(c: Pt, p: Pt, cH: Size, pH: Size) {
  const dx = p.x - c.x
  const dy = p.y - c.y
  const sx = Math.sign(dx) || 1
  const sy = Math.sign(dy) || 1
  let points: Pt[]
  let end: Pt
  if (Math.abs(dx) >= Math.abs(dy)) {
    const start = { x: c.x + sx * (cH.w / 2), y: c.y }
    end = { x: p.x - sx * (pH.w / 2), y: p.y }
    const midX = start.x + (end.x - start.x) / 2
    points = [start, { x: midX, y: start.y }, { x: midX, y: end.y }, end]
  } else {
    const start = { x: c.x, y: c.y + sy * (cH.h / 2) }
    end = { x: p.x, y: p.y - sy * (pH.h / 2) }
    const midY = start.y + (end.y - start.y) / 2
    points = [start, { x: start.x, y: midY }, { x: end.x, y: midY }, end]
  }
  return { d: roundedPath(points), end }
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
  const center = sorted[0]
  const ring = sorted.slice(1)
  const n = ring.length

  const refs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [sizes, setSizes] = useState<Record<string, Size>>({})

  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<string, Size> = {}
      refs.current.forEach((el, id) => {
        if (el) next[id] = { w: el.offsetWidth, h: el.offsetHeight }
      })
      setSizes(next)
    }
    const ro = new ResizeObserver(measure)
    refs.current.forEach((el) => el && ro.observe(el))
    measure()
    let cancelled = false
    // 等 Oswald 字体加载完再量一次（序号宽度会变）
    if (document.fonts?.ready) document.fonts.ready.then(() => !cancelled && measure())
    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [sorted])

  const sizeOf = (m: ContentModule): Size => sizes[m.id] ?? estimate(m)

  // 正上/正下方的节点（与中心同轴）→ 对齐中心 x，连线走直线
  const isVertical = (i: number) => {
    const a = (((-90 + i * (360 / Math.max(n, 1))) % 360) + 360) % 360
    return a === 90 || a === 270
  }

  // 相对中心(0,0)布点 + 错落（垂直轴节点对齐中心，不错落）
  const ringPts: Pt[] = ring.map((_, i) => {
    const baseAng = -90 + i * (360 / Math.max(n, 1))
    if (isVertical(i)) {
      return { x: 0, y: RADIUS_Y * 1.08 * Math.sign(Math.sin((baseAng * Math.PI) / 180)) }
    }
    const angOff = i % 2 === 0 ? -5 : 5
    const ang = ((baseAng + angOff) * Math.PI) / 180
    const rxF = i % 2 === 0 ? 0.96 : 1.08
    const ryF = i % 2 === 0 ? 1.08 : 0.95
    return { x: RADIUS_X * rxF * Math.cos(ang), y: RADIUS_Y * ryF * Math.sin(ang) }
  })

  const nodes = [{ m: center, pt: { x: 0, y: 0 } }, ...ring.map((m, i) => ({ m, pt: ringPts[i] }))]
  const minX = Math.min(...nodes.map((nd) => nd.pt.x - sizeOf(nd.m).w / 2))
  const maxX = Math.max(...nodes.map((nd) => nd.pt.x + sizeOf(nd.m).w / 2))
  const minY = Math.min(...nodes.map((nd) => nd.pt.y - sizeOf(nd.m).h / 2))
  const maxY = Math.max(...nodes.map((nd) => nd.pt.y + sizeOf(nd.m).h / 2))
  const canvasW = maxX - minX + PAD * 2
  const canvasH = maxY - minY + PAD * 2
  const ox = -minX + PAD
  const oy = -minY + PAD

  const centerPt = { x: ox, y: oy }
  const placed = ring.map((_, i) => ({ x: ringPts[i].x + ox, y: ringPts[i].y + oy }))
  const conns = ring.map((m, i) => connectorPath(centerPt, placed[i], sizeOf(center), sizeOf(m)))
  const scale = Math.min(MAX_SCALE, width / canvasW)

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) refs.current.set(id, el)
    else refs.current.delete(id)
  }

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
          <radialGradient id="syn-p" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={PURPLE} stopOpacity="0.95" />
            <stop offset="0.4" stopColor={PURPLE} stopOpacity="0.5" />
            <stop offset="1" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="syn-t" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={TEAL} stopOpacity="0.95" />
            <stop offset="0.4" stopColor={TEAL} stopOpacity="0.5" />
            <stop offset="1" stopColor={TEAL} stopOpacity="0" />
          </radialGradient>
        </defs>
        {conns.map((c, i) => {
          const col = i % 2 === 0 ? PURPLE : TEAL
          return (
            <g key={i}>
              <path d={c.d} fill="none" stroke={col} strokeOpacity="0.28" strokeWidth="6" filter="url(#mg-glow)" />
              <path d={c.d} fill="none" stroke={col} strokeOpacity="0.8" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d={c.d}
                className="flow-pulse"
                pathLength={1}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          )
        })}
        {/* 突触：连接处发光节点（颜色融洽） */}
        {conns.map((c, i) => (
          <g key={`s${i}`}>
            <circle cx={c.end.x} cy={c.end.y} r="9" fill={i % 2 === 0 ? 'url(#syn-p)' : 'url(#syn-t)'} />
            <circle cx={c.end.x} cy={c.end.y} r="2.6" fill="#fff" fillOpacity="0.9" />
          </g>
        ))}
        <circle cx={centerPt.x} cy={centerPt.y} r="11" fill="url(#syn-p)" />
        <circle cx={centerPt.x} cy={centerPt.y} r="3" fill="#fff" fillOpacity="0.9" />
      </svg>

      <div ref={setRef(center.id)} className="graph-node" style={{ left: centerPt.x - sizeOf(center).w / 2, top: centerPt.y - sizeOf(center).h / 2 }}>
        <ModuleCard mod={center} index={0} accent={PURPLE} highlight onOpen={onOpen} />
      </div>
      {ring.map((m, i) => (
        <div
          key={m.id}
          ref={setRef(m.id)}
          className="graph-node"
          style={{ left: placed[i].x - sizeOf(m).w / 2, top: placed[i].y - sizeOf(m).h / 2 }}
        >
          <ModuleCard mod={m} index={i + 1} accent={i % 2 === 0 ? PURPLE : TEAL} onOpen={onOpen} />
        </div>
      ))}
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
    <button className={`module-card ${highlight ? 'module-card-hl' : ''}`} onClick={() => onOpen(mod.id)}>
      <div className="mc-glyph">
        <TechGlyph motif={motifOf(mod, index)} accent={accent} />
      </div>
      <div className="mc-body">
        <span className="mc-no" style={{ color: accent }}>
          {String(mod.order).padStart(2, '0')}
        </span>
        <div className="mc-text">
          <span className="mc-title">{mod.shortTitle ?? mod.title}</span>
          {mod.brief && <span className="mc-brief">{mod.brief}</span>}
        </div>
      </div>
    </button>
  )
}
