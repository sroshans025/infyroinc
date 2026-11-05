import { useState } from 'react'
import { PILLARS } from '../data.js'
import Icon from '../components/Icon.jsx'
import { Arrow, Button, Container, SectionHead } from '../components/ui.jsx'

// Interactive explorer: pick a pillar on the left, see the detail on the right.
export default function ServicesExplorer() {
  const [i, setI] = useState(0)
  const p = PILLARS[i]

  return (
    <section id="services" className="relative bg-ink py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="What We Do" title="Our Core Services" text="End-to-end IT solutions engineered to accelerate your business growth." />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div role="tablist" aria-label="Service pillars" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:overflow-visible lg:pb-0">
            {PILLARS.map((x, n) => (
              <button
                key={x.title}
                type="button"
                role="tab"
                id={`pillar-tab-${n}`}
                aria-selected={i === n}
                aria-controls="pillar-panel"
                onClick={() => setI(n)}
                onMouseEnter={() => setI(n)}
                onFocus={() => setI(n)}
                className={`group flex shrink-0 items-center gap-4 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:shrink ${
                  i === n ? 'border-brand-400/60 bg-brand/15 shadow-glow' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${i === n ? 'bg-brand text-white' : 'bg-white/10 text-brand-300'}`}>
                  <Icon name={x.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap font-display text-base font-bold text-white lg:whitespace-normal">{x.short}</span>
                  <span className="mt-0.5 hidden text-sm text-slate-400 lg:block">{x.text}</span>
                </span>
                <Icon name="chevR" className={`ml-auto hidden h-5 w-5 shrink-0 transition lg:block ${i === n ? 'translate-x-1 text-brand-300' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>

          <div id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${i}`} key={i} className="relative animate-pop overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-800 to-navy p-7 sm:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-[90px]" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
              <Icon name={p.icon} className="h-7 w-7" />
            </span>
            <h3 className="relative mt-6 font-display text-2xl font-bold text-white sm:text-3xl">{p.title}</h3>
            <p className="relative mt-3 text-lg text-slate-300">{p.text}</p>
            <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/30 text-brand-200">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="relative mt-7 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                  {t}
                </span>
              ))}
            </div>
            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to={`/contact?service=${encodeURIComponent(p.title)}`}>
                Discuss this service <Arrow />
              </Button>
              <Button to="/services" variant="ghost">
                All services
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
