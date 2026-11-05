import { motion } from 'framer-motion'
import { PILLARS } from '../../data.js'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

// Small diagrammatic visuals, one per pillar, drawn with CSS so they stay crisp and light.
function Visual({ kind }) {
  if (kind === 'code')
    return (
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-ink/60 p-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2">
          <div className="space-y-1.5">
            {[70, 50, 80, 40].map((w, i) => (
              <span key={i} className="block h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="space-y-2">
            <span className="block h-12 rounded bg-brand/25 transition-colors duration-500 group-hover:bg-brand/45" />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-7 rounded bg-white/[0.06] transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 70}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  if (kind === 'mobile')
    return (
      <div className="relative h-28 w-16 rounded-[14px] border border-white/15 bg-ink/60 p-1.5 transition-transform duration-500 group-hover:-rotate-6">
        <span className="mx-auto block h-1 w-5 rounded bg-white/15" />
        <span className="mt-2 block h-8 rounded-md bg-brand/35" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-white/10" />
        <span className="mt-1 block h-1.5 w-3/5 rounded bg-white/10" />
      </div>
    )
  if (kind === 'ai')
    return (
      <div className="relative h-24 w-24">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute inset-0 rounded-full border border-brand-400/30 transition-transform duration-700 group-hover:scale-110" style={{ transform: `scale(${1 - i * 0.28})`, transitionDelay: `${i * 80}ms` }} />
        ))}
        <span className="absolute inset-[38%] rounded-full bg-brand shadow-glow" />
      </div>
    )
  if (kind === 'chart')
    return (
      <div className="flex h-24 items-end gap-2">
        {[40, 65, 50, 85, 70].map((h, i) => (
          <span key={i} className="w-4 origin-bottom rounded-t bg-gradient-to-t from-brand/30 to-brand-400 transition-transform duration-500 group-hover:scale-y-110" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
        ))}
      </div>
    )
  if (kind === 'cloud')
    return (
      <div className="relative h-24 w-32">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute inset-x-0 h-8 rounded-md border border-white/15 bg-ink/70 transition-transform duration-500 [transform:skewY(-8deg)] group-hover:[transform:skewY(-8deg)_translateY(var(--lift))]" style={{ top: `${i * 22}px`, '--lift': `${-i * 6}px` }}>
            <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-400" />
          </span>
        ))}
      </div>
    )
  return (
    <div className="flex w-full max-w-xs items-center">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-1 items-center last:flex-none">
          <span className={`h-3 w-3 shrink-0 rounded-full border-2 ${i === 3 ? 'border-brand bg-brand' : 'border-brand-400 bg-ink'}`} />
          {i < 3 && <span className="h-px flex-1 origin-left bg-brand-400/50 transition-transform duration-700 group-hover:scale-x-100 sm:scale-x-50" />}
        </div>
      ))}
    </div>
  )
}

// Bento layout: one flagship cell, five supporting cells of differing shapes.
const LAYOUT = [
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
]

function onSpot(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`)
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-navy py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index={2}>What we do</SectionLabel>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Six disciplines.
              <br />
              <span className="text-slate-500">One accountable team.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-slate-400 lg:justify-self-end">
            Most projects touch more than one of these. You get a single team that plans, builds and supports the whole thing, instead of stitching vendors together.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(15rem,auto)] lg:grid-cols-6">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              onPointerMove={onSpot}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink/60 p-6 transition-colors duration-300 hover:border-brand-400/40 sm:p-7 ${LAYOUT[i]} ${i === 0 ? 'sm:col-span-2' : ''}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(380px circle at var(--sx, 50%) var(--sy, 50%), rgba(27,131,242,0.14), transparent 60%)' }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-300">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="text-xs tabular-nums text-slate-600">0{i + 1}</span>
              </div>

              <div className={`relative flex flex-1 items-center justify-center ${i === 0 ? 'py-10 lg:py-12' : 'py-8'}`} aria-hidden="true">
                <Visual kind={p.icon} />
              </div>

              <div className="relative">
                <h3 className={`font-semibold tracking-tight text-white ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                {i === 0 ? (
                  <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-slate-300 sm:grid-cols-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 shrink-0 text-brand-400" strokeWidth={2.4} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-xs text-slate-500">{p.stack.join(' · ')}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
