import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from './hooks.js'

// Counts up to values like "100+", "99%" or "<24h" once scrolled into view.
export default function Counter({ value, duration = 1600 }) {
  const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const [ref, seen] = useInView({ threshold: 0.4 })
  const target = m ? parseFloat(m[2]) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen || !m) return
    if (prefersReducedMotion()) {
      setN(target)
      return
    }
    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setN(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, target, duration])

  if (!m) return <span ref={ref}>{value}</span>
  const shown = Number.isInteger(target) ? Math.round(n) : n.toFixed(1)
  return (
    <span ref={ref}>
      {m[1]}
      {shown}
      {m[3]}
    </span>
  )
}
