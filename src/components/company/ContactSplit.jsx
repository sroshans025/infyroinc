import { Check } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../motion/Reveal'
import ContactForm from '../forms/ContactForm'
import ContactPanel from '../sections/ContactPanel'
import PCard from '../precision/PCard'
import { BlockRise, Block } from '../precision/Primitives'
import { SectionDivider } from '../precision/Motifs'

/** Tech "How Can We Help You?" tiles — toggle buttons that pre-select the Enquiry Type. */
function HelpTiles({ title, tiles, selected, onSelect }) {
  return (
    <div className="mb-12">
      <h3 className="t-mono text-[11px] text-[#0063D1]">{title}</h3>
      <BlockRise as="ul" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {tiles.map((h) => {
          const on = selected === h.type
          return (
            <Block as="li" key={h.type}>
              <PCard as="button" type="button" aria-pressed={on} onClick={() => onSelect(h.type)} className={`flex h-full w-full flex-col p-6 text-left ${on ? 'tick-on !border-[#0A78F2]' : ''}`}>
                <span className="flex items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-[10px] border transition-colors ${on ? 'border-[#0A78F2] bg-[#0A78F2]' : 'border-line-strong'}`}>
                    <h.icon aria-hidden="true" className={`h-5 w-5 ${on ? 'text-white' : 'text-[#0A78F2]'}`} strokeWidth={1.5} />
                  </span>
                  <span aria-hidden="true" className={`grid h-6 w-6 place-items-center rounded-full ${on ? 'bg-[#0A78F2] text-white' : 'text-transparent ring-1 ring-inset ring-line'}`}>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </span>
                <span className="t-h4 mt-6 block">{h.title}</span>
                <span className="t-small mt-2 block text-muted">{h.text}</span>
              </PCard>
            </Block>
          )
        })}
      </BlockRise>
    </div>
  )
}

/**
 * ContactSplit (FINAL §8.2): form 7 cols + details 5 cols on desktop; on mobile the details come first.
 * Identical layout on every company page.
 */
export default function ContactSplit({
  id = 'contact', n, title, tagline, lead, formTitle, formIntro, form, inbox, preset, help,
  asideTitle, asideBody, socials, below, signoff = [], tone = 'alt',
}) {
  return (
    <>
      <SectionDivider n={n} className={`py-6 ${tone === 'alt' ? 'bg-white' : 'bg-paper-2'}`} />
      <Section id={id} tone={tone} labelledBy={`${id}-title`}>
        <SectionHeading id={`${id}-title`} n={n} eyebrow="Contact" title={title} tagline={tagline} lead={lead} />
        <div className="mt-12">
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
                {asideBody && <p className="t-small mt-3 text-muted">{asideBody}</p>}
                <ContactPanel email={inbox} socials={socials} className="mt-5 md:grid md:grid-cols-2 md:gap-x-6 lg:block" />
              </PCard>
            </Reveal>
          </div>
        </div>
        {signoff.length > 0 && (
          <Reveal className="mt-16 text-center lg:mt-20">
            <p className="t-h4">{signoff[0]}</p>
            {signoff.slice(1).map((l) => (
              <p key={l} className="t-mono mt-2 text-[11px] text-subtle">
                {l}
              </p>
            ))}
          </Reveal>
        )}
      </Section>
    </>
  )
}
