import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import InfyroMark from '../brand/InfyroMark'

const Ctx = createContext({ go: () => {} })
export const usePageTransition = () => useContext(Ctx)
const EASE = [0.22, 1, 0.36, 1]

/**
 * Cross-brand page transition (FINAL §5.2): a white curtain wipes up while the mark assembles
 * (centre, 64px), the route changes under it, then the curtain lifts off the new page — ~700ms.
 * `variant: 'blue'` (hero facet click): a blue disc grows from the click point and fills the screen.
 * Reduced motion → plain navigation.
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const [t, setT] = useState(null) // { href, variant, origin, phase: 'in' | 'hold' | 'out' }
  const busy = useRef(false)

  const go = useCallback(
    (href, opts = {}) => {
      if (busy.current) return
      if (reduce) {
        navigate(href)
        return
      }
      busy.current = true
      setT({ href, variant: opts.variant ?? 'curtain', origin: opts.origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 }, phase: 'in' })
    },
    [navigate, reduce],
  )

  // After the new route has rendered, lift the curtain.
  useEffect(() => {
    if (t?.phase !== 'hold') return undefined
    const id = setTimeout(() => setT((v) => (v ? { ...v, phase: 'out' } : v)), 140)
    return () => clearTimeout(id)
  }, [pathname, t?.phase])

  const covered = () => {
    if (t?.phase !== 'in') return
    setT((v) => ({ ...v, phase: 'hold' }))
    navigate(t.href)
  }

  const blue = t?.variant === 'blue'
  const reach = t ? Math.hypot(Math.max(t.origin.x, window.innerWidth - t.origin.x), Math.max(t.origin.y, window.innerHeight - t.origin.y)) : 0

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      {createPortal(
        <AnimatePresence onExitComplete={() => (busy.current = false)}>
          {t && t.phase !== 'out' && (
            <motion.div
              key="pt"
              aria-hidden="true"
              className="fixed inset-0 z-[95] overflow-hidden"
              exit={blue ? { opacity: 0, transition: { duration: 0.35 } } : { y: '-100%', transition: { duration: 0.35, ease: EASE } }}
            >
              {blue ? (
                <motion.span
                  className="absolute rounded-full bg-[#0A78F2]"
                  style={{ left: t.origin.x - reach, top: t.origin.y - reach, width: reach * 2, height: reach * 2 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  onAnimationComplete={covered}
                />
              ) : (
                <motion.div className="absolute inset-0 bg-white" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.35, ease: EASE }} onAnimationComplete={covered}>
                  <div className="grid-blueprint grid-fade absolute inset-0" />
                </motion.div>
              )}
              <div className="absolute inset-0 grid place-items-center">
                <InfyroMark size={64} assemble tone={blue ? 'white' : 'blue'} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </Ctx.Provider>
  )
}
