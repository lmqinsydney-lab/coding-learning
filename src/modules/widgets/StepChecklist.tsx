import { useState } from 'react'
import { Icon } from '../../shell/Icon'

/** 分步实操清单：可勾选，边看边做。 */
export function StepChecklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false))
  const toggle = (i: number) => setDone((d) => d.map((v, idx) => (idx === i ? !v : v)))
  const count = done.filter(Boolean).length

  return (
    <div
      style={{
        background: 'var(--bg-page)',
        border: '0.5px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)', marginBottom: 8 }}>
        进度 {count}/{items.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => {
          const on = done[i]
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: 0,
                color: on ? 'var(--text-tertiary)' : 'var(--text-primary)',
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                  marginTop: 2,
                  borderRadius: 5,
                  border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
                  background: on ? 'var(--accent)' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                }}
              >
                {on && <Icon name="check" size={12} />}
              </span>
              <span
                style={{
                  fontSize: 'var(--fs-sm)',
                  textDecoration: on ? 'line-through' : 'none',
                }}
              >
                {it}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
