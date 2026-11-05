import { TECH } from '../data.js'
import { Marquee } from '@/components/magicui/marquee'
import { Container, SectionHead } from '../components/ui.jsx'

function Row({ items, reverse }) {
  return (
    <Marquee reverse={reverse} pauseOnHover repeat={3} className={`[--gap:1rem] [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] ${reverse ? '[--duration:50s]' : '[--duration:44s]'}`}>
      {items.map((t) => (
        <span key={t} className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-brand-400/60 hover:bg-brand/15 hover:text-white">
          {t}
        </span>
      ))}
    </Marquee>
  )
}

export default function TechMarquee() {
  const half = Math.ceil(TECH.length / 2)
  return (
    <section id="technologies" className="bg-ink py-20 sm:py-24">
      <Container>
        <SectionHead eyebrow="Technologies We Master" title="Modern tools, chosen for the job" text="Proven technologies that fit your goals and your team." />
      </Container>
      <div className="mt-12 space-y-4">
        <Row items={TECH.slice(0, half)} />
        <Row items={TECH.slice(half)} reverse />
      </div>
    </section>
  )
}
