import { useMemo, useState } from 'react'
import { PROJECTS, PROJECT_FILTERS } from '../data.js'
import Icon from '../components/Icon.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { Arrow, Button, Chip, Container, SectionHead } from '../components/ui.jsx'

// Filterable project grid. `limit` shows a featured subset (home); `searchable` adds a search box.
export default function ProjectShowcase({ limit, searchable = false, header = true, id = 'projects' }) {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const out = PROJECTS.filter((p) => (cat === 'all' || p.cat === cat) && (!term || `${p.title} ${p.text}`.toLowerCase().includes(term)))
    return limit ? out.slice(0, limit) : out
  }, [cat, q, limit])

  return (
    <section id={id} className="relative bg-ink py-20 sm:py-28">
      <Container>
        {header && <SectionHead eyebrow="Our Portfolio" title="Real solutions. Real results." text="Explore enterprise-grade IT projects across industries and technology domains." />}

        <div className={`${header ? 'mt-12' : ''} flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between`}>
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
              <Chip key={f.id} active={cat === f.id} onClick={() => setCat(f.id)}>
                {f.label}
              </Chip>
            ))}
          </div>
          {searchable && (
            <label className="relative block w-full lg:w-72">
              <span className="sr-only">Search projects</span>
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand/15"
              />
            </label>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <SpotlightCard key={p.title} as="button" type="button" onClick={() => setOpen(p)} className="group flex animate-pop flex-col p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow transition group-hover:scale-110">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">{PROJECT_FILTERS.find((f) => f.id === p.cat)?.label}</span>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition group-hover:gap-3">
                View details <Arrow />
              </span>
            </SpotlightCard>
          ))}
        </div>

        {list.length === 0 && <p className="mt-10 text-center text-slate-400">No projects match your search. Try another keyword or filter.</p>}

        {limit && (
          <div className="mt-12 text-center">
            <Button to="/projects" variant="ghost" size="lg">
              View all projects <Arrow />
            </Button>
          </div>
        )}
      </Container>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
