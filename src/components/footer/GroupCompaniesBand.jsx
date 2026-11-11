import { ChevronRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import InfyroMark from '../brand/InfyroMark'
import { BRANDS, COMPANY_KEYS } from '../../data/navigation'
import { megaFooter } from '../../data/footer'

/** [C] "The Infyro Group" — three equal cells, hairline dividers, accent top border on hover. */
export default function GroupCompaniesBand() {
  return (
    <div className="border-t border-white/[0.08]">
      <div className="container-content py-10">
        <p className="t-mono text-[11px] text-[#9CA3AF]">{megaFooter.groupLabel}</p>
        <ul className="mt-6 grid grid-cols-1 divide-y divide-white/[0.08] border-y border-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
          {COMPANY_KEYS.map((k) => {
            const b = BRANDS[k]
            return (
              <li key={k}>
                <SmartLink
                  href={b.path}
                  className="group relative flex h-full items-center justify-between gap-4 px-1 py-6 transition-colors duration-300 hover:bg-white/[0.03] md:px-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#0A78F2] transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <span className="flex items-center gap-4">
                    <InfyroMark size={40} active={k} dim={0.25} lift={null} />
                    <span>
                      <span className="block text-[16px] font-semibold text-white">{b.name}</span>
                      <span className="mt-0.5 block text-[13px] text-[#9CA3AF]">{b.tagline}</span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </SmartLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
