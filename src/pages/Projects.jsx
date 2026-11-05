import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { usePageMeta } from '../components/hooks.js'
import ProjectShowcase from '../sections/ProjectShowcase.jsx'
import TechMarquee from '../sections/TechMarquee.jsx'
import Testimonials from '../sections/Testimonials.jsx'

export default function Projects() {
  usePageMeta('Projects', 'Explore INFYRO enterprise-grade IT projects across web, mobile, AI, analytics, cloud and automation.')
  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Our"
        accent="Projects"
        text="Real solutions. Real results. Explore our portfolio of enterprise-grade IT projects across industries and technology domains."
      />
      <ProjectShowcase searchable header={false} />
      <TechMarquee />
      <Testimonials />
      <CtaBand eyebrow="Start Your Project" title="Your next" accent="success story?" text="Let's build something that drives real results. Our team is ready to turn your vision into a production-ready solution." primary={{ to: '/contact', label: 'Start Your Project' }} secondary={{ to: '/services', label: 'View Our Services' }} />
    </>
  )
}
