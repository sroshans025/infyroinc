import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import GridSpotlight from '../precision/GridSpotlight'
import { Stencil, DimensionLine, TiltCard } from '../precision/Primitives'
import { CircuitTraces, CropMarks, Elevation, RecTimecode } from '../precision/Motifs'
import { canHover } from '../precision/brandContext'
import BrandLogo from '../brand/BrandLogo'
import Media from '../ui/Media'
import Parallax from '../motion/Parallax'
import { ButtonGroup } from '../ui/Button'

const EASE = [0.22, 1, 0.36, 1]
const GRID = { tech: 'dots', studios: 'thirds', construction: 'blueprint' }
const DIM = { tech: '← SYS.01 →', studios: '← SCENE 01 →', construction: '← SEC. A–A →' }

function TechVisual() {
  return (
    <TiltCard deg={4} className="h-full w-full rounded-media">
      <div className="relative h-full w-full overflow-hidden rounded-media border border-line bg-[#F3F8FF]">
        {/* TODO: optional abstract 3D / mesh render or UI mockups */}
        <div aria-hidden="true" className="absolute -left-[15%] -top-[25%] h-[80%] w-[70%] rounded-full bg-[#0A78F2] opacity-25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-[25%] -right-[10%] h-[80%] w-[70%] rounded-full bg-[#22D3EE] opacity-30 blur-3xl" />
        <div aria-hidden="true" className="grid-dots absolute inset-0 opacity-70" />
        <CircuitTraces inView={false} dense className="absolute inset-0 h-full w-full" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-card border border-line-strong bg-white/85 p-5 shadow-float backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#0A78F2]" />
            <span className="h-2 w-2 rounded-full bg-[#3B95F5]" />
            <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
            <span className="t-mono ml-auto text-[9px] text-subtle">{'<About/>'}</span>
          </div>
          <div className="mt-4 h-2 w-2/5 rounded bg-[#0A78F2]" />
          <div className="mt-3 h-1.5 w-4/5 rounded bg-navy/10" />
          <div className="mt-2 h-1.5 w-3/5 rounded bg-navy/10" />
          <svg viewBox="0 0 200 60" className="mt-4 h-14 w-full" fill="none">
            <path d="M0 50 L30 38 L55 44 L85 22 L115 30 L145 12 L200 18" stroke="#0A78F2" strokeWidth="2" />
            <path d="M0 50 L30 38 L55 44 L85 22 L115 30 L145 12 L200 18 V60 H0 Z" fill="rgba(10,120,242,0.08)" />
          </svg>
        </div>
      </div>
    </TiltCard>
  )
}

function StudiosVisual({ image }) {
  const ref = useRef(null)
  const [off, setOff] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    if (!canHover()) return
    const r = ref.current.getBoundingClientRect()
    setOff({ x: ((e.clientX - r.left) / r.width - 0.5) * 16, y: ((e.clientY - r.top) / r.height - 0.5) * 16 })
  }
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => setOff({ x: 0, y: 0 })} className="relative h-full w-full overflow-hidden rounded-media bg-cinema">
      {/* TODO: real cinematic photo / muted loop video */}
      <Media src={image} alt="" mood="studios" priority className="absolute inset-0" imgClassName="animate-kenburns" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[8%] bg-black/70" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[8%] bg-black/70" />
      <CropMarks inset={28} size={30} offset={off} />
      <RecTimecode className="absolute left-7 top-[calc(8%+14px)]" />
      <span aria-hidden="true" className="t-mono absolute bottom-[calc(8%+14px)] right-7 text-[10px] text-white/70">TAKE 01</span>
    </div>
  )
}

function ConstructionVisual({ image }) {
  const [k, setK] = useState(0)
  return (
    <div onPointerEnter={() => canHover() && setK((v) => v + 1)} className="relative h-full w-full overflow-hidden rounded-media bg-navy">
      {/* TODO: real architectural photo (golden hour) */}
      <Parallax className="absolute inset-0 -bottom-10">
        <Media src={image} alt="" mood="construction" priority className="absolute inset-0" />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <Elevation key={k} inView={false} stroke="rgba(255,255,255,0.7)" className="absolute inset-[8%] h-[84%] w-[84%]" />
      <span aria-hidden="true" className="t-mono absolute right-6 top-6 text-[10px] text-white/75">LVL 01</span>
    </div>
  )
}

/**
 * Company hero (FINAL §8.1) — identical for all three: min-h 88svh, split 45/55 (text left,
 * visual right) from lg, visual on top below lg (16:10 mobile, 16:9 tablet). Only the motif differs.
 */
export default function CompanyHero({ brandKey, label, title, small, primary, secondary, image }) {
  const reduce = useReducedMotion()
  const rise = (d) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 170, damping: 20, delay: d },
  })
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-[calc(var(--nav-h)+20px)] lg:flex lg:min-h-[88svh] lg:items-center lg:pt-[var(--nav-h)]">
      <GridSpotlight variant={GRID[brandKey]} />
      <div className="container-content relative grid grid-cols-1 gap-10 py-8 lg:grid-cols-[45fr_55fr] lg:items-center lg:gap-14 lg:py-14">
        <div className="order-2 lg:order-1">
          <motion.div {...rise(0.05)}>
            <Stencil n={1} label={label} />
          </motion.div>
          <motion.div {...rise(0.12)} className="mt-6">
            <BrandLogo brand={brandKey} size="lg" />
          </motion.div>
          <motion.div {...rise(0.2)} className="mt-8 max-w-md">
            <DimensionLine label={DIM[brandKey]} delay={0.35} />
          </motion.div>
          <motion.h1 {...rise(0.26)} id="hero-title" className="t-h1 mt-4 max-w-xl">
            {title}
          </motion.h1>
          <motion.p {...rise(0.34)} className="t-lead mt-5 text-muted">
            {small}
          </motion.p>
          <motion.div {...rise(0.42)}>
            <ButtonGroup primary={primary} secondary={secondary} className="mt-8" />
          </motion.div>
        </div>
        <motion.div
          className="order-1 aspect-[16/10] w-full md:aspect-[16/9] lg:order-2 lg:aspect-auto lg:h-[min(66svh,600px)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {brandKey === 'tech' && <TechVisual />}
          {brandKey === 'studios' && <StudiosVisual image={image} />}
          {brandKey === 'construction' && <ConstructionVisual image={image} />}
        </motion.div>
      </div>
    </section>
  )
}
