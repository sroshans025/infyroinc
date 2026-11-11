import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** Translates children up to `distance` px (max 40 per spec) as the section scrolls past. */
export default function Parallax({ distance = 40, className = 'relative', children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, Math.min(distance, 40)])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}
