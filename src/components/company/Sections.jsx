import { Check, Sparkles } from 'lucide-react'
import FeatureCard, { CARD_SURFACE } from '../precision/FeatureCard'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Button, { ButtonGroup } from '../ui/Button'
import Accordion from '../ui/Accordion'
import Reveal from '../motion/Reveal'
import { BlockRise, Block } from '../precision/Primitives'

/* ───────── AboutSplit: text on the left, photo + key statements on the right ───────── */
function AboutTiles({ tiles, cols }) {
  return (
    <BlockRise as="ul" className={`grid grid-cols-1 gap-4 ${cols}`}>
      {tiles.map(({ label, text, icon }, i) => (
        <Block as="li" key={label}>
          <FeatureCard accent={i} icon={icon || Sparkles} title={label}>
            {text}
          </FeatureCard>
        </Block>
      ))}
    </BlockRise>
  )
}

export function AboutSplit({ id = 'about', kicker = 'Who We Are', eyebrow, lead, paragraphs = [], tiles = [], pills, tone = 'alt', image, imageAlt = '' }) {
  // Statement cards (e.g. Vision + Mission) sit under the text, so neither column looks empty.
  const short = tiles.length > 0
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <div className={`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 ${short ? 'lg:items-center' : ''}`}>
        <div className="lg:col-span-7">
          <SectionHeading id={`${id}-title`} eyebrow={kicker} title={eyebrow} align="left" />
          {lead && (
            <Reveal as="p" className="mt-6 text-[17px] font-medium leading-[1.65] text-ink md:text-[18px] t-justify">
              {lead}
            </Reveal>
          )}
          {paragraphs.map((p) => (
            <Reveal as="p" key={p.slice(0, 20)} className="t-lead mt-5 text-ink-2">
              {p}
            </Reveal>
          ))}
          {pills && (
            <Reveal as="ul" className="mt-7 flex flex-wrap gap-2" aria-label="Expertise">
              {pills.map((p) => (
                <li key={p} className="rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-2">
                  {p}
                </li>
              ))}
            </Reveal>
          )}
          {short && tiles.length > 0 && (
            <div className="mt-8">
              <AboutTiles tiles={tiles} cols="sm:grid-cols-2" />
            </div>
          )}
        </div>
        {image && (
          <Reveal className="lg:col-span-5">
            {/* With statement cards the photo is a tall 4:5 frame; without, it stretches to the height of the text. */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className={`w-full rounded-card object-cover shadow-soft ${short ? 'aspect-[4/3] lg:aspect-[4/5]' : 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[360px]'}`}
            />
          </Reveal>
        )}
      </div>
    </Section>
  )
}

/* ───────── ServiceGrid: 3×2 cards — photo, icon + title, description ───────── */
export function ServiceGrid({ id = 'services', eyebrow = 'Services', title, tagline, intro, items, tone = 'white' }) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} tagline={tagline} lead={intro} />
      <BlockRise as="ul" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {items.map((s, i) => (
          <Block as="li" key={s.title}>
            <FeatureCard accent={i} image={s.image} icon={s.icon} title={s.title}>
              {s.text}
            </FeatureCard>
          </Block>
        ))}
      </BlockRise>
    </Section>
  )
}

/* ───────── ProgramSection (Technologies): intro + photo → six areas → approach / audience → CTA ───────── */
export function ProgramSection({ id, label, data, tone = 'alt', extra, image, imageAlt = '' }) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id={`${id}-title`} eyebrow={label} title={data.title} tagline={data.eyebrow ? null : data.tagline} align="left" />
          {data.intro.map((p) => (
            <Reveal as="p" key={p.slice(0, 20)} className="t-lead mt-5 text-ink-2">
              {p}
            </Reveal>
          ))}
          {extra && <Reveal className="mt-6">{extra}</Reveal>}
        </div>
        {image && (
          <Reveal>
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-card object-cover shadow-soft" />
          </Reveal>
        )}
      </div>

      <h3 className="t-h3 mt-14" id={`${id}-items-title`}>
        {data.domainsTitle}
      </h3>
      {/* Tablet/desktop: cards · mobile: accordion */}
      <BlockRise as="ul" id={`${id}-items`} aria-labelledby={`${id}-items-title`} className="mt-6 hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3">
        {data.domains.map((d, i) => (
          <Block as="li" key={d.title}>
            <FeatureCard as="div" accent={i} badge={String(i + 1).padStart(2, '0')} title={d.title} titleAs="h4">
              {d.text}
            </FeatureCard>
          </Block>
        ))}
      </BlockRise>
      <div className="mt-5 rounded-card border border-line bg-white px-5 md:hidden">
        {data.domains.map((d) => (
          <Accordion key={d.title} tone="light" headingClass="text-[16px] font-semibold text-ink" title={d.title}>
            <p className="text-[14px] leading-[1.7] text-muted">{d.text}</p>
          </Accordion>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className={`${CARD_SURFACE} p-6 md:p-8 lg:col-span-7`}>
          <h3 className="text-[18px] font-semibold text-ink">{data.approachTitle}</h3>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {data.approach.map((a) => (
              <li key={a} className="flex items-start gap-3 border-t border-line py-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0A78F2]">
                  <Check aria-hidden="true" className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[14px] leading-snug text-ink-2">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${CARD_SURFACE} flex flex-col p-6 md:p-8 lg:col-span-5`}>
          <h3 className="text-[18px] font-semibold text-ink">{data.audienceTitle}</h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-muted">{data.audience}</p>
          {data.audienceChips?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={data.audienceTitle}>
              {data.audienceChips.map((c) => (
                <li key={c} className="rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-brand-ink">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Reveal className="mt-8 rounded-card bg-[#0F2346] p-8 ring-1 ring-white/10 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-[24px] font-bold leading-tight !text-white md:text-[28px]">{data.cta.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-white/75">{data.cta.body}</p>
          </div>
          <ButtonGroup primary={data.cta.primary} secondary={data.cta.secondary} secondaryVariant="glass" className="shrink-0" />
        </div>
        {data.disclaimer && <p className="mt-6 text-[12px] leading-[1.5] text-white/60">{data.disclaimer}</p>}
      </Reveal>
    </Section>
  )
}

/* ───────── BookingBand: dark band with a short pitch and the booking button ───────── */
export function BookingBand({ title, sub, body, enquiry, helper, button, href, note, image }) {
  return (
    <section id="booking" aria-labelledby="booking-title" className="relative overflow-hidden bg-navy">
      {image && (
        <>
          <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </>
      )}
      <div className="container-content relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading id="booking-title" eyebrow="Booking" title={title} tagline={sub} align="left" tone="light" />
            {body && <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-white/80 md:text-[16px] t-justify">{body}</p>}
          </div>
          <Reveal className="rounded-card border border-white/15 bg-white/[0.06] p-7 md:p-8 lg:col-span-5">
            {enquiry && (
              <>
                <h3 className="t-h4 !text-white">{enquiry.title}</h3>
                <p className="mb-3 mt-2 text-[14px] leading-[1.7] text-white/75">{enquiry.body}</p>
              </>
            )}
            {note && <p className="text-[15px] leading-[1.7] text-white/80">{note}</p>}
            {helper && <p className="mt-3 text-[14px] text-white/70">{helper}</p>}
            {href && (
              <Button href={href} variant="light" external={/^https?:/.test(href)} className="mt-6 w-full sm:w-auto">
                {button}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
