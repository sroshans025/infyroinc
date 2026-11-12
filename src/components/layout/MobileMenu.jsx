import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useDragControls } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import Button from '../ui/Button'
import BrandLogo from '../brand/BrandLogo'
import { BRANDS, COMPANY_KEYS, flatLinks } from '../../data/navigation'
import { useLockBody, useEscape } from '../../lib/hooks'

/**
 * Mobile menu: full-screen white sheet — logo, links, the three companies, CTA pinned at the bottom.
 * Close with X, Esc or swipe down. Body scroll locked, focus trapped.
 */
export default function MobileMenu({ id, brand, cta, onClose }) {
  const ref = useRef(null)
  useLockBody(true)
  useEscape(true, onClose)
  const links = flatLinks(brand.key)
  const drag = useDragControls()

  useEffect(() => {
    const root = ref.current
    root?.querySelector('button')?.focus()
    const onKey = (e) => {
      if (e.key !== 'Tab' || !root) return
      const f = root.querySelectorAll('a[href], button:not([disabled])')
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    root?.addEventListener('keydown', onKey)
    return () => root?.removeEventListener('keydown', onKey)
  }, [])

  return createPortal(
    <div className={brand.theme}>
      <motion.div
        ref={ref}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        dragListener={false}
        dragControls={drag}
        onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
        className="fixed inset-0 z-[60] flex flex-col bg-white"
      >
        {/* Swipe down from the top bar to close */}
        <div className="container-content relative flex h-16 shrink-0 touch-none items-center justify-between border-b border-line" onPointerDown={(e) => drag.start(e)}>
          <SmartLink href={brand.path} onClick={onClose} aria-label={`${brand.name} home`}>
            {brand.key === 'inc' ? <BrandLogo brand="inc" groupName /> : <BrandLogo brand={brand.key} />}
          </SmartLink>
          <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-blue-50">
            <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto pb-28 pt-6">
          <ul className="container-content space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href} onClick={onClose} className="flex min-h-[48px] items-center border-b border-line text-[18px] font-semibold text-ink">
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="container-content mt-8">
            <p className="t-eyebrow text-muted">Companies</p>
            <ul className="mt-3 border-t-2 border-[#0A78F2]">
              <li>
                <SmartLink href="/#companies" onClick={onClose} className="flex min-h-[48px] items-center justify-between border-b border-line text-[16px] font-medium text-ink">
                  Overview
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-muted" />
                </SmartLink>
              </li>
              {COMPANY_KEYS.map((k) => {
                const b = BRANDS[k]
                const here = brand.key === k
                return (
                  <li key={k}>
                    <SmartLink
                      href={b.path}
                      onClick={onClose}
                      aria-current={here ? 'page' : undefined}
                      className={`flex min-h-[48px] items-center justify-between border-b border-line text-[16px] ${here ? 'font-semibold text-brand-ink' : 'font-medium text-ink'}`}
                    >
                      {b.name}
                      <ChevronRight aria-hidden="true" className="h-4 w-4 text-muted" />
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-white py-4">
          <div className="container-content">
            <Button href={cta.href} onClick={onClose} className="w-full">
              {cta.label}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  )
}
