import { Phone, Mail, MapPin } from 'lucide-react'
import SocialIcon from '../ui/SocialIcon'
import SmartLink from '../ui/SmartLink'
import { PHONE, ADDRESS, socialList } from '../../data/contact'
import { useBrandKey } from '../precision/brandContext'

/**
 * Contact details list: Call / Email / socials. `socials` = [{ key, label }] — label overrides
 * (e.g. "Follow Our Stories"). Profiles the company doesn't have are skipped.
 */
export default function ContactPanel({ email, socials = [], className = '' }) {
  const list = socialList(useBrandKey())
  const row = 'flex min-h-[56px] items-center gap-4 border-t border-hairline py-4'
  const icon = 'grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-ink'
  return (
    <ul className={className}>
      <li>
        <a href={PHONE.href} className={`${row} group`}>
          <span className={icon}>
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-[13px] text-muted">Call</span>
            <span className="block text-[17px] font-medium text-ink group-hover:text-brand-ink">{PHONE.display}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={`mailto:${email}`} className={`${row} group`}>
          <span className={icon}>
            <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] text-muted">Email</span>
            <span className="block break-all text-[17px] font-medium text-ink group-hover:text-brand-ink">{email}</span>
          </span>
        </a>
      </li>
      <li className={row}>
        <span className={icon}>
          <MapPin aria-hidden="true" className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[13px] text-muted">Location</span>
          <span className="block text-[17px] font-medium text-ink">{ADDRESS}</span>
        </span>
      </li>
      {socials.map(({ key, label }) => {
        const s = list.find((x) => x.key === key)
        if (!s) return null
        return (
          <li key={key}>
            <SmartLink href={s.href} className={`${row} group`}>
              <span className={icon}>
                <SocialIcon name={key} className="h-4 w-4" />
              </span>
              <span>
                {label && <span className="block text-[13px] text-muted">{s.label}</span>}
                <span className={`block text-[17px] font-medium text-ink group-hover:text-brand-ink`}>{label ?? s.label}</span>
              </span>
            </SmartLink>
          </li>
        )
      })}
    </ul>
  )
}
