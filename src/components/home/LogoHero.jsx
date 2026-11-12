import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { FACETS, FACET_KEYS, VIEWBOX, BLUE } from '../brand/FacetMark'
import BrandLogo from '../brand/BrandLogo'
import SmartLink from '../ui/SmartLink'
import { ButtonGroup } from '../ui/Button'
import { BRANDS } from '../../data/navigation'
import { hero } from '../../data/inc'

/** One clickable logo piece: a full-size layer whose only hit area is the painted shape. */
function Piece({ k, selected, onSelect }) {
  const dim = selected && selected !== k
  return (
    <button
      type="button"
      aria-label={`${BRANDS[k].name} — ${BRANDS[k].tagline}`}
      aria-pressed={selected === k}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(k)}
      onFocus={() => onSelect(k)}
      onClick={() => onSelect(k)}
      className="pointer-events-none absolute inset-0 focus-visible:outline-none"
    >
      <svg viewBox={VIEWBOX} className="h-full w-full overflow-visible" aria-hidden="true">
        <path
          d={FACETS[k]}
          fill={BLUE}
          stroke={BLUE}
          strokeWidth={4}
          strokeLinejoin="round"
          className="cursor-pointer transition-opacity duration-200"
          style={{
            pointerEvents: 'visiblePainted',
            opacity: dim ? 0.28 : 1,
            filter: selected === k ? 'drop-shadow(0 10px 18px rgba(10,120,242,0.35))' : 'none',
          }}
        />
      </svg>
    </button>
  )
}

/** Company card shown for the selected piece (or a short hint before anything is chosen). */
function PieceCard({ k, className = '' }) {
  const b = k ? BRANDS[k] : null
  return (
    <div className={`w-64 rounded-card border border-line-strong bg-white p-5 text-left shadow-soft-lg ${className}`} aria-live="polite">
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
    </div>
  )
}

/**
 * Landing hero — plain and static: headline on the left, the Infyro mark on the right.
 * Each of the three pieces is one company; tapping (or hovering / focusing) a piece shows its card.
 */
export default function LogoHero() {
  const [sel, setSel] = useState(null)
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,#E6F0FE_0%,#F7FAFF_50%,#FFFFFF_80%)] pt-[var(--nav-h)]"
    >
      <div className="container-content relative grid flex-1 grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-10 short:lg:py-6">
        <div className="text-center lg:col-span-6 lg:text-left">
          <p className="t-eyebrow text-brand-ink">INFYRO</p>
          <h1 id="hero-title" className="t-display mt-4 short:mt-3 short:lg:text-[44px]">
            <span className="block">{hero.lines[0]}</span>
            <span className="block text-brand">{hero.lines[1]}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.75] text-muted md:text-[17px] lg:mx-0 short:mt-3 short:text-[15px] short:leading-[1.65]">{hero.lead}</p>
          <ButtonGroup primary={hero.primary} secondary={hero.secondary} className="mt-8 sm:justify-center lg:justify-start short:mt-5" />
        </div>

        <div className="flex flex-col items-center lg:col-span-6">
          <div className="relative">
            <div className="relative aspect-[79/104] h-[230px] sm:h-[280px] lg:h-[min(58vh,500px)] short:lg:h-[min(62vh,380px)]" role="group" aria-label="Our companies">
              {FACET_KEYS.map((k) => (
                <Piece key={k} k={k} selected={sel} onSelect={setSel} />
              ))}
            </div>
            {/* Desktop: card floats beside the mark */}
            <PieceCard k={sel} className="absolute -left-48 top-4 hidden lg:block xl:-left-56" />
          </div>
          {/* Phones & tablets: card sits under the mark */}
          <PieceCard k={sel} className="mt-6 lg:hidden" />
        </div>
      </div>
    </section>
  )
}
