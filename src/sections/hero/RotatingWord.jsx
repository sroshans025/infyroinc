import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../components/hooks.js'

// Cycles through `words` with a vertical slide + blur. All words share one grid cell, so the
// box is always as wide/tall as the longest word and the headline never shifts.
export default function RotatingWord({ words, interval = 2600 }) {
  const reduce = useReducedMotion()
  const [state, setState] = useState({ cur: 0, prev: -1 })

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setState((s) => ({ cur: (s.cur + 1) % words.length, prev: s.cur })), interval)
    return () => clearInterval(id)
  }, [reduce, words.length, interval])

  return (
    <span className="relative -my-[0.12em] grid overflow-hidden py-[0.12em]">
      {words.map((w, i) => {
        const active = i === state.cur
        const leaving = i === state.prev
        // Words that are neither entering nor leaving wait below, with no transition so they never visibly slide
        const pose = active ? 'translate-y-0 opacity-100 blur-0' : leaving ? '-translate-y-[55%] opacity-0 blur-[6px]' : 'translate-y-[55%] opacity-0 blur-[6px] !transition-none'
        return (
          <span
            key={w}
            aria-hidden={!active}
            className={`col-start-1 row-start-1 text-brand-400 transition-[transform,opacity,filter] duration-700 ease-expo motion-reduce:transition-none ${pose}`}
          >
            {w}
          </span>
        )
      })}
    </span>
  )
}
