import { ArrowRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import BrandLogo from '../brand/BrandLogo'
import InfyroMark from '../brand/InfyroMark'
import GridSpotlight from '../precision/GridSpotlight'
import { Ticks } from '../precision/Primitives'
import Button from '../ui/Button'
import Accordion from '../ui/Accordion'
import SocialLinks from './SocialLinks'
import { brandFooters, partOfGroup } from '../../data/footer'
import { socialList } from '../../data/contact'

const linkCls = 'text-[14px] text-ink-2 transition-colors hover:text-brand-ink'

function LinkList({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((l, i) => (
        <li key={`${l.label}-${i}`}>
          <SmartLink href={l.href} external={l.external && !!l.href} className={l.href ? linkCls : 'text-[14px] text-ink-2'}>
            {l.label}
          </SmartLink>
        </li>
      ))}
    </ul>
  )
}

/** Compact light footer for Technologies / Studios / Construction. */
export default function BrandFooter({ brandKey }) {
  const f = brandFooters[brandKey]
  const year = new Date().getFullYear()
  const headingCls = 'text-[14px] font-semibold text-ink'

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2" aria-labelledby="brand-footer-heading">
      <GridSpotlight variant="blueprint" />
      <div className="relative">
      <h2 id="brand-footer-heading" className="sr-only">
        {f.title} footer
      </h2>

      <div className="container-content grid grid-cols-1 gap-10 pb-12 pt-20 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12">
        {/* Brand block */}
        <div className="md:col-span-2 lg:col-span-4 lg:pr-6">
          {/* The lockup carries the brand name + tagline; the text versions stay for screen readers. */}
          <BrandLogo brand={f.brandKey} size="md" sequence />
          <p className="sr-only">{f.title}</p>
          <p className="sr-only">{f.tagline}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">{f.blurb}</p>
          <p className="mt-4 text-[13px] font-medium text-ink-2">{f.company}</p>
        </div>

        {/* Link columns + contact */}
        <div className={`md:col-span-2 md:grid md:gap-8 lg:col-span-8 ${f.columns.length === 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {f.columns.map((col) => (
            <Accordion key={col.title} title={col.title} tone="light" headingClass={headingCls}>
              <LinkList links={col.links} />
            </Accordion>
          ))}
          <Accordion title={f.contactTitle} tone="light" headingClass={headingCls}>
            <LinkList links={f.contact} />
            {f.follow && (
              <p className="mt-3 text-[14px] text-ink-2">
                {f.follow.label}{' '}
                {socialList(brandKey).filter((s) => f.follow.keys.includes(s.key)).map((s, i) => {
                  return (
                    <span key={s.key}>
                      {i > 0 && <span className="text-subtle"> | </span>}
                      <SmartLink href={s.href} className={linkCls}>
                        {s.label}
                      </SmartLink>
                    </span>
                  )
                })}
              </p>
            )}
          </Accordion>
        </div>
      </div>

      {/* Mini CTA strip */}
      <div className="container-content">
        <div className="group relative flex flex-col gap-6 rounded-card border border-line bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <Ticks />
          <div className="max-w-2xl">
            <h3 className="t-h4">{f.cta.title}</h3>
            <p className="mt-2 text-[15px] text-muted">{f.cta.body}</p>
          </div>
          <Button href={f.cta.button.href} icon={ArrowRight} className="shrink-0">
            {f.cta.button.label}
          </Button>
        </div>
      </div>

      {/* Group line + legal */}
      <div className="container-content pb-8 pt-10">
        <p className="flex flex-wrap items-center gap-x-1 text-[13px] text-muted">
          <InfyroMark size={16} className="mr-1" />
          {partOfGroup.label}{' '}
          {partOfGroup.links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <SmartLink href={l.href} className="font-medium text-ink-2 hover:text-brand-ink">
                {l.label}
              </SmartLink>
            </span>
          ))}
          <span aria-hidden="true"> — </span>
          <SmartLink href={partOfGroup.parent.href} className="font-medium text-ink-2 hover:text-brand-ink">
            {partOfGroup.parent.label}
          </SmartLink>
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-hairline pt-6 text-[12px] text-muted lg:flex-row lg:items-center lg:justify-between">
          <p>
            {f.copyright(year)} <span aria-hidden="true">·</span> {f.subsidiary}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <SocialLinks keys={f.socials} tone="light" />
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
