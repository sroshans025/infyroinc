import { ArrowUpRight, ChevronRight } from 'lucide-react'
import SmartLink from './SmartLink'

const base =
  'group relative inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold leading-none transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-60'

const VARIANTS = {
  // Infyro logo blue (FINAL §2) so buttons match the logo.
  primary: 'bg-brand text-white hover:bg-brand-hover',
  secondary: 'bg-white text-ink ring-1 ring-inset ring-slate-300 hover:ring-slate-400 hover:bg-slate-50',
  dark: 'bg-navy text-white hover:bg-black',
  light: 'bg-white text-ink hover:bg-white/90',
  glass: 'bg-transparent text-white ring-1 ring-inset ring-white/50 hover:bg-white/10',
}

export const buttonClass = (variant = 'primary', className = '') => `${base} ${VARIANTS[variant]} ${className}`

function Inner({ variant, size, href, icon: Icon, external, className = '', children, labelStyle, ...rest }) {
  const sizeCls = size === 'sm' ? '!min-h-[36px] !px-4 !py-2 !text-[13px]' : ''
  const cls = buttonClass(variant, `${sizeCls} ${className}`)
  const isExternal = external || /^https?:\/\//.test(href ?? '')
  const ExtIcon = isExternal ? ArrowUpRight : Icon
  const content = (
    <span className="inline-flex items-center gap-1.5">
      {children}
      {ExtIcon && (
        <ExtIcon
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={2}
        />
      )}
    </span>
  )
  if (href) {
    return (
      <SmartLink href={href} external={isExternal} className={cls} {...rest}>
        {content}
      </SmartLink>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  )
}

/** Pill button. */
export default function Button({ variant = 'primary', magnetic, ...props }) {
  return <Inner variant={variant} {...props} />
}

/** "Learn more ›" — chevron nudges 3px right on hover. */
export function PillLink({ href, className = '', children, tone = 'brand', ...rest }) {
  const color = tone === 'light' ? 'text-white' : tone === 'ink' ? 'text-ink' : 'text-brand-ink'
  return (
    <SmartLink href={href} className={`group inline-flex min-h-[44px] items-center gap-0.5 text-[15px] font-semibold ${color} ${className}`} {...rest}>
      {children}
      <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
    </SmartLink>
  )
}

/** Primary + secondary pair (max two per group). */
export function ButtonGroup({ primary, secondary, primaryVariant = 'primary', secondaryVariant = 'secondary', align = 'left', className = '' }) {
  const justify = align === 'center' ? 'sm:justify-center' : ''
  return (
    <div className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center ${justify} ${className}`}>
      {primary && (
        <Button href={primary.href} variant={primaryVariant} className="w-full sm:w-auto">
          {primary.label}
        </Button>
      )}
      {secondary && (
        <Button href={secondary.href} variant={secondaryVariant} className="w-full sm:w-auto">
          {secondary.label}
        </Button>
      )}
    </div>
  )
}
