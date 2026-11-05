import { Link } from 'react-router-dom'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// shadcn-style button, extended to render a router link (`to`), an anchor (`href`) or a <button>.
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-brand-700 text-white shadow-cta hover:bg-brand-800',
        ghost: 'border border-white/15 bg-white/5 text-white backdrop-blur hover:bg-white/10',
        white: 'bg-white text-ink shadow-soft hover:bg-brand-50',
      },
      size: { md: 'min-h-[44px] px-5 py-2.5 text-sm', lg: 'min-h-[48px] px-7 py-3.5 text-base' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export function Button({ to, href, variant, size, className, children, ...rest }) {
  const cls = cn(buttonVariants({ variant, size }), className)
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
