import { Building2, Camera, ChevronRight, Cpu, Mail, Phone } from 'lucide-react'
import Seo from '../components/layout/Seo'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import SmartLink from '../components/ui/SmartLink'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import Mark from '../components/brand/Mark'
import BrandLogo from '../components/brand/BrandLogo'
import FacetMark from '../components/brand/FacetMark'
import LogoHero from '../components/home/LogoHero'
import { BlockRise, Block } from '../components/precision/Primitives'
import FeatureCard from '../components/precision/FeatureCard'
import { about, companies, values, visionMission, why, workTogether } from '../data/inc'
import { PHONE, EMAILS } from '../data/contact'
import whyImg from '../assets/images/home/why.webp'
import aboutImg from '../assets/images/home/about.webp'
import techPillarImg from '../assets/images/tech/software.webp'
import studiosPillarImg from '../assets/images/studios/photo.webp'
import constructionPillarImg from '../assets/images/construction/architecture.webp'

const PILLAR_IMG = { tech: techPillarImg, studios: studiosPillarImg, construction: constructionPillarImg }
const COMPANY_ICON = { tech: Cpu, studios: Camera, construction: Building2 }

/* Company cards — white cards: the logo piece for that company, name, tagline, short description; the whole card is a link. */
function CompanyCards() {
  return (
    <Section id="companies" tone="alt" labelledBy="companies-title">
      <SectionHeading id="companies-title" eyebrow={companies.eyebrow} title={companies.title} />
      <BlockRise as="ul" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12">
        {companies.items.map((c, i) => (
          <Block as="li" key={c.key}>
            <article className="group relative flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-soft-lg">
              <div className="flex items-start justify-between">
                <FacetMark size={76} active={c.key} dim={0.22} />
                <span className="font-mono text-[11px] text-subtle">{`0${i + 1}`}</span>
              </div>
              <h3 className="mt-6">
                <BrandLogo brand={c.key} size="md" noMark />
              </h3>
              <p className="mt-3 text-[15px] font-medium text-[#0063D1]">{c.tagline}</p>
              <p className="mt-3 text-[14px] leading-[1.7] text-muted">{c.description}</p>
              <div className="mt-auto pt-6">
                <SmartLink href={c.href} className="inline-flex items-center gap-0.5 text-[15px] font-semibold text-ink after:absolute after:inset-0 after:content-['']">
                  {c.cta}
                  <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
                </SmartLink>
              </div>
            </article>
          </Block>
        ))}
      </BlockRise>
    </Section>
  )
}

/* About — statement + paragraphs beside a photo, three focus cards, closing paragraph. */
function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="t-eyebrow text-brand-ink">{about.eyebrow}</p>
            <h2 id="about-title" className="mt-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[34px] lg:text-[38px]">
              {about.statement}
            </h2>
            <span aria-hidden="true" className="title-rule" />
          </Reveal>
          {about.paragraphs.map((p) => (
            <Reveal as="p" key={p.slice(0, 24)} className="t-lead mt-6 text-ink-2">
              {p}
            </Reveal>
          ))}
        </div>
        <Reveal className="lg:col-span-5">
          <img src={aboutImg} alt="A bright, modern office" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-card object-cover shadow-soft lg:aspect-[4/5]" />
        </Reveal>
      </div>

      <BlockRise as="ul" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {about.pillars.map((p, i) => (
          <Block as="li" key={p.key}>
            <FeatureCard accent={i} image={PILLAR_IMG[p.key]} icon={COMPANY_ICON[p.key]} title={p.label}>
              {p.text}
            </FeatureCard>
          </Block>
        ))}
      </BlockRise>

      <Reveal as="p" className="t-lead mt-10 text-ink-2">
        {about.closingParagraph}
      </Reveal>
    </Section>
  )
}

/* Large outline of the mark, centred behind a section's content. */
function Watermark({ color, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <FacetMark size={540} outline color={color} />
    </div>
  )
}

/* Vision & Mission — compact cards on a dark band. */
function VisionMission() {
  return (
    <Section id="vision" tone="navy" labelledBy="vision-title" className="isolate overflow-hidden">
      <Watermark color="#FFFFFF" className="opacity-[0.06]" />
      <SectionHeading id="vision-title" eyebrow="Our Direction" title="Vision & Mission" tone="light" />
      <BlockRise as="ul" className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {visionMission.map(({ label, text, icon }, i) => (
          <Block as="li" key={label}>
            <FeatureCard accent={i} icon={icon} title={label}>
              {text}
            </FeatureCard>
          </Block>
        ))}
      </BlockRise>
    </Section>
  )
}

/* Core values — each value with a short explanation. */
function Values() {
  return (
    <Section id="values" labelledBy="values-title">
      <SectionHeading id="values-title" eyebrow="What We Stand For" title={values.title} lead={values.intro} />
      <BlockRise as="ul" className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {values.items.map((v, i) => (
          <Block as="li" key={v.name}>
            <FeatureCard accent={i} icon={v.icon} title={v.name}>
              {v.text}
            </FeatureCard>
          </Block>
        ))}
      </BlockRise>
    </Section>
  )
}

/* Why Infyro — text beside an image. */
function Why() {
  return (
    <Section id="why" tone="alt" labelledBy="why-title" className="isolate overflow-hidden">
      <Watermark className="opacity-[0.08]" />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="why-title" eyebrow="Why Choose Us" title={why.title} align="left" />
          <p className="t-lead mt-6 text-ink-2">
            {why.segments.map((s, i) =>
              s.strong ? (
                <strong key={i} className="font-semibold text-ink">
                  {s.text}
                </strong>
              ) : (
                <span key={i}>{s.text}</span>
              ),
            )}
          </p>
        </div>
        <Reveal>
          <img src={whyImg} alt="A team discussing ideas in a workshop" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-card object-cover shadow-soft" />
        </Reveal>
      </div>
    </Section>
  )
}

/* Let's work together — blue band with the logo on the right, clearly separate from the navy footer. */
function WorkTogether() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-brand">
      <div className="container-content grid grid-cols-1 items-center gap-10 py-14 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id="contact-title" className="text-[32px] font-bold leading-tight tracking-[-0.02em] !text-white md:text-[40px]">
            {workTogether.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-white/85 md:text-[16px] t-justify">{workTogether.body}</p>
          <p className="mt-3 text-[16px] font-semibold text-white">{workTogether.sub}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={workTogether.primary.href} variant="light" className="w-full sm:w-auto">
              {workTogether.primary.label}
            </Button>
            <Button href={workTogether.secondary.href} variant="glass" className="w-full sm:w-auto">
              {workTogether.secondary.label}
            </Button>
          </div>
          <div className="mt-7 flex flex-col gap-3 text-[15px] text-white sm:flex-row sm:gap-8">
            <a href={`mailto:${EMAILS.inc}`} className="inline-flex items-center gap-2 font-medium hover:underline">
              <Mail aria-hidden="true" className="h-4 w-4" /> {EMAILS.inc}
            </a>
            <a href={PHONE.href} className="inline-flex items-center gap-2 font-medium hover:underline">
              <Phone aria-hidden="true" className="h-4 w-4" /> {PHONE.display}
            </a>
          </div>
        </div>
        <div className="hidden justify-center lg:col-span-4 lg:flex">
          <Mark size={220} color="#FFFFFF" />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo page="home" />
      <LogoHero />
      <CompanyCards />
      <About />
      <VisionMission />
      <Values />
      <Why />
      <WorkTogether />
    </>
  )
}
