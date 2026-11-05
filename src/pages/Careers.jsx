import { useMemo, useState } from 'react'
import CtaBand from '../components/CtaBand.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { usePageMeta } from '../components/hooks.js'
import { CONFIG } from '../config.js'
import { Arrow, Button, Chip, Container, IconBox, SectionHead } from '../components/ui.jsx'
import { CAREER_PERKS, INTERN_TRACKS, ROLES, ROLE_DEPTS } from '../data.js'

function RoleCard({ r }) {
  const [open, setOpen] = useState(false)
  const subject = encodeURIComponent(`Application: ${r.title}`)
  return (
    <div className={`animate-pop rounded-2xl border transition ${open ? 'border-brand-400/40 bg-brand/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center gap-4 rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 sm:p-6">
        <span className="min-w-0 flex-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">{r.dept}</span>
          <span className="mt-1 block font-display text-lg font-bold text-white">{r.title}</span>
          {!open && <span className="mt-1 line-clamp-1 block text-sm text-slate-400">{r.text}</span>}
        </span>
        <span className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 sm:inline">Full-time</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${open ? 'rotate-180 bg-brand text-white' : 'bg-white/10 text-brand-300'}`}>
          <Icon name="chevDown" className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div className="grid gap-6 border-t border-white/10 p-5 sm:p-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="leading-relaxed text-slate-300">{r.text}</p>
            <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Key Requirements</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {r.req.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row gap-2 lg:w-40 lg:flex-col">
            <Button href={`mailto:${CONFIG.email}?subject=${subject}`} className="flex-1 lg:flex-none">
              Apply Now <Icon name="external" className="h-4 w-4" />
            </Button>
            <Button to={`/contact?service=${encodeURIComponent('Career / Internship')}`} variant="ghost" className="flex-1 lg:flex-none">
              Ask HR
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Careers() {
  usePageMeta('Careers', 'Build your career at INFYRO: open roles across engineering, AI & data, cloud, design and growth, plus a 2026 training and internship program.')
  const [dept, setDept] = useState('All')
  const roles = useMemo(() => ROLES.filter((r) => dept === 'All' || r.dept === dept), [dept])

  return (
    <>
      <PageHero
        eyebrow="Join Our Team"
        title="Build Your Career at"
        accent="INFYRO"
        text="Join a team of passionate engineers and consultants building scalable technology for SMEs and startups. Real-world exposure, mentorship, and a clear path to growth."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="#openings" size="lg">
            View openings <Arrow />
          </Button>
          <Button href="#internship" variant="ghost" size="lg">
            Internship program
          </Button>
        </div>
      </PageHero>

      <section className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="Why Join Us" title="Why Work With INFYRO?" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAREER_PERKS.map((p, n) => (
              <Reveal key={p.title} delay={n * 90}>
                <SpotlightCard className="h-full p-7">
                  <IconBox name={p.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="openings" className="border-y border-white/10 bg-navy py-20 sm:py-28">
        <Container>
          <SectionHead eyebrow="Full-Time Roles" title="Current Openings" text="Pick a team to filter, then open a role to see what we look for." />
          <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter roles by team">
            {ROLE_DEPTS.map((d) => (
              <Chip key={d} active={dept === d} onClick={() => setDept(d)}>
                {d}
              </Chip>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {roles.map((r) => (
              <RoleCard key={r.title} r={r} />
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-dashed border-brand-400/40 bg-brand/5 p-7 text-center">
            <h3 className="font-display text-xl font-bold text-white">Don&apos;t see the right role?</h3>
            <p className="mt-2 text-slate-400">We&apos;re always looking for talented individuals. Submit your profile and we&apos;ll reach out when a matching role opens up.</p>
            <Button to={`/contact?service=${encodeURIComponent('Career / Internship')}`} className="mt-5">
              Reach out to HR
            </Button>
          </div>
        </Container>
      </section>

      <section id="internship" className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHead
            eyebrow="Launch Your Tech Career"
            title="2026 Training & Internship Program"
            text="INFYRO operates a structured internal learning and development division for upcoming engineering graduates. Trainees work on simulated live-project environments to build production-ready code habits."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {INTERN_TRACKS.map((t, n) => (
              <Reveal key={t.title} delay={(n % 2) * 100}>
                <SpotlightCard className="flex h-full items-start gap-5 p-7">
                  <IconBox name={t.icon} />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{t.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{t.text}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to={`/contact?service=${encodeURIComponent('Career / Internship')}&brief=${encodeURIComponent("I'd like to apply for the 2026 Training & Internship Program.\n\nTrack of interest:\nCollege / graduation year:\n")}`} size="lg">
              Apply for the program <Arrow />
            </Button>
            <p className="mt-3 text-sm text-slate-500">Limited seats per batch. We also recruit through our LinkedIn page.</p>
          </div>
        </Container>
      </section>

      <CtaBand eyebrow="Ready to Kickstart Your Career?" title="Join the team that builds" accent="what's next." text="Apply now for our 2026 Training & Internship Program and work with industry experts to build production-ready skills." primary={{ to: '/contact?service=Career%20%2F%20Internship', label: 'Get in touch' }} secondary={null} />
    </>
  )
}
