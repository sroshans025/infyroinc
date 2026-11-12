import LetsTalkBlock from './LetsTalkBlock'
import FooterColumns from './FooterColumns'
import GroupCompaniesBand from './GroupCompaniesBand'
import LegalBar from './LegalBar'

/**
 * Group footer (navy): link columns · the three companies · © + socials + Back to top.
 * The landing page has its own "Let's Work Together" band, so the Let's Talk block is omitted there.
 */
export default function MegaFooter({ letsTalk = true }) {
  return (
    <footer className="bg-navy text-[#9CA3AF]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      {letsTalk && <LetsTalkBlock />}
      <FooterColumns first={!letsTalk} />
      <GroupCompaniesBand />
      <LegalBar />
    </footer>
  )
}
