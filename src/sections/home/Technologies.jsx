import { motion } from 'framer-motion'
import { Marquee } from '@/components/magicui/marquee'
import { TECH_GROUPS } from '../../data/home.js'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

const ALL = TECH_GROUPS.flatMap((g) => g.items)

// Oversized outlined type in motion, then the stack grouped by layer.
export default function Technologies() {
  return (
    <section id="technologies" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <Container>
        <SectionLabel index={4}>Technologies</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
          Proven tools, <span className="text-slate-500">chosen for the job rather than the trend.</span>
        </h2>
      </Container>

      <div className="mt-14 space-y-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
        <Marquee repeat={2} className="[--duration:70s] [--gap:3rem]">
          {ALL.slice(0, 11).map((t) => (
            <span key={t} className="shrink-0 text-6xl font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(173,209,250,0.35)] sm:text-8xl">
              {t}
            </span>
          ))}
        </Marquee>
        <Marquee repeat={2} reverse className="[--duration:80s] [--gap:3rem]">
          {ALL.slice(11).map((t) => (
            <span key={t} className="shrink-0 text-6xl font-bold tracking-[-0.04em] text-white/[0.06] sm:text-8xl">
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      <Container>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {TECH_GROUPS.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-navy p-6"
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-brand-300">{g.label}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((t) => (
                  <li key={t} className="text-[15px] text-slate-300 transition-colors hover:text-white">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
