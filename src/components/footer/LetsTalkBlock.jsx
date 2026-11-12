import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { megaFooter } from '../../data/footer'
import { PHONE, EMAILS } from '../../data/contact'

/** "Let's Talk" block that opens the footer on pages without their own contact band (404). */
export default function LetsTalkBlock() {
  const { eyebrow, title, sub, button } = megaFooter.letsTalk
  return (
    <div className="container-content flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="t-eyebrow text-[#7DB8FF]">{eyebrow}</p>
        <h3 className="mt-3 text-[36px] font-bold leading-tight tracking-[-0.02em] text-white md:text-[44px]">{title}</h3>
        <p className="mt-3 text-[16px] text-[#9CA3AF]">{sub}</p>
        <Button href={button.href} variant="light" icon={ArrowRight} className="mt-6">
          {button.label}
        </Button>
      </div>
      <dl className="space-y-4 md:text-right">
        <div>
          <dt className="t-eyebrow text-[#9CA3AF]">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${EMAILS.inc}`} className="text-[17px] font-medium text-white hover:underline">
              {EMAILS.inc}
            </a>
          </dd>
        </div>
        <div>
          <dt className="t-eyebrow text-[#9CA3AF]">Call</dt>
          <dd className="mt-1">
            <a href={PHONE.href} className="text-[17px] font-medium text-white hover:underline">
              {PHONE.display}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  )
}
