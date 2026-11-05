import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../data.js'
import Icon from '../components/Icon.jsx'
import { prefersReducedMotion } from '../components/hooks.js'
import { Container, SectionHead } from '../components/ui.jsx'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(id)
  }, [paused, n])

  const t = TESTIMONIALS[i]
  const key = (e) => {
    if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
    if (e.key === 'ArrowLeft') setI((v) => (v + n - 1) % n)
  }

  return (
    <section id="testimonials" className="relative isolate overflow-hidden bg-navy py-20 sm:py-28">
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <Container>
        <SectionHead eyebrow="Testimonials" title="What Our Clients Say" />

        <div
          className="mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={key}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
        >
          <figure key={i} className="relative animate-pop rounded-3xl border border-white/10 bg-gradient-to-br from-navy-800 to-ink p-8 shadow-2xl sm:p-12">
            <Icon name="quote" className="absolute right-8 top-8 h-12 w-12 text-brand/25" />
            <div className="flex gap-1 text-amber-300" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, k) => (
                <Icon key={k} name="star" className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-xl font-semibold leading-relaxed text-white sm:text-2xl">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 font-display font-bold text-white">{t.avatar}</span>
              <span>
                <span className="block font-semibold text-white">{t.name}</span>
                <span className="text-sm text-slate-400">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" aria-label="Previous testimonial" onClick={() => setI((v) => (v + n - 1) % n)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-brand-400 hover:text-white">
              <Icon name="chevL" className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((x, k) => (
                <button key={x.name} type="button" aria-label={`Show testimonial ${k + 1}`} aria-current={i === k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${i === k ? 'w-8 bg-brand-400' : 'w-2 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
            <button type="button" aria-label="Next testimonial" onClick={() => setI((v) => (v + 1) % n)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-brand-400 hover:text-white">
              <Icon name="chevR" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
