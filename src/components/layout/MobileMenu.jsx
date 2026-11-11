import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useDragControls } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import Button from '../ui/Button'
import BrandLogo from '../brand/BrandLogo'
import InfyroMark from '../brand/InfyroMark'
import { Ticks } from '../precision/Primitives'
import { BRANDS, COMPANY_KEYS, flatLinks } from '../../data/navigation'
import { useLockBody, useEscape } from '../../lib/hooks'

const item = {
  hidden: { opacity: 0, y: 16 },
  shown: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.05, type: 'spring', stiffness: 220, damping: 20 } }),
}

/**
 * Mobile sheet (FINAL §3.4): full-screen white with the blueprint grid, logo, 28px links with a
 * staggered rise, the three company cards in a snap row, CTA pinned at the bottom.
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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        dragListener={false}
        dragControls={drag}
        onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
        className="fixed inset-0 z-[60] flex flex-col bg-white"
      >
        <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* Swipe down from the top bar to close */}
        <div className="container-content relative flex h-14 shrink-0 touch-none items-center justify-between" onPointerDown={(e) => drag.start(e)}>
          <SmartLink href={brand.path} onClick={onClose} aria-label={`${brand.name} home`}>
            <BrandLogo brand={brand.key} />
          </SmartLink>
          <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-blue-50">
            <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <span aria-hidden="true" className="mx-auto mt-1 h-1 w-10 touch-none rounded-full bg-line-strong" onPointerDown={(e) => drag.start(e)} />

        <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto pb-28 pt-6">
          <ul className="container-content space-y-1">
            {links.map((l, i) => (
              <motion.li key={l.label} custom={i} variants={item} initial="hidden" animate="shown">
                <SmartLink href={l.href} onClick={onClose} className="flex items-baseline gap-3 py-2 text-[28px] font-semibold tracking-[-0.02em] text-ink">
                  <span className="t-mono text-[11px] text-[#0063D1]">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </SmartLink>
              </motion.li>
            ))}
          </ul>

          <motion.div custom={links.length} variants={item} initial="hidden" animate="shown" className="mt-10">
            <p className="container-content t-mono text-[11px] text-muted">Our Companies</p>
            <ul className="no-scrollbar mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:scroll-px-6 sm:px-6">
              {COMPANY_KEYS.map((k) => {
                const b = BRANDS[k]
                return (
                  <li key={k} className="w-[72%] shrink-0 snap-start sm:w-[44%]">
                    <SmartLink href={b.path} onClick={onClose} className="group relative flex h-full flex-col rounded-card border border-line bg-white p-5">
                      <Ticks on={brand.key === k} />
                      <InfyroMark size={34} active={k} />
                      <span className="mt-4 text-[16px] font-semibold text-ink">{b.name}</span>
                      <span className="mt-1 text-[13px] text-muted">{b.tagline}</span>
                      <span className="mt-4 inline-flex items-center gap-0.5 text-[13px] font-semibold text-[#0063D1]">
                        {brand.key === k ? "You're here" : 'Explore'}
                        <ChevronRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-white/90 py-4 backdrop-blur">
          <div className="container-content">
            <Button href={cta.href} onClick={onClose} className="w-full" magnetic={false}>
              {cta.label}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  )
}
