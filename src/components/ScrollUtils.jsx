import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

// Scrolls to top on page change, shows a reading-progress bar and a back-to-top button.
export default function ScrollUtils() {
  const [pct, setPct] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
      setShowTop(window.scrollY > 700)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[65] h-[3px] bg-transparent">
        <div className="h-full bg-gradient-to-r from-brand-400 to-brand-200" style={{ width: `${pct}%` }} />
      </div>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        aria-label="Back to top"
        className={`fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-navy-800/90 text-white backdrop-blur transition duration-300 hover:border-brand-400 hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <Icon name="arrowUp" className="h-5 w-5" strokeWidth={2.2} />
      </a>
    </>
  )
}
