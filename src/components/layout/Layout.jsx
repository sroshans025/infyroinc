import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'
import { PageTransitionProvider } from './PageTransition'
import MegaFooter from '../footer/MegaFooter'
import BrandFooter from '../footer/BrandFooter'
import { BrandCtx } from '../precision/brandContext'
import { brandForPath } from '../../data/navigation'

/**
 * App shell: theme + brand context per route, ONE navbar for every page (FINAL §3),
 * the cross-brand page transition, and the footer chosen by route.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const brand = brandForPath(pathname)
  const isLanding = pathname === '/'

  return (
    <PageTransitionProvider>
      <BrandCtx.Provider value={brand.key}>
        <div className={`${brand.theme} flex min-h-[100svh] flex-col`}>
          <a
            href="#main"
            className="sr-only z-[70] rounded-full bg-navy px-5 py-3 text-[14px] font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
          >
            Skip to content
          </a>
          <ScrollToTop />
          <Navbar brand={brand} />

          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
              <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                <Outlet />
              </motion.div>
            </Suspense>
          </main>

          {/* On the landing page the navy "Let's work together" band opens the mega footer (FINAL §7 #6). */}
          {brand.key === 'inc' ? <MegaFooter letsTalk={!isLanding} /> : <BrandFooter brandKey={brand.key} />}
        </div>
      </BrandCtx.Provider>
    </PageTransitionProvider>
  )
}
