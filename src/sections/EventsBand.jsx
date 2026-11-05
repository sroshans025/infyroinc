import { Link } from 'react-router-dom'
import { EVENTS } from '../data.js'
import { eventStatus, formatDate } from '../components/events.js'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { Arrow, Container, SectionHead } from '../components/ui.jsx'

export default function EventsBand() {
  const list = [EVENTS.hackathon, EVENTS.icsi]
  return (
    <section id="events" className="relative bg-ink py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="Events" title="Where innovation meets community" text="Beyond client work, INFYRO brings students, researchers and builders together online." />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {list.map((e, n) => {
            const past = eventStatus(e.date) === 'past'
            return (
              <Reveal key={e.slug} delay={n * 120}>
                <SpotlightCard as={Link} to={`/${e.slug}`} className="group relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-navy-800 to-navy p-8 sm:p-10">
                  <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand/30 blur-[80px] transition group-hover:bg-brand/45" />
                  <div className="relative flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-brand-200">
                      <Icon name="calendar" className="h-4 w-4" /> {formatDate(e.date)}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300">Online</span>
                    {past && <span className="rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-300">Completed</span>}
                  </div>
                  <h3 className="relative mt-6 font-display text-2xl font-bold text-white sm:text-3xl">{e.short || e.title}</h3>
                  <p className="relative mt-1 font-semibold text-brand-300">{e.tagline}</p>
                  <p className="relative mt-4 flex-1 leading-relaxed text-slate-400">{e.text}</p>
                  <span className="relative mt-7 inline-flex items-center gap-2 font-semibold text-white transition group-hover:gap-3">
                    Explore event <Arrow />
                  </span>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
