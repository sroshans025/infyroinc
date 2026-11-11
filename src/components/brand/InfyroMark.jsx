import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* FINAL spec §5.1 — the mark split into three facets, one per company (viewBox -2 -2 79 104). */
export const VIEWBOX = '-2 -2 79 104'
export const MARK_RATIO = 79 / 104
export const FACETS = {
  tech: 'M75 0 H40 L1 39 V50 H23 Z',
  studios: 'M1 50 H23 L49 77 V91 L40 100 L1 61 Z',
  construction: 'M49 47 L74 22 V66 L49 91 Z',
}
export const FACET_KEYS = ['tech', 'studios', 'construction']
// Direction each facet travels when "exploded" (viewBox units)
export const OUT = { tech: { x: 6, y: -6 }, studios: { x: -6, y: 6 }, construction: { x: 7, y: 2 } }
// Where each facet flies in from on "assemble"
const IN = { tech: { x: 40, y: -40 }, studios: { x: -40, y: 40 }, construction: { x: 46, y: 6 } }
export const BLUE = '#0A78F2'

/** Data-URL of the whole mark (white) — CSS mask for highlights/shine. */
export const MARK_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${VIEWBOX}'><g fill='#fff' stroke='#fff' stroke-width='4' stroke-linejoin='round'>${FACET_KEYS.map((k) => `<path d='${FACETS[k]}'/>`).join('')}</g></svg>`,
)}")`

/**
 * <InfyroMark> — interactive 3-facet logo mark.
 *  active    'tech' | 'studios' | 'construction' | null → highlight one facet, dim the others
 *  exploded  true | number (distance multiplier) → split facets apart
 *  draw      stroke draw-in on mount
 *  assemble  facets fly in from three directions and lock together on mount
 *  sequence  light facets tech → studios → construction once in view; hover replays (footers)
 *  glow      soft glow on the active facet
 *  lift      one facet key that lifts out on its own (switcher / cards)
 *  tone      'blue' | 'white'
 */
export default function InfyroMark({
  size = 40,
  active = null,
  exploded = false,
  draw = false,
  assemble = false,
  sequence = false,
  glow = false,
  lift = null, // facet key → extrude just that facet
  dim = 0.25,
  tone = 'blue',
  outline = false,
  label,
  className = '',
  style,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [seq, setSeq] = useState(null)
  const timers = useRef([])

  const play = () => {
    if (reduce) return
    timers.current.forEach(clearTimeout)
    timers.current = FACET_KEYS.map((k, i) => setTimeout(() => setSeq(k), i * 380)).concat(setTimeout(() => setSeq(null), FACET_KEYS.length * 380))
  }
  useEffect(() => {
    if (sequence && inView) play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, inView])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const on = seq ?? active
  const color = tone === 'white' ? '#FFFFFF' : BLUE
  const dist = exploded === true ? 1 : Number(exploded) || 0

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      height={typeof size === 'number' ? size : undefined}
      width={typeof size === 'number' ? Math.round(size * MARK_RATIO) : undefined}
      className={`overflow-visible ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      onPointerEnter={sequence ? play : undefined}
    >
      {FACET_KEYS.map((id, i) => {
        const isDim = on && on !== id
        const isOn = on === id
        const drawIn = draw && !reduce
        const fly = assemble && !reduce
        return (
          <motion.path
            key={id}
            d={FACETS[id]}
            fill={outline ? 'none' : color}
            stroke={color}
            strokeWidth={outline ? 3 : 4}
            strokeLinejoin="round"
            initial={drawIn || fly ? { pathLength: drawIn ? 0 : 1, fillOpacity: drawIn ? 0 : 1, opacity: fly ? 0 : 1, x: fly ? IN[id].x : 0, y: fly ? IN[id].y : 0 } : false}
            animate={{
              pathLength: 1,
              opacity: 1,
              fillOpacity: outline ? 0 : isDim ? dim : 1,
              strokeOpacity: isDim ? dim : 1,
              x: !reduce ? OUT[id].x * (lift === id ? Math.max(dist, 0.8) : dist) : 0,
              y: !reduce ? OUT[id].y * (lift === id ? Math.max(dist, 0.8) : dist) : 0,
              scale: isOn && !reduce && !outline ? 1.06 : 1,
            }}
            transition={{
              pathLength: { duration: 0.9, delay: i * 0.15, ease: 'easeInOut' },
              fillOpacity: { duration: 0.3, delay: drawIn ? 0.7 + i * 0.15 : 0 },
              opacity: { duration: 0.3, delay: fly ? i * 0.08 : 0 },
              default: { type: 'spring', stiffness: 260, damping: 20, delay: fly ? i * 0.08 : 0 },
            }}
            style={{
              transformBox: 'view-box',
              transformOrigin: '37px 50px',
              filter: glow && isOn ? 'drop-shadow(0 0 3px rgba(59,149,245,0.95))' : undefined,
            }}
          />
        )
      })}
    </svg>
  )
}
