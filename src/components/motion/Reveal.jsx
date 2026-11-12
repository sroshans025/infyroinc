import { motion } from 'framer-motion'
import { EASE, DURATION, VIEWPORT } from './ease'

/**
 * Default reveal: opacity 0→1, y 24→0, 0.7s, once at 20% in view.
 * `scale` switches to the scale-in-media variant (0.96→1).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> (transforms off, opacity kept).
 */
export default function Reveal({ as = 'div', delay = 0, y = 12, scale = false, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  const hidden = scale ? { opacity: 0, scale: 0.96 } : { opacity: 0, y }
  const shown = scale ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }
  return (
    <Tag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
