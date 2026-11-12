import BrandLogo from '../brand/BrandLogo'
import Mark from '../brand/Mark'
import { ButtonGroup } from '../ui/Button'

/**
 * Company hero — identical for every company: logo, headline, short line and buttons on the left,
 * a photograph on the right. Plain background, no motion.
 */
export default function CompanyHero({ brandKey, title, small, primary, secondary, image, imageAlt = '' }) {
  return (
    <section id="hero" aria-labelledby="hero-title" className="bg-white pt-[var(--nav-h)]">
      <div className="container-content grid grid-cols-1 items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <BrandLogo brand={brandKey} size="lg" />
          <h1 id="hero-title" className="t-h1 mt-8 max-w-xl">
            {title}
          </h1>
          {small && <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">{small}</p>}
          <ButtonGroup primary={primary} secondary={secondary} className="mt-8" />
        </div>
        <div className="overflow-hidden rounded-card bg-paper-2">
          {image ? (
            <img src={image} alt={imageAlt} fetchpriority="high" decoding="async" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center">
              <Mark size={120} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
