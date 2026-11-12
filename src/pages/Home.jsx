import { ArrowRight, ChevronRight, Mail, Phone } from 'lucide-react'
import Seo from '../components/layout/Seo'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import SmartLink from '../components/ui/SmartLink'
import Button, { ButtonGroup } from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import Mark from '../components/brand/Mark'
import BrandLogo from '../components/brand/BrandLogo'
import { BlockRise, Block } from '../components/precision/Primitives'
import { hero, about, companies, values, visionMission, why, workTogether } from '../data/inc'
import { PHONE, EMAILS } from '../data/contact'
import techImg from '../assets/images/home/tech.webp'
import studiosImg from '../assets/images/home/studios.webp'
import constructionImg from '../assets/images/home/construction.webp'
import whyImg from '../assets/images/home/why.webp'

const COMPANY_IMG = { tech: techImg, studios: studiosImg, construction: constructionImg }

/* Hero — the logo is the focus; plain background, no motion. */
function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="bg-white pt-[var(--nav-h)]">
      <div className="container-content flex flex-col items-center py-14 text-center md:py-20">
        <Mark size={132} className="h-[96px] w-auto md:h-[132px]" />
        <h1 id="hero-title" className="t-display mt-8 max-w-4xl">
          {hero.lines[0]} <span className="text-brand">{hero.lines[1]}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-muted md:text-[17px]">{hero.lead}</p>
        <ButtonGroup primary={hero.primary} secondary={hero.secondary} align="center" className="mt-8 w-full sm:w-auto" />
      </div>
    </section>
  )
}

/* Companies bar — the three companies in clean, readable type. */
function CompaniesBar() {
  return (
    <nav aria-label="Our companies" className="border-y border-line bg-paper-2">
      <ul className="container-content grid grid-cols-1 divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {companies.items.map((c) => (
          <li key={c.key}>
            <SmartLink href={c.href} className="group flex items-center justify-between gap-4 py-5 lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <span>
                <span className="block text-[17px] font-semibold text-ink group-hover:text-brand-ink">{c.name}</span>
                <span className="mt-0.5 block text-[14px] text-muted">{c.tagline}</span>
              </span>
              <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-subtle group-hover:text-brand-ink" />
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* Company cards — photo, logo, tagline, description; the whole card is a link. */
function CompanyCards() {
  return (
    <Section id="companies" labelledBy="companies-title">
      <SectionHeading id="companies-title" eyebrow={companies.eyebrow} title={companies.title} />
      <BlockRise as="ul" className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3">
        {companies.items.map((c) => (
          <Block as="li" key={c.key}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow hover:shadow-card md:flex-row lg:flex-col">
              <img src={COMPANY_IMG[c.key]} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover md:aspect-auto md:w-2/5 lg:aspect-[16/10] lg:w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3>
                  <BrandLogo brand={c.key} size="nav" />
                </h3>
                <p className="mt-4 text-[15px] font-semibold text-brand-ink">{c.tagline}</p>
                <p className="mt-2 text-[14px] leading-[1.65] text-muted">{c.description}</p>
                <SmartLink href={c.href} className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-ink after:absolute after:inset-0 after:content-[''] group-hover:text-brand-ink">
                  {c.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </SmartLink>
              </div>
            </article>
          </Block>
        ))}
      </BlockRise>
    </Section>
  )
}

/* About — preserved layout: statement, two paragraphs, three focus tiles, closing paragraph. */
function About() {
  return (
    <Section id="about" tone="alt" labelledBy="about-title">
      <Reveal className="max-w-4xl">
        <p className="t-eyebrow text-brand-ink">{about.eyebrow}</p>
        <h2 id="about-title" className="mt-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[34px] lg:text-[40px]">
          {about.statement}
        </h2>
        <span aria-hidden="true" className="title-rule" />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        {about.paragraphs.map((p) => (
          <Reveal as="p" key={p.slice(0, 24)} className="t-lead text-ink-2">
            {p}
          </Reveal>
        ))}
      </div>

      <BlockRise as="ul" className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {about.pillars.map((p) => (
          <Block as="li" key={p.key}>
            <div className="h-full rounded-card border border-line bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-navy">
                  <Mark size={20} />
                </span>
                <h3 className="text-[16px] font-semibold text-ink">{p.label}</h3>
              </div>
              <p className="mt-4 text-[14px] leading-[1.7] text-muted">{p.text}</p>
            </div>
          </Block>
        ))}
      </BlockRise>

      <Reveal as="p" className="t-lead mt-10 text-ink-2">
        {about.closingParagraph}
      </Reveal>
    </Section>
  )
}

/* Vision & Mission — compact cards on a dark band. */
function VisionMission() {
  return (
    <Section id="vision" tone="dark" labelledBy="vision-title">
      <SectionHeading id="vision-title" eyebrow="Our Direction" title="Vision & Mission" tone="light" />
      <BlockRise as="ul" className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {visionMission.map(({ label, text, icon: Icon }) => (
          <Block as="li" key={label}>
            <div className="h-full rounded-card border border-white/10 bg-white/[0.04] p-7 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-brand">
                  <Icon aria-hidden="true" className="h-5 w-5 text-white" strokeWidth={1.75} />
                </span>
                <h3 className="text-[20px] font-semibold !text-white">{label}</h3>
              </div>
              <p className="mt-5 text-[16px] leading-[1.75] text-white/80 md:text-[17px]">{text}</p>
            </div>
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
        {values.items.map((v) => (
          <Block as="li" key={v.name}>
            <div className="h-full rounded-card border border-line bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-navy">
                <v.icon aria-hidden="true" className="h-5 w-5 text-[#5AA9FF]" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-ink">{v.name}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-muted">{v.text}</p>
            </div>
          </Block>
        ))}
      </BlockRise>
      <p className="mt-10 text-center text-[16px] font-semibold text-ink">{values.closing}</p>
    </Section>
  )
}

/* Why Infyro — text beside an image. */
function Why() {
  return (
    <Section id="why" tone="alt" labelledBy="why-title">
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
          <img src={whyImg} alt="A team discussing ideas in a workshop" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-card object-cover" />
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
      <Hero />
      <CompaniesBar />
      <CompanyCards />
      <About />
      <VisionMission />
      <Values />
      <Why />
      <WorkTogether />
    </>
  )
}
