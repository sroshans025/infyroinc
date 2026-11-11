import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Seo from '../components/layout/Seo'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import SmartLink from '../components/ui/SmartLink'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import WordReveal from '../components/motion/WordReveal'
import HighlightReveal from '../components/motion/HighlightReveal'
import AssemblyHero from '../components/hero/AssemblyHero'
import InfyroMark from '../components/brand/InfyroMark'
import BrandLogo from '../components/brand/BrandLogo'
import { CompanyMotif } from '../components/layout/CompaniesSwitcher'
import { Stencil, DimensionLine, BlockRise, Block, Ticks, TiltCard, Magnetic } from '../components/precision/Primitives'
import { about, companies, values, visionMission, why, workTogether } from '../data/inc'
import { PHONE, EMAILS } from '../data/contact'

/* ── 1b · Company cards (destination of the hero hand-off) ── */
function CompanyCard({ c }) {
  const [hover, setHover] = useState(false)
  return (
    <TiltCard deg={8} onHoverChange={setHover} className="h-full rounded-card">
      <article className={`group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-card border bg-white p-8 transition-colors duration-300 lg:min-h-[520px] lg:p-10 ${hover ? 'tick-on border-line-strong' : 'border-line'}`}>
        <Ticks />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%]">
          <CompanyMotif k={c.key} show={hover} />
        </div>
        <div className="relative flex items-start justify-between">
          <span data-handoff={c.key} className="inline-block">
            <InfyroMark size={96} active={c.key} dim={0.22} lift={hover ? c.key : null} />
          </span>
          <span className="t-mono text-[10px] text-subtle">{`0${['tech', 'studios', 'construction'].indexOf(c.key) + 1}`}</span>
        </div>
        <h3 className="relative mt-auto pt-10">
          <BrandLogo brand={c.key} size="md" noMark />
        </h3>
        <p className="relative mt-3 text-[15px] font-medium text-[#0063D1]">{c.tagline}</p>
        <p className="t-small relative mt-3 text-muted">{c.description}</p>
        <div className="relative mt-6">
          <Magnetic>
            {/* Stretched link: the whole card is clickable */}
            <SmartLink href={c.href} className="inline-flex items-center gap-0.5 text-[15px] font-semibold text-ink after:absolute after:inset-0 after:content-['']">
              {c.cta}
              <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </SmartLink>
          </Magnetic>
        </div>
      </article>
    </TiltCard>
  )
}

function CompanyCards() {
  const track = useRef(null)
  const [dot, setDot] = useState(0)
  const onScroll = () => {
    const el = track.current
    if (!el) return
    setDot(Math.round(el.scrollLeft / (el.scrollWidth / companies.items.length)))
  }
  const goDot = (i) => {
    const el = track.current
    el?.scrollTo({ left: (el.scrollWidth / companies.items.length) * i, behavior: 'smooth' })
  }
  return (
    <Section id="companies" tone="alt" labelledBy="companies-title">
      <SectionHeading id="companies-title" n={1} eyebrow={companies.eyebrow} title={companies.title} />
      <BlockRise
        as="ul"
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 sm:scroll-px-6 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:mt-16"
      >
        {companies.items.map((c) => (
          <Block as="li" key={c.key} className="w-[85%] shrink-0 snap-start md:w-auto">
            <CompanyCard c={c} />
          </Block>
        ))}
      </BlockRise>
      <div className="mt-5 flex justify-center gap-2 md:hidden" role="group" aria-label="Choose company card">
        {companies.items.map((c, i) => (
          <button key={c.key} type="button" onClick={() => goDot(i)} aria-label={c.name} aria-current={dot === i} className="grid h-8 w-8 place-items-center">
            <span className={`h-1.5 rounded-full transition-all ${dot === i ? 'w-5 bg-[#0A78F2]' : 'w-1.5 bg-line-strong'}`} />
          </button>
        ))}
      </div>
    </Section>
  )
}

