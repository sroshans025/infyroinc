import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/*
 * Shared layout primitives. The site uses a calm, corporate style: no cursor effects, no tilt,
 * no magnetic buttons, no decorative corner ticks. These exports keep their names so existing
 * pages keep working, but render plain elements.
 */

/** Decorative corner ticks — retired (renders nothing). */
export function Ticks() {
  return null
}

/** Plain text (the scramble effect is retired). */
export function Scramble({ text, as: Tag = 'span', className = '' }) {
  return <Tag className={className}>{text}</Tag>
}

/** Section eyebrow: a short uppercase label, no numbering. */
export function Stencil({ label, tone = 'dark', className = '', as: Tag = 'p', id }) {
  const color = tone === 'light' ? 'text-[#7DB8FF]' : 'text-brand-ink'
  return (
    <Tag id={id} className={`t-eyebrow ${color} ${className}`}>
      {label}
    </Tag>
  )
}

/** Dimension line — retired (renders nothing). */
export function DimensionLine() {
  return null
}

/* ─── Subtle reveal for groups of cards: short fade-up, once ─── */
const groupVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

export const BlockRise = forwardRef(function BlockRise({ as = 'div', className = '', children, stagger, ...rest }, ref) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag ref={ref} className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.1 }} variants={groupVariants} {...rest}>
      {children}
    </Tag>
  )
})

export function Block({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag className={className} variants={itemVariants} {...rest}>
      {children}
    </Tag>
  )
}

/** SVG path that draws in once (used only by the remaining line illustrations). */
export function DrawPath({ delay = 0, duration = 0.9, inView = true, ...props }) {
  const reduce = useReducedMotion()
  const anim = inView ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.3 } } : { animate: { pathLength: 1, opacity: 1 } }
  return <motion.path initial={reduce ? false : { pathLength: 0, opacity: 0 }} {...anim} transition={{ duration, delay, ease: 'easeInOut' }} {...props} />
}

/** Magnetic hover — retired: renders its child unchanged. */
export function Magnetic({ children, className = '' }) {
  return <span className={`inline-flex ${className}`}>{children}</span>
}

/** Tilt card — retired: a plain wrapper. */
export function TiltCard({ className = '', children, onHoverChange, deg, glare, ...rest }) {
  return (
    <div className={`relative ${className}`} onPointerEnter={() => onHoverChange?.(true)} onPointerLeave={() => onHoverChange?.(false)} {...rest}>
      {children}
    </div>
  )
}
