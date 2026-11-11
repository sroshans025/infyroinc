import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/** Locks body scroll while `locked` is true (mobile menu, lightbox). */
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Calls `onEscape` when Escape is pressed while `active`. */
export function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && onEscape()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onEscape])
}

/** True while the viewport top is still over a full-height hero (first ~100svh minus the nav). */
export function useOverHero(enabled) {
  const [over, setOver] = useState(enabled)
  useEffect(() => {
    if (!enabled) {
      setOver(false)
      return
    }
    const onScroll = () => setOver(window.scrollY < window.innerHeight - 56)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])
  return over
}

/** True once the page has scrolled past `fraction` × viewport height. */
export function useScrollPast(fraction = 0.5) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * fraction)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [fraction])
  return past
}

/** Reads/writes a sessionStorage flag safely (private mode / blocked storage → treated as unset). */
export function sessionFlag(key, set = false) {
  try {
    if (set) window.sessionStorage.setItem(key, '1')
    return window.sessionStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

/** Pointer is coarse (touch) — no hover. */
export const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
