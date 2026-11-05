import { useEffect, useRef, useState } from 'react'
import { useInView, useMouse, useReducedMotion } from '../../components/hooks.js'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BUILD_TABS } from '../../data/hero.js'

const TYPE_MS = 22
const HOLD_MS = 2800

const KIND = {
  cmd: { prefix: '$', prefixCls: 'text-slate-500', cls: 'text-paper' },
  step: { prefix: '›', prefixCls: 'text-slate-600', cls: 'text-slate-400' },
  ok: { prefix: '', prefixCls: '', cls: 'text-brand-300' },
}

// Types the log one character at a time, holds, then loops. `active` pauses it off-screen.
function useTypedLog(lines, active, reduce) {
  const total = lines.reduce((sum, l) => sum + l.text.length, 0)
  const [n, setN] = useState(0)

  useEffect(() => setN(0), [lines])

  useEffect(() => {
    if (reduce || !active) return
    const id = setTimeout(() => setN((v) => (v >= total ? 0 : v + 1)), n >= total ? HOLD_MS : TYPE_MS)
    return () => clearTimeout(id)
  }, [n, total, active, reduce])

  return { typed: reduce ? total : n, total }
}

function BuildLog({ lines, typed, total, reduce }) {
  let left = typed
  return (
    <div className="font-mono text-[12px] leading-6 sm:text-[13px]" aria-hidden="true">
      {lines.map((l, i) => {
        const k = KIND[l.kind]
        const shown = l.text.slice(0, Math.max(0, left))
        const started = left > 0
        const caret = !reduce && started && left <= l.text.length && typed < total
        left -= l.text.length
        // The "$ " in the command is drawn as a prefix, not typed
        const text = l.kind === 'cmd' ? shown.replace(/^\$ ?/, '') : shown
        return (
          <div key={i} className="h-6 overflow-hidden whitespace-nowrap">
            {started && k.prefix && <span className={`mr-2 ${k.prefixCls}`}>{k.prefix}</span>}
            <span className={k.cls}>{text}</span>
            {caret && <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[3px] animate-pulse bg-brand-400" />}
          </div>
        )
      })}
    </div>
  )
}

// Parallax depth per chip: [x, y] px at full pointer deflection, plus position classes.
const CHIP_SLOTS = [
  { shift: [18, -12], pos: '-top-5 -right-6', float: '[animation-duration:7s]' },
  { shift: [-26, 16], pos: 'top-[46%] -left-14', float: '[animation-duration:9s] [animation-delay:-3s]' },
  { shift: [34, 22], pos: '-bottom-5 -right-4', float: '[animation-duration:8s] [animation-delay:-5s]' },
]

export default function LiveBuildPanel() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [wrapRef, onScreen] = useInView({ threshold: 0.2 }, false)
  const tabRefs = useRef([])
  const current = BUILD_TABS[tab]
  const { typed, total } = useTypedLog(current.lines, onScreen, reduce)

  useMouse(wrapRef, { ease: 0.1, range: 1.6 })

  const onKey = (e) => {
    const last = BUILD_TABS.length - 1
    const next = { ArrowRight: tab === last ? 0 : tab + 1, ArrowLeft: tab === 0 ? last : tab - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setTab(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="will-change-transform [transform-style:preserve-3d] motion-reduce:!transform-none"
        style={{ transform: 'perspective(1200px) rotateX(calc(var(--py, 0) * -6deg)) rotateY(calc(var(--px, 0) * 6deg))' }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy/85 shadow-panel backdrop-blur-xl">
          {/* Specular highlight that sits under the cursor */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'radial-gradient(360px circle at var(--mx, 75%) var(--my, 0%), rgba(255,255,255,0.09), transparent 60%)' }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <BorderBeam size={160} duration={10} />

          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-3 sm:px-4">
            <div role="tablist" aria-label="What we build" className="flex" onKeyDown={onKey}>
              {BUILD_TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`build-tab-${t.id}`}
                  aria-selected={i === tab}
                  aria-controls={`build-panel-${t.id}`}
                  tabIndex={i === tab ? 0 : -1}
                  onClick={() => setTab(i)}
                  className={`relative min-h-[44px] px-3 text-[13px] font-medium transition-colors focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400 ${
                    i === tab ? 'text-paper' : 'text-slate-400 hover:text-paper'
                  }`}
                >
                  {t.label}
                  <span className={`absolute inset-x-3 bottom-0 h-px origin-left bg-brand-400 transition-transform duration-300 ease-expo ${i === tab ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              ))}
            </div>
            <span className="hidden font-mono text-[11px] text-slate-500 sm:block">~/{current.file}</span>
          </div>

          <div className="h-px bg-white/[0.06]" aria-hidden="true">
            <div className="h-full origin-left bg-brand-400/80" style={{ transform: `scaleX(${total ? typed / total : 0})` }} />
          </div>

          <div role="tabpanel" id={`build-panel-${current.id}`} aria-labelledby={`build-tab-${current.id}`} tabIndex={0} className="px-4 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400 sm:px-5">
            <BuildLog lines={current.lines} typed={typed} total={total} reduce={reduce} />
            <p className="sr-only">Example build log. {current.lines[current.lines.length - 1].text}</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 font-mono text-[11px] text-slate-500 sm:px-5">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden="true" />
              main
            </span>
            <span>infyro-ci</span>
          </div>
        </div>
      </div>

      {current.chips.map((c, i) => {
        const slot = CHIP_SLOTS[i]
        return (
          <div
            key={`${current.id}-${c.label}`}
            aria-hidden="true"
            className={`pointer-events-none absolute hidden lg:block ${slot.pos}`}
            style={{ transform: `translate3d(calc(var(--px, 0) * ${slot.shift[0]}px), calc(var(--py, 0) * ${slot.shift[1]}px), 0)` }}
          >
            <div className={`animate-float motion-reduce:animate-none ${slot.float}`}>
              <div className="animate-pop rounded-lg border border-white/10 bg-ink/85 px-3 py-2 shadow-panel backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{c.label}</div>
                <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[13px] text-paper">
                  {c.accent && <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />}
                  {c.value}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
