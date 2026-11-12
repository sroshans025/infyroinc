import { Check } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../motion/Reveal'
import ContactForm from '../forms/ContactForm'
import ContactPanel from '../sections/ContactPanel'
import PCard from '../precision/PCard'
import { BlockRise, Block } from '../precision/Primitives'
import { CARD_SURFACE, accentAt } from '../precision/FeatureCard'

/** Tech "How Can We Help You?" tiles — toggle buttons that pre-select the Enquiry Type. */
function HelpTiles({ title, tiles, selected, onSelect }) {
  return (
    <div className="mb-12">
      <h3 className="t-h3 text-center">{title}</h3>
      <BlockRise as="ul" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((h, i) => {
          const on = selected === h.type
          return (
            <Block as="li" key={h.type}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(h.type)}
                className={`${CARD_SURFACE} flex h-full w-full flex-col p-6 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft-lg ${on ? '!ring-2 !ring-[#3B95F5]' : ''}`}
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentAt(i).bar}`} />
                <span className="flex items-start justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-[12px] bg-gradient-to-br text-white shadow-lg ${accentAt(i).badge}`}>
                    <h.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden="true" className={`grid h-6 w-6 place-items-center rounded-full ${on ? 'bg-[#0A78F2] text-white' : 'text-transparent ring-1 ring-inset ring-white/25'}`}>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </span>
                <span className="mt-5 block text-[18px] font-semibold text-white">{h.title}</span>
                <span className="mt-3 block text-[14px] leading-[1.7] text-white/70">{h.text}</span>
              </button>
            </Block>
          )
        })}
      </BlockRise>
    </div>
  )
}

/**
 * ContactSplit: form (7 cols) + contact details (5 cols) on desktop; on mobile the details come first.
 * Identical layout on every company page.
 */
export default function ContactSplit({
  id = 'contact', title, tagline, lead, formTitle, formIntro, form, inbox, preset, help,
  asideTitle, asideBody, socials, below, tone = 'alt',
}) {
  return (
    <>
      <Section id={id} tone={tone} labelledBy={`${id}-title`}>
        <SectionHeading id={`${id}-title`} eyebrow="Contact" title={title} tagline={tagline} lead={lead} />
        <div className="mt-10">
          {help && <HelpTiles {...help} />}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="order-2 lg:order-1 lg:col-span-7">
              <PCard lift={false} className="p-6 md:p-8">
                {formTitle && <h3 className="t-h4">{formTitle}</h3>}
                {formIntro && <p className="t-small mt-2 text-muted">{formIntro}</p>}
                <div className={formTitle || formIntro ? 'mt-6' : ''} />
                <ContactForm config={form} inbox={inbox} preset={preset} />
              </PCard>
              {below && <p className="t-small mt-6 text-muted">{below}</p>}
            </Reveal>
            <Reveal as="aside" delay={0.05} className="order-1 lg:order-2 lg:col-span-5" aria-labelledby={`${id}-aside`}>
              <PCard lift={false} className="p-6 md:p-8 lg:sticky lg:top-24">
                <h3 id={`${id}-aside`} className="t-h3">
                  {asideTitle}
                </h3>
                {asideBody && <p className="mt-3 text-[14px] leading-[1.7] text-muted">{asideBody}</p>}
                <ContactPanel email={inbox} socials={socials} className="mt-5 md:grid md:grid-cols-2 md:gap-x-6 lg:block" />
              </PCard>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
