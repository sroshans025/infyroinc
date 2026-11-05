import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONFIG } from '../config.js'
import Icon from './Icon.jsx'

const GREETING = { from: 'bot', text: '👋 Hi! How can INFYRO help you today? Pick a topic or send us a quick message and we will get back to you.' }

const TOPICS = {
  project: { label: 'Start a project', text: 'Great! Tell us what you want to build and we will reply with a tailored proposal, usually within 1 business day.', link: { to: '/contact', label: 'Open the contact form' } },
  services: { label: 'Our services', text: 'We cover custom software, mobile apps, cloud, AI & automation, data & BI and IT consulting.', link: { to: '/services', label: 'Browse services' } },
  careers: { label: 'Careers & internships', text: 'Our 2026 Training & Internship Program is open, along with roles across engineering, data, cloud, design and growth.', link: { to: '/careers', label: 'See openings' } },
  reach: { label: 'Contact details', text: `Email ${CONFIG.email}${CONFIG.phone ? `, call ${CONFIG.phone}` : ''}. ${CONFIG.hours || ''}`.trim() },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([GREETING])
  const [text, setText] = useState('')
  const end = useRef(null)

  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: 'end' })
  }, [msgs, open])

  const pick = (k) => {
    const t = TOPICS[k]
    setMsgs((m) => [...m, { from: 'user', text: t.label }, { from: 'bot', text: t.text, link: t.link }])
  }

  const send = (e) => {
    e.preventDefault()
    const v = text.trim()
    if (!v) return
    const href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(v)}`
    setMsgs((m) => [...m, { from: 'user', text: v }, { from: 'bot', text: 'Thanks! Tap below to send this to the INFYRO team by email.', mail: href }])
    setText('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="INFYRO chat"
          className="flex h-[min(30rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] animate-pop flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl"
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-700 to-brand px-4 py-3.5 text-white">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Icon name="chat" className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-brand-700 bg-brand-300" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold">INFYRO Support</div>
              <div className="text-xs text-brand-100">Typically replies in 1 day</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto rounded-lg p-1.5 hover:bg-white/15">
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex animate-pop ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'rounded-br-sm bg-brand text-white' : 'rounded-bl-sm bg-white/10 text-slate-200'}`}>
                  {m.text}
                  {m.link && (
                    <Link to={m.link.to} onClick={() => setOpen(false)} className="mt-2 block font-semibold text-brand-300 underline underline-offset-2">
                      {m.link.label}
                    </Link>
                  )}
                  {m.mail && (
                    <a href={m.mail} className="mt-2 block font-semibold text-brand-300 underline underline-offset-2">
                      Send by email
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {Object.entries(TOPICS).map(([k, t]) => (
                <button key={k} type="button" onClick={() => pick(k)} className="rounded-full border border-brand-400/40 px-3 py-1.5 text-xs font-semibold text-brand-200 transition hover:bg-brand/20">
                  {t.label}
                </button>
              ))}
            </div>
            <div ref={end} />
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              aria-label="Your message"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            />
            <button type="submit" aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand-500">
              <Icon name="send" className="h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with INFYRO'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-glow transition hover:scale-105 hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
      >
        <Icon name={open ? 'close' : 'chat'} className="h-6 w-6" />
      </button>
    </div>
  )
}
