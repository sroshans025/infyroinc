import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DrawPath } from './Primitives'

/* Brand motif linework (FINAL §4.2). Blue lines, per-brand accent (var(--motif)) on nodes/markers only. */

/** Technologies — circuit traces routed along a 24px grid, drawing in, with pulsing cyan nodes. */
export function CircuitTraces({ className = '', inView = true, dense = false }) {
  const paths = [
    'M0 72 H96 V144 H216 V96 H312',
    'M0 216 H72 V264 H192 V312 H336',
    'M480 48 V120 H384 V192 H288',
    'M480 288 H408 V240 H336 V168',
    ...(dense ? ['M144 0 V48 H240 V0', 'M96 336 V288 H24'] : []),
  ]
  const nodes = [[96, 144], [216, 96], [312, 96], [192, 312], [336, 312], [384, 192], [288, 192], [336, 168], [72, 264]]
  return (
    <svg aria-hidden="true" viewBox="0 0 480 336" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`} fill="none">
      {paths.map((d, i) => (
        <DrawPath key={d} d={d} inView={inView} delay={0.15 * i} duration={1.2} stroke="rgba(10,120,242,0.45)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4.5" fill="white" stroke="rgba(10,120,242,0.55)" strokeWidth="1.25" />
          <circle cx={x} cy={y} r="2" fill="var(--motif, #22D3EE)" className="animate-pulsenode" style={{ animationDelay: `${i * 0.3}s`, opacity: 0.3 }} />
        </g>
      ))}
    </svg>
  )
}

/** Studios — viewfinder crop marks ⌜ ⌝ ⌞ ⌟ that close in (and optionally follow an offset). */
export function CropMarks({ inset = 16, size = 28, color = 'rgba(255,255,255,0.9)', close = true, offset = { x: 0, y: 0 }, className = '' }) {
  const reduce = useReducedMotion()
  const corners = [
    { s: { left: inset, top: inset, borderLeftWidth: 2, borderTopWidth: 2 }, from: { x: -26, y: -26 } },
    { s: { right: inset, top: inset, borderRightWidth: 2, borderTopWidth: 2 }, from: { x: 26, y: -26 } },
    { s: { left: inset, bottom: inset, borderLeftWidth: 2, borderBottomWidth: 2 }, from: { x: -26, y: 26 } },
    { s: { right: inset, bottom: inset, borderRightWidth: 2, borderBottomWidth: 2 }, from: { x: 26, y: 26 } },
  ]
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {corners.map((c, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ ...c.s, width: size, height: size, borderColor: color, borderStyle: 'solid' }}
          initial={close && !reduce ? { opacity: 0, ...c.from } : false}
          animate={{ opacity: 1, x: offset.x * (i % 2 ? 1 : -1) * 0.5, y: offset.y * (i < 2 ? -1 : 1) * 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      ))}
    </span>
  )
}

/** Studios — "● REC 00:00:12" mono timecode that counts up. */
export function RecTimecode({ className = '' }) {
  const [s, setS] = useState(12)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return undefined
    const id = setInterval(() => setS((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [reduce])
  const t = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((v) => String(v).padStart(2, '0')).join(':')
  return (
    <span aria-hidden="true" className={`t-mono inline-flex items-center gap-2 text-[11px] text-white ${className}`}>
      <span className="h-2 w-2 animate-blink rounded-full bg-[#F59E0B]" /> REC {t}
    </span>
  )
}

/** Studios — film-strip edge with perforations and frame numbers F01 F02 … */
export function FilmStrip({ frames = 8, className = '', tone = 'dark' }) {
  const hole = tone === 'light' ? 'bg-white/25' : 'bg-[rgba(10,120,242,0.18)]'
  const txt = tone === 'light' ? 'text-white/50' : 'text-[#0063D1]/70'
  return (
    <div aria-hidden="true" className={`flex min-w-0 items-center justify-between gap-2 overflow-hidden ${className}`}>
      {Array.from({ length: frames }, (_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-2">
          <span className={`h-2 w-3 rounded-[2px] ${hole}`} />
          <span className={`font-mono text-[9px] tracking-[0.1em] ${txt}`}>F{String(i + 1).padStart(2, '0')}</span>
        </span>
      ))}
    </div>
  )
}

/** Construction — building elevation linework with orange measure markers. */
export function Elevation({ className = '', inView = true, stroke = 'rgba(10,120,242,0.5)' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 480 336" preserveAspectRatio="xMidYMid meet" className={`pointer-events-none ${className}`} fill="none" strokeLinecap="round">
      <DrawPath inView={inView} d="M40 292 H440" stroke={stroke} strokeWidth="1.5" />
      <DrawPath inView={inView} delay={0.15} d="M80 292 V140 L170 84 L260 140 V292" stroke={stroke} strokeWidth="1.25" />
      <DrawPath inView={inView} delay={0.3} d="M260 292 V108 H400 V292" stroke={stroke} strokeWidth="1.25" />
      <DrawPath inView={inView} delay={0.45} d="M140 292 V218 H200 V292 M108 168 H140 V196 H108 Z M200 168 H232 V196 H200 Z" stroke={stroke} strokeWidth="1" />
      <DrawPath inView={inView} delay={0.6} d="M284 136 H316 V162 H284 Z M344 136 H376 V162 H344 Z M284 190 H316 V216 H284 Z M344 190 H376 V216 H344 Z M284 244 H316 V270 H284 Z M344 244 H376 V270 H344 Z" stroke={stroke} strokeWidth="1" />
      <DrawPath inView={inView} delay={0.9} d="M80 316 H260 M80 309 V323 M260 309 V323" stroke="var(--motif, #F97316)" strokeOpacity="0.8" strokeWidth="1.5" />
      <DrawPath inView={inView} delay={1} d="M424 108 V292 M417 108 H431 M417 292 H431" stroke="var(--motif, #F97316)" strokeOpacity="0.8" strokeWidth="1.5" />
    </svg>
  )
}

/** Section divider — retired: sections are separated by background colour instead. */
export function SectionDivider() {
  return null
}
