import Mark from './Mark'
import { LOGOS } from '../../data/brands'
import { BRANDS } from '../../data/navigation'

const SIZES = {
  nav: { mark: 30, word: 'h-[22px]', sub: 'text-[9px]', gap: 'gap-2', group: 'text-[17px]' },
  md: { mark: 40, word: 'h-[29px]', sub: 'text-[10px]', gap: 'gap-2.5', group: 'text-[20px]' },
  lg: { mark: 64, word: 'h-[46px]', sub: 'text-[13px]', gap: 'gap-3.5', group: 'text-[30px]' },
}

/**
 * Logo: the Infyro mark + "Infyro" wordmark + company sub-name.
 * `groupName`: mark + the plain text "INFYRO" (navbar on group pages).
 * `compact`: mark + sub-name only (narrow phones). `noMark`: wordmark only.
 */
export default function BrandLogo({ brand = 'inc', size = 'nav', tone = 'dark', compact = false, noMark = false, groupName = false, className = '' }) {
  const s = SIZES[size]
  const b = BRANDS[brand]
  const light = tone === 'light'
  const wordSrc = light ? LOGOS.wordmark.white : LOGOS.wordmark.src

  if (groupName) {
    return (
      <span className={`inline-flex items-center ${s.gap} ${className}`}>
        <Mark size={s.mark} color={light ? '#FFFFFF' : '#0A78F2'} />
        <span className={`whitespace-nowrap font-bold tracking-[0.08em] ${s.group} ${light ? 'text-white' : 'text-ink'}`}>INFYRO</span>
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      {!noMark && <Mark size={s.mark} color={light ? '#FFFFFF' : '#0A78F2'} />}
      <span className="flex flex-col justify-center" aria-hidden="true">
        {!(compact && b.sub) && (
          <span className={`block ${s.word}`}>
            <img src={wordSrc} alt="" width={LOGOS.wordmark.w} height={LOGOS.wordmark.h} draggable={false} className="h-full w-auto select-none" />
          </span>
        )}
        {b.sub && (
          <span className={`mt-[3px] block whitespace-nowrap font-bold uppercase leading-none tracking-[0.3em] ${s.sub} ${light ? 'text-white' : 'text-[#0A78F2]'}`}>{b.sub}</span>
        )}
      </span>
      <span className="sr-only">{b.name}</span>
    </span>
  )
}
