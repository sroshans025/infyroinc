import SocialIcon from '../ui/SocialIcon'
import { socialList } from '../../data/contact'
import { useBrandKey } from '../precision/brandContext'

/** 36px circular outline buttons. Profiles a company doesn't have are hidden. */
export default function SocialLinks({ keys = ['linkedin', 'instagram', 'x'], tone = 'dark' }) {
  const brand = useBrandKey()
  const items = socialList(brand).filter((s) => keys.includes(s.key))
  if (!items.length) return null
  const ring =
    tone === 'dark'
      ? 'ring-white/15 text-[#D1D5DB] hover:text-white hover:ring-white/40'
      : 'ring-hairline text-ink-2 hover:text-brand-ink hover:ring-[rgb(var(--brand-rgb)/0.4)] bg-white'
  return (
    <ul className="flex items-center gap-2">
      {items.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            className={`grid h-11 w-11 place-items-center rounded-full ring-1 ring-inset transition-colors duration-200 md:h-9 md:w-9 ${ring}`}
          >
            <SocialIcon name={s.key} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
