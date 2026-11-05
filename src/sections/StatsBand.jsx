import { CONFIG } from '../config.js'
import { INDUSTRIES } from '../data.js'
import Counter from '../components/Counter.jsx'
import Reveal from '../components/Reveal.jsx'
import { Container } from '../components/ui.jsx'

// Animated figures + industries ticker directly under the hero.
export default function StatsBand() {
  const doubled = [...INDUSTRIES, ...INDUSTRIES]
  return (
    <section id="stats" className="relative border-y border-white/10 bg-navy">
      <Container className="grid grid-cols-2 gap-px py-12 lg:grid-cols-4">
        {CONFIG.stats.map((s, n) => (
          <Reveal key={s.label} delay={n * 90} className="px-4 py-3 text-center">
            <div className="font-display text-4xl font-bold text-white sm:text-5xl">
              <span className="gradient-text">
                <Counter value={s.value} />
              </span>
            </div>
            <div className="mt-2 text-sm font-medium text-slate-400">{s.label}</div>
          </Reveal>
        ))}
      </Container>

      <div className="overflow-hidden border-t border-white/10 py-5" aria-label="Industries we serve">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {doubled.map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t}
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
