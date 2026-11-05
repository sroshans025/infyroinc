import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Sets the document title and meta description for the current page.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | INFYRO` : 'INFYRO - Innovating Ideas Into Digital Reality'
    if (description) {
      const m = document.querySelector('meta[name="description"]')
      if (m) m.setAttribute('content', description)
    }
  }, [title, description])
}

// True once the element has scrolled into view. With `once: false` it tracks live visibility instead.
export function useInView(options = { threshold: 0.3 }, once = true) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const obs = new IntersectionObserver(([e]) => {
      if (!once) setSeen(e.isIntersecting)
      else if (e.isIntersecting) {
        setSeen(true)
        obs.disconnect()
      }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, seen]
}

// Lock page scroll while a modal is open.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

// Reactive `prefers-reduced-motion` flag.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

// Eases the mouse position toward the pointer and writes it to CSS variables on `ref`'s element,
// so children can react (tilt, parallax, spotlight) with no React re-renders:
//   --px / --py  position relative to the element's centre, -1..1 (clamped)
//   --mx / --my  position in px from the element's top-left
// Only runs while the element is on screen and the tab is visible. Ignores touch input.
export function useMouse(ref, { ease = 0.12, range = 1 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const target = { x: 0, y: 0, mx: null, my: null }
    const cur = { x: 0, y: 0, mx: null, my: null }
    let raf = 0
    let onScreen = true

    const frame = () => {
      raf = 0
      cur.x += (target.x - cur.x) * ease
      cur.y += (target.y - cur.y) * ease
      if (target.mx !== null) {
        cur.mx = cur.mx === null ? target.mx : cur.mx + (target.mx - cur.mx) * ease
        cur.my = cur.my === null ? target.my : cur.my + (target.my - cur.my) * ease
        el.style.setProperty('--mx', `${cur.mx.toFixed(1)}px`)
        el.style.setProperty('--my', `${cur.my.toFixed(1)}px`)
      }
      el.style.setProperty('--px', cur.x.toFixed(4))
      el.style.setProperty('--py', cur.y.toFixed(4))
      const settled = Math.abs(target.x - cur.x) < 0.001 && Math.abs(target.y - cur.y) < 0.001
      const moving = target.mx !== null && (Math.abs(target.mx - cur.mx) > 0.2 || Math.abs(target.my - cur.my) > 0.2)
      if (!settled || moving) kick()
    }
    const kick = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      const clamp = (v) => Math.max(-1, Math.min(1, v))
      target.x = clamp((e.clientX - (r.left + r.width / 2)) / ((r.width / 2) * range))
      target.y = clamp((e.clientY - (r.top + r.height / 2)) / ((r.height / 2) * range))
      target.mx = e.clientX - r.left
      target.my = e.clientY - r.top
      kick()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      kick()
    }

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) kick()
    })
    io.observe(el)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', kick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', kick)
    }
  }, [ref, ease, range])
}
