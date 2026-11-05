import ParticleField from './ParticleField.jsx'
import { Container } from './ui.jsx'

// Hero banner used at the top of every inner page.
export default function PageHero({ eyebrow, title, accent, text, children }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-navy">
      <div aria-hidden="true" className="absolute -left-32 -top-32 -z-10 h-[420px] w-[420px] animate-glow rounded-full bg-brand/40 blur-[120px] motion-reduce:animate-none" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 -z-10 h-[320px] w-[320px] animate-glow rounded-full bg-brand-400/20 blur-[110px] [animation-delay:2s] motion-reduce:animate-none" />
      <div aria-hidden="true" className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_30%,black,transparent_80%)]" />
      <ParticleField className="-z-10 opacity-60" density={14000} />
      <Container className="relative py-20 text-center sm:py-28">
        {eyebrow && (
          <span className="inline-block animate-fade-up text-xs font-bold uppercase tracking-[0.25em] text-brand-400 motion-reduce:animate-none">{eyebrow}</span>
        )}
        <h1 className="mx-auto mt-4 max-w-4xl animate-fade-up font-display text-4xl font-bold leading-[1.08] tracking-tight text-white [animation-delay:100ms] motion-reduce:animate-none sm:text-5xl lg:text-6xl">
          {title} {accent && <span className="gradient-text">{accent}</span>}
        </h1>
        {text && (
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-slate-300 [animation-delay:200ms] motion-reduce:animate-none sm:text-xl">{text}</p>
        )}
        {children && <div className="mt-9 animate-fade-up [animation-delay:300ms] motion-reduce:animate-none">{children}</div>}
      </Container>
    </section>
  )
}
