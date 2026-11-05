import { Link } from 'react-router-dom'
import { CONFIG } from '../config.js'
import { NAV, PILLARS } from '../data.js'
import Icon from './Icon.jsx'
import { Container, Logo } from './ui.jsx'

const SOCIAL = { linkedin: 'LinkedIn', instagram: 'Instagram', x: 'X', facebook: 'Facebook', github: 'GitHub' }

export default function Footer() {
  const year = new Date().getFullYear()
  const social = Object.entries(CONFIG.social || {}).filter(([, url]) => url)
  const contact = [
    CONFIG.email && { icon: 'mail', text: CONFIG.email, href: `mailto:${CONFIG.email}` },
    CONFIG.phone && { icon: 'phone', text: CONFIG.phone, href: `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}` },
    CONFIG.hours && { icon: 'clock', text: CONFIG.hours },
    CONFIG.address && { icon: 'pin', text: CONFIG.address, href: CONFIG.mapsUrl },
  ].filter(Boolean)

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-ink text-slate-400">
      <div aria-hidden="true" className="absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-brand/15 blur-[110px]" />
      <Container className="pt-16">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Building scalable, zero-friction software architectures to optimize business operating models.
            </p>
            <Link
              to="/careers"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand-200 transition hover:bg-brand/20"
            >
              🎓 Internship Program Open
            </Link>
            {social.length > 0 && (
              <div className="mt-6 flex gap-2">
                {social.map(([k, url]) => (
                  <a
                    key={k}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL[k] || k}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-brand-400 hover:bg-brand/20 hover:text-white"
                  >
                    <Icon name={k === 'linkedin' || k === 'instagram' ? k : 'globe'} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Service Pillars</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {PILLARS.map((p) => (
                <li key={p.title}>
                  <Link to="/services" className="transition hover:text-white">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {contact.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <Icon name={c.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="break-words transition hover:text-white"
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span className="break-words">{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-sm sm:flex-row sm:items-center">
          <span>&copy; {year} INFYRO. All rights reserved.</span>
          <a href="#top" className="inline-flex items-center gap-1.5 font-medium text-slate-300 transition hover:text-white">
            Back to top <Icon name="arrowUp" className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
