import type { Lens } from '../content/types'

/** 抽屉顶部的解读视角锚点条。active 由滚动位置(scrollspy)驱动。 */
export function AnchorNav({
  lenses,
  active,
  onJump,
}: {
  lenses: Lens[]
  active: string | null
  onJump: (type: string) => void
}) {
  if (lenses.length <= 1) return null
  return (
    <div className="anchor-nav">
      {lenses.map((l) => (
        <button
          key={l.type}
          className={`anchor ${active === l.type ? 'anchor-on' : ''}`}
          onClick={() => onJump(l.type)}
        >
          {l.title}
        </button>
      ))}
    </div>
  )
}
