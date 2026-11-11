import { Check, ChevronRight } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Button, { ButtonGroup } from '../ui/Button'
import SmartLink from '../ui/SmartLink'
import Accordion from '../ui/Accordion'
import Reveal from '../motion/Reveal'
import PCard, { HoverMeasure } from '../precision/PCard'
import { BlockRise, Block, Ticks, Stencil } from '../precision/Primitives'
import { SectionDivider, FilmStrip, Elevation, CropMarks } from '../precision/Motifs'
import GridSpotlight from '../precision/GridSpotlight'
import { useBrandKey } from '../precision/brandContext'

/* ───────── AboutSplit (FINAL §8.2): text + side tiles ───────── */
export function AboutSplit({ id = 'about', n, eyebrow, lead, paragraphs = [], tiles = [], pills, closing = [], tone = 'alt' }) {
  return (
    <>
      <SectionDivider n={n} className="bg-white py-6" />
      <Section id={id} tone={tone} labelledBy={`${id}-title`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Stencil n={n} label={eyebrow} as="h2" id={`${id}-title`} />
            {lead && (
              <Reveal as="p" className="t-h3 mt-6 font-medium text-ink">
                {lead}
              </Reveal>
            )}
            {paragraphs.map((p) => (
              <Reveal as="p" key={p.slice(0, 20)} className="t-lead mt-6 text-ink-2">
                {p}
              </Reveal>
            ))}
            {pills && (
              <Reveal as="ul" className="mt-8 flex flex-wrap gap-2" aria-label="Expertise">
                {pills.map((p) => (
                  <li key={p}>
                    <span className="t-mono inline-flex rounded-full border border-line-strong bg-white px-3.5 py-2 text-[11px] text-[#0063D1]">{p}</span>
                  </li>
                ))}
              </Reveal>
            )}
          </div>
          <BlockRise as="ul" className="flex flex-col gap-4 lg:col-span-5">
            {tiles.map(({ label, text, icon: Icon }) => (
              <Block as="li" key={label} className="flex-1">
                <PCard className="flex h-full min-h-[200px] flex-col justify-between p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    {Icon && <Icon aria-hidden="true" className="h-5 w-5 text-[#0A78F2]" strokeWidth={1.5} />}
                    <h3 className="t-mono text-[11px] text-[#0063D1]">{label}</h3>
                  </div>
                  <p className="t-h3 mt-8 text-ink">{text}</p>
                  <HoverMeasure />
                </PCard>
              </Block>
            ))}
          </BlockRise>
        </div>
        {closing.length > 0 && (
          <Reveal className="mt-14 text-center">
            <p className="t-h4">{closing[0]}</p>
            {closing.slice(1).map((l) => (
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

/* ───────── ServiceGrid (FINAL §8.2): 3×2 cards, stencil numbers, icon, title, description ───────── */
export function ServiceGrid({ id = 'services', n, eyebrow = 'Services', title, tagline, intro, items, hrefFor, closing, tone = 'white' }) {
  return (
    <>
      <SectionDivider n={n} className={`py-6 ${tone === 'white' ? 'bg-paper-2' : 'bg-white'}`} />
      <Section id={id} tone={tone} labelledBy={`${id}-title`}>
        <SectionHeading id={`${id}-title`} n={n} eyebrow={eyebrow} title={title} tagline={tagline} lead={intro} />
        <BlockRise as="ul" className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3">
          {items.map((s) => (
            <Block as="li" key={s.n}>
              <PCard as="article" className="flex h-full flex-col p-7 md:min-h-[280px] md:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-mono text-[13px] text-subtle transition-colors group-hover:text-[#0063D1]" aria-hidden="true">
                    {String(s.n).padStart(2, '0')}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-[10px] border border-line-strong bg-white transition-colors duration-300 group-hover:border-[#0A78F2] group-hover:bg-[#0A78F2]">
                    <s.icon aria-hidden="true" className="h-6 w-6 text-[#0A78F2] transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="t-h4 mt-8">
                  <span className="sr-only">{String(s.n).padStart(2, '0')}. </span>
                  {s.title}
                </h3>
                <HoverMeasure />
                <p className="t-small mt-2 text-muted">{s.text}</p>
                {hrefFor && (
                  <SmartLink href={hrefFor(s)} className="group/l mt-auto inline-flex items-center gap-0.5 self-end pt-6 text-[14px] font-semibold text-[#0063D1]" aria-label={`Learn more about ${s.title}`}>
                    Learn more
                    <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover/l:translate-x-[3px]" />
                  </SmartLink>
                )}
              </PCard>
            </Block>
          ))}
        </BlockRise>
        {closing && (
          <Reveal className="mx-auto mt-16 max-w-3xl text-center lg:mt-20">
            <p className="t-h3">{closing.title}</p>
            {closing.sub && <p className="t-lead mt-3 text-muted">{closing.sub}</p>}
            {closing.extra && <p className="t-mono mt-4 text-[11px] text-subtle">{closing.extra}</p>}
          </Reveal>
        )}
      </Section>
    </>
  )
}

/* ───────── ProgramSection (Tech, FINAL §8.2): intro → 6 items → approach → audience → CTA ───────── */
export function ProgramSection({ id, n, label, data, tone = 'alt', extra }) {
  return (
    <>
      <SectionDivider n={n} className={`py-6 ${tone === 'alt' ? 'bg-white' : 'bg-paper-2'}`} />
      <Section id={id} tone={tone} labelledBy={`${id}-title`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
          <SectionHeading id={`${id}-title`} n={n} eyebrow={label} title={data.title} tagline={data.eyebrow ? null : data.tagline} className="lg:col-span-5" />
          <div className="lg:col-span-7">
            {data.intro.map((p) => (
              <Reveal as="p" key={p.slice(0, 20)} className="t-lead mb-5 text-ink-2">
                {p}
              </Reveal>
            ))}
            {extra && <Reveal className="mt-2">{extra}</Reveal>}
          </div>
        </div>

        <h3 className="t-mono mt-14 text-[11px] text-[#0063D1]" id={`${id}-items-title`}>
          {data.domainsTitle}
        </h3>
        {/* Desktop/tablet: numbered cards · mobile: accordion */}
        <BlockRise as="ul" id={`${id}-items`} aria-labelledby={`${id}-items-title`} className="mt-5 hidden grid-cols-2 gap-4 md:grid lg:grid-cols-3 lg:gap-5">
          {data.domains.map((d) => (
            <Block as="li" key={d.n}>
              <PCard className="h-full p-6 md:p-7">
                <span className="t-mono text-[12px] text-subtle transition-colors group-hover:text-[#0063D1]" aria-hidden="true">
                  {d.n}
                </span>
                <h4 className="t-h4 mt-5">{d.title}</h4>
                <HoverMeasure />
                <p className="t-small mt-2 text-muted">{d.text}</p>
              </PCard>
            </Block>
          ))}
        </BlockRise>
        <div className="mt-5 rounded-card border border-line bg-white px-5 md:hidden">
          {data.domains.map((d) => (
            <Accordion
              key={d.n}
              tone="light"
              headingClass="text-[16px] font-semibold text-ink"
              title={
                <span className="flex items-center gap-3">
                  <span className="t-mono text-[11px] text-[#0063D1]">{d.n}</span>
                  {d.title}
                </span>
              }
            >
              <p className="t-small text-muted">{d.text}</p>
            </Accordion>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <PCard lift={false} className="p-7 md:p-8 lg:col-span-7">
            <h3 className="t-mono text-[11px] text-[#0063D1]">{data.approachTitle}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {data.approach.map((a) => (
                <li key={a} className="flex items-start gap-3 border-t border-line py-3.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-blue-50">
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#0063D1]" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] leading-snug text-ink">{a}</span>
                </li>
              ))}
            </ul>
          </PCard>
          <PCard lift={false} className="flex flex-col p-7 md:p-8 lg:col-span-5">
            <h3 className="t-h3">{data.audienceTitle}</h3>
            <p className="t-body mt-4 text-ink-2">{data.audience}</p>
            {data.audienceChips?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={data.audienceTitle}>
                {data.audienceChips.map((c) => (
                  <li key={c} className="rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-[#0063D1]">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </PCard>
        </div>

        <Reveal className="relative mt-12 overflow-hidden rounded-card border border-line-strong bg-white p-8 md:p-12">
          <Ticks on />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="t-h2">{data.cta.title}</h3>
              <p className="t-lead mt-4 text-muted">{data.cta.body}</p>
            </div>
            <ButtonGroup primary={data.cta.primary} secondary={data.cta.secondary} className="shrink-0" />
          </div>
          {data.disclaimer && <p className="t-legal mt-8 text-muted">{data.disclaimer}</p>}
        </Reveal>
      </Section>
    </>
  )
}

/* ───────── BookingBand (FINAL §8.2): navy band → Google Form (new tab) ───────── */
export function BookingBand({ n, title, sub, body, enquiry, helper, button, href, note, signoff = [] }) {
  const brand = useBrandKey()
  return (
    <section id="booking" aria-labelledby="booking-title" className="relative overflow-hidden bg-navy text-white">
      <GridSpotlight variant="dark" />
      {brand === 'construction' && <Elevation inView stroke="rgba(255,255,255,0.18)" className="pointer-events-none absolute -right-10 bottom-0 hidden h-[90%] w-[55%] lg:block" />}
      {brand === 'studios' && <CropMarks inset={28} size={36} close={false} color="rgba(255,255,255,0.35)" />}
      <div className="container-content relative py-20 md:py-24 lg:py-28">
        {brand === 'studios' && <FilmStrip tone="light" frames={10} className="mb-12" />}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading id="booking-title" n={n} eyebrow="Booking" title={title} tagline={sub} lead={body} tone="light" />
          </div>
          <Reveal className="relative rounded-card border border-white/15 bg-white/[0.05] p-7 backdrop-blur md:p-8 lg:col-span-5">
            <Ticks on className="[&_.tick]:!border-white/60" />
            {enquiry && (
              <>
                <h3 className="t-h4 !text-white">{enquiry.title}</h3>
                <p className="t-small mt-2 text-white/75">{enquiry.body}</p>
              </>
            )}
            {helper && <p className="t-small mt-4 text-white/65">{helper}</p>}
            <Button href={href} variant="light" external={/^https?:/.test(href)} className="mt-6 w-full sm:w-auto">
              {button}
            </Button>
            {note && <p className="t-small mt-5 text-white/70">{note}</p>}
          </Reveal>
        </div>
        {signoff.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-8 text-center">
            <p className="text-[15px] font-medium text-white">{signoff[0]}</p>
            {signoff[1] && <p className="t-mono mt-2 text-[10px] text-white/55">{signoff[1]}</p>}
          </div>
        )}
      </div>
    </section>
  )
}
