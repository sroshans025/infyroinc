/**
 * FeatureCard — the one content card used across the site.
 * White surface, black title, muted text. Colour lives only inside: the icon badge
 * (and an optional kicker line). Optional photo on top, with the badge overlapping it
 * inside a soft frosted ring.
 * `accent` cycles through a fixed palette so neighbouring badges differ in colour, not in shape.
 */
export const ACCENTS = [
  { badge: 'from-[#0A78F2] to-[#0052AD]', text: 'text-[#0063D1]' },
  { badge: 'from-[#8B5CF6] to-[#5B21B6]', text: 'text-[#6D28D9]' },
  { badge: 'from-[#14B8A6] to-[#0F766E]', text: 'text-[#0F766E]' },
  { badge: 'from-[#F59E0B] to-[#B45309]', text: 'text-[#B45309]' },
  { badge: 'from-[#EC4899] to-[#9D174D]', text: 'text-[#BE185D]' },
  { badge: 'from-[#06B6D4] to-[#0E7490]', text: 'text-[#0E7490]' },
]

export const accentAt = (i) => ACCENTS[i % ACCENTS.length]

/** Shared surface classes (white card), for panels that are not FeatureCards (e.g. list panels). */
export const CARD_SURFACE = 'relative overflow-hidden rounded-card border border-line bg-white text-ink-2 shadow-soft'

/** Coloured icon badge. `framed` adds the frosted ring used where it overlaps a photo. */
export function Badge({ accent = 0, icon: Icon, children, framed = false, className = '' }) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-gradient-to-br ${accentAt(accent).badge} text-white shadow-lg ${framed ? 'ring-4 ring-white/60 backdrop-blur-sm' : ''} ${className}`}
    >
      {Icon ? <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} /> : <span className="text-[15px] font-bold">{children}</span>}
    </span>
  )
}

export default function FeatureCard({
  as: Tag = 'article',
  accent = 0,
  image,
  imageAlt = '',
  icon,
  badge,
  title,
  titleAs: Title = 'h3',
  kicker,
  children,
  footer,
  className = '',
  ...rest
}) {
  const a = accentAt(accent)
  return (
    <Tag className={`group ${CARD_SURFACE} flex h-full flex-col transition-shadow duration-300 hover:shadow-soft-lg ${className}`} {...rest}>
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        {(icon || badge) && (
          <Badge accent={accent} icon={icon} framed={!!image} className={image ? '-mt-12' : ''}>
            {badge}
          </Badge>
        )}
        <Title className={`text-[18px] font-semibold leading-snug text-ink ${icon || badge ? 'mt-5' : ''}`}>{title}</Title>
        {kicker && <p className={`mt-2 text-[14px] font-semibold ${a.text}`}>{kicker}</p>}
        {children && <div className="mt-3 text-[14px] leading-[1.7] text-muted">{children}</div>}
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </div>
    </Tag>
  )
}
