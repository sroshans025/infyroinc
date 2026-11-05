import { Route, Routes } from 'react-router-dom'
import ChatWidget from './components/ChatWidget.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollUtils from './components/ScrollUtils.jsx'
import { EVENTS } from './data.js'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import EventPage from './pages/EventPage.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-base">
      {/* Keeps the area behind phone status bars matching the header */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[env(safe-area-inset-top,0px)] bg-ink" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand"
      >
        Skip to content
      </a>
      <ScrollUtils />
      <Header />
      <main id="main" className="pt-[68px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hackathon-2026" element={<EventPage event={EVENTS.hackathon} />} />
          <Route path="/icsi-2026" element={<EventPage event={EVENTS.icsi} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
