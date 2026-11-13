import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import Button from '../ui/Button'
import BrandLogo from '../brand/BrandLogo'
import MobileMenu from './MobileMenu'
import { NAV_LINKS, NAV_CTA, BRANDS, COMPANY_KEYS } from '../../data/navigation'
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
      // The hero is observed too, so scrolling back to the top clears the active link.
      const els = [...ids, 'home', 'hero'].map((id) => document.getElementById(id)).filter(Boolean)
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

/** "Companies ⌄" — a plain dropdown list, the same on every page. */
const COMPANIES_MENU = {
  label: 'Companies',
  children: [
    { label: 'Overview', href: '/#companies', id: 'companies', home: true },
    ...COMPANY_KEYS.map((k) => ({ label: BRANDS[k].name, href: BRANDS[k].path, route: BRANDS[k].path })),
  ],
}

const linkBase = 'relative inline-flex h-11 items-center gap-1 text-[15px] font-medium transition-colors'
const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-')

/**
 * One navbar for every page: logo (left) · links with simple dropdowns (centre) · CTA (right).
 * Solid white, fixed, hairline border.
 */
export default function Navbar({ brand }) {
  const { pathname, hash } = useLocation()
  const links = [...NAV_LINKS[brand.key], COMPANIES_MENU]
  const cta = NAV_CTA[brand.key]
  const onBrandHome = pathname === brand.path
  const sectionIds = NAV_LINKS[brand.key].flatMap((l) => (l.children ? l.children.filter((c) => c.id).map((c) => c.id) : l.id ? [l.id] : []))
  const activeId = useActiveSection(sectionIds, onBrandHome)

  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(null) // slug of the open dropdown, or null
  const [mobile, setMobile] = useState(false)
  const timer = useRef()
  const headerRef = useRef(null)
  const buttons = useRef({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(null)
    setMobile(false)
  }, [pathname, hash])

  const close = useCallback(() => {
    setMenu((m) => {
      if (m) buttons.current[m]?.focus()
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

  const intentOpen = (m) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMenu(m), 100)
  }
  const intentClose = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMenu(null), 160)
  }
  const toggle = (m) => (e) => {
    clearTimeout(timer.current)
    setMenu((cur) => (cur === m ? null : m))
    // Keyboard activation: move focus into the list
    if (e.detail === 0) setTimeout(() => document.querySelector(`#${m}-menu a[href]`)?.focus(), 60)
  }

  const childActive = (c) => (c.route ? pathname.startsWith(c.route) : c.home ? false : c.id === activeId && onBrandHome)
  const isActive = (l) => (l.children ? l.children.some(childActive) : onBrandHome && l.id === activeId)

  const Underline = () => <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-[2px] rounded-full bg-[#0A78F2]" />

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-white/75 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200 ${scrolled || menu ? 'shadow-[0_1px_12px_rgba(10,20,40,0.06)]' : ''}`}
    >
      <div className="container-content flex h-16 items-center justify-between gap-6 lg:grid lg:h-[72px] lg:grid-cols-[1fr_auto_1fr]">
        <SmartLink href={brand.path} aria-label={`${brand.name} home`} className="shrink-0 justify-self-start rounded-md">
          {brand.key === 'inc' ? <BrandLogo brand="inc" /> : <BrandLogo brand={brand.key} />}
        </SmartLink>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center justify-center gap-7 xl:gap-8">
            {links.map((l) => {
              if (!l.children) {
                return (
                  <li key={l.label}>
                    <SmartLink href={l.href} aria-current={isActive(l) ? 'true' : undefined} className={`${linkBase} ${isActive(l) ? 'text-brand-ink' : 'text-ink hover:text-brand-ink'}`}>
                      {l.label}
                      {isActive(l) && <Underline />}
                    </SmartLink>
                  </li>
                )
              }
              const m = slug(l.label)
              const open = menu === m
              return (
                <li key={l.label} className="relative" onMouseEnter={() => intentOpen(m)} onMouseLeave={intentClose}>
                  <button
                    ref={(el) => (buttons.current[m] = el)}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${m}-menu`}
                    onClick={toggle(m)}
                    className={`${linkBase} ${open || isActive(l) ? 'text-brand-ink' : 'text-ink hover:text-brand-ink'}`}
                  >
                    {l.label}
                    <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                    {isActive(l) && <Underline />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.ul
                        id={`${m}-menu`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-[calc(100%+14px)] before:absolute before:inset-x-0 before:-top-[16px] before:h-[14px] before:content-[''] min-w-[250px] border-t-2 border-[#0A78F2] bg-white py-2 shadow-[0_12px_32px_-8px_rgba(10,20,40,0.22)]"
                      >
                        {l.children.map((c) => {
                          const on = childActive(c)
                          return (
                            <li key={c.label}>
                              <SmartLink
                                href={c.href}
                                aria-current={on ? 'page' : undefined}
                                onClick={() => setMenu(null)}
                                className={`flex min-h-[44px] items-center px-5 text-[15px] transition-colors hover:bg-paper-2 hover:text-brand-ink ${on ? 'font-medium text-brand-ink' : 'text-ink'}`}
                              >
                                {c.label}
                              </SmartLink>
                            </li>
                          )
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
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

      <AnimatePresence>{mobile && <MobileMenu id="mobile-menu" brand={brand} cta={cta} onClose={() => setMobile(false)} />}</AnimatePresence>
    </header>
  )
}
