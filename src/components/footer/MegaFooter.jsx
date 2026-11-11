import LetsTalkBlock from './LetsTalkBlock'
import FooterColumns from './FooterColumns'
import GroupCompaniesBand from './GroupCompaniesBand'
import LegalBar from './LegalBar'
import GridSpotlight from '../precision/GridSpotlight'

/**
 * Infyro Inc. mega footer — VDart structure restyled in the Precision language (FINAL §7):
 * navy, white grid at 6%. On the landing page the "Let's work together" band precedes it, so the
 * Let's Talk block is omitted there (`letsTalk={false}`).
 */
export default function MegaFooter({ letsTalk = true }) {
  return (
    <footer className="relative overflow-hidden bg-navy text-[#9CA3AF]" aria-labelledby="footer-heading">
      <GridSpotlight variant="dark" fade={false} />
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative">
        {letsTalk && <LetsTalkBlock />}
        <FooterColumns first={!letsTalk} />
        <GroupCompaniesBand />
        <LegalBar />
      </div>
    </footer>
  )
}
