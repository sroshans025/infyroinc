import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config.js'
import { PILLARS } from '../../data.js'
import Icon from '../../components/Icon.jsx'
import { Container } from '../../components/ui.jsx'
import MagneticButton from '../hero/MagneticButton.jsx'
import ParticleField from '../hero/ParticleField.jsx'
import SectionLabel from './SectionLabel.jsx'

const TOPICS = [...PILLARS.map((p) => p.short), 'Something else']

const field =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-slate-500 transition focus:border-brand-400 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-brand-400/30'

// Closing "hero": oversized line, a short brief form, and direct contact details.
export default function ContactFinale() {
  const [topics, setTopics] = useState([])
  const [status, setStatus] = useState('')

  const toggle = (t) => setTopics((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]))

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const data = { name: f.get('name'), email: f.get('email'), topics: topics.join(', ') || 'Not specified', message: f.get('message') }
    if (CONFIG.formEndpoint) {
      setStatus('sending')
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, _subject: `New project brief: ${data.name}` }) })
        const res = await r.json().catch(() => ({}))
        // FormSubmit answers 200 with success "false" when it rejects a message
        const ok = r.ok && String(res.success) !== 'false'
        setStatus(ok ? 'sent' : 'error')
        if (ok) {
          form.reset()
          setTopics([])
        }
      } catch {
        setStatus('error')
      }
      return
    }
    const body = `Name: ${data.name}\nEmail: ${data.email}\nInterested in: ${data.topics}\n\n${data.message}`
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`New project: ${data.name}`)}&body=${encodeURIComponent(body)}`
    setStatus('mailto')
  }

  const message = {
    sending: 'Sending…',
    sent: 'Thanks. We will reply within one business day.',
    error: `Something went wrong. Please email ${CONFIG.email} directly.`,
    mailto: 'Your email app should open with the brief ready to send.',
  }[status]

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <ParticleField className="-z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_30%,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_15%_20%,rgba(27,131,242,0.18),transparent_70%)]" />

      <Container className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionLabel index={8}>Let&apos;s work together</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.5rem]"
          >
            Have an idea?
            <br />
            <span className="text-brand-400">Let&apos;s ship it.</span>
          </motion.h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-slate-400">Tell us what you are building. You will hear back from a person, not a bot, within one business day.</p>

          <ul className="mt-10 space-y-1">
            {[
              { icon: 'mail', text: CONFIG.email, href: `mailto:${CONFIG.email}` },
              { icon: 'phone', text: CONFIG.phone, href: `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}` },
              { icon: 'pin', text: CONFIG.address, href: CONFIG.mapsUrl },
            ].map((c) => (
              <li key={c.icon}>
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex min-h-[44px] items-center gap-3 text-base text-slate-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <Icon name={c.icon} className="h-4 w-4 text-brand-400" />
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">{c.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-navy/80 p-6 shadow-panel backdrop-blur-xl sm:p-8"
        >
          <fieldset>
            <legend className="text-sm font-medium text-white">What can we help with?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => {
                const on = topics.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(t)}
                    className={`min-h-[40px] rounded-full border px-4 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 active:scale-95 ${on ? 'border-brand bg-brand-700 text-white' : 'border-white/15 text-slate-300 hover:border-white/30 hover:text-white'}`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-white">Name</span>
              <input name="name" required autoComplete="name" className={`${field} mt-2`} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white">Email</span>
              <input name="email" type="email" required autoComplete="email" className={`${field} mt-2`} placeholder="you@company.com" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-white">Project details</span>
            <textarea name="message" required rows={4} className={`${field} mt-2 resize-none`} placeholder="What are you building, and by when?" />
          </label>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <MagneticButton as="button" type="submit" disabled={status === 'sending'}>
              Send brief <Icon name="send" className="h-4 w-4" />
            </MagneticButton>
            <p role="status" aria-live="polite" className="text-sm text-slate-400">
              {message || 'We reply within one business day.'}
            </p>
          </div>
        </motion.form>
      </Container>
    </section>
  )
}
