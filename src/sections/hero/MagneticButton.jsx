import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../../components/hooks.js'

const MAX = 12 // px the button may drift toward the cursor

// Primary CTA: drifts up to 12px toward the cursor and shows a soft glow under it.
export default function MagneticButton({ to, as, children, className = '', ...rest }) {
  const ref = useRef(null)

  const move = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const clamp = (v) => Math.max(-MAX, Math.min(MAX, v))
    el.style.transform = `translate(${clamp(dx * 0.25)}px, ${clamp(dy * 0.35)}px)`
    el.style.setProperty('--gx', `${e.clientX - r.left}px`)
    el.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  const Tag = as === 'button' ? 'button' : Link
  const leave = () => {
    ref.current.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      {...(to ? { to } : {})}
      {...rest}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-cta transition duration-200 ease-expo hover:bg-brand-800 disabled:opacity-60 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(120px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28), transparent 70%)' }}
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}
