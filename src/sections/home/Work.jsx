import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECT_FILTERS, PROJECTS } from '../../data.js'
import Icon from '../../components/Icon.jsx'
import { useReducedMotion } from '../../components/hooks.js'
import { Container } from '../../components/ui.jsx'
import SectionLabel from './SectionLabel.jsx'

// One flagship project per category, in the order the filters list them.
const FEATURED = PROJECT_FILTERS.slice(1)
  .map((f) => PROJECTS.find((p) => p.cat === f.id))
  .filter(Boolean)
const catLabel = (id) => PROJECT_FILTERS.find((f) => f.id === id)?.label

function ProjectPanel({ p, i }) {
  return (
    <article className="group relative flex h-full w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-800 to-ink p-7 sm:w-[60vw] sm:p-9 lg:w-[38rem]">
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_85%_15%,black,transparent_55%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-10 select-none text-[11rem] font-bold leading-none tracking-[-0.06em] text-white/[0.03] transition-colors duration-500 group-hover:text-brand/10">
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-cta transition-transform duration-500 group-hover:-rotate-6">
          <Icon name={p.icon} className="h-5 w-5" />
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-300">{catLabel(p.cat)}</span>
      </div>
      <div className="relative mt-16">
        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{p.title}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-400">{p.text}</p>
        <a href="#contact" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          Build something similar
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  )
}

// Desktop: the section pins and vertical scroll drives the reel sideways.
// Mobile, tablet and reduced motion: a native swipeable row with snap points.
export default function Work() {
  const reduce = useReducedMotion()
  const outer = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const [pinned, setPinned] = useState(false)

  useLayoutEffect(() => {
    const check = () => setPinned(window.innerWidth >= 1024 && !reduce)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [reduce])

  // Measure once the pinned track exists, and again on resize
  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), { stiffness: 120, damping: 30, mass: 0.4 })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  const header = (
    <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel index={5}>Selected work</SectionLabel>
        <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
          Built for real operations, <span className="text-slate-500">not slide decks.</span>
        </h2>
      </div>
      <Link to="/projects" className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
        All {PROJECTS.length} projects
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Container>
  )

  if (!pinned) {
    return (
      <section id="work" className="bg-ink py-24 sm:py-32">
        {header}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-4 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8">
          {FEATURED.map((p, i) => (
            <div key={p.title} className="h-[26rem] snap-start">
              <ProjectPanel p={p} i={i} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="work" ref={outer} className="relative bg-ink" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[68px]">
        {header}
        <motion.div ref={track} style={{ x }} className="mt-12 flex h-[min(28rem,52vh)] w-max gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[8vw]">
          {FEATURED.map((p, i) => (
            <ProjectPanel key={p.title} p={p} i={i} />
          ))}
        </motion.div>
        <Container className="mt-10">
          <div className="h-px bg-white/10">
            <motion.div className="h-full origin-left bg-brand" style={{ scaleX: bar }} />
          </div>
        </Container>
      </div>
    </section>
  )
}
