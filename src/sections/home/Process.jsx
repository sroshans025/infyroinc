import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { STEPS } from '../../data.js'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

// Sticky heading on the left; the steps scroll past on the right while a rail fills.
export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] })

  return (
    <section id="process" className="relative bg-ink py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel index={6}>Our approach</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Four stages.
            <br />
            <span className="text-slate-500">No surprises.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">Each stage ends with something you can review, so you always know where the project stands.</p>
        </div>

        <ol ref={ref} className="relative pl-12 sm:pl-16">
          <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10 sm:left-[19px]" />
          <motion.span aria-hidden="true" style={{ scaleY: scrollYProgress }} className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-brand sm:left-[19px]" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-16 last:pb-0"
            >
              <span className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand bg-ink text-xs font-semibold tabular-nums text-white sm:-left-16 sm:h-10 sm:w-10 sm:text-sm">
                {i + 1}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-400">{s.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((pt) => (
                  <li key={pt} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300">
                    <Icon name="check" className="h-3.5 w-3.5 text-brand-400" strokeWidth={2.6} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
