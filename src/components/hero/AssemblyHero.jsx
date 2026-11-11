import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Pause, Play } from 'lucide-react'
import HeroMark from './HeroMark'
import FacetLabels from './FacetLabels'
import BrandTicker from './BrandTicker'
import HeroMotif from './HeroMotif'
import BrandChips from './BrandChips'
import { useHeroCycle } from './useHeroCycle'
import GridSpotlight from '../precision/GridSpotlight'
import { Stencil, DimensionLine } from '../precision/Primitives'
import { canHover } from '../precision/brandContext'
import { ButtonGroup } from '../ui/Button'
import SmartLink from '../ui/SmartLink'
import { BrandLockup } from '../brand/Lockup'
import { usePageTransition } from '../layout/PageTransition'
import { brands } from '../../data/brands'
import { hero } from '../../data/inc'
import { isCoarsePointer, sessionFlag, useMediaQuery } from '../../lib/hooks'

const EASE = [0.22, 1, 0.36, 1]
const KEYS = brands.map((b) => b.key) // tech, studios, construction

/**
 * Landing hero — "Assembly" (FINAL §6). States: intro → idle ↔ locked → exploded → navigating.
 */
function Assembly({ intro, onSkip }) {
  const reduce = useReducedMotion()
  const { go } = usePageTransition()
  const sectionRef = useRef(null)
  const markRef = useRef(null)
  const releaseTimer = useRef()
  const pointerType = useRef('mouse')
  const lockedAtDown = useRef(null) // index that was locked when the current tap began
  const year = new Date().getFullYear()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const fine = useRef(false)
  useEffect(() => {
    fine.current = canHover()
  }, [])

  const [userPaused, setUserPaused] = useState(false)
  const [locked, setLocked] = useState(null) // index
  const [hoverLock, setHoverLock] = useState(false) // locked by pointer → show tooltip
  const [exploded, setExploded] = useState(false)
  const [announce, setAnnounce] = useState('')
  const [index, setIndex] = useHeroCycle(brands.length, { interval: 3500, paused: userPaused || locked !== null || exploded })
  const activeIdx = locked ?? index
  const brand = brands[activeIdx]
  const t0 = intro === 'full' ? 1.2 : intro === 'quick' ? 0.35 : 0

  /* ── lock / release / open ── */
  const lock = useCallback(
    (i, announceIt = false, viaPointer = false) => {
      clearTimeout(releaseTimer.current)
      setLocked(i)
      setIndex(i)
      setHoverLock(viaPointer)
      if (announceIt) setAnnounce(`${brands[i].name} — ${brands[i].tagline}`)
    },
    [setIndex],
  )
  const release = useCallback(() => {
    clearTimeout(releaseTimer.current)
    releaseTimer.current = setTimeout(() => {
      setLocked(null)
      setHoverLock(false)
    }, 1000)
  }, [])
  useEffect(() => () => clearTimeout(releaseTimer.current), [])

  const open = useCallback(
    (i, el) => {
      const r = el?.getBoundingClientRect?.()
      go(brands[i].href, { variant: 'blue', origin: r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined })
    },
    [go],
  )

  // Tap / click logic shared by facets, labels and chips (touch: first tap locks, second opens).
  const activate = (i, e) => {
    const keyboard = e?.detail === 0
    const touch = pointerType.current === 'touch' || pointerType.current === 'pen'
    if (touch && !keyboard && lockedAtDown.current !== i) {
      lock(i, true)
      return
    }
    open(i, e?.currentTarget)
  }

  const onFacetEnter = (k, e, focus = false) => {
    const i = KEYS.indexOf(k)
    if (focus) return lock(i, true)
    if (e?.pointerType === 'mouse') lock(i, false, true)
  }
  const onFacetActivate = (k, e) => activate(KEYS.indexOf(k), e)

  /* ── pointer: tilt + spotlight (grid handles its own) ── */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const onPointerMove = (e) => {
    pointerType.current = e.pointerType
    if (reduce || e.pointerType !== 'mouse') return
    const r = sectionRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const [float, setFloat] = useState(false)
  useEffect(() => setFloat(!reduce && isCoarsePointer()), [reduce])

  /* ── keyboard: ←/→ cycle, Space toggles explode (on facets) ── */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      if (e.target.closest('input,textarea,select')) return
      e.preventDefault()
      const n = (activeIdx + (e.key === 'ArrowRight' ? 1 : -1) + brands.length) % brands.length
      lock(n, true)
      release()
    }
  }

  /* ── scroll hand-off into the company cards (desktop, fine pointer, motion on) ── */
  const handoffOn = desktop && !reduce && fine.current
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const deltas = useRef({ tech: null, studios: null, construction: null })
  const measure = useCallback(() => {
    const m = markRef.current?.getBoundingClientRect()
    if (!m) return
    KEYS.forEach((k) => {
      const t = document.querySelector(`[data-handoff="${k}"]`)?.getBoundingClientRect()
      deltas.current[k] = t ? { dx: t.left - m.left, dy: t.top - m.top, s: t.height / m.height } : null
    })
  }, [])
  useLayoutEffect(() => {
    if (!handoffOn) return undefined
    const id = setTimeout(() => window.scrollY < 10 && measure(), t0 * 1000 + 1200)
    const onResize = () => window.scrollY < 10 && measure()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', onResize)
    }
  }, [handoffOn, measure, t0])
  const mk = (k) => ({
    x: useTransform(scrollYProgress, (p) => (deltas.current[k] ? deltas.current[k].dx * p : 0)),
    y: useTransform(scrollYProgress, (p) => (deltas.current[k] ? deltas.current[k].dy * p : 0)),
    scale: useTransform(scrollYProgress, (p) => (deltas.current[k] ? 1 + (deltas.current[k].s - 1) * p : 1)),
    opacity: useTransform(scrollYProgress, [0, 0.8, 0.98], [1, 1, 0]),
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hTech = mk('tech')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hStudios = mk('studios')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hConstruction = mk('construction')
  const shineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const handoffs = handoffOn ? { tech: hTech, studios: hStudios, construction: hConstruction, shineOpacity } : null
  const restOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  const rise = (d) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay: t0 + d },
  })

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="home-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDownCapture={(e) => {
        pointerType.current = e.pointerType
        lockedAtDown.current = locked
        onSkip()
      }}
      onKeyDown={onKeyDown}
      className="relative z-10 flex min-h-[100svh] flex-col overflow-x-clip bg-white pb-8 pt-[calc(var(--nav-h)+24px)] lg:pb-10"
    >
      <motion.div className="absolute inset-0" initial={intro === 'full' && !reduce ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <GridSpotlight variant="blueprint" />
      </motion.div>
      {intro === 'full' && !reduce && <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-[#0A78F2] shadow-[0_0_24px_4px_rgba(10,120,242,0.45)]" />}

      <div className="container-content relative grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Text panel */}
        <motion.div className="order-2 text-center lg:order-1 lg:col-span-6 lg:text-left" style={handoffOn ? { opacity: restOpacity } : undefined}>
          <motion.div {...rise(-0.1)}>
            <Stencil n={1} label="The Infyro Group" />
          </motion.div>
          <motion.div {...rise(0)} className="mx-auto mt-6 max-w-md lg:mx-0">
            <DimensionLine label={`← INFYRO · ${year} →`} delay={t0} />
          </motion.div>
          <h1 id="home-title" className="t-display mt-5">
            {hero.lines.map((line, i) => (
              <motion.span key={line} {...rise(0.05 + i * 0.1)} className={`block ${i === 1 ? 'text-[#0A78F2]' : ''}`}>
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p {...rise(0.3)} className="t-lead mx-auto mt-6 max-w-xl text-muted lg:mx-0">
            {hero.lead}
          </motion.p>
          <motion.div {...rise(0.4)}>
            <ButtonGroup primary={hero.primary} secondary={hero.secondary} align="left" className="mt-8 lg:justify-start" />
          </motion.div>
          <motion.p {...rise(0.5)} className="t-mono mt-8 text-[11px] text-subtle">
            {hero.tagline}
          </motion.p>
        </motion.div>

        {/* Visual panel */}
        <div className="relative order-1 flex flex-col items-center lg:order-2 lg:col-span-6">
          <div className="relative md:-translate-x-14 lg:-translate-x-20">
            <HeroMotif k={brand.key} />
            <HeroMark
              ref={markRef}
              mx={mx}
              my={my}
              reduce={reduce}
              intro={intro}
              highlight={exploded ? null : brand.key}
              locked={locked !== null ? brand.key : null}
              exploded={exploded}
              handoffs={handoffs}
              dragEnabled={!reduce && fine.current && !exploded}
              onEnter={onFacetEnter}
              onLeave={release}
              onActivate={onFacetActivate}
              onToggleSplit={() => !reduce && setExploded((x) => !x)}
              className={`h-[220px] md:h-[320px] lg:h-[400px] 2xl:h-[480px] ${float ? 'animate-floaty' : ''}`}
            />
            <motion.div className="pointer-events-none absolute inset-0 hidden md:block [&_button]:pointer-events-auto" style={handoffOn ? { opacity: restOpacity } : undefined}>
              <FacetLabels highlight={exploded ? null : brand.key} exploded={exploded} delay={intro === 'full' ? 1.1 : intro === 'quick' ? 0.3 : 0} onEnter={onFacetEnter} onLeave={release} onActivate={onFacetActivate} />
            </motion.div>

            {/* Hover tooltip: lockup, tagline, Explore › */}
            <AnimatePresence>
              {hoverLock && locked !== null && !exploded && (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  onPointerEnter={() => clearTimeout(releaseTimer.current)}
                  onPointerLeave={release}
                  className="absolute -left-4 top-0 z-20 hidden w-60 -translate-x-full rounded-card border border-line-strong bg-white p-4 shadow-float lg:block"
                >
                  <BrandLockup brand={brand.key} variant="bar" className="h-9 w-auto" alt={brand.name} />
                  <p className="mt-2 text-[13px] text-muted">{brand.tagline}</p>
                  <SmartLink href={brand.href} className="group mt-3 inline-flex items-center gap-0.5 text-[13px] font-semibold text-[#0063D1]">
                    Explore
                    <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
                  </SmartLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div {...rise(0.45)} className="mt-8 flex w-full max-w-md items-end justify-between gap-4 lg:mt-10" style={handoffOn ? { opacity: restOpacity } : undefined}>
            {!reduce && (
              <button
                type="button"
                onClick={() => setExploded((x) => !x)}
                aria-pressed={exploded}
                className="t-mono inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[11px] text-ink ring-1 ring-inset ring-line hover:ring-line-strong"
              >
                {exploded ? 'Assemble' : 'Split'}
              </button>
            )}
            <BrandTicker
              brand={brand}
              className="flex-1"
              onPrev={() => {
                lock((activeIdx + brands.length - 1) % brands.length, true)
                release()
              }}
              onNext={() => {
                lock((activeIdx + 1) % brands.length, true)
                release()
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Chips */}
      <motion.div {...rise(0.55)} className="container-content relative mt-10 lg:mt-12">
        <BrandChips
          brands={brands}
          active={activeIdx}
          onLock={(i, kb) => lock(i, kb)}
          onRelease={release}
          onGo={activate}
          onPointerType={(t) => {
            pointerType.current = t
          }}
        />
      </motion.div>

      {/* WCAG 2.2.2 pause control + announcements of user-triggered changes only */}
      <button
        type="button"
        onClick={() => setUserPaused((p) => !p)}
        aria-pressed={userPaused}
        aria-label={userPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
        className="t-mono relative z-10 mx-auto mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-white/80 px-3 text-[11px] text-ink-2 ring-1 ring-inset ring-line backdrop-blur hover:text-ink md:absolute md:bottom-3 md:left-8 md:mt-0"
      >
        {userPaused ? <Play aria-hidden="true" className="h-3 w-3" /> : <Pause aria-hidden="true" className="h-3 w-3" />} Auto
      </button>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </section>
  )
}

/** Wrapper: chooses full / quick / no intro (once per session) and lets any input skip it. */
export default function AssemblyHero() {
  const reduce = useReducedMotion()
  const [intro, setIntro] = useState(() => (sessionFlag('infyro-intro') ? 'quick' : 'full'))
  const [skipped, setSkipped] = useState(false)
  useEffect(() => {
    sessionFlag('infyro-intro', true)
  }, [])
  const live = intro === 'full' && !skipped
  useEffect(() => {
    if (!live) return undefined
    const done = setTimeout(() => setIntro('done'), 2400)
    const skip = () => setSkipped(true)
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })
    return () => {
      clearTimeout(done)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
  }, [live])
  const mode = reduce || skipped ? 'none' : intro === 'done' ? 'full' : intro
  return <Assembly key={skipped ? 'skipped' : 'intro'} intro={mode} onSkip={() => live && setSkipped(true)} />
}
