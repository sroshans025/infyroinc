import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}

/**
 * Scroll-linked statement: each word brightens as the block scrolls through the viewport
 * (Apple "text reveal on scroll"). Real text stays in the DOM for screen readers and SEO.
 */
export default function WordReveal({ id, text, as: Tag = 'p', className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  if (reduce) return <Tag id={id} ref={ref} className={className}>{text}</Tag>

  return (
    <Tag id={id} ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = i / words.length
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                {w}
              </Word>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
