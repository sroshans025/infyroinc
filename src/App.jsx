import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ChatWidget from './components/ChatWidget.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollUtils from './components/ScrollUtils.jsx'
import { EVENTS } from './data.js'
const About = lazy(() => import('./pages/About.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const EventPage = lazy(() => import('./pages/EventPage.jsx'))
import Home from './pages/Home.jsx'
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))

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
        <Suspense fallback={<div className="min-h-[60vh]" />}>
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
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
