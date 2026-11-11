import { motion } from 'framer-motion'
import { DrawPath } from '../precision/Primitives'
import { BRANDS } from '../../data/navigation'
import { companies } from '../../data/inc'

// Leader-line geometry in mark units (viewBox -2 -2 79 104). Labels sit to the right of the mark.
const LINES = {
  tech: { d: 'M62 8 H86 V12.6 H96', top: '14%' },
  construction: { d: 'M74 44 H86 V52 H96', top: '52%' },
  studios: { d: 'M40 98 H86 V87.4 H96', top: '86%' },
}
const ORDER = ['tech', 'construction', 'studios']
const descFor = (k) => companies.items.find((c) => c.key === k)?.description

/**
 * Leader lines from each facet to its label (FINAL §6.2/§6.3) — draw in after the facets lock.
 * The highlighted company's line turns solid blue; in explode view each label shows its description.
 */
export default function FacetLabels({ highlight, exploded, delay = 0, onEnter, onLeave, onActivate }) {
  return (
    <>
      <svg aria-hidden="true" viewBox="-2 -2 79 104" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none">
        {ORDER.map((k, i) => (
          <DrawPath
            key={k}
            d={LINES[k].d}
            inView={false}
            delay={delay + i * 0.08}
            duration={0.5}
            stroke={highlight === k ? '#0A78F2' : 'rgba(10,120,242,0.35)'}
            strokeWidth={highlight === k ? 0.6 : 0.4}
            strokeDasharray={highlight === k ? undefined : '1.5 1.2'}
            vectorEffect="non-scaling-stroke"
            style={{ transition: 'stroke 300ms' }}
          />
        ))}
      </svg>
      {ORDER.map((k, i) => (
        <motion.button
          key={k}
          type="button"
          tabIndex={-1}
          onPointerEnter={(e) => onEnter(k, e)}
          onPointerLeave={onLeave}
          onClick={(e) => onActivate(k, e)}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 + i * 0.08, duration: 0.4 }}
          className="absolute -translate-y-1/2 text-left"
          style={{ left: 'calc(100% * 98 / 79 + 6px)', top: LINES[k].top }}
          aria-hidden="true"
        >
          <span className={`t-mono block whitespace-nowrap text-[12px] transition-colors ${highlight === k ? 'text-[#0063D1]' : 'text-ink-2'}`}>{BRANDS[k].sub}</span>
          {exploded && (
            <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 block w-[220px] text-[12.5px] leading-snug text-muted">
              {descFor(k)}
            </motion.span>
          )}
        </motion.button>
      ))}
    </>
  )
}
