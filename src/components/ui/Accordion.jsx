import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useMediaQuery } from '../../lib/hooks'

/**
 * Footer column: an accordion (button + aria-expanded) below md, a plain heading + list from md up.
 */
export default function Accordion({ title, children, tone = 'dark', headingClass = '' }) {
  const [open, setOpen] = useState(false)
  const desktop = useMediaQuery('(min-width: 768px)')
  const id = useId()

  if (desktop) {
    return (
      <div>
        <h3 className={headingClass}>{title}</h3>
        <div className="mt-5">{children}</div>
      </div>
    )
  }

  return (
    <div className={`border-b ${tone === 'dark' ? 'border-white/[0.08]' : 'border-hairline'}`}>
      <h3 className={headingClass}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[52px] w-full items-center justify-between text-left"
        >
          {title}
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            strokeWidth={1.75}
          />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pb-5">
        {children}
      </div>
    </div>
  )
}
