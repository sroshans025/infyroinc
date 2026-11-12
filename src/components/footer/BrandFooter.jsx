import { ArrowRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import BrandLogo from '../brand/BrandLogo'
import Button from '../ui/Button'
import Accordion from '../ui/Accordion'
import GroupCompaniesBand from './GroupCompaniesBand'
import LegalBar from './LegalBar'
import { brandFooters } from '../../data/footer'
import { socialList } from '../../data/contact'

const linkCls = 'text-[14px] text-[#C3C9D4] transition-colors hover:text-white'
const headingCls = 'text-[14px] font-semibold text-white'

function LinkList({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((l, i) => (
        <li key={`${l.label}-${i}`}>
          <SmartLink href={l.href} external={l.external && !!l.href} className={l.href ? linkCls : 'text-[14px] text-[#C3C9D4]'}>
            {l.label}
          </SmartLink>
        </li>
      ))}
    </ul>
  )
}

/** Company footer (Technologies / Studios / Construction) — same navy style as the group footer. */
export default function BrandFooter({ brandKey }) {
  const f = brandFooters[brandKey]

  return (
    <footer className="bg-navy text-[#9CA3AF]" aria-labelledby="brand-footer-heading">
      <h2 id="brand-footer-heading" className="sr-only">
        {f.title} footer
      </h2>

      {/* CTA strip */}
      <div className="border-b border-white/[0.08]">
        <div className="container-content flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-[22px] font-semibold text-white">{f.cta.title}</h3>
            <p className="mt-2 text-[15px] text-[#9CA3AF]">{f.cta.body}</p>
          </div>
          <Button href={f.cta.button.href} icon={ArrowRight} className="shrink-0">
            {f.cta.button.label}
          </Button>
        </div>
      </div>

      <div className="container-content grid grid-cols-1 gap-10 py-14 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12">
        <div className="md:col-span-2 lg:col-span-4 lg:pr-6">
          <BrandLogo brand={f.brandKey} size="md" tone="light" />
          <p className="sr-only">{f.tagline}</p>
          <p className="mt-5 text-[14px] leading-[1.7] text-[#9CA3AF]">{f.blurb}</p>
          <p className="mt-4 text-[13px] font-medium text-[#C3C9D4]">{f.company}</p>
        </div>

        <div className={`md:col-span-2 md:grid md:gap-8 lg:col-span-8 ${f.columns.length === 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {f.columns.map((col) => (
            <Accordion key={col.title} title={col.title} tone="dark" headingClass={headingCls}>
              <LinkList links={col.links} />
            </Accordion>
          ))}
          <Accordion title={f.contactTitle} tone="dark" headingClass={headingCls}>
            <LinkList links={f.contact} />
            {f.follow && (
              <p className="mt-3 text-[14px] text-[#C3C9D4]">
                {f.follow.label}{' '}
                {socialList(brandKey)
                  .filter((s) => f.follow.keys.includes(s.key))
                  .map((s, i) => (
                    <span key={s.key}>
                      {i > 0 && <span className="text-[#6B7280]"> | </span>}
                      <SmartLink href={s.href} className={linkCls}>
                        {s.label}
                      </SmartLink>
                    </span>
                  ))}
              </p>
            )}
          </Accordion>
        </div>
      </div>

      <GroupCompaniesBand />
      <LegalBar copyright={(year) => `${f.copyright(year)} · ${f.subsidiary}`} socials={f.socials} />
    </footer>
  )
}
