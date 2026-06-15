import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

/**
 * Ripple Grid 背景（React Bits 风格的自实现，依赖 ogl）。
 * 一个全屏三角形 + 片元着色器绘制带涟漪扰动的网格，鼠标交互 + 渐隐 + 暗角。
 * prefers-reduced-motion 或低端设备时退化为静态渐变，不跑 WebGL。
 */
export function HeroBackground({
  gridColor = '#6d5dfc',
  rippleIntensity = 0.06,
  gridSize = 12,
  gridThickness = 14,
  opacity = 0.9,
  fadeDistance = 1.4,
  vignetteStrength = 1.8,
  glowIntensity = 0.12,
}: {
  gridColor?: string
  rippleIntensity?: number
  gridSize?: number
  gridThickness?: number
  opacity?: number
  fadeDistance?: number
  vignetteStrength?: number
  glowIntensity?: number
} = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: Renderer | null = null
    try {
      renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) })
    } catch {
      el.classList.add('hero-fallback')
      return
    }
    if (!renderer || reduce) {
      el.classList.add('hero-fallback')
      renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext()
      return
    }

    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'
    el.appendChild(gl.canvas)

    const hex = gridColor.replace('#', '')
    const rgb = [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ]

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uMouse;
        uniform vec3 uColor;
        uniform float uGridSize;
        uniform float uThickness;
        uniform float uRipple;
        uniform float uOpacity;
        uniform float uFade;
        uniform float uVignette;
        uniform float uGlow;

        void main() {
          vec2 uv = vUv;
          float aspect = uRes.x / uRes.y;
          vec2 p = uv;
          p.x *= aspect;

          // ripple distortion (radial waves from center + mouse)
          vec2 c = vec2(0.5 * aspect, 0.5);
          float d = distance(p, c);
          vec2 m = uMouse; m.x *= aspect;
          float dm = distance(p, m);
          float wave = sin(d * 18.0 - uTime * 1.6) * uRipple;
          wave += sin(dm * 22.0 - uTime * 2.0) * uRipple * 0.8;
          p += normalize(p - c + 0.0001) * wave;

          // grid lines
          vec2 g = fract(p * uGridSize);
          vec2 df = abs(g - 0.5);
          float line = smoothstep(0.5, 0.5 - uThickness * 0.01, max(df.x, df.y));
          float grid = 1.0 - line;

          // glow near intersections
          float glow = uGlow / (d + 0.15);

          float intensity = grid * uOpacity + glow;

          // radial fade + vignette
          float fade = 1.0 - smoothstep(0.0, uFade, d);
          float vig = 1.0 - smoothstep(0.4, 0.4 + uVignette * 0.5, d);
          intensity *= fade * vig;

          gl_FragColor = vec4(uColor * intensity, intensity);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uColor: { value: rgb },
        uGridSize: { value: gridSize },
        uThickness: { value: gridThickness },
        uRipple: { value: rippleIntensity },
        uOpacity: { value: opacity },
        uFade: { value: fadeDistance },
        uVignette: { value: vignetteStrength },
        uGlow: { value: glowIntensity },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      const w = el.clientWidth || window.innerWidth
      const h = el.clientHeight || 400
      renderer!.setSize(w, h)
      program.uniforms.uRes.value = [w, h]
    }
    resize()
    window.addEventListener('resize', resize)

    const target = { x: 0.5, y: 0.5 }
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    el.addEventListener('mousemove', onMove)

    let raf = 0
    let t0 = 0
    const loop = (t: number) => {
      if (!t0) t0 = t
      const mu = program.uniforms.uMouse.value as number[]
      mu[0] += (target.x - mu[0]) * 0.06
      mu[1] += (target.y - mu[1]) * 0.06
      program.uniforms.uTime.value = (t - t0) / 1000
      renderer!.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      el.removeEventListener('mousemove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      if (gl.canvas.parentElement === el) el.removeChild(gl.canvas)
    }
  }, [gridColor, rippleIntensity, gridSize, gridThickness, opacity, fadeDistance, vignetteStrength, glowIntensity])

  return <div ref={ref} className="hero-bg" aria-hidden="true" />
}
