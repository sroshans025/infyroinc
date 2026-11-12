import { ChevronRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import Mark from '../brand/Mark'
import { BRANDS, COMPANY_KEYS } from '../../data/navigation'

/** The three companies as a row of links, separated by hairlines. */
export default function GroupCompaniesBand() {
  return (
    <div className="border-t border-white/[0.08]">
      <div className="container-content">
        <ul className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
          {COMPANY_KEYS.map((k) => {
            const b = BRANDS[k]
            return (
              <li key={k}>
                <SmartLink href={b.path} className="group flex h-full items-center justify-between gap-4 py-6 transition-colors hover:bg-white/[0.03] md:px-6 md:first:pl-0">
                  <span className="flex items-center gap-4">
                    <Mark size={30} />
                    <span>
                      <span className="block text-[15px] font-semibold text-white">{b.name}</span>
                      <span className="mt-0.5 block text-[13px] text-[#9CA3AF]">{b.tagline}</span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#9CA3AF] group-hover:text-white" />
                </SmartLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
