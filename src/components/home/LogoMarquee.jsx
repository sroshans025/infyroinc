import { useReducedMotion } from 'framer-motion'
import SmartLink from '../ui/SmartLink'
import BrandLogo from '../brand/BrandLogo'
import { BRANDS, COMPANY_KEYS } from '../../data/navigation'

const REPEAT = 3 // logos repeated so one row is always wider than the screen

/**
 * Company-logo showcase: a slow, continuous horizontal scroll (pauses on hover).
 * Only the first copy of each logo is focusable; the repeats are hidden from assistive tech.
 * Reduced motion: a static, centred row.
 */
export default function LogoMarquee({ label = 'The Infyro Group of Companies' }) {
  const reduce = useReducedMotion()

  const logo = (k, focusable) => (
    <SmartLink
      href={BRANDS[k].path}
      tabIndex={focusable ? undefined : -1}
      aria-hidden={focusable ? undefined : 'true'}
      className="block rounded-md opacity-80 transition-opacity hover:opacity-100"
    >
      <BrandLogo brand={k} size="md" />
    </SmartLink>
  )

  return (
    <section aria-label="Our companies" className="border-y border-line bg-white py-8 md:py-10">
      <p className="t-eyebrow text-center text-muted">{label}</p>
      {reduce ? (
        <ul className="container-content mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {COMPANY_KEYS.map((k) => (
            <li key={k}>{logo(k, true)}</li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((half) => (
              <ul key={half} className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24" aria-hidden={half === 1 ? 'true' : undefined}>
                {Array.from({ length: REPEAT }, (_, r) =>
                  COMPANY_KEYS.map((k) => <li key={`${r}-${k}`}>{logo(k, half === 0 && r === 0)}</li>),
                )}
              </ul>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
