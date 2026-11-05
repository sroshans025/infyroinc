import { useEffect, useRef } from 'react'
import Counter from '../components/Counter.jsx'
import { prefersReducedMotion, useMouse } from '../components/hooks.js'
import { Arrow, Container } from '../components/ui.jsx'
import { HERO, HERO_STATS, HERO_TECH } from '../data/hero.js'
import LiveBuildPanel from './hero/LiveBuildPanel.jsx'
import MagneticButton from './hero/MagneticButton.jsx'
import ParticleField from './hero/ParticleField.jsx'
import RotatingWord from './hero/RotatingWord.jsx'
import TechMarquee from './hero/TechMarquee.jsx'

// Staggered entrance: fade + 12px rise + blur-in, 70ms apart, one shared easing curve
const RISE = 'animate-rise motion-reduce:animate-none'
const delay = (i) => ({ style: { animationDelay: `${i * 70}ms` } })

export default function Hero() {
  const ref = useRef(null)

  // Cursor spotlight (--mx/--my) is eased inside useMouse
  useMouse(ref, { ease: 0.08 })

  // Scroll parallax: exposes --sy (px scrolled, capped) for the background layers
  useEffect(() => {
    const el = ref.current
    if (prefersReducedMotion()) return
    let raf = 0
    const update = () => {
      raf = 0
      el.style.setProperty('--sy', Math.min(window.scrollY, 900))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-ink" aria-labelledby="hero-title">
      {/* Background layers, drifting slower than the page */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-24 bottom-0 -z-10" style={{ transform: 'translate3d(0, calc(var(--sy, 0) * 0.18px), 0)' }}>
        <div className="hero-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_70%_40%,black,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_80%_30%,rgba(27,131,242,0.2),transparent_70%)]" />
        <ParticleField className="[mask-image:radial-gradient(ellipse_60%_80%_at_75%_45%,black,transparent_80%)]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(560px circle at var(--mx, 72%) var(--my, 28%), rgba(27,131,242,0.15), transparent 65%)' }}
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent" />

      <Container className="grid items-center gap-16 pb-14 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-16 lg:pt-16">
        <div>
          <p {...delay(0)} className={`${RISE} inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-[13px] text-slate-300`}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
            </span>
            {HERO.status}
          </p>

          <h1
            id="hero-title"
            {...delay(1)} className={`${RISE} mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-paper sm:text-6xl lg:text-[4.25rem]`}
          >
            <span className="block">{HERO.lead}</span>
            <RotatingWord words={HERO.words} />
            <span className="block text-balance">{HERO.tail}</span>
          </h1>

          <p {...delay(2)} className={`${RISE} mt-7 max-w-[34rem] text-base leading-relaxed text-slate-400 sm:text-lg`}>
            {HERO.sub}
          </p>

          <div {...delay(3)} className={`${RISE} mt-9 flex flex-col gap-3 sm:flex-row sm:items-center`}>
            <MagneticButton to={HERO.primaryCta.to}>
              {HERO.primaryCta.label} <Arrow />
            </MagneticButton>
            <a
              href={HERO.secondaryCta.href}
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-base font-semibold text-paper transition duration-200 hover:border-white/25 hover:bg-white/[0.07] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {HERO.secondaryCta.label}
              <Arrow className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>

        <div {...delay(3)} className={`${RISE} mx-auto w-full max-w-xl lg:max-w-none`}>
          <LiveBuildPanel />
          <p className="mt-10 hidden font-mono text-xs text-slate-500 md:block">// {HERO.tagline}</p>
        </div>
      </Container>

      <Container className="pb-8">
        <div {...delay(5)} className={`${RISE} flex flex-col gap-6 border-t border-white/[0.08] pt-6 lg:flex-row lg:items-center lg:gap-10`}>
          <dl className="grid shrink-0 grid-cols-3 gap-6 lg:gap-10">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-0.5 text-xs text-slate-400">{s.label}</dt>
                <dd className="font-hero text-2xl font-semibold tabular-nums tracking-tight text-paper sm:text-3xl">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="min-w-0 flex-1 lg:border-l lg:border-white/[0.08] lg:pl-10">
            <TechMarquee items={HERO_TECH} />
          </div>
          <div aria-hidden="true" className="hidden shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-500 lg:flex">
            Scroll
            <span className="relative h-8 w-px overflow-hidden bg-white/10">
              <span className="absolute inset-0 animate-cue bg-brand-400 motion-reduce:animate-none" />
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
