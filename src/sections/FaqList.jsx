import { FAQ } from '../data.js'
import Icon from '../components/Icon.jsx'
import { Container, SectionHead } from '../components/ui.jsx'

export default function FaqList({ title = 'Questions, answered', eyebrow = 'FAQ', text, bg = 'bg-ink' }) {
  return (
    <section id="faq" className={`${bg} py-20 sm:py-28`}>
      <Container>
        <SectionHead eyebrow={eyebrow} title={title} text={text} />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-white/10 bg-white/[0.03] transition open:border-brand-400/40 open:bg-brand/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-display text-base font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-300 transition duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                  <Icon name="plus" className="h-4 w-4" strokeWidth={2.4} />
                </span>
              </summary>
              <p className="px-5 pb-5 pr-12 text-[15px] leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
