import { useEffect, useRef } from 'react'
import { canHover } from './brandContext'

const BASE = { blueprint: 'grid-blueprint', dots: 'grid-dots', thirds: 'grid-blueprint', dark: 'grid-dark' }
const BRIGHT = { blueprint: 'grid-blueprint-strong', dots: 'grid-dots-strong', thirds: 'grid-blueprint-strong', dark: 'grid-dark-strong' }

/**
 * Technical grid background + cursor spotlight (FINAL §4.1 #1–2).
 * The grid brightens in a `radius` circle around the cursor (CSS mask driven by --x/--y,
 * rAF-throttled, fine pointers only). Listens on its parent so content stays interactive.
 * variant: 'blueprint' (Construction / Inc.) | 'dots' (Tech) | 'thirds' (Studios, rule-of-thirds overlay) | 'dark'
 */
export default function GridSpotlight({ variant = 'blueprint', radius = 280, fade = true, spotlight = true, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host || !spotlight || !canHover()) return undefined
    let raf = 0
    let ev = null
    const apply = () => {
      raf = 0
      if (!ev) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--x', `${ev.clientX - r.left}px`)
      el.style.setProperty('--y', `${ev.clientY - r.top}px`)
    }
    const onMove = (e) => {
      ev = e
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      el.style.setProperty('--x', '-9999px')
      el.style.setProperty('--y', '-9999px')
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [spotlight])

  const lens = `radial-gradient(${radius}px circle at var(--x, -9999px) var(--y, -9999px), #000 0%, transparent 70%)`
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} style={{ '--x': '-9999px', '--y': '-9999px' }}>
      <div className={`absolute inset-0 ${BASE[variant]} ${fade ? 'grid-fade' : ''}`} />
      {variant === 'thirds' && (
        <div className={`absolute inset-0 ${fade ? 'grid-fade' : ''}`}>
          {['33.333%', '66.666%'].map((p) => (
            <span key={`v${p}`} className="absolute inset-y-0 w-px bg-[var(--motif)] opacity-25" style={{ left: p }} />
          ))}
          {['33.333%', '66.666%'].map((p) => (
            <span key={`h${p}`} className="absolute inset-x-0 h-px bg-[var(--motif)] opacity-25" style={{ top: p }} />
          ))}
        </div>
      )}
      {spotlight && <div className={`absolute inset-0 ${BRIGHT[variant]}`} style={{ maskImage: lens, WebkitMaskImage: lens }} />}
    </div>
  )
}
