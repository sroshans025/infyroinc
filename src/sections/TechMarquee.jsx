import { TECH } from '../data.js'
import { Container, SectionHead } from '../components/ui.jsx'

function Row({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {doubled.map((t, i) => (
          <span key={i} className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-brand-400/60 hover:bg-brand/15 hover:text-white">
            {t}
          </span>
        ))}
      </div>
    </div>
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
