import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Scramble } from '../precision/Primitives'

/** "INFYRO · TECHNOLOGIES  ◀ ▶" — letter-scrambles to the next company with its tagline (FINAL §6.4). */
export default function BrandTicker({ brand, onPrev, onNext, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <Scramble key={brand.id} text={`INFYRO · ${brand.sub}`} className="t-mono block text-[12px] text-ink" trigger="view" />
        <div className="relative mt-1 h-5 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={brand.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="truncate text-[13px] text-muted">
              {brand.tagline}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden shrink-0 gap-1.5 sm:flex">
        <button type="button" onClick={onPrev} aria-label="Previous company" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink ring-1 ring-inset ring-line hover:ring-line-strong">
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <button type="button" onClick={onNext} aria-label="Next company" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink ring-1 ring-inset ring-line hover:ring-line-strong">
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
