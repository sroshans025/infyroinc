import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { usePageMeta } from '../components/hooks.js'
import { Button, Container, IconBox } from '../components/ui.jsx'
import { CONFIG } from '../config.js'
import { SUBJECTS } from '../data.js'
import FaqList from '../sections/FaqList.jsx'

const input =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand/20'

const STATUS = {
  sending: 'Sending your message...',
  sent: "Thank you. Your message has been sent and the INFYRO team will get back to you.",
  error: 'Something went wrong while sending. Please try again in a moment.',
  mailto: 'Your email app should open with the message ready to send.',
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.message.trim()) e.message = 'Please tell us how we can help.'
  return e
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-200">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-brand-200">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  usePageMeta('Contact', 'Have a project in mind? Get in touch with INFYRO. We typically reply within one business day.')
  const [params] = useSearchParams()
  const service = params.get('service')
  const brief = params.get('brief')
  const isSubject = SUBJECTS.includes(service)

  const [v, setV] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: isSubject ? service : 'New Project Inquiry',
    message: brief || (service && !isSubject ? `I'm interested in: ${service}\n\n` : ''),
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus('')
      return
    }
    if (CONFIG.formEndpoint) {
      setStatus('sending')
      try {
        const r = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(v),
        })
        if (!r.ok) throw new Error('bad status')
        setStatus('sent')
        setV((s) => ({ ...s, name: '', email: '', phone: '', company: '', message: '' }))
      } catch {
        setStatus('error')
      }
      return
    }
    const lines = [`Name: ${v.name}`, `Email: ${v.email}`]
    if (v.phone) lines.push(`Phone: ${v.phone}`)
    if (v.company) lines.push(`Company: ${v.company}`)
    const body = [...lines, '', v.message].join('\n')
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`${v.subject}`)}&body=${encodeURIComponent(body)}`
    setStatus('mailto')
  }

  const cards = [
    { icon: 'mail', label: 'Email Us', value: CONFIG.email, href: `mailto:${CONFIG.email}` },
    { icon: 'phone', label: 'Call Us', value: CONFIG.phone, href: `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}` },
    { icon: 'pin', label: 'Our Office', value: CONFIG.address, href: CONFIG.mapsUrl },
    { icon: 'clock', label: 'Operational Hours', value: CONFIG.hours },
  ].filter((c) => c.value)

  return (
    <>
      <PageHero eyebrow="Reach Out" title="Get in" accent="Touch" text="Have a project in mind? Want to explore how INFYRO can help? We'd love to hear from you." />

      <section className="bg-ink py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => {
              const inner = (
                <>
                  <IconBox name={c.icon} className="!h-11 !w-11" />
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{c.label}</div>
                  <div className="mt-1 break-words font-medium text-white">{c.value}</div>
                </>
              )
              return c.href ? (
                <SpotlightCard key={c.label} as="a" href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block p-6">
                  {inner}
                </SpotlightCard>
              ) : (
                <SpotlightCard key={c.label} className="p-6">
                  {inner}
                </SpotlightCard>
              )
            })}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-white/10 bg-navy p-6 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-white">How Can We Help?</h2>
              <p className="mt-2 text-slate-400">Fill the form below. It will open your email client pre-filled and send directly to our team.</p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field id="fName" label="Full Name" required error={errors.name}>
                  <input id="fName" value={v.name} onChange={set('name')} autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'fName-err' : undefined} />
                </Field>
                <Field id="fEmail" label="Email Address" required error={errors.email}>
                  <input id="fEmail" type="email" value={v.email} onChange={set('email')} autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'fEmail-err' : undefined} />
                </Field>
                <Field id="fPhone" label="Phone Number">
                  <input id="fPhone" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" className={input} />
                </Field>
                <Field id="fCompany" label="Company / Organisation">
                  <input id="fCompany" value={v.company} onChange={set('company')} autoComplete="organization" className={input} />
                </Field>
              </div>
              <div className="mt-5">
                <Field id="fSubject" label="Subject" required>
                  <select id="fSubject" value={v.subject} onChange={set('subject')} className={`${input} [&>option]:text-navy`}>
                    {SUBJECTS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="mt-5">
                <Field id="fMsg" label="Message" required error={errors.message}>
                  <textarea id="fMsg" rows={6} value={v.message} onChange={set('message')} className={input} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'fMsg-err' : undefined} />
                </Field>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 disabled:opacity-60"
              >
                <Icon name="send" className="h-5 w-5" /> {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              <p role="status" aria-live="polite" className={`mt-4 text-sm ${status === 'error' ? 'text-brand-200' : 'text-slate-300'}`}>
                {STATUS[status] || (CONFIG.formEndpoint ? '' : `Sends directly to ${CONFIG.email}`)}
              </p>
            </form>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy">
                <iframe
                  title="INFYRO office location map"
                  src="https://www.google.com/maps?q=Tiruchirappalli%2C+Tamil+Nadu&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 opacity-90 [filter:invert(.92)_hue-rotate(180deg)_saturate(.8)]"
                />
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <div className="font-display font-bold text-white">Our Location</div>
                    <div className="text-sm text-slate-400">{CONFIG.address}</div>
                  </div>
                  <Button href={CONFIG.mapsUrl} variant="ghost">
                    Open map
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-navy p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">Connect With Us</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {Object.entries(CONFIG.social)
                    .filter(([, u]) => u)
                    .map(([k, u]) => (
                      <a key={k} href={u} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold capitalize text-slate-200 transition hover:border-brand-400 hover:bg-brand/15 hover:text-white">
                        <Icon name={k === 'linkedin' || k === 'instagram' ? k : 'globe'} className="h-4 w-4" /> {k}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqList bg="bg-navy" eyebrow="Quick FAQs" title="Quick answers" />
    </>
  )
}
