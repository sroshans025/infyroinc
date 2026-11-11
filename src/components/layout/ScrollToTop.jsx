import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * - Path change without a hash → jump to top.
 * - Any navigation with a hash → smooth-scroll to that element (retrying briefly so lazy routes can render).
 * Search-param-only changes (e.g. ?type= on the contact page) leave the scroll position alone.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    if (!hash) return
    let tries = 0
    let timer
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      } else if (tries++ < 20) {
        timer = setTimeout(go, 50)
      }
    }
    go()
    return () => clearTimeout(timer)
  }, [hash, key])

  return null
}
