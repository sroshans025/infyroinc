import ParticleField from './ParticleField.jsx'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { Arrow, Button, Container } from './ui.jsx'

// Full-width closing call to action used at the bottom of pages.
export default function CtaBand({
  eyebrow = "Let's Work Together",
  title = 'Ready to build something',
  accent = 'Extraordinary?',
  text = "Let's discuss your vision and create a digital solution that drives real business results.",
  primary = { to: '/contact', label: 'Start Your Project' },
  secondary = { to: '/projects', label: 'View Our Work' },
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy py-24 sm:py-32">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[140px]" />
      <div aria-hidden="true" className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent_80%)]" />
      <ParticleField className="-z-10 opacity-50" density={16000} />
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">{eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title} <span className="gradient-text">{accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button to={primary.to} size="lg">
                {primary.label} <Arrow />
              </Button>
            </Magnetic>
            {secondary && (
              <Button to={secondary.to} variant="ghost" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
