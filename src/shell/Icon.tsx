export function Icon({ name, size = 16, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  return <i className={`ti ti-${name}`} aria-hidden="true" style={{ fontSize: size, lineHeight: 1, ...style }} />
}
