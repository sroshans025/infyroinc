import Seo from '../../components/layout/Seo'
import Section from '../../components/ui/Section'
import SectionHeading from '../../components/ui/SectionHeading'
import { ButtonGroup } from '../../components/ui/Button'
import CompanyHero from '../../components/company/CompanyHero'
import { internships } from '../../data/tech'
import heroImg from '../../assets/images/tech/intern.webp'

/**
 * /technologies/internships — short intro + Apply (Google Form) / Enquire.
 * Programme details are shared directly with interested applicants.
 */
export default function Internships() {
  return (
    <>
      <Seo page="internships" />
      <CompanyHero
        brandKey="tech"
        title={internships.title}
        small={internships.intro}
        primary={internships.cta.primary}
        secondary={internships.cta.secondary}
        image={heroImg}
        imageAlt="Code on a laptop screen"
      />

      <Section tone="alt" labelledBy="intern-cta-title">
        <SectionHeading id="intern-cta-title" eyebrow="Internship Programs" title={internships.cta.title} lead={internships.cta.body} />
        <div className="mx-auto mt-10 max-w-3xl rounded-card bg-navy p-8 text-center md:p-10">
          <p className="mx-auto max-w-[60ch] text-[16px] leading-[1.75] text-white/85">
            Programme details are shared directly with interested applicants. Apply or enquire, and our team will get in touch.
          </p>
          <ButtonGroup primary={internships.cta.primary} secondary={internships.cta.secondary} secondaryVariant="glass" align="center" className="mt-7" />
        </div>
      </Section>
    </>
  )
}
