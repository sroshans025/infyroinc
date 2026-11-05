import { useMemo, useState } from 'react'
import CtaBand from '../components/CtaBand.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { usePageMeta } from '../components/hooks.js'
import { Arrow, Chip, Container, IconBox } from '../components/ui.jsx'
import { Link } from 'react-router-dom'
import { SERVICES, SERVICE_GROUPS } from '../data.js'
import ProcessStepper from '../sections/ProcessStepper.jsx'
import TechMarquee from '../sections/TechMarquee.jsx'

export default function Services() {
  usePageMeta('Services', 'Custom software, mobile apps, AI & automation, data & BI, cloud & DevOps, design and IT consulting. A full-spectrum IT services company.')
  const [group, setGroup] = useState('All')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return SERVICES.filter((s) => (group === 'All' || s.group === group) && (!term || `${s.title} ${s.text} ${s.tag}`.toLowerCase().includes(term)))
  }, [group, q])

  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Services"
        accent="That Scale."
        text="A full-spectrum IT services company, from custom software and mobile apps to AI, cloud, design, and consulting. Pick a service and our team will reach out within one business day with a tailored proposal."
      />

      <section className="bg-ink py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter services">
              {SERVICE_GROUPS.map((g) => (
                <Chip key={g} active={group === g} onClick={() => setGroup(g)}>
                  {g}
                </Chip>
              ))}
            </div>
            <label className="relative block w-full lg:w-72">
              <span className="sr-only">Search services</span>
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand/15"
              />
            </label>
          </div>

          <p className="mt-6 text-sm text-slate-500" aria-live="polite">
            Showing {list.length} of {SERVICES.length} services
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <SpotlightCard key={s.title} className="group flex animate-pop flex-col p-7">
                <div className="flex items-start justify-between">
                  <IconBox name={s.icon} />
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{s.tag}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate-400">{s.text}</p>
                <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition group-hover:gap-3">
                  Get started <Arrow />
                </Link>
              </SpotlightCard>
            ))}
          </div>
          {list.length === 0 && <p className="mt-10 text-center text-slate-400">No services match your search. Try a different keyword.</p>}
        </Container>
      </section>

      <ProcessStepper />
      <TechMarquee />
      <CtaBand eyebrow="Ready to Start?" title="Let's build something" accent="that scales." text="Pick a service, fill out the form, and our team will reach out within one business day with a tailored proposal." secondary={null} />
    </>
  )
}
