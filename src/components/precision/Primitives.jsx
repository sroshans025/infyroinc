import { forwardRef } from 'react'
import { motion } from 'framer-motion'

/** Section eyebrow: a short uppercase label. */
export function Stencil({ label, tone = 'dark', className = '', as: Tag = 'p', id }) {
  const color = tone === 'light' ? 'text-[#7DB8FF]' : 'text-brand-ink'
  return (
    <Tag id={id} className={`t-eyebrow ${color} ${className}`}>
      {label}
    </Tag>
  )
}

/* ─── Subtle reveal for groups of cards: short fade-up, once ─── */
const groupVariants = { hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

export const BlockRise = forwardRef(function BlockRise({ as = 'div', className = '', children, ...rest }, ref) {
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
