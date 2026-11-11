import { lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Each company route is its own chunk.
const TechOverview = lazy(() => import('./pages/technologies/Overview'))
const Internships = lazy(() => import('./pages/technologies/Internships'))
const Studios = lazy(() => import('./pages/Studios'))
const Construction = lazy(() => import('./pages/Construction'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Old Technologies sub-routes now live as sections on /technologies (FINAL §1) — keep links working. */
function ToSection({ hash }) {
  const { search } = useLocation()
  return <Navigate to={`/technologies${search}#${hash}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="technologies">
          <Route index element={<TechOverview />} />
          <Route path="internships" element={<Internships />} />
          <Route path="academic-training" element={<ToSection hash="academic" />} />
          <Route path="corporate-training" element={<ToSection hash="corporate" />} />
          <Route path="careers" element={<ToSection hash="careers" />} />
          <Route path="contact" element={<ToSection hash="contact" />} />
        </Route>
        <Route path="studios" element={<Studios />} />
        <Route path="construction" element={<Construction />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
