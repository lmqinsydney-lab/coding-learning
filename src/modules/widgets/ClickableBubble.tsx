import { useState } from 'react'
import type { CommandItem } from '../../content/types'
import { Icon } from '../../shell/Icon'

/**
 * 可点击气泡：点某条指令 → 展开它的讲解/类比/易错点。
 * 「指令交互速查」视角的核心交互范式。
 */
export function ClickableBubble({ intro, items }: { intro?: string; items: CommandItem[] }) {
  const [active, setActive] = useState<string | null>(null)
  const current = items.find((i) => i.cmd === active) || null

  return (
    <div>
      {intro && (
        <p style={{ margin: '0 0 10px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{intro}</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((it) => {
          const on = it.cmd === active
          return (
            <button
              key={it.cmd}
              onClick={() => setActive(on ? null : it.cmd)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-sm)',
                color: on ? '#fff' : 'var(--accent-text)',
                background: on ? 'var(--accent)' : 'var(--bg-page)',
                border: `0.5px solid ${on ? 'var(--accent)' : 'var(--border-accent)'}`,
                borderRadius: 'var(--r-sm)',
                padding: '7px 12px',
                transition: 'all 0.15s',
              }}
            >
              {it.cmd}
            </button>
          )
        })}
      </div>

      {current && (
        <div
          style={{
            marginTop: 12,
            background: 'var(--bg-page)',
            border: '0.5px solid var(--border-accent)',
            borderRadius: 'var(--r-md)',
            padding: '14px 16px',
            animation: 'fade-in 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-body)',
                color: 'var(--accent-text)',
              }}
            >
              {current.cmd}
            </code>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)' }}>{current.desc}</p>
          {current.analogy && (
            <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--cat-ai)' }}>
                <Icon name="palette" size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                设计师类比：
              </span>
              {current.analogy}
            </p>
          )}
          {current.pitfall && (
            <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--warn)' }}>
                <Icon name="alert-triangle" size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                易错：
              </span>
              {current.pitfall}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
