import { motion } from 'framer-motion'
import { CONFIG } from '../../config.js'
import { WHY } from '../../data.js'
import Counter from '../../components/Counter.jsx'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

// A full-bleed blue statement band: the one place the brand blue floods the page.
export default function WhyInfyro() {
  return (
    <section id="why" className="relative isolate overflow-hidden bg-brand-700 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgba(255,255,255,0.22),transparent_60%),radial-gradient(ellipse_60%_70%_at_0%_100%,rgba(4,16,32,0.45),transparent_60%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container>
        <SectionLabel index={7} className="!text-white/70 [&>span:first-child]:!text-white [&>span:nth-child(2)]:!bg-white/40">
          Why INFYRO
        </SectionLabel>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">Small enough to care. Structured enough to deliver.</h2>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-white/25 pt-10 lg:grid-cols-4">
          {CONFIG.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-white/75">{s.label}</dt>
              <dd className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                <Counter value={s.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-ink/25 p-6 ring-1 ring-inset ring-white/15 backdrop-blur-sm transition-colors hover:bg-ink/35"
            >
              <Icon name={w.icon} className="h-6 w-6" />
              <h3 className="mt-6 text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
