import Seo from '../../components/layout/Seo'
import Section from '../../components/ui/Section'
import SectionHeading from '../../components/ui/SectionHeading'
import { ButtonGroup } from '../../components/ui/Button'
import CompanyHero from '../../components/company/CompanyHero'
import PCard from '../../components/precision/PCard'
import { Ticks } from '../../components/precision/Primitives'
import { SectionDivider } from '../../components/precision/Motifs'
import { internships } from '../../data/tech'

/**
 * /technologies/internships — the only extra page (FINAL §1). Same template: hero → content → CTA → footer.
 * Programme details are shared directly with interested applicants, so this page is a short intro + Apply / Enquire.
 */
export default function Internships() {
  return (
    <>
      <Seo page="internships" />
      <CompanyHero
        brandKey="tech"
        label={internships.eyebrow}
        title={internships.title}
        small={internships.intro}
        primary={internships.cta.primary}
        secondary={internships.cta.secondary}
      />

      <SectionDivider n={2} className="bg-white py-6" />
      <Section tone="alt" labelledBy="intern-cta-title">
        <SectionHeading id="intern-cta-title" n={2} eyebrow="Enquire" title={internships.cta.title} lead={internships.cta.body} />
        <PCard lift={false} className="relative mt-10 p-8 md:p-10">
          <Ticks on />
          <p className="t-body mb-6 max-w-[60ch] text-ink-2">Programme details are shared directly with interested applicants. Apply or enquire, and our team will get in touch.</p>
          <ButtonGroup primary={internships.cta.primary} secondary={internships.cta.secondary} />
        </PCard>
      </Section>
    </>
  )
}
