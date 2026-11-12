import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { FACETS, FACET_KEYS, VIEWBOX, BLUE } from '../brand/FacetMark'
import BrandLogo from '../brand/BrandLogo'
import SmartLink from '../ui/SmartLink'
import { ButtonGroup } from '../ui/Button'
import { BRANDS } from '../../data/navigation'
import { hero } from '../../data/inc'

const EASE = [0.22, 1, 0.36, 1]
// Each piece slides in from its own side and locks into the mark (px).
const FROM = { tech: { x: 36, y: -36 }, studios: { x: -36, y: 36 }, construction: { x: 40, y: 8 } }

/** One clickable logo piece: a full-size layer whose only hit area is the painted shape. */
function Piece({ k, i, selected, onSelect, reduce }) {
  const dim = selected && selected !== k
  return (
    <motion.button
      type="button"
      aria-label={`${BRANDS[k].name} — ${BRANDS[k].tagline}`}
      aria-pressed={selected === k}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(k)}
      onFocus={() => onSelect(k)}
      onClick={() => onSelect(k)}
      initial={reduce ? false : { opacity: 0, x: FROM[k].x, y: FROM[k].y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.12 }}
      className="pointer-events-none absolute inset-0 focus-visible:outline-none"
    >
      <svg viewBox={VIEWBOX} className="h-full w-full overflow-visible" aria-hidden="true">
        <path
          d={FACETS[k]}
          fill={BLUE}
          stroke={BLUE}
          strokeWidth={4}
          strokeLinejoin="round"
          className="cursor-pointer transition-opacity duration-300"
          style={{
            pointerEvents: 'visiblePainted',
            opacity: dim ? 0.28 : 1,
            filter: selected === k ? 'drop-shadow(0 10px 18px rgba(10,120,242,0.35))' : 'none',
          }}
        />
      </svg>
    </motion.button>
  )
}

/** Company card for the selected piece (or a short hint before anything is chosen). */
function PieceCard({ k }) {
  const b = k ? BRANDS[k] : null
  return (
    <div className="rounded-card border border-line-strong bg-white p-5 text-left shadow-soft-lg" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={k ?? 'hint'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
          {b ? (
            <>
              <BrandLogo brand={k} size="nav" />
              <p className="mt-3 text-[14px] leading-snug text-muted">{b.tagline}</p>
              <SmartLink href={b.path} className="group mt-4 inline-flex items-center gap-0.5 text-[14px] font-semibold text-[#0063D1]">
                Explore
                <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              </SmartLink>
            </>
          ) : (
            <>
              <p className="t-eyebrow text-brand-ink">Our Companies</p>
              <p className="mt-2 text-[14px] leading-snug text-muted">Tap a piece of the logo to see each company.</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * Landing hero: headline on the left, the Infyro mark + company card on the right.
 * Light motion only — text fades up, the three pieces slide together once, then the mark floats gently.
 * Each piece is one company; tapping (or hovering / focusing) a piece shows its card.
 */
export default function LogoHero() {
  const [sel, setSel] = useState(null)
  const reduce = useReducedMotion()
  const rise = (d) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE, delay: d } })

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex flex-col overflow-hidden bg-[radial-gradient(ellipse_70%_70%_at_75%_45%,#E6F0FE_0%,#F7FAFF_50%,#FFFFFF_80%)] pt-[var(--nav-h)] md:min-h-[100svh]"
    >
      <div className="container-content relative grid flex-1 grid-cols-1 items-center gap-10 py-12 md:py-14 lg:grid-cols-12 lg:gap-8 lg:py-16 short:lg:py-8">
        <div className="text-center lg:col-span-5 lg:text-left">
          <motion.p {...rise(0)} className="t-eyebrow text-brand-ink">
            INFYRO
          </motion.p>
          <motion.h1 {...rise(0.08)} id="hero-title" className="t-display mt-4 short:mt-3 short:lg:text-[44px]">
            <span className="block">{hero.lines[0]}</span>
            <span className="block text-brand">{hero.lines[1]}</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.75] text-muted md:text-[17px] lg:mx-0 short:mt-3 short:text-[15px] short:leading-[1.65]">
            {hero.lead}
          </motion.p>
          <motion.div {...rise(0.24)}>
            <ButtonGroup primary={hero.primary} secondary={hero.secondary} className="mt-8 sm:justify-center lg:justify-start short:mt-5" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-6 lg:col-span-7 lg:flex-row lg:justify-end lg:gap-8">
          <motion.div {...rise(0.7)} className="order-2 w-64 lg:order-1 lg:w-60 xl:w-64">
            <PieceCard k={sel} />
          </motion.div>
          <motion.div
            className="order-1 lg:order-2"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 1.4 }}
          >
            <div className="relative aspect-[79/104] h-[240px] sm:h-[290px] lg:h-[min(64vh,520px)] short:lg:h-[min(68vh,420px)]" role="group" aria-label="Our companies">
              {FACET_KEYS.map((k, i) => (
                <Piece key={k} k={k} i={i} selected={sel} onSelect={setSel} reduce={reduce} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
