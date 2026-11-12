import FooterColumns from './FooterColumns'
import LegalBar from './LegalBar'

/** The one footer used on every page: brand block + link columns, then © · socials · Back to top. */
export default function MegaFooter() {
  return (
    <footer className="bg-navy text-[#9CA3AF]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <FooterColumns first />
      <LegalBar />
    </footer>
  )
}
