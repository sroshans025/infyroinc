import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import InfyroMark from '../brand/InfyroMark'
import BrandLogo from '../brand/BrandLogo'
import { Ticks } from '../precision/Primitives'
import { CircuitTraces, Elevation } from '../precision/Motifs'
import { BRANDS, COMPANY_KEYS } from '../../data/navigation'

/** Small motif per company, drawn in when the card is hovered (§3.3). */
export function CompanyMotif({ k, show }) {
  if (!show) return null
  if (k === 'tech') return <CircuitTraces inView={false} className="absolute inset-0 h-full w-full opacity-70" />
  if (k === 'construction') return <Elevation inView={false} className="absolute inset-0 h-full w-full opacity-70" />
  return (
    <span aria-hidden="true" className="absolute inset-5">
      {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c, i) => (
        <motion.span
          key={c}
          className={`absolute h-6 w-6 border-[rgba(10,120,242,0.6)] ${c}`}
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
        />
      ))}
    </span>
  )
}

/**
 * "Companies ⌄" switcher (FINAL §3.3) — the same panel on every page: three equal cards
 * (Tech → Studios → Construction). Hover lights the card's facet, draws its motif, tilts it ±6°
 * and dims the other two. The current company shows "You're here".
 */
export default function CompaniesSwitcher({ id, current, onNavigate, panelRef, onMouseEnter, onMouseLeave }) {
  const [hover, setHover] = useState(null)
  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="region"
      aria-label="Our companies"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-white shadow-float"
    >
      <div className="grid-blueprint grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-content relative py-8">
        <ul className="grid grid-cols-3 gap-5">
          {COMPANY_KEYS.map((k) => {
            const b = BRANDS[k]
            const on = hover === k
            const dimmed = hover && !on
            return (
              <li key={k} className={`transition-opacity duration-300 ${dimmed ? 'opacity-70' : 'opacity-100'}`}>
                <motion.div animate={{ rotateX: on ? 3 : 0, rotateY: on ? -6 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} style={{ transformPerspective: 900 }}>
                  <SmartLink
                    href={b.path}
                    onClick={onNavigate}
                    onPointerEnter={() => setHover(k)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(k)}
                    onBlur={() => setHover(null)}
                    className={`group relative flex h-full min-h-[208px] flex-col overflow-hidden rounded-card border bg-white p-6 ${on ? 'tick-on border-line-strong' : 'border-line'}`}
                  >
                    <Ticks />
                    <CompanyMotif k={k} show={on} />
                    <span className="relative flex items-start justify-between">
                      <InfyroMark size={40} active={k} lift={on ? k : null} />
                      {current === k && <span className="t-mono rounded-full bg-blue-50 px-2.5 py-1 text-[10px] text-[#0063D1]">You're here</span>}
                    </span>
                    <span className="relative mt-5 block">
                      <BrandLogo brand={k} size="md" noMark />
                    </span>
                    <span className="relative mt-2 block text-[13px] text-muted">{b.tagline}</span>
                    <span className="relative mt-auto inline-flex items-center gap-0.5 pt-5 text-[14px] font-semibold text-[#0063D1]">
                      Explore
                      <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
                    </span>
                  </SmartLink>
                </motion.div>
              </li>
            )
          })}
        </ul>
        <div className="mt-5 flex justify-center">
          <SmartLink href="/" onClick={onNavigate} className="t-mono inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[11px] text-ink-2 hover:text-[#0063D1]">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Infyro Inc. (parent) · Back to group
          </SmartLink>
        </div>
      </div>
    </motion.div>
  )
}
