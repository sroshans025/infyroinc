import { ArrowUp } from 'lucide-react'
import SocialLinks from './SocialLinks'
import { megaFooter } from '../../data/footer'

export const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('main')?.focus({ preventScroll: true })
}

/** © line · socials · Back to top ↑ (smooth-scrolls to the top). */
export default function LegalBar({ copyright = megaFooter.copyright, socials }) {
  const year = new Date().getFullYear()
  return (
    <div className="border-t border-white/[0.08]">
      <div className="container-content flex flex-col gap-4 py-6 text-[13px] text-[#9CA3AF] md:flex-row md:items-center md:justify-between">
        <p>{copyright(year)}</p>
        <div className="flex items-center gap-4">
          <SocialLinks keys={socials} />
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-medium text-[#D1D5DB] ring-1 ring-inset ring-white/15 transition-colors hover:text-white hover:ring-white/40"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
