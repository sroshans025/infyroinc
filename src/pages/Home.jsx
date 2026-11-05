import { usePageMeta } from '../components/hooks.js'
import Hero from '../sections/Hero.jsx'
import About from '../sections/home/About.jsx'
import Capabilities from '../sections/home/Capabilities.jsx'
import ContactFinale from '../sections/home/ContactFinale.jsx'
import Process from '../sections/home/Process.jsx'
import Services from '../sections/home/Services.jsx'
import Technologies from '../sections/home/Technologies.jsx'
import WhyInfyro from '../sections/home/WhyInfyro.jsx'
import Work from '../sections/home/Work.jsx'

// The single-page experience. Each section has its own id for in-page navigation.
export default function Home() {
  usePageMeta('', 'INFYRO is an IT services and consulting firm building custom software, mobile apps, cloud, AI & automation for SMEs and startups.')
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Services />
      <Technologies />
      <Work />
      <Process />
      <WhyInfyro />
      <ContactFinale />
    </>
  )
}
