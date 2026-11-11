import { LOGOS } from '../../data/brands'
import { BRANDS } from '../../data/navigation'

/**
 * Full raster lockups from the supplied logo files (mark + Infyro + sub-line + tagline).
 * variant: 'lockup' | 'bar' (no tagline) · tone: 'dark' | 'light' (white, for navy/photos)
 */
export function BrandLockup({ brand = 'inc', variant = 'lockup', tone = 'dark', className = 'h-8 w-auto', alt, priority = false }) {
  const light = tone === 'light'
  const name = alt ?? BRANDS[brand]?.name ?? 'Infyro Inc.'
  let src
  let w
  let h
  if (brand === 'inc') {
    ;({ w, h } = LOGOS.inc)
    src = light ? LOGOS.inc.lockupWhite : LOGOS.inc.lockup
  } else {
    const L = LOGOS[brand]
    const bar = variant === 'bar'
    src = bar ? (light ? L.barWhite : L.bar) : light ? L.lockupWhite : L.lockup
    w = bar ? L.bw : L.lw
    h = bar ? L.bh : L.lh
  }
  return (
    <img
      src={src}
      alt={name}
      width={w}
      height={h}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      draggable={false}
      className={`select-none ${className}`}
    />
  )
}

export default BrandLockup
