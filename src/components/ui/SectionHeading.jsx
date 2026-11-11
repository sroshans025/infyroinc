import Reveal from '../motion/Reveal'
import { Stencil } from '../precision/Primitives'

/**
 * Stencil eyebrow ("02 / SERVICES") + headline + optional tagline/lead (FINAL §4.1 #4).
 * `level` sets the visual size; `as` the semantic tag (keeps one <h1> per page).
 */
export default function SectionHeading({ id, n, eyebrow, title, tagline, lead, align = 'left', level = 'h2', as, tone = 'dark', className = '', children }) {
  const Tag = as ?? level
  const center = align === 'center'
  const light = tone === 'light'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Stencil n={n} label={eyebrow} tone={tone} className="mb-4" />}
      <Tag id={id} className={`t-${level} ${light ? '!text-white' : ''}`}>
        {title}
      </Tag>
      {tagline && <p className={`t-h4 mt-3 font-medium ${light ? 'text-[#7DB8FF]' : 'text-[#0063D1]'}`}>{tagline}</p>}
      {lead && <p className={`t-lead mt-5 max-w-2xl ${light ? 'text-white/75' : 'text-muted'} ${center ? 'mx-auto' : ''}`}>{lead}</p>}
      {children}
    </Reveal>
  )
}
