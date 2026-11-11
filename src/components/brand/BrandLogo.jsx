import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import InfyroMark from './InfyroMark'
import { LOGOS } from '../../data/brands'
import { BRANDS } from '../../data/navigation'

// The facet that "glows" for each brand (Inc. lights none — it is all three).
const FACET_FOR = { inc: null, tech: 'tech', studios: 'studios', construction: 'construction' }

const SIZES = {
  nav: { mark: 32, word: 'h-[23px]', sub: 'text-[9px]', gap: 'gap-2' },
  md: { mark: 44, word: 'h-[31px]', sub: 'text-[11px]', gap: 'gap-2.5' },
  lg: { mark: 68, word: 'h-[48px]', sub: 'text-[14px]', gap: 'gap-3.5' },
}

/**
 * <BrandLogo> — <InfyroMark> + the "Infyro" wordmark + live sub-name (FINAL §5.1).
 * `interactive`: navbar hover — facets pop 2px and snap back, the brand's facet glows,
 * sub-name tracking widens 0.3em → 0.4em, and a shine sweeps across the wordmark (§5.2).
 * `compact`: mark + sub-name only (mobile navbar).
 */
export default function BrandLogo({ brand = 'inc', size = 'nav', tone = 'dark', interactive = false, compact = false, sequence = false, noMark = false, className = '' }) {
  const reduce = useReducedMotion()
  const s = SIZES[size]
  const b = BRANDS[brand]
  const light = tone === 'light'
  const [hover, setHover] = useState(false)
  const [pop, setPop] = useState(false)
  const t = useRef()

  const enter = () => {
    if (!interactive || reduce) return
    setHover(true)
    setPop(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setPop(false), 170)
  }
  const leave = () => setHover(false)
  const wordSrc = light ? LOGOS.wordmark.white : LOGOS.wordmark.src

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave}>
      {!noMark && <InfyroMark
        size={s.mark}
        tone={light ? 'white' : 'blue'}
        active={hover ? FACET_FOR[brand] : null}
        dim={0.55}
        glow
        exploded={pop ? 0.34 : 0}
        sequence={sequence}
      />}
      <span className="flex flex-col justify-center" aria-hidden="true">
        {!(compact && b.sub) && (
          <span className={`relative block ${s.word}`}>
            <img src={wordSrc} alt="" width={LOGOS.wordmark.w} height={LOGOS.wordmark.h} draggable={false} className="h-full w-auto select-none" />
            {interactive && !reduce && (
              <span
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{ WebkitMaskImage: `url(${wordSrc})`, maskImage: `url(${wordSrc})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}
              >
                <span
                  className={`absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent ${light ? 'via-[#7DB8FF]' : 'via-white/80'} to-transparent transition-transform duration-[600ms] ease-out ${
                    hover ? 'translate-x-[300%]' : 'translate-x-0'
                  }`}
                />
              </span>
            )}
          </span>
        )}
        {b.sub && (
          <span
            className={`mt-[3px] block whitespace-nowrap font-bold uppercase leading-none transition-[letter-spacing] duration-300 ease-out ${s.sub} ${
              hover ? 'tracking-[0.4em]' : 'tracking-[0.3em]'
            } ${light ? 'text-white' : 'text-[#0A78F2]'}`}
          >
            {b.sub}
          </span>
        )}
      </span>
      <span className="sr-only">{b.name}</span>
    </span>
  )
}
