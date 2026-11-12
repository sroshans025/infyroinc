/**
 * The Infyro mark split into its three pieces — one per company. Static (no motion).
 *  active   'tech' | 'studios' | 'construction' | null → that piece stays solid, the others are dimmed
 *  outline  draw strokes only (used for the large background watermark)
 */
export const VIEWBOX = '-2 -2 79 104'
export const MARK_RATIO = 79 / 104
export const FACETS = {
  tech: 'M75 0 H40 L1 39 V50 H23 Z',
  studios: 'M1 50 H23 L49 77 V91 L40 100 L1 61 Z',
  construction: 'M49 47 L74 22 V66 L49 91 Z',
}
export const FACET_KEYS = ['tech', 'studios', 'construction']
export const BLUE = '#0A78F2'

export default function FacetMark({ size = 40, active = null, dim = 0.25, outline = false, color = BLUE, className = '' }) {
  return (
    <svg
      viewBox={VIEWBOX}
      height={size}
      width={Math.round(size * MARK_RATIO)}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {FACET_KEYS.map((k) => {
        const o = active && active !== k ? dim : 1
        return (
          <path
            key={k}
            d={FACETS[k]}
            fill={outline ? 'none' : color}
            fillOpacity={o}
            stroke={color}
            strokeOpacity={o}
            strokeWidth={outline ? 3 : 4}
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}
