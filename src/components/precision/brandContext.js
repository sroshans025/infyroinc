import { createContext, useContext } from 'react'

/** Current brand key for the route ('inc' | 'tech' | 'studios' | 'construction') — picks the motif variant. */
export const BrandCtx = createContext('inc')
export const useBrandKey = () => useContext(BrandCtx)

/** Mono label style per brand (FINAL §4.2): SYS.01 / SCENE 01 / LVL 01. */
export const monoTag = (brand, n) => {
  const nn = String(n).padStart(2, '0')
  if (brand === 'tech') return `SYS.${nn}`
  if (brand === 'studios') return `SCENE ${nn}`
  if (brand === 'construction') return `LVL ${nn}`
  return `${nn}`
}

export const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
