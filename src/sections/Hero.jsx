import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONFIG } from '../config.js'
import { ROTATING } from '../data.js'
import Icon from '../components/Icon.jsx'
import Magnetic from '../components/Magnetic.jsx'
import ParticleField from '../components/ParticleField.jsx'
import { prefersReducedMotion, useTyped } from '../components/hooks.js'
import { Arrow, Button, Container } from '../components/ui.jsx'

// Tokens for the live "terminal" card: [text, colour class]
const CODE = [
  [['const ', 'text-brand-300'], ['solution ', 'text-white'], ['= {', 'text-slate-400']],
  [['  client: ', 'text-sky-300'], ['"Your Business"', 'text-emerald-300'], [',', 'text-slate-400']],
  [['  stack: ', 'text-sky-300'], ['["Web", "AI", "Cloud"]', 'text-emerald-300'], [',', 'text-slate-400']],
  [['  delivery: ', 'text-sky-300'], ['"On Time"', 'text-emerald-300'], [',', 'text-slate-400']],
  [['  quality: ', 'text-sky-300'], ['"Production-ready"', 'text-emerald-300'], [',', 'text-slate-400']],
  [['}', 'text-slate-400']],
  [['// ✓ Powered by INFYRO', 'text-slate-500']],
]
const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0), 0)

function useTypedCode() {
  const [n, setN] = useState(prefersReducedMotion() ? TOTAL : 0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setN((v) => (v >= TOTAL + 70 ? 0 : v + 1)), 38)
    return () => clearInterval(id)
  }, [])
  return n
}

function Terminal() {
  const n = useTypedCode()
  let left = n
  return (
    <div className="whitespace-pre font-mono text-[12.5px] leading-7 sm:text-[13px]">
      {CODE.map((line, i) => {
        const out = line.map(([t, c], k) => {
          const part = t.slice(0, Math.max(0, left))
          left -= t.length
          return (
            <span key={k} className={c}>
              {part}
            </span>
          )
        })
        return <div key={i}>{out}&nbsp;</div>
      })}
    </div>
  )
}

export default function Hero() {
  const word = useTyped(ROTATING)

  const onMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2)
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--px', 0)
    e.currentTarget.style.setProperty('--py', 0)
  }
  const shift = (x, y) => ({ transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)` })

  return (
    <section id="top" onMouseMove={onMove} onMouseLeave={onLeave} className="relative isolate flex min-h-[min(calc(100vh-68px),52rem)] items-center overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-[560px] w-[560px] animate-glow rounded-full bg-brand/40 blur-[140px] motion-reduce:animate-none" />
      <div aria-hidden="true" className="absolute -right-32 top-1/3 -z-10 h-[460px] w-[460px] animate-glow rounded-full bg-sky-500/25 blur-[130px] [animation-delay:2s] motion-reduce:animate-none" />
      <div aria-hidden="true" className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent_80%)]" />
      <ParticleField className="-z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <Container className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        <div>
          <Link
            to="/careers"
            className="group inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 backdrop-blur transition hover:border-brand-400/60 motion-reduce:animate-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Internship Program Open
            <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-6 animate-fade-up font-display text-4xl font-bold leading-[1.08] tracking-tight text-white [animation-delay:100ms] motion-reduce:animate-none sm:text-5xl xl:text-[3.6rem]">
            Innovating Ideas Into <span className="gradient-text">Digital Reality</span>
          </h1>

          <p className="mt-6 animate-fade-up text-lg text-slate-300 [animation-delay:200ms] motion-reduce:animate-none sm:text-xl">
            We build{' '}
            <span className="font-semibold text-white">
              {word}
              <span aria-hidden="true" className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-brand-400" />
            </span>
          </p>

          <p className="mt-4 max-w-xl animate-fade-up text-base leading-relaxed text-slate-400 [animation-delay:300ms] motion-reduce:animate-none sm:text-lg">
            Transform your business with enterprise-grade software, cloud infrastructure, and AI-powered innovations, built for SMEs and startups.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:400ms] motion-reduce:animate-none sm:flex-row sm:items-center">
            <Magnetic>
              <Button to="/contact" size="lg">
                Start Your Project <Arrow />
              </Button>
            </Magnetic>
            <Button to="/services" variant="ghost" size="lg">
              Explore Services
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl animate-fade-up grid-cols-2 gap-5 border-t border-white/10 pt-8 [animation-delay:500ms] motion-reduce:animate-none sm:grid-cols-4">
            {CONFIG.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-white">{s.value}</dt>
                <dd className="mt-0.5 text-xs text-slate-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Interactive visual: tilts and floats with the cursor */}
        <div className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:300ms] motion-reduce:animate-none lg:max-w-none" aria-hidden="true">
          <div className="absolute inset-6 -z-10 rounded-[2rem] bg-brand/30 blur-3xl" />

          <div style={{ transform: 'perspective(1100px) rotateX(calc(var(--py, 0) * -4deg)) rotateY(calc(var(--px, 0) * 5deg))', transition: 'transform .15s ease-out' }}>
            <div className="rounded-2xl border border-white/10 bg-navy-800/80 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-[11px] text-slate-400">infyro-solution.ts</span>
              </div>
              <div className="p-5 sm:p-7">
                <Terminal />
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {[
                    ['Plan', 100],
                    ['Build', 72],
                    ['Deploy', 46],
                  ].map(([k, p], n) => (
                    <div key={k}>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                        {k}
                        <span className="text-brand-300">{p}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full origin-left animate-bar rounded-full bg-gradient-to-r from-brand-500 to-cyan-300 motion-reduce:animate-none" style={{ width: `${p}%`, animationDelay: `${600 + n * 200}ms` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 -top-7 hidden sm:block lg:-right-8" style={shift(-18, -12)}>
            <div className="w-56 animate-float-slow rounded-xl border border-white/10 bg-white/95 p-3.5 shadow-2xl motion-reduce:animate-none">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
                  <Icon name="ai" className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-navy">AI &amp; Automation</span>
              </div>
              <div className="mt-2.5 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">Automate our invoice approvals.</div>
              <div className="mt-1.5 rounded-lg bg-brand px-3 py-2 text-xs text-white">Workflow is live. Approvals now take minutes.</div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-3 hidden sm:block lg:-left-10" style={shift(22, 14)}>
            <div className="flex animate-float items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur motion-reduce:animate-none">
              <Icon name="check" className="h-4 w-4" strokeWidth={3} /> Delivered On Time
            </div>
          </div>

          <div className="absolute -right-2 bottom-12 hidden md:block lg:-right-7" style={shift(-26, 18)}>
            <div className="flex animate-float-slow items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur [animation-delay:1s] motion-reduce:animate-none">
              <Icon name="cloud" className="h-4 w-4 text-brand-300" /> Cloud ready
            </div>
          </div>

          <div className="absolute -left-4 top-10 hidden md:block lg:-left-9" style={shift(16, -10)}>
            <div className="flex animate-float items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur [animation-delay:2s] motion-reduce:animate-none">
              <Icon name="rocket" className="h-4 w-4 text-brand-300" /> Built to scale
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
