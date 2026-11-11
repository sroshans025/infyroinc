import GridSpotlight from '../precision/GridSpotlight'
import { useBrandKey } from '../precision/brandContext'

const TONES = { white: 'bg-white', alt: 'bg-paper-2', navy: 'bg-navy', none: '' }
const PAD = { default: 'py-24 md:py-28 lg:py-32', compact: 'py-16 md:py-20', none: '' }
const GRID_FOR = { tech: 'dots', studios: 'thirds', construction: 'blueprint', inc: 'blueprint' }

/**
 * Section wrapper (FINAL §4.1): white ↔ paper-2 rhythm. Alternate (and navy) sections carry the
 * brand's technical grid with the cursor spotlight.
 */
export default function Section({ id, tone = 'white', pad = 'default', grid, className = '', innerClassName = '', labelledBy, children, ...rest }) {
  const brand = useBrandKey()
  const showGrid = grid ?? (tone === 'alt' || tone === 'navy')
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative overflow-hidden ${TONES[tone]} ${PAD[pad]} ${className}`} {...rest}>
      {showGrid && <GridSpotlight variant={tone === 'navy' ? 'dark' : GRID_FOR[brand]} />}
      <div className={`container-content relative ${innerClassName}`}>{children}</div>
    </section>
  )
}
