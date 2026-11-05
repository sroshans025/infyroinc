import { INTERN_TRACKS } from '../data.js'
import Icon from '../components/Icon.jsx'
import ParticleField from '../components/ParticleField.jsx'
import Reveal from '../components/Reveal.jsx'
import { Arrow, Button, Container } from '../components/ui.jsx'

export default function CareersBand() {
  return (
    <section id="careers-band" className="bg-navy py-20 sm:py-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700 via-brand-800 to-navy px-6 py-12 sm:px-12 sm:py-16">
          <ParticleField className="-z-10 opacity-40" density={13000} />
          <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px]" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                <Icon name="school" className="h-4 w-4" /> 2026 Training &amp; Internship Program
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Launch your tech career with INFYRO</h2>
              <p className="mt-4 max-w-xl text-lg text-brand-100">
                A structured learning and development program for upcoming engineering graduates. Work on simulated live projects and build production-ready habits.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/careers" variant="white" size="lg">
                  Explore careers <Arrow />
                </Button>
                <Button to="/contact?service=Career%20%2F%20Internship" variant="ghost" size="lg">
                  Ask HR
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {INTERN_TRACKS.map((t) => (
                <li key={t.title} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-white">{t.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
