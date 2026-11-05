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

// Typewriter that cycles through `words`. `words` must be a stable array.
export function useTyped(words, { type = 70, hold = 1500, erase = 35 } = {}) {
  const [text, setText] = useState(words[0])
  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    let j = 0
    let del = false
    let t
    setText('')
    const tick = () => {
      const w = words[i]
      if (!del) {
        j += 1
        setText(w.slice(0, j))
        if (j === w.length) {
          del = true
          t = setTimeout(tick, hold)
          return
        }
        t = setTimeout(tick, type)
      } else {
        j -= 1
        setText(w.slice(0, j))
        if (j === 0) {
          del = false
          i = (i + 1) % words.length
        }
        t = setTimeout(tick, erase)
      }
    }
    t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [words, type, hold, erase])
  return text
}

// True once the element has scrolled into view (stays true).
export function useInView(options = { threshold: 0.3 }) {
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
      if (e.isIntersecting) {
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
