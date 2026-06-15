import type { ContentBlock } from '../content/types'
import { Icon } from '../shell/Icon'
import { ClickableBubble } from './widgets/ClickableBubble'
import { StepChecklist } from './widgets/StepChecklist'

/** 基础内容块渲染器。M2 会扩充更多交互范式块。 */
export function Blocks({ blocks }: { blocks?: ContentBlock[] }) {
  if (!blocks?.length) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  )
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'h':
      return <h3 style={{ marginTop: 4 }}>{block.text}</h3>
    case 'p':
      return <p style={{ margin: 0, color: 'var(--text-primary)' }}>{block.text}</p>
    case 'list':
      return (
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-primary)' }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              {it}
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre
          style={{
            margin: 0,
            background: 'var(--bg-page)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: '12px 14px',
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-sm)',
            color: 'var(--accent-text)',
          }}
        >
          <code>{block.code}</code>
        </pre>
      )
    case 'callout': {
      const warn = block.tone === 'warn'
      const c = warn ? 'var(--warn)' : 'var(--accent)'
      return (
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            background: warn ? 'rgba(240,160,75,0.1)' : 'var(--accent-soft)',
            border: `0.5px solid ${c}`,
            borderRadius: 'var(--r-md)',
            padding: '10px 12px',
            fontSize: 'var(--fs-sm)',
          }}
        >
          <Icon name={warn ? 'alert-triangle' : 'info-circle'} size={16} style={{ color: c, marginTop: 2 }} />
          <span>{block.text}</span>
        </div>
      )
    }
    case 'analogy':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: 10,
            background: 'var(--bg-elevated-2)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 12,
          }}
        >
          <AnalogySide label="设计师世界" text={block.designSide} color="var(--cat-ai)" />
          <Icon name="arrows-exchange" size={18} style={{ color: 'var(--text-tertiary)' }} />
          <AnalogySide label="代码世界" text={block.codeSide} color="var(--cat-code)" />
        </div>
      )
    case 'commands':
      return <ClickableBubble intro={block.intro} items={block.items} />
    case 'steps':
      return <StepChecklist items={block.items} />
    case 'custom':
      return <>{block.node}</>
  }
}

function AnalogySide({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 'var(--fs-2xs)', color, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 'var(--fs-sm)' }}>{text}</div>
    </div>
  )
}
