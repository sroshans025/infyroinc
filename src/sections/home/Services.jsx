import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { SERVICE_GROUPS, SERVICES } from '../../data.js'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

const EASE = [0.22, 1, 0.36, 1]

// Index-style service list. Desktop: hovering a row drives a sticky detail panel.
// Touch: tapping a row expands it inline.
export default function Services() {
  const [group, setGroup] = useState('All')
  const list = group === 'All' ? SERVICES : SERVICES.filter((s) => s.group === group)
  const [active, setActive] = useState(SERVICES[0].title)
  const current = list.find((s) => s.title === active) || list[0]

  const pick = (g) => {
    setGroup(g)
    const first = g === 'All' ? SERVICES[0] : SERVICES.find((s) => s.group === g)
    setActive(first.title)
  }

  return (
    <section id="services" className="relative bg-ink py-24 sm:py-32">
      <Container>
        <SectionLabel index={3}>Services</SectionLabel>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            {SERVICES.length} services, <span className="text-slate-500">picked to fit the problem.</span>
          </h2>
          <LayoutGroup id="svc">
            <div role="radiogroup" aria-label="Filter services" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {SERVICE_GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={group === g}
                  onClick={() => pick(g)}
                  className={`relative min-h-[40px] shrink-0 rounded-full px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${group === g ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {group === g && <motion.span layoutId="svc-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }} />}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ul className="border-t border-white/10">
            {list.map((s, i) => {
              const on = current.title === s.title
              return (
                <li key={s.title} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={on}
                    onMouseEnter={() => setActive(s.title)}
                    onFocus={() => setActive(s.title)}
                    onClick={() => setActive(s.title)}
                    className="group flex w-full items-center gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400 sm:gap-6"
                  >
                    <span className="w-7 shrink-0 text-xs tabular-nums text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`flex-1 text-lg font-medium tracking-tight transition-all duration-300 sm:text-2xl ${on ? 'translate-x-1 text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{s.title}</span>
                    <span className="hidden rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-500 sm:inline">{s.tag}</span>
                    <Icon name="arrow" className={`h-4 w-4 shrink-0 transition-all duration-300 ${on ? 'translate-x-0 text-brand-400 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden pl-11 pr-4 text-sm leading-relaxed text-slate-400 sm:pl-[3.25rem] lg:hidden"
                      >
                        <span className="block pb-5">{s.text}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-navy-800 to-navy p-10">
              <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_80%_10%,black,transparent_60%)]" />
              <AnimatePresence mode="wait">
                <motion.div key={current.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-cta">
                    <Icon name={current.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-300">{current.group}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{current.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-300">{current.text}</p>
                  <a href="#contact" className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                    Discuss this service
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
