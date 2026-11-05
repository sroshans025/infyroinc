import CtaBand from '../components/CtaBand.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { usePageMeta } from '../components/hooks.js'
import { Container, IconBox, SectionHead } from '../components/ui.jsx'
import { FACTS, MILESTONES, PILLARS, VALUES } from '../data.js'

export default function About() {
  usePageMeta('About', 'A privately held IT services and consulting firm in Tiruchirappalli, built to be the agile technology partner for SMEs and early-stage startups.')
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About"
        accent="INFYRO"
        text="A privately held IT services and consulting firm headquartered in Tiruchirappalli, Tamil Nadu, built to be the agile technology partner for SMEs and early-stage startups."
      />

      <section className="bg-ink py-20 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">Who We Are</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">An agile tech partner for growing businesses</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Founded in November 2025, INFYRO is a privately held IT services and consulting firm operating as an agile tech partner for small-to-medium enterprises (SMEs) and early-stage startups. We specialize in digital transformation and custom corporate automation.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Our core philosophy is simple: build scalable, zero-friction software architectures that optimize business operating models. Every solution we deliver is engineered to reduce operational overhead and accelerate growth.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {FACTS.map((f, n) => (
              <Reveal key={f.label} delay={n * 80}>
                <SpotlightCard className="h-full p-6">
                  <IconBox name={f.icon} className="!h-11 !w-11" />
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{f.label}</div>
                  <div className="mt-1 font-display text-lg font-bold text-white">{f.value}</div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-navy py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { icon: 'target', title: 'Our Mission', text: 'To empower SMEs and startups with scalable, zero-friction software architectures that optimize their business operating models, transforming digital challenges into measurable competitive advantages.' },
            { icon: 'rocket', title: 'Our Vision', text: "To become the most trusted agile technology partner for emerging businesses across India, recognized for delivering production-ready solutions that scale with our clients' ambitions." },
          ].map((m, n) => (
            <Reveal key={m.title} delay={n * 100}>
              <SpotlightCard className="h-full bg-gradient-to-br from-navy-800 to-navy p-8 sm:p-10">
                <IconBox name={m.icon} />
                <h3 className="mt-6 font-display text-2xl font-bold text-white">{m.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-300">{m.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="Six Operational Pillars" title="Where our expertise lives" text="Our technological solutions are structured around six key areas of expertise." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, n) => (
              <Reveal key={p.title} delay={(n % 3) * 90}>
                <SpotlightCard className="h-full p-7">
                  <IconBox name={p.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-navy py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="What Drives Us" title="Our Core Values" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, n) => (
              <Reveal key={v.title} delay={n * 90}>
                <SpotlightCard className="h-full p-7 text-center">
                  <IconBox name={v.icon} className="mx-auto" />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{v.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="Our Journey" title="Company Milestones" />
          <ol className="relative mx-auto mt-14 max-w-3xl border-l border-white/15 pl-8 sm:pl-10">
            {MILESTONES.map((m, n) => (
              <Reveal as="li" key={m.title} delay={n * 90} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-ink sm:-left-[3.05rem]">
                  <Icon name="check" className="h-3 w-3 text-white" strokeWidth={3.5} />
                </span>
                <span className="inline-block rounded-full border border-brand-400/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand-200">{m.year}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{m.title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-400">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
