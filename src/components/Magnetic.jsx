import { useRef } from 'react'
import { prefersReducedMotion } from './hooks.js'

// Wrapper that nudges its child toward the cursor.
export default function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null)
  const move = (e) => {
    if (prefersReducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    ref.current.style.transform = ''
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`inline-block transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  )
}
