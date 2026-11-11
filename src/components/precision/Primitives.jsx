import { Children, cloneElement, forwardRef, isValidElement, useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { canHover } from './brandContext'

const EASE = [0.22, 1, 0.36, 1]
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

/* ─── Tick-mark corners (§4.1 #3) — 10px ticks that extend to 16px + blue on group hover ─── */
export function Ticks({ on = false, className = '' }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${on ? 'tick-on' : ''} ${className}`}>
      <span className="tick tick-tl" />
      <span className="tick tick-tr" />
      <span className="tick tick-bl" />
      <span className="tick tick-br" />
    </span>
  )
}

/* ─── Text scramble (§10) — random glyphs for 400ms → final text, on view or when text changes ─── */
const GLYPHS = '01ABCDEF/<>'
export function Scramble({ text, as: Tag = 'span', className = '', duration = 400, trigger = 'view' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)
  const first = useRef(true)

  useEffect(() => {
    if (reduce) {
      setOut(text)
      return undefined
    }
    if (trigger === 'view' && !inView) return undefined
    if (trigger === 'change' && first.current) {
      first.current = false
      setOut(text)
      return undefined
    }
    let raf
    let t0
    const step = (t) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / duration)
      const settled = Math.floor(p * text.length)
      setOut(text.split('').map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [text, inView, reduce, duration, trigger])

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  )
}

/* ─── Stencil eyebrow "01 / ABOUT" (§4.1 #4) ─── */
export function Stencil({ n, label, tone = 'dark', className = '', as: Tag = 'p', id }) {
  const color = tone === 'light' ? 'text-white/70' : 'text-[#0063D1]'
  return (
    <Tag id={id} className={`t-mono ${color} ${className}`}>
      <Scramble text={`${String(n).padStart(2, '0')} / ${label.toUpperCase()}`} />
    </Tag>
  )
}

/* ─── Dimension line with end ticks + mono label (§4.1 #7) ─── */
export function DimensionLine({ label, tone = 'dark', vertical = false, className = '', delay = 0.2 }) {
  const reduce = useReducedMotion()
  const c = tone === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(10,120,242,0.45)'
  const txt = tone === 'light' ? 'text-white/70' : 'text-[#0063D1]'
  const init = reduce ? false : { scaleX: 0 }
  if (vertical) {
    return (
      <div aria-hidden="true" className={`relative flex flex-col items-center ${className}`}>
        <span className="h-px w-3" style={{ background: c }} />
        <motion.span
          className="w-px flex-1 origin-top"
          style={{ background: c }}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay }}
        />
        {label && <span className={`t-mono absolute top-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap bg-white py-2 text-[10px] [writing-mode:vertical-rl] ${txt}`}>{label}</span>}
        <span className="h-px w-3" style={{ background: c }} />
      </div>
    )
  }
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      <span className="h-3 w-px" style={{ background: c }} />
      <motion.span className="h-px flex-1 origin-left" style={{ background: c }} initial={init} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE, delay }} />
      {label && <span className={`t-mono shrink-0 text-[10px] ${txt}`}>{label}</span>}
      <motion.span className="h-px flex-1 origin-right" style={{ background: c }} initial={init} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE, delay }} />
      <span className="h-3 w-px" style={{ background: c }} />
    </div>
  )
}

/* ─── Block-rise reveals (§4.1 #6) — y 32 → 0 with a settle, staggered 0.07s (mobile: y 16) ─── */
export const BlockRise = forwardRef(function BlockRise({ as = 'div', className = '', stagger = 0.07, children, ...rest }, ref) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: isMobile() ? stagger / 2 : stagger } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
})
export function Block({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  const [y] = useState(() => (isMobile() ? 16 : 32))
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 18 } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ─── Line-draw path (§4.1 #5) — pathLength 0 → 1, 0.9s, once in view ─── */
export function DrawPath({ delay = 0, duration = 0.9, inView = true, ...props }) {
  const reduce = useReducedMotion()
  const anim = inView ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.3 } } : { animate: { pathLength: 1, opacity: 1 } }
  return <motion.path initial={reduce ? false : { pathLength: 0, opacity: 0 }} {...anim} transition={{ duration, delay, ease: 'easeInOut' }} {...props} />
}

/* ─── Magnetic (§10) — within 80px the element drifts ≤8px toward the cursor; label 4px ─── */
export function Magnetic({ children, strength = 8, radius = 80, className = '', withLabel = false }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  const lx = useTransform(sx, (v) => v * 0.5)
  const ly = useTransform(sy, (v) => v * 0.5)
  useEffect(() => {
    if (!canHover()) return undefined
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const reach = Math.max(r.width, r.height) / 2 + radius
        const d = Math.hypot(dx, dy)
        if (d < reach) {
          const k = (1 - d / reach) * strength
          x.set((dx / (d || 1)) * k)
          y.set((dy / (d || 1)) * k)
        } else if (x.get() || y.get()) {
          x.set(0)
          y.set(0)
        }
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [radius, strength, x, y])
  const child = Children.only(children)
  return (
    <motion.span ref={ref} className={`inline-flex ${className}`} style={{ x: sx, y: sy }}>
      {withLabel && isValidElement(child) ? cloneElement(child, { labelStyle: { x: lx, y: ly } }) : child}
    </motion.span>
  )
}

/* ─── Tilt card (§10) — ±deg, perspective 900, glare overlay 15% ─── */
export function TiltCard({ deg = 8, className = '', children, glare = true, onHoverChange, ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [deg, -deg]), { stiffness: 160, damping: 16 })
  const ry = useSpring(useTransform(mx, [0, 1], [-deg, deg]), { stiffness: 160, damping: 16 })
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const glareBg = useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a} ${b}, rgba(255,255,255,0.15), transparent 60%)`)
  const [hover, setHover] = useState(false)
  const enabled = useRef(false)
  useEffect(() => {
    enabled.current = canHover()
  }, [])
  const onMove = (e) => {
    if (!enabled.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onEnter = () => {
    setHover(true)
    onHoverChange?.(true)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
    setHover(false)
    onHoverChange?.(false)
  }
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && <motion.span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} style={{ background: glareBg }} />}
    </motion.div>
  )
}
