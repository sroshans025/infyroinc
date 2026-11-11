import { forwardRef, useRef } from 'react'
import { motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import { FACETS, FACET_KEYS, OUT, VIEWBOX, MARK_MASK, BLUE } from '../brand/InfyroMark'
import { BRANDS } from '../../data/navigation'

const unit = (k) => {
  const { x, y } = OUT[k]
  const d = Math.hypot(x, y)
  return { x: x / d, y: y / d }
}
// Fly-in origins (px): Tech from top-right, Studios from bottom-left, Construction from the right.
const FROM = { tech: { x: 520, y: -460 }, studios: { x: -560, y: 440 }, construction: { x: 640, y: 40 } }
const DEPTH = { tech: 4, studios: 6, construction: 8 }

function Facet({ k, i, mx, my, intro, reduce, highlight, extrude, exploded, handoff, dragEnabled, onEnter, onLeave, onActivate, onSpace }) {
  const dragged = useRef(false)
  const dx = useTransform(mx, (v) => (reduce ? 0 : v * 2 * DEPTH[k]))
  const dy = useTransform(my, (v) => (reduce ? 0 : v * 2 * DEPTH[k]))
  const u = unit(k)
  const off = exploded ? 30 : extrude ? 10 : 0
  const dim = highlight && highlight !== k
  const introDur = intro === 'full' ? 1 : intro === 'quick' ? 0.27 : 0
  const fly = introDur > 0 && !reduce

  return (
    <motion.div className="pointer-events-none absolute inset-0" style={handoff ? { x: handoff.x, y: handoff.y, scale: handoff.scale, opacity: handoff.opacity, transformOrigin: '0 0' } : undefined}>
      <motion.div className="pointer-events-none absolute inset-0" style={{ x: dx, y: dy }}>
        <motion.div
          className="pointer-events-none absolute inset-0"
          drag={dragEnabled}
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          dragElastic={0.25}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 420, bounceDamping: 9 }}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
        >
          <motion.button
            type="button"
            aria-label={BRANDS[k].name}
            onPointerEnter={(e) => onEnter(k, e)}
            onPointerLeave={onLeave}
            onFocus={(e) => onEnter(k, e, true)}
            onBlur={onLeave}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault()
                onSpace()
              }
            }}
            onClick={(e) => {
              if (dragged.current) return
              onActivate(k, e)
            }}
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={fly ? { x: FROM[k].x, y: FROM[k].y, opacity: 0 } : false}
            animate={{ x: u.x * off, y: u.y * off, opacity: dim ? 0.35 : 1 }}
            transition={{
              x: fly ? { type: 'spring', stiffness: 120, damping: 12, delay: 0.2 * introDur + i * 0.05 } : { type: 'spring', stiffness: 260, damping: 20 },
              y: fly ? { type: 'spring', stiffness: 120, damping: 12, delay: 0.2 * introDur + i * 0.05 } : { type: 'spring', stiffness: 260, damping: 20 },
              opacity: fly ? { duration: 0.25, delay: 0.2 * introDur } : { duration: 0.3 },
            }}
            style={{ filter: extrude || exploded ? 'drop-shadow(0 14px 18px rgba(10,120,242,0.35))' : 'none' }}
          >
            <svg viewBox={VIEWBOX} className="h-full w-full overflow-visible" aria-hidden="true">
              <motion.path
                d={FACETS[k]}
                fill={BLUE}
                stroke={BLUE}
                strokeWidth={4}
                strokeLinejoin="round"
                style={{ pointerEvents: 'visiblePainted', cursor: 'pointer' }}
                initial={fly ? { pathLength: 0, fillOpacity: 0 } : false}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 0.7 * Math.max(introDur, 0.5), delay: 0.2 * introDur }, fillOpacity: { duration: 0.3, delay: 0.85 * introDur } }}
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Big interactive mark (FINAL §6.4): tilt ±16°, specular highlight, per-facet depth parallax
 * (4/6/8px), extrude on lock, explode view, draggable facets (desktop), and scroll hand-off
 * transforms supplied by the parent. Each facet is a real <button> (aria-label = company).
 */
const HeroMark = forwardRef(function HeroMark(
  { mx, my, reduce, intro, highlight, locked, exploded, handoffs, dragEnabled, onEnter, onLeave, onActivate, onToggleSplit, className = '' },
  ref,
) {
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [16, -16]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 150, damping: 15 })
  const hx = useTransform(mx, (v) => `${(v + 0.5) * 100}%`)
  const hy = useTransform(my, (v) => `${(v + 0.5) * 100}%`)
  const shine = useMotionTemplate`radial-gradient(circle at ${hx} ${hy}, rgba(255,255,255,0.5), transparent 55%)`
  const introDur = intro === 'full' ? 1 : intro === 'quick' ? 0.27 : 0

  return (
    <div ref={ref} className={`relative aspect-[79/104] ${className}`} onClick={(e) => e.target === e.currentTarget && onToggleSplit()}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
        {FACET_KEYS.map((k, i) => (
          <Facet
            key={k}
            k={k}
            i={i}
            mx={mx}
            my={my}
            intro={intro}
            reduce={reduce}
            highlight={highlight}
            extrude={locked === k}
            exploded={exploded}
            handoff={handoffs?.[k]}
            dragEnabled={dragEnabled}
            onEnter={onEnter}
            onLeave={onLeave}
            onActivate={onActivate}
            onSpace={onToggleSplit}
          />
        ))}
        {!reduce && !exploded && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: shine, WebkitMaskImage: MARK_MASK, maskImage: MARK_MASK, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', opacity: handoffs?.shineOpacity }}
          />
        )}
        {/* "click" flash as the facets lock */}
        {introDur > 0 && !reduce && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_40px_rgba(10,120,242,0.45)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.25], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.6, delay: 0.9 * introDur, ease: 'easeOut' }}
          />
        )}
      </motion.div>
    </div>
  )
})

export default HeroMark
