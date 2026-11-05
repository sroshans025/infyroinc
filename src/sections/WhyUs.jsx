import { WHY } from '../data.js'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { Container, IconBox, SectionHead } from '../components/ui.jsx'

export default function WhyUs() {
  return (
    <section id="why" className="relative isolate overflow-hidden bg-navy py-20 sm:py-28">
      <div aria-hidden="true" className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent_80%)]" />
      <Container>
        <SectionHead
          eyebrow="Why INFYRO"
          title="Technical expertise with business sense"
          text="We combine deep technical expertise with business acumen to deliver solutions that don't just work. They drive measurable results and competitive advantage."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, n) => (
            <Reveal key={w.title} delay={n * 90}>
              <SpotlightCard className="h-full p-7">
                <IconBox name={w.icon} />
                <h3 className="mt-5 font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{w.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
