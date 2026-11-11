import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { megaFooter } from '../../data/footer'
import { PHONE, EMAILS } from '../../data/contact'

const letters = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.035 } },
}
const letter = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** [A] VDart-style "Let's Talk" block that opens the footer. */
export default function LetsTalkBlock() {
  const { eyebrow, title, sub, button } = megaFooter.letsTalk
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[820px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(closest-side, #0A78F2, transparent)' }}
      />
      <div className="container-content relative pb-20 pt-24 md:pt-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="t-mono text-[11px] text-[#5AA9FF]">{eyebrow}</p>
            <motion.h3
              className="mt-4 text-[56px] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-[80px] lg:text-[120px]"
              variants={letters}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="sr-only">{title}</span>
              {title.split('').map((ch, i) => (
                <motion.span key={i} variants={letter} aria-hidden="true" className="inline-block whitespace-pre">
                  {ch}
                </motion.span>
              ))}
            </motion.h3>
            <p className="mt-6 max-w-xl text-[20px] leading-[1.45] text-[#9CA3AF] md:text-[24px]">{sub}</p>
            <Button href={button.href} variant="light" icon={ArrowRight} className="mt-10">
              {button.label}
            </Button>
          </div>

          <dl className="space-y-6 lg:pb-3 lg:text-right">
            <div>
              <dt className="t-mono text-[11px] text-[#9CA3AF]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAILS.inc}`} className="link-grow text-[20px] font-medium text-white">
                  {EMAILS.inc}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-mono text-[11px] text-[#9CA3AF]">Call</dt>
              <dd className="mt-1">
                <a href={PHONE.href} className="link-grow text-[20px] font-medium text-white">
                  {PHONE.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
