import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import BrandLogo from '../brand/BrandLogo'
import { BRANDS, COMPANY_KEYS } from '../../data/navigation'

/** "Companies" dropdown — the same panel on every page: three simple cards (Tech → Studios → Construction). */
export default function CompaniesSwitcher({ id, current, onNavigate, panelRef, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="region"
      aria-label="Our companies"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_12px_32px_-12px_rgba(10,20,40,0.18)]"
    >
      <div className="container-content py-6">
        <ul className="grid grid-cols-3 gap-4">
          {COMPANY_KEYS.map((k) => {
            const b = BRANDS[k]
            return (
              <li key={k}>
                <SmartLink
                  href={b.path}
                  onClick={onNavigate}
                  className="flex h-full flex-col rounded-card border border-line bg-white p-5 transition-colors hover:border-line-strong hover:bg-paper-2"
                >
                  <span className="flex items-start justify-between gap-3">
                    <BrandLogo brand={k} size="nav" />
                    {current === k && <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-brand-ink">You're here</span>}
                  </span>
                  <span className="mt-3 block text-[14px] text-muted">{b.tagline}</span>
                  <span className="mt-auto inline-flex items-center gap-0.5 pt-4 text-[14px] font-semibold text-brand-ink">
                    Explore
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 flex justify-center">
          <SmartLink href="/" onClick={onNavigate} className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[13px] font-medium text-ink-2 hover:text-brand-ink">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back to The Infyro Group
          </SmartLink>
        </div>
      </div>
    </motion.div>
  )
}
