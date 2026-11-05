import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export function Container({ className = '', children }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:pl-[max(2rem,env(safe-area-inset-left,0px))] sm:pr-[max(2rem,env(safe-area-inset-right,0px))] ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, text, center = true, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">{eyebrow}</span>}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{text}</p>}
    </div>
  )
}

export function Logo() {
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="INFYRO home">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <path d="M9 22V10h3v12zM15 22V10h3l5 7.5V10h3v12h-3l-5-7.5V22z" fill="#fff" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-wide text-white">INFYRO</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Technology Solutions</span>
      </span>
    </Link>
  )
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink'
const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }
const variants = {
  primary: 'bg-brand text-white shadow-glow hover:bg-brand-500',
  ghost: 'border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10',
  white: 'bg-white text-brand-700 shadow-soft hover:bg-brand-50',
}

// Renders a router link (`to`), a plain anchor (`href`) or a button.
export function Button({ to, href, onClick, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} onClick={onClick} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  )
}

export function Arrow({ className = 'h-4 w-4' }) {
  return <Icon name="arrow" className={className} strokeWidth={2.2} />
}

export function IconBox({ name, className = '' }) {
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-300 ring-1 ring-inset ring-brand-400/25 ${className}`}>
      <Icon name={name} className="h-6 w-6" />
    </span>
  )
}

export function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
        active ? 'border-brand bg-brand text-white shadow-glow' : 'border-white/15 bg-white/5 text-slate-300 hover:border-brand-400/60 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
