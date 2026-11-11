import { useEffect, useState } from 'react'

/** Advances an index every `interval` ms; skips ticks while paused or the tab is hidden (FINAL §6.5). */
export function useHeroCycle(length, { interval = 3500, paused = false } = {}) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % length)
    }, interval)
    return () => clearInterval(id)
  }, [length, interval, paused])
  return [i, setI]
}
