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

export function Logo({ className = 'h-9' }) {
  return (
    <Link to="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400" aria-label="INFYRO home">
      <img src="/logo-light.png" alt="INFYRO" width="483" height="165" className={`${className} w-auto`} />
    </Link>
  )
}

export { Button } from './ui/button.jsx'

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
