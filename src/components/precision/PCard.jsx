import { Ticks } from './Primitives'
import { useBrandKey } from './brandContext'

/**
 * Shared "Precision" card (FINAL §2, §4.1, §4.2): 12px radius, white on paper-2, 1px `line` border,
 * tick corners. Hover: lift 4px + brand extra —
 *   tech: a trace "current" runs along the border · studios: crop marks snap into the corners ·
 *   construction/inc: ticks extend (children can add a measure line via `.group`).
 */
export default function PCard({ as: Tag = 'div', className = '', lift = true, children, ...rest }) {
  const brand = useBrandKey()
  return (
    <Tag
      className={`group relative rounded-card border border-line bg-white transition-[transform,box-shadow,border-color] duration-300 ease-apple ${
        lift ? 'hover:-translate-y-1 hover:border-line-strong hover:shadow-card' : ''
      } ${className}`}
      {...rest}
    >
      <Ticks />
      {brand === 'tech' && (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="12"
            fill="none"
            stroke="#0A78F2"
            strokeWidth="1.5"
            pathLength="100"
            strokeDasharray="14 86"
            className="group-hover:animate-trace"
          />
        </svg>
      )}
      {brand === 'studios' && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 scale-110 opacity-0 transition-[transform,opacity] duration-300 ease-apple group-hover:scale-100 group-hover:opacity-100">
          {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c) => (
            <span key={c} className={`absolute h-5 w-5 border-[#0A78F2] ${c}`} />
          ))}
        </span>
      )}
      {children}
    </Tag>
  )
}

/** Measure line that appears under a title on hover (Construction card extra). */
export function HoverMeasure() {
  const brand = useBrandKey()
  if (brand !== 'construction') return null
  return (
    <span aria-hidden="true" className="mt-2 flex origin-left scale-x-0 items-center transition-transform duration-500 ease-apple group-hover:scale-x-100">
      <span className="h-2 w-px bg-[var(--motif)]" />
      <span className="h-px w-24 bg-[var(--motif)]" />
      <span className="h-2 w-px bg-[var(--motif)]" />
    </span>
  )
}
