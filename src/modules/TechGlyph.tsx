import type { TechMotif } from '../content/types'

/**
 * 程序化 SVG 科技图：网格背景 + 按主题各异的矢量插画。
 * 矢量、可换肤、零体积。accent 控制主色。
 */
export function TechGlyph({ motif, accent = '#6d5dfc' }: { motif: TechMotif; accent?: string }) {
  const gid = `g-${motif}-${accent.replace('#', '')}`
  return (
    <svg viewBox="0 0 224 112" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.16" />
          <stop offset="1" stopColor="#0d0d12" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${gid}-grid`} width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" fill="none" stroke={accent} strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.5" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="224" height="112" fill="#0d0d12" />
      <rect width="224" height="112" fill={`url(#${gid}-bg)`} />
      <rect width="224" height="112" fill={`url(#${gid}-grid)`} />
      <ellipse cx="112" cy="56" rx="58" ry="42" fill={`url(#${gid}-glow)`} />
      <g transform="translate(112 56) scale(1.25)" stroke={accent} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <Motif motif={motif} accent={accent} />
      </g>
    </svg>
  )
}

function Motif({ motif, accent }: { motif: TechMotif; accent: string }) {
  const fill = accent
  switch (motif) {
    case 'grid':
      return (
        <>
          <rect x="-22" y="-14" width="44" height="28" rx="4" />
          <line x1="-22" y1="-4" x2="22" y2="-4" />
          <line x1="-8" y1="-4" x2="-8" y2="14" />
          <circle cx="-15" cy="-9" r="1.6" fill={fill} stroke="none" />
        </>
      )
    case 'prototype':
      return (
        <>
          <rect x="-24" y="-15" width="48" height="30" rx="4" />
          <line x1="-24" y1="-7" x2="24" y2="-7" />
          <circle cx="-19" cy="-11" r="1.4" fill={fill} stroke="none" />
          <circle cx="-14" cy="-11" r="1.4" fill={fill} stroke="none" />
          <path d="M-4 -1 L8 5 L-4 11 Z" fill={fill} fillOpacity="0.85" stroke="none" />
        </>
      )
    case 'auth':
      return (
        <>
          <path d="M0 -16 L16 -10 V2 C16 11 9 15 0 18 C-9 15 -16 11 -16 2 V-10 Z" />
          <circle cx="0" cy="0" r="3.4" />
          <line x1="0" y1="3" x2="0" y2="8" />
        </>
      )
    case 'storage':
      return (
        <>
          <ellipse cx="0" cy="-12" rx="16" ry="5" />
          <path d="M-16 -12 V12 C-16 14.8 -8.8 17 0 17 C8.8 17 16 14.8 16 12 V-12" />
          <path d="M-16 0 C-16 2.8 -8.8 5 0 5 C8.8 5 16 2.8 16 0" />
        </>
      )
    case 'deploy':
      return (
        <>
          <rect x="-18" y="-2" width="36" height="9" rx="2" />
          <rect x="-18" y="9" width="36" height="9" rx="2" />
          <circle cx="-13" cy="2.5" r="1.4" fill={fill} stroke="none" />
          <circle cx="-13" cy="13.5" r="1.4" fill={fill} stroke="none" />
          <path d="M0 -6 V-18 M-6 -12 L0 -18 L6 -12" />
        </>
      )
    case 'backend':
      return (
        <>
          <circle cx="0" cy="-12" r="4" />
          <circle cx="-16" cy="10" r="4" />
          <circle cx="16" cy="10" r="4" />
          <line x1="0" y1="-8" x2="-14" y2="7" />
          <line x1="0" y1="-8" x2="14" y2="7" />
          <line x1="-12" y1="10" x2="12" y2="10" />
        </>
      )
    case 'finish':
      return (
        <>
          <line x1="-12" y1="-16" x2="-12" y2="18" />
          <path d="M-12 -14 L12 -14 L6 -6 L12 2 L-12 2 Z" fill={fill} fillOpacity="0.18" />
        </>
      )
    case 'terminal':
      return (
        <>
          <rect x="-24" y="-15" width="48" height="30" rx="4" />
          <line x1="-24" y1="-7" x2="24" y2="-7" />
          <path d="M-16 0 L-10 4 L-16 8" />
          <line x1="-6" y1="9" x2="6" y2="9" />
        </>
      )
    case 'api':
      return (
        <>
          <circle cx="0" cy="0" r="15" />
          <circle cx="0" cy="0" r="7" />
          <circle cx="0" cy="-15" r="2.2" fill={fill} stroke="none" />
          <circle cx="13" cy="7.5" r="2.2" fill={fill} stroke="none" />
          <circle cx="-13" cy="7.5" r="2.2" fill={fill} stroke="none" />
        </>
      )
    case 'branch':
      return (
        <>
          <circle cx="-14" cy="-10" r="3.4" />
          <circle cx="-14" cy="12" r="3.4" />
          <circle cx="14" cy="-10" r="3.4" />
          <line x1="-14" y1="-7" x2="-14" y2="9" />
          <path d="M-14 -6 C-14 -10 14 -6 14 -7" />
        </>
      )
    case 'cube':
    default:
      return (
        <>
          <path d="M0 -16 L16 -7 V9 L0 18 L-16 9 V-7 Z" />
          <path d="M0 -16 L0 1 M0 1 L16 -7 M0 1 L-16 -7" />
        </>
      )
  }
}
