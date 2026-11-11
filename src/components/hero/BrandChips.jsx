import InfyroMark from '../brand/InfyroMark'
import { Ticks } from '../precision/Primitives'

/**
 * Three equal brand chips (FINAL §6.2). Hover/focus locks; click opens; touch: first tap locks, second opens.
 * Mobile: 3-column small squares (mark facet + short name).
 */
export default function BrandChips({ brands, active, onLock, onRelease, onGo, onPointerType }) {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-4" aria-label="Our companies">
      {brands.map((b, i) => {
        const on = active === i
        return (
          <li key={b.id}>
            <button
              type="button"
              aria-describedby={`chip-${b.id}-tag`}
              onPointerDown={(e) => onPointerType(e.pointerType, i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && onLock(i)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && onRelease()}
              onFocus={() => onLock(i, true)}
              onBlur={onRelease}
              onClick={(e) => onGo(i, e)}
              className={`group relative flex w-full flex-col items-center justify-center gap-2 rounded-card border bg-white px-2 py-3 transition-[border-color,box-shadow,transform] duration-300 ease-apple sm:flex-row sm:justify-start sm:gap-3 sm:px-5 sm:py-4 ${
                on ? 'tick-on -translate-y-0.5 border-line-strong shadow-card' : 'border-line'
              }`}
            >
              <Ticks />
              <InfyroMark size={24} active={b.key} dim={on ? 0.25 : 0.18} />
              <span className="text-center sm:text-left">
                <span className={`block text-[12px] font-semibold sm:text-[15px] ${on ? 'text-ink' : 'text-ink-2'}`}>
                  <span className="sr-only">Infyro </span>
                  {b.name.replace('Infyro ', '')}
                </span>
                <span className="t-mono hidden text-[10px] text-muted sm:block">{`0${i + 1} / ${b.sub}`}</span>
              </span>
              <span id={`chip-${b.id}-tag`} className="sr-only">
                {b.tagline}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