/* ── 4 · Core values with a one-time "systems check" sweep ── */
function Values() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const [sweep, setSweep] = useState(-1)
  useEffect(() => {
    if (!inView || reduce || window.innerWidth < 1024) return undefined
    const ids = values.items.map((_, i) => setTimeout(() => setSweep(i), 300 + i * 160))
    const end = setTimeout(() => setSweep(-1), 300 + values.items.length * 160 + 260)
    return () => [...ids, end].forEach(clearTimeout)
  }, [inView, reduce])
  return (
    <Section id="values" tone="alt" labelledBy="values-title">
      <SectionHeading id="values-title" n={4} eyebrow="Core Values" title={values.title} />
      <BlockRise as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5" ref={ref}>
        {values.items.map((v, i) => {
          const lit = sweep === i
          return (
            <Block as="li" key={v.name}>
              <div className={`group relative flex h-full min-h-[150px] flex-col justify-between rounded-card border bg-white p-5 transition-colors duration-300 sm:min-h-[200px] sm:p-8 ${lit ? 'tick-on border-line-strong' : 'border-line'}`}>
                <Ticks />
                <div className="flex items-start justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-[10px] border transition-colors duration-300 group-hover:border-[#0A78F2] group-hover:bg-[#0A78F2] ${lit ? 'border-[#0A78F2] bg-[#0A78F2]' : 'border-line-strong bg-white'}`}>
                    <v.icon aria-hidden="true" className={`h-6 w-6 transition-colors duration-300 group-hover:text-white ${lit ? 'text-white' : 'text-[#0A78F2]'}`} strokeWidth={1.5} />
                  </span>
                  <span className="t-mono text-[10px] text-subtle">{`V.${String(i + 1).padStart(2, '0')}`}</span>
                </div>
                <h3 className="mt-8 text-[18px] font-semibold leading-tight tracking-[-0.02em] sm:text-[24px]">{v.name}</h3>
              </div>
            </Block>
          )
        })}
      </BlockRise>
      <Reveal as="p" className="t-h3 mx-auto mt-16 max-w-3xl text-center lg:mt-20">
        {values.closing}
      </Reveal>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Seo page="home" />
      <AssemblyHero />
      <CompanyCards />

      {/* 2 · About: story */}
      <Section id="about" labelledBy="about-title">
        <Stencil n={2} label="About" />
        <WordReveal id="about-title" as="h2" text={about.statement} className="mt-6 max-w-5xl text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink sm:text-[44px] lg:text-[56px]" />

        <div className="mt-16 grid grid-cols-[auto_1fr] gap-6 md:gap-10 lg:mt-24">
          <DimensionLine vertical label="ABOUT · INFYRO INC." className="w-6 self-stretch" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            {about.paragraphs.map((p) => (
              <Reveal as="p" key={p.slice(0, 24)} className="t-lead text-ink-2">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        <BlockRise as="ul" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {about.pillars.map((p) => (
            <Block as="li" key={p.key}>
              <div className="group relative h-full rounded-card border border-line bg-paper-2 p-7 md:p-8">
                <Ticks />
                <div className="flex items-center gap-3">
                  <InfyroMark size={28} active={p.key} dim={0.2} />
                  <h3 className="t-mono text-[11px] text-[#0063D1]">{p.label}</h3>
                </div>
                <p className="t-body mt-5 text-ink">{p.text}</p>
              </div>
            </Block>
          ))}
        </BlockRise>

        <Reveal as="p" className="t-lead mt-14 max-w-4xl text-ink-2">
          {about.closingParagraph}
        </Reveal>
        <Reveal className="mt-16 text-center lg:mt-20">
          <p className="t-h3 mx-auto max-w-3xl">{about.closing.title}</p>
          <p className="t-mono mt-3 text-[11px] text-subtle">{about.closing.sub}</p>
        </Reveal>
      </Section>

      {/* 3 · Vision & Mission */}
      <Section id="vision" tone="alt" labelledBy="vision-title">
        <Stencil n={3} label="Vision & Mission" />
        <h2 id="vision-title" className="sr-only">
          Vision &amp; Mission
        </h2>
        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          {visionMission.map(({ label, text, icon: Icon }, i) => (
            <motion.div
              key={label}
              className={`group relative flex min-h-[300px] flex-col justify-between rounded-card border border-line bg-white p-8 md:min-h-[360px] md:p-10 ${i === 1 ? 'md:order-3' : 'md:order-1'}`}
              initial={{ opacity: 0, x: i ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <Ticks />
              <div className="flex items-center gap-3">
                <Icon aria-hidden="true" className="h-5 w-5 text-[#0A78F2]" strokeWidth={1.5} />
                <h3 className="t-mono text-[11px] text-[#0063D1]">{label}</h3>
              </div>
              <p className="t-h3 mt-10 text-ink">{text}</p>
            </motion.div>
          ))}
          <DimensionLine vertical label="VISION ←→ MISSION" className="hidden w-6 md:order-2 md:flex" />
        </div>
      </Section>

      <Values />

      {/* 5 · Why Infyro */}
      <Section id="why" labelledBy="why-title">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
          <div className="animate-spinslow">
            <InfyroMark size={640} outline />
          </div>
        </div>
        <SectionHeading id="why-title" n={5} eyebrow="Why Infyro" title={why.title} align="center" />
        <HighlightReveal segments={why.segments} className="relative mx-auto mt-10 max-w-3xl text-center text-[21px] font-medium leading-[1.45] tracking-[-0.015em] text-muted md:text-[28px]" />
      </Section>

      {/* 6 · Let's work together — navy band that opens the mega footer */}
      <Section id="contact" tone="navy" labelledBy="contact-title" className="!pb-20 lg:!pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Stencil n={6} label="Let's Work Together" tone="light" />
            <h2 id="contact-title" className="mt-5 text-[40px] font-bold leading-[1.02] tracking-[-0.04em] !text-white md:text-[56px] lg:text-[64px]">
              {workTogether.title}
            </h2>
            <p className="t-lead mt-6 max-w-2xl text-white/75">{workTogether.body}</p>
            <p className="t-h4 mt-6 max-w-2xl !text-white">{workTogether.sub}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={workTogether.primary.href} variant="light" magnetic className="w-full sm:w-auto">
                {workTogether.primary.label}
              </Button>
              <Button href={workTogether.secondary.href} variant="glass" className="w-full sm:w-auto">
                {workTogether.secondary.label}
              </Button>
            </div>
          </div>
          <dl className="space-y-6 lg:col-span-4 lg:text-right">
            <div>
              <dt className="t-mono text-[11px] text-white/60">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAILS.inc}`} className="link-grow text-[20px] font-medium text-white">
                  {EMAILS.inc}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-mono text-[11px] text-white/60">Call</dt>
              <dd className="mt-1">
                <a href={PHONE.href} className="link-grow text-[20px] font-medium text-white">
                  {PHONE.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-16 border-t border-white/[0.08]" />
      </Section>
    </>
  )
}
