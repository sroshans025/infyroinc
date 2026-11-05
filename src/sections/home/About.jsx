import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FACTS, MILESTONES } from '../../data.js'
import { MANIFESTO } from '../../data/home.js'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="motion-reduce:!opacity-100">
      {children}{' '}
    </motion.span>
  )
}

// Manifesto that lights up word by word as it scrolls through the viewport, then facts and a timeline.
export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = MANIFESTO.split(' ')

  return (
    <section id="about" className="relative bg-ink py-24 sm:py-32">
      <Container>
        <SectionLabel index={1}>About INFYRO</SectionLabel>
        <p ref={ref} className="mt-10 max-w-5xl text-[1.75rem] font-semibold leading-[1.18] tracking-[-0.025em] text-white sm:text-4xl lg:text-[3.4rem]">
          <span className="sr-only">{MANIFESTO}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </span>
        </p>

        <dl className="mt-16 grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <div key={f.label} className={`flex flex-col-reverse gap-2 py-6 pr-4 ${i % 2 ? 'border-l border-white/10 pl-5 sm:pl-6' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}>
              <dd className="text-base font-semibold text-white sm:text-lg">{f.value}</dd>
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                <Icon name={f.icon} className="h-3.5 w-3.5 text-brand-400" />
                {f.label}
              </dt>
            </div>
          ))}
        </dl>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-brand via-brand-400/50 to-transparent lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.title}
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative z-10 block h-[15px] w-[15px] rounded-full border-2 border-brand bg-ink" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold tabular-nums text-brand-300">{m.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.text}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
