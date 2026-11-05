import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PILLARS } from '../data.js'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { Arrow, Chip, Container, SectionHead } from '../components/ui.jsx'

const STAGES = ['Just an idea', 'Have designs or a prototype', 'Live product that needs work']
const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'Flexible']
const TEAMS = ['No technical team yet', 'We have in-house developers']

function Question({ n, title, children }) {
  return (
    <fieldset className="border-t border-white/10 py-6 first:border-0 first:pt-0">
      <legend className="mb-4 flex items-center gap-3 font-display text-lg font-bold text-white">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm">{n}</span>
        {title}
      </legend>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  )
}

// Interactive project brief builder. Produces a ready-to-send message for the contact form.
export default function Planner() {
  const navigate = useNavigate()
  const [needs, setNeeds] = useState([])
  const [stage, setStage] = useState('')
  const [timeline, setTimeline] = useState('')
  const [team, setTeam] = useState('')

  const toggle = (t) => setNeeds((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]))
  const done = [needs.length > 0, stage, timeline, team].filter(Boolean).length

  const brief = useMemo(
    () =>
      [
        'Project brief (from the website planner)',
        '',
        `What we need: ${needs.length ? needs.join(', ') : 'to be discussed'}`,
        `Current stage: ${stage || 'to be discussed'}`,
        `Timeline: ${timeline || 'to be discussed'}`,
        `Team: ${team || 'to be discussed'}`,
        '',
        'A few more details:',
        '',
      ].join('\n'),
    [needs, stage, timeline, team]
  )

  const go = () => navigate(`/contact?service=${encodeURIComponent(needs[0] || 'New Project Inquiry')}&brief=${encodeURIComponent(brief)}`)

  return (
    <section id="planner" className="relative isolate overflow-hidden bg-navy py-20 sm:py-28">
      <div aria-hidden="true" className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand/25 blur-[120px]" />
      <Container>
        <SectionHead eyebrow="Project Planner" title="Sketch your project in 30 seconds" text="Answer four quick questions and we will turn them into a ready-to-send brief. No sign-up needed." />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-ink/60 p-6 backdrop-blur sm:p-9">
            <Question n="1" title="What do you need? (pick any)">
              {PILLARS.map((p) => (
                <Chip key={p.title} active={needs.includes(p.short)} onClick={() => toggle(p.short)}>
                  {p.short}
                </Chip>
              ))}
            </Question>
            <Question n="2" title="Where are you today?">
              {STAGES.map((s) => (
                <Chip key={s} active={stage === s} onClick={() => setStage(s)}>
                  {s}
                </Chip>
              ))}
            </Question>
            <Question n="3" title="When do you want to start?">
              {TIMELINES.map((s) => (
                <Chip key={s} active={timeline === s} onClick={() => setTimeline(s)}>
                  {s}
                </Chip>
              ))}
            </Question>
            <Question n="4" title="Who will you work with on your side?">
              {TEAMS.map((s) => (
                <Chip key={s} active={team === s} onClick={() => setTeam(s)}>
                  {s}
                </Chip>
              ))}
            </Question>
          </div>

          <aside className="flex flex-col rounded-3xl border border-brand-400/30 bg-gradient-to-b from-brand/20 to-navy-800 p-6 sm:p-8 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Your brief</h3>
              <span className="text-xs font-semibold text-brand-200">{done}/4 answered</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-cyan-300 transition-all duration-500" style={{ width: `${done * 25}%` }} />
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              {[
                ['Needs', needs.join(', ')],
                ['Stage', stage],
                ['Timeline', timeline],
                ['Team', team],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{k}</dt>
                  <dd className={v ? 'mt-1 text-white' : 'mt-1 text-slate-500'}>{v || 'Not chosen yet'}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={go}
              disabled={done === 0}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-glow transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send this brief <Arrow />
            </button>
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Icon name="clock" className="h-4 w-4" /> We typically reply within 1 business day.
            </p>
          </aside>
        </Reveal>
      </Container>
    </section>
  )
}
