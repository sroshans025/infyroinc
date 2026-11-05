import { useEffect, useState } from 'react'
import { STEPS } from '../data.js'
import Icon from '../components/Icon.jsx'
import { prefersReducedMotion } from '../components/hooks.js'
import { Container, SectionHead } from '../components/ui.jsx'

// Interactive stepper. Auto-advances until the visitor takes control.
export default function ProcessStepper() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(!prefersReducedMotion())

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), 4500)
    return () => clearInterval(id)
  }, [auto])

  const pick = (n) => {
    setAuto(false)
    setI(n)
  }
  const s = STEPS[i]

  return (
    <section id="process" className="relative bg-ink py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="Our Process" title="How We Deliver" text="Four stages, each ending with something you can review, so you always know where the project stands." />

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 h-0.5 bg-white/10">
              <div className="h-full bg-gradient-to-r from-brand-400 to-brand-200 transition-all duration-700" style={{ width: `${(i / (STEPS.length - 1)) * 100}%` }} />
            </div>
            <div role="tablist" aria-label="Delivery process" className="relative grid grid-cols-4">
              {STEPS.map((x, n) => (
                <button
                  key={x.title}
                  type="button"
                  role="tab"
                  aria-selected={i === n}
                  aria-controls="step-panel"
                  onClick={() => pick(n)}
                  className="group flex flex-col items-center gap-3 focus:outline-none"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-bold ring-8 ring-ink transition duration-300 group-focus-visible:ring-brand-400 ${
                      n < i ? 'bg-brand text-white' : n === i ? 'scale-110 bg-brand text-white shadow-glow' : 'bg-navy-700 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {n < i ? <Icon name="check" className="h-6 w-6" strokeWidth={3} /> : n + 1}
                  </span>
                  <span className={`text-sm font-semibold transition sm:text-base ${i === n ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{x.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div id="step-panel" role="tabpanel" key={i} className="mt-12 animate-pop rounded-3xl border border-white/10 bg-gradient-to-br from-navy-800 to-navy p-7 sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
                  Step {i + 1} of {STEPS.length}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-300">{s.text}</p>
              </div>
              <ul className="space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-200">
                    <Icon name="check" className="h-4 w-4 shrink-0 text-brand-300" strokeWidth={2.8} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <button type="button" onClick={() => pick((i + STEPS.length - 1) % STEPS.length)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white">
                <Icon name="chevL" className="h-4 w-4" /> Previous
              </button>
              <button type="button" onClick={() => setAuto((v) => !v)} className="text-xs font-medium text-slate-500 hover:text-slate-300">
                {auto ? 'Pause auto-play' : 'Auto-play off'}
              </button>
              <button type="button" onClick={() => pick((i + 1) % STEPS.length)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white">
                Next <Icon name="chevR" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
