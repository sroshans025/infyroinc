import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import Button from '../ui/Button'
import BrandLogo from '../brand/BrandLogo'
import CompaniesSwitcher from './CompaniesSwitcher'
import MobileMenu from './MobileMenu'
import { NAV_LINKS, NAV_CTA } from '../../data/navigation'
import { useEscape } from '../../lib/hooks'

/** Tracks which section id is currently in the middle band of the viewport. */
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null)
  const key = ids.join('|')
  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return undefined
    }
    let io
    const t = setTimeout(() => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
        },
        { rootMargin: '-42% 0px -52% 0px' },
      )
      els.forEach((el) => io.observe(el))
    }, 300)
    return () => {
      clearTimeout(t)
      io?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])
  return active
}

const linkBase = 'relative inline-flex h-11 items-center gap-1 text-[14px] transition-colors'

/**
 * One navbar for every page (FINAL §3): logo · links · Companies ⌄ · CTA.
 * 64px desktop / 56px mobile, translucent + blur, hairline after 8px, scroll-progress line,
 * sliding active-section underline, hides on scroll down / shows on scroll up (after 200px).
 */
export default function Navbar({ brand }) {
  const { pathname, hash } = useLocation()
  const links = NAV_LINKS[brand.key]
  const cta = NAV_CTA[brand.key]
  const onBrandHome = pathname === brand.path
  const sectionIds = links.flatMap((l) => (l.children ? l.children.filter((c) => c.id).map((c) => c.id) : l.id ? [l.id] : []))
  const activeId = useActiveSection(sectionIds, onBrandHome)

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(null) // 'companies' | 'training' | null
  const [mobile, setMobile] = useState(false)
  const lastY = useRef(0)
  const timer = useRef()
  const headerRef = useRef(null)
  const panelRef = useRef(null)
  const companiesBtn = useRef(null)

  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 8)
    const down = y > lastY.current
    if (y > 200 && down && !menu && !mobile) setHidden(true)
    else if (!down || y <= 200) setHidden(false)
    lastY.current = y
  })

  useEffect(() => {
    setMenu(null)
    setMobile(false)
    setHidden(false)
  }, [pathname, hash])

  const close = useCallback(() => {
    setMenu((m) => {
      if (m === 'companies') companiesBtn.current?.focus()
      return null
    })
  }, [])
  useEscape(!!menu, close)

  // Close on click outside
  useEffect(() => {
    if (!menu) return undefined
    const onDown = (e) => !headerRef.current?.contains(e.target) && setMenu(null)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [menu])

  // Focus trap inside the open Companies panel (+ its trigger)
  useEffect(() => {
    if (menu !== 'companies') return undefined
    const onKey = (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return
      const f = [companiesBtn.current, ...panelRef.current.querySelectorAll('a[href]')]
      const i = f.indexOf(document.activeElement)
      if (i === -1) return
      e.preventDefault()
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])

  const intentOpen = (m) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMenu(m), 120)
  }
  const intentClose = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMenu(null), 180)
  }
  const toggle = (m) => (e) => {
    clearTimeout(timer.current)
    setMenu((cur) => (cur === m ? null : m))
    if (m === 'companies' && e.detail === 0) setTimeout(() => panelRef.current?.querySelector('a[href]')?.focus(), 60)
  }

  const isActive = (l) => {
    if (l.children) return l.children.some((c) => (c.route ? pathname === c.route : c.id === activeId && onBrandHome))
    return onBrandHome && l.id === activeId
  }

  const Underline = () => <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#0A78F2]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />

  return (
    <motion.header
      ref={headerRef}
      animate={{ y: hidden && !mobile ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/[0.72] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${scrolled || menu ? 'border-line' : 'border-transparent'}`}
    >
      <div className="container-content flex h-14 items-center justify-between gap-6 lg:h-16">
        <SmartLink href={brand.path} aria-label={`${brand.name} home`} className="shrink-0 rounded-md">
          <span className="hidden sm:inline-flex">
            <BrandLogo brand={brand.key} interactive />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandLogo brand={brand.key} compact interactive />
          </span>
        </SmartLink>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <LayoutGroup id="nav">
            <ul className="flex items-center gap-7">
              {links.map((l) =>
                l.children ? (
                  <li key={l.label} className="relative" onMouseEnter={() => intentOpen('training')} onMouseLeave={intentClose}>
                    <button
                      type="button"
                      aria-expanded={menu === 'training'}
                      aria-controls="training-menu"
                      onClick={toggle('training')}
                      className={`${linkBase} ${isActive(l) ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
                    >
                      {l.label}
                      <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${menu === 'training' ? 'rotate-180' : ''}`} />
                      {isActive(l) && <Underline />}
                    </button>
                    <AnimatePresence>
                      {menu === 'training' && (
                        <motion.ul
                          id="training-menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full w-60 -translate-x-1/2 rounded-card border border-line bg-white p-2 shadow-float"
                        >
                          {l.children.map((c, i) => {
                            const on = c.route ? pathname === c.route : onBrandHome && activeId === c.id
                            return (
                              <li key={c.label}>
                                <SmartLink
                                  href={c.href}
                                  aria-current={on ? 'true' : undefined}
                                  onClick={() => setMenu(null)}
                                  className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-[14px] transition-colors hover:bg-blue-50 ${on ? 'text-[#0063D1]' : 'text-ink'}`}
                                >
                                  <span className="t-mono text-[10px] text-subtle">{String(i + 1).padStart(2, '0')}</span>
                                  {c.label}
                                </SmartLink>
                              </li>
                            )
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={l.label}>
                    <SmartLink href={l.href} aria-current={isActive(l) ? 'true' : undefined} className={`${linkBase} ${isActive(l) ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}>
                      {l.label}
                      {isActive(l) && <Underline />}
                    </SmartLink>
                  </li>
                ),
              )}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block" onMouseEnter={() => intentOpen('companies')} onMouseLeave={intentClose}>
            <button
              ref={companiesBtn}
              type="button"
              aria-expanded={menu === 'companies'}
              aria-controls="companies-menu"
              onClick={toggle('companies')}
              className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-[14px] text-ink-2 ring-1 ring-inset ring-line transition-colors hover:text-ink hover:ring-line-strong"
            >
              Companies
              <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${menu === 'companies' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <Button href={cta.href} size="sm" className="hidden md:inline-flex">
            {cta.label}
          </Button>
          <button
            type="button"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-blue-50 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 1px scroll progress */}
      <motion.span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left bg-[#0A78F2]" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {menu === 'companies' && (
          <CompaniesSwitcher
            id="companies-menu"
            panelRef={panelRef}
            current={brand.key}
            onNavigate={() => setMenu(null)}
            onMouseEnter={() => intentOpen('companies')}
            onMouseLeave={intentClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{mobile && <MobileMenu id="mobile-menu" brand={brand} cta={cta} onClose={() => setMobile(false)} />}</AnimatePresence>
    </motion.header>
  )
}
