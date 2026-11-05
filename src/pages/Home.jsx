import CtaBand from '../components/CtaBand.jsx'
import { usePageMeta } from '../components/hooks.js'
import CareersBand from '../sections/CareersBand.jsx'
import EventsBand from '../sections/EventsBand.jsx'
import FaqList from '../sections/FaqList.jsx'
import Hero from '../sections/Hero.jsx'
import Planner from '../sections/Planner.jsx'
import ProcessStepper from '../sections/ProcessStepper.jsx'
import ProjectShowcase from '../sections/ProjectShowcase.jsx'
import ServicesExplorer from '../sections/ServicesExplorer.jsx'
import StatsBand from '../sections/StatsBand.jsx'
import TechMarquee from '../sections/TechMarquee.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import WhyUs from '../sections/WhyUs.jsx'

export default function Home() {
  usePageMeta('', 'INFYRO is an IT services and consulting firm building custom software, mobile apps, cloud, AI & automation for SMEs and startups.')
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesExplorer />
      <Planner />
      <ProjectShowcase limit={6} id="work" />
      <ProcessStepper />
      <WhyUs />
      <TechMarquee />
      <Testimonials />
      <EventsBand />
      <CareersBand />
      <FaqList />
      <CtaBand />
    </>
  )
}
