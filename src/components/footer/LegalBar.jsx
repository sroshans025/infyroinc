import InfyroMark from '../brand/InfyroMark'
import SocialLinks from './SocialLinks'
import { megaFooter } from '../../data/footer'

export const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('main')?.focus({ preventScroll: true })
}

/** [D] © line · legal links · socials · Back to top. */
export default function LegalBar() {
  const year = new Date().getFullYear()
  return (
    <div className="border-t border-white/[0.08]">
      <div className="container-content flex flex-col gap-5 py-6 text-[13px] text-[#9CA3AF] lg:flex-row lg:items-center lg:justify-between">
        <p>{megaFooter.copyright(year)}</p>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[#D1D5DB] hover:text-white"
          >
            Back to top
            {/* FINAL §10: the mark rotates 90° on hover */}
            <span aria-hidden="true" className="inline-flex transition-transform duration-500 ease-apple group-hover:-rotate-90">
              <InfyroMark size={18} tone="white" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
