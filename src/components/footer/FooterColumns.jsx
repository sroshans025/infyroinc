import SmartLink from '../ui/SmartLink'
import BrandLogo from '../brand/BrandLogo'
import Accordion from '../ui/Accordion'
import { megaFooter } from '../../data/footer'

/** [B] Brand block + four link columns. Desktop: 4 + 2/2/2/2 of 12; mobile: accordions. */
export default function FooterColumns({ first = false }) {
  return (
    <div className={first ? '' : 'border-t border-white/[0.08]'}>
      <div className="container-content grid grid-cols-1 gap-10 py-16 md:grid-cols-4 md:gap-x-8 lg:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-4 lg:pr-8">
          <BrandLogo brand="inc" size="md" tone="light" sequence />
          <span className="sr-only">Infyro Inc.</span>
          <p className="mt-6 text-[15px] leading-relaxed text-[#9CA3AF]">{megaFooter.brand.blurb}</p>
          <p className="mt-5 text-[15px] font-semibold text-white">{megaFooter.brand.line}</p>
        </div>

        <div className="md:col-span-4 md:grid md:grid-cols-[1fr_1fr_1.2fr_1.5fr] md:gap-8 lg:col-span-8">
          {megaFooter.columns.map((col) => (
            <Accordion key={col.title} title={col.title} tone="dark" headingClass="t-mono text-[11px] text-white">
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className="link-grow text-[14px] text-[#D1D5DB] hover:text-white">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
