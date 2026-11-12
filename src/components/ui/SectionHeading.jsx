import Reveal from '../motion/Reveal'
import { Stencil } from '../precision/Primitives'

/**
 * Section heading: eyebrow label + title + short blue rule + optional tagline/lead.
 * Centred by default; `align="left"` for side-by-side layouts. `level` sets the visual size,
 * `as` the semantic tag (keeps one <h1> per page).
 */
export default function SectionHeading({ id, eyebrow, title, tagline, lead, align = 'center', level = 'h2', as, tone = 'dark', rule = true, className = '', children, n }) {
  const Tag = as ?? level
  const center = align === 'center'
  const light = tone === 'light'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Stencil label={eyebrow} tone={tone} className="mb-3" />}
      <Tag id={id} className={`t-${level} ${light ? '!text-white' : ''}`}>
        {title}
      </Tag>
      {rule && <span aria-hidden="true" className={`title-rule ${center ? 'mx-auto' : ''}`} />}
      {tagline && <p className={`t-h4 mt-4 font-medium ${light ? 'text-[#7DB8FF]' : 'text-brand-ink'}`}>{tagline}</p>}
      {lead && <p className={`mt-4 max-w-2xl text-[15px] leading-[1.75] md:text-[16px] ${light ? 'text-white/75' : 'text-muted'} ${center ? 'mx-auto' : ''}`}>{lead}</p>}
      {children}
    </Reveal>
  )
}
