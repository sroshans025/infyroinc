import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function Strong({ children, progress, range }) {
  const color = useTransform(progress, range, ['#6E6E73', '#1D1D1F'])
  return <motion.strong style={{ color }} className="font-semibold">{children}</motion.strong>
}

/**
 * Paragraph where key phrases (segments with `strong: true`) shift from muted to ink as you scroll,
 * while the rest stays muted. Used for "Why Infyro?".
 */
export default function HighlightReveal({ segments, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] })
  const strongs = segments.filter((s) => s.strong).length
  let idx = 0

  return (
    <p ref={ref} className={className}>
      {segments.map((s, i) => {
        if (!s.strong) return <span key={i}>{s.text}</span>
        if (reduce) return <strong key={i} className="font-semibold text-ink">{s.text}</strong>
        const start = idx / strongs
        idx += 1
        return (
          <Strong key={i} progress={scrollYProgress} range={[start * 0.8, start * 0.8 + 0.35]}>
            {s.text}
          </Strong>
        )
      })}
    </p>
  )
}
