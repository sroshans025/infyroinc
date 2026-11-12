/**
 * FeatureCard — the one content card used across the site.
 * Black surface, coloured accent bar + icon badge, optional photo on top.
 * `accent` cycles through a fixed palette so neighbouring cards differ in colour, not in shape.
 */
export const ACCENTS = [
  { bar: 'from-[#0A78F2] to-[#38BDF8]', badge: 'from-[#0A78F2] to-[#0052AD]', text: 'text-[#7DB8FF]' },
  { bar: 'from-[#8B5CF6] to-[#EC4899]', badge: 'from-[#8B5CF6] to-[#5B21B6]', text: 'text-[#C4B5FD]' },
  { bar: 'from-[#14B8A6] to-[#22C55E]', badge: 'from-[#14B8A6] to-[#0F766E]', text: 'text-[#5EEAD4]' },
  { bar: 'from-[#F59E0B] to-[#EF4444]', badge: 'from-[#F59E0B] to-[#B45309]', text: 'text-[#FCD34D]' },
  { bar: 'from-[#EC4899] to-[#F43F5E]', badge: 'from-[#EC4899] to-[#9D174D]', text: 'text-[#F9A8D4]' },
  { bar: 'from-[#06B6D4] to-[#3B82F6]', badge: 'from-[#06B6D4] to-[#0E7490]', text: 'text-[#67E8F9]' },
]

export const accentAt = (i) => ACCENTS[i % ACCENTS.length]

/** Shared surface classes, for black panels that are not FeatureCards (e.g. list panels). */
export const CARD_SURFACE = 'relative overflow-hidden rounded-card bg-[#111827]/[0.86] backdrop-blur-sm text-white/75 ring-1 ring-white/10 shadow-soft'

export default function FeatureCard({
  as: Tag = 'article',
  accent = 0,
  image,
  imageAlt = '',
  icon: Icon,
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
    <Tag
      className={`group ${CARD_SURFACE} flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg ${className}`}
      {...rest}
    >
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r ${a.bar}`} />
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        {(Icon || badge) && (
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-gradient-to-br ${a.badge} text-white shadow-lg ${image ? '-mt-12 ring-4 ring-white/15' : ''}`}
          >
            {Icon ? <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} /> : <span className="text-[15px] font-bold">{badge}</span>}
          </span>
        )}
        <Title className={`text-[18px] font-semibold leading-snug !text-white ${Icon || badge ? 'mt-5' : ''}`}>{title}</Title>
        {kicker && <p className={`mt-2 text-[14px] font-semibold ${a.text}`}>{kicker}</p>}
        {children && <div className="mt-3 text-[14px] leading-[1.7] text-white/70">{children}</div>}
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </div>
    </Tag>
  )
}
