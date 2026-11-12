import { createContext, useContext } from 'react'

/** Current brand key for the route ('inc' | 'tech' | 'studios' | 'construction'). */
export const BrandCtx = createContext('inc')
export const useBrandKey = () => useContext(BrandCtx)
