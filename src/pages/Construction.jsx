import Seo from '../components/layout/Seo'
import CompanyHero from '../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, BookingBand } from '../components/company/Sections'
import ContactSplit from '../components/company/ContactSplit'
import usePresetFromUrl from '../lib/usePresetFromUrl'
import { hero, about, visionMission, services, consultation, contact, constructionContactForm } from '../data/construction'
import { EMAILS, mailto } from '../data/contact'

/** /construction — FINAL §1 flow: About · Services · Booking (email) · Contact. Shared company template. */
export default function Construction() {
  const bookingHref = mailto(EMAILS.construction, 'Consultation request — Infyro Construction')
  const preset = usePresetFromUrl('project', constructionContactForm)
  return (
    <>
      <Seo page="construction" />
      <CompanyHero brandKey="construction" label="Construction" title={hero.title} small={hero.small} primary={hero.primary} secondary={hero.secondary} image={hero.image} />

      <AboutSplit n={2} eyebrow={about.title} lead={about.paragraphs[0]} paragraphs={[about.paragraphs[1]]} tiles={visionMission} closing={about.signoff} />

      <ServiceGrid
        n={3}
        title={services.title}
        tagline={services.tagline}
        intro={services.intro}
        items={services.items.map((s) => ({ ...s, n: Number(s.n) }))}
        hrefFor={(s) => `/construction?project=${encodeURIComponent(s.title)}#contact`}
        closing={{ title: services.closing.title, sub: services.closing.sub, extra: services.closing.signoff }}
      />

      <BookingBand
        n={4}
        title={consultation.title}
        sub={consultation.sub}
        body={consultation.body}
        enquiry={{ title: consultation.enquiryTitle, body: consultation.enquiryBody }}
        helper={consultation.helper}
        button={consultation.button}
        href={bookingHref}
        signoff={consultation.signoff}
      />

      <ContactSplit
        n={5}
        title={contact.title}
        tagline={contact.sub}
        lead={contact.body}
        formTitle={contact.formTitle}
        form={constructionContactForm}
        inbox={EMAILS.construction}
        preset={preset}
        asideTitle={contact.getInTouch}
        below={contact.below}
        signoff={contact.signoff}
      />
    </>
  )
}
