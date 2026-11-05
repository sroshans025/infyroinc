import { cn } from '@/lib/utils'

// Magic UI marquee: repeats its children `repeat` times and scrolls them with CSS only.
export function Marquee({ className, reverse = false, pauseOnHover = false, children, repeat = 4, ...props }) {
  return (
    <div {...props} className={cn('group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]', className)}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            'flex shrink-0 items-center justify-around [gap:var(--gap)] motion-reduce:animate-none',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            i > 0 && 'motion-reduce:hidden'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
