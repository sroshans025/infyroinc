import { eventStatus, formatDate } from '../components/events.js'
import CtaBand from '../components/CtaBand.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { usePageMeta } from '../components/hooks.js'
import { Arrow, Button, Container, IconBox, SectionHead } from '../components/ui.jsx'

// Shared layout for the Hackathon and ICSI event pages. `event` comes from EVENTS in data.js.
export default function EventPage({ event: e }) {
  usePageMeta(e.short || 'Hackathon 2026', e.text)
  const past = eventStatus(e.date) === 'past'
  const enquiry = `/contact?service=${encodeURIComponent('General Inquiry')}&brief=${encodeURIComponent(`I'd like to know more about ${e.short || e.title}.\n\n`)}`

  return (
    <>
      <PageHero eyebrow={e.eyebrow} title={e.title} text={e.text}>
        <div className="flex flex-col items-center gap-5">
          <p className="font-display text-xl font-semibold text-brand-300 sm:text-2xl">{e.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              <Icon name="calendar" className="h-4 w-4 text-brand-300" /> {formatDate(e.date)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              <Icon name="globe" className="h-4 w-4 text-brand-300" /> Online
            </span>
            {past && <span className="rounded-full bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-300">Event completed</span>}
          </div>
          <Button to={enquiry} size="lg">
            {past ? 'Ask about the next edition' : 'Enquire now'} <Arrow />
          </Button>
        </div>
      </PageHero>

      <section className="bg-ink py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">About the {e.short ? 'Conference' : 'Hackathon'}</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{e.lead}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-300">
              {e.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {e.overview.map(([k, val]) => (
                <div key={k} className="bg-navy p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{k}</dt>
                  <dd className="mt-1.5 font-display text-base font-bold text-white">{val}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-navy py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="Tracks" title={e.tracksTitle} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {e.tracks.map((t, n) => (
              <Reveal key={t.title} delay={(n % 3) * 90}>
                <SpotlightCard className="h-full p-7">
                  <IconBox name={t.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-white">{t.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{t.text}</p>
                  {t.items.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                      {t.items.map((i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                          <Icon name="check" className="h-4 w-4 text-brand-300" strokeWidth={2.6} /> {i}
                        </li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {e.why.length > 0 && (
        <section className="bg-ink py-20 sm:py-28">
          <Container>
            <SectionHead eyebrow="Benefits" title="Why Participate?" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {e.why.map((w, n) => (
                <Reveal key={w.title} delay={(n % 3) * 90}>
                  <SpotlightCard className="flex h-full items-start gap-4 p-6">
                    <IconBox name={w.icon} className="!h-11 !w-11" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{w.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-400">{w.text}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {e.plans.length > 0 && (
        <section className="border-y border-white/10 bg-navy py-20 sm:py-28">
          <Container>
            <SectionHead eyebrow="Registration" title="Choose Your Registration Type" />
            <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
              {e.plans.map((p, n) => (
                <Reveal key={p.title} delay={n * 100}>
                  <div className={`relative flex h-full flex-col rounded-3xl border p-8 ${p.featured ? 'border-brand bg-gradient-to-b from-brand/20 to-navy-800 shadow-glow' : 'border-white/10 bg-ink/60'}`}>
                    {p.featured && <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Up to 4 members</span>}
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">{p.title}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-5xl font-bold text-white">{p.price}</span>
                      <span className="text-sm text-slate-400">{p.unit}</span>
                    </div>
                    <p className="mt-3 text-slate-400">{p.text}</p>
                    <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                      {p.items.map((i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" strokeWidth={2.6} /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {e.steps.length > 0 && (
        <section className="bg-ink py-20 sm:py-28">
          <Container>
            <SectionHead eyebrow="How It Works" title="How to Join the Hackathon" />
            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {e.steps.map((s, n) => (
                <Reveal as="li" key={s.title} delay={n * 90} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand font-display text-lg font-bold text-white shadow-glow">{n + 1}</span>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <section className="border-t border-white/10 bg-navy py-12">
        <Container>
          <p className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-200">Please note: </strong>
            {e.note}
          </p>
        </Container>
      </section>

      <CtaBand eyebrow={e.short || 'Hackathon 2026'} title={e.closing} accent="" text={e.closingText} primary={{ to: enquiry, label: 'Contact the organisers' }} secondary={{ to: '/', label: 'Back to home' }} />
    </>
  )
}
