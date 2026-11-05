import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../data.js'
import Icon from './Icon.jsx'
import { Button, Container, Logo } from './ui.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const link = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-[13px] font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`

  return (
    <header className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/contact" className="hidden sm:inline-flex">
            Get a Quote
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-white/10 bg-ink xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((n, i) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                style={{ animationDelay: `${i * 40}ms` }}
                className={({ isActive }) =>
                  `animate-pop rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-2">
              Get a Quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
