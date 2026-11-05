import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../data.js'
import { SECTIONS } from '../data/home.js'
import Icon from './Icon.jsx'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button, Container, Logo } from './ui.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Highlights the section currently in view on the home page
  const [section, setSection] = useState('')
  useEffect(() => {
    if (pathname !== '/') return setSection('')
    const els = SECTIONS.map((x) => document.getElementById(x.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  const link = ({ isActive }) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`

  return (
    <header
      className={`fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-expo ${
        scrolled ? 'border-white/10 bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {SECTIONS.filter((x) => x.id !== 'contact').map((x) => (
            <Link key={x.id} to={`/#${x.id}`} aria-current={section === x.id ? 'true' : undefined} className={link({ isActive: section === x.id })}>
              {x.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/#contact" className="hidden sm:inline-flex">
            Start a project
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden"
              aria-label="Open menu"
            >
              <Icon name="menu" className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex items-center justify-between">
                <SheetTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Menu</SheetTitle>
                <SheetClose className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400" aria-label="Close menu">
                  <Icon name="close" className="h-5 w-5" />
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
                {SECTIONS.map((x) => (
                  <Link key={x.id} to={`/#${x.id}`} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center rounded-lg px-3 text-lg font-medium text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                    {x.label}
                  </Link>
                ))}
                <p className="mt-6 px-3 text-xs uppercase tracking-[0.18em] text-slate-500">More</p>
                {NAV.filter((n) => !n.primary && !n.end).concat(NAV.filter((n) => n.to === '/careers')).map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `flex min-h-[44px] items-center rounded-lg px-3 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </nav>
              <Button to="/#contact" size="lg" className="mt-4" onClick={() => setOpen(false)}>
                Start a project
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
