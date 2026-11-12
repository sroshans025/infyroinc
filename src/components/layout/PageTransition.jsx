import { createContext, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Ctx = createContext({ go: () => {} })
export const usePageTransition = () => useContext(Ctx)

/** Navigation helper. Page changes are instant — no curtain or overlay transitions. */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const go = useCallback((href) => navigate(href), [navigate])
  return <Ctx.Provider value={{ go }}>{children}</Ctx.Provider>
}
