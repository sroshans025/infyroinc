import { Marquee } from '@/components/magicui/marquee'

// Slow strip of stack names. Pauses on hover; reduced motion shows a static, wrapped list.
export default function TechMarquee({ items }) {
  return (
    <div
      className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]"
      role="group"
      aria-label="Technologies we work with"
    >
      <Marquee pauseOnHover repeat={2} className="[--duration:50s] [--gap:2.25rem] motion-reduce:flex-wrap">
        {items.map((t) => (
          <span key={t} className="shrink-0 text-[13px] font-medium text-slate-400 transition-colors hover:text-paper">
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
