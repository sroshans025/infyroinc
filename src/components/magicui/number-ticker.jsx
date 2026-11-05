import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

// Magic UI number ticker: springs from 0 to `value` once scrolled into view.
export function NumberTicker({ value, decimals = 0, className }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: '0px' })
  const fmt = (n) => Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(Number(n.toFixed(decimals)))

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = fmt(v)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring, decimals]
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      {fmt(0)}
    </span>
  )
}
