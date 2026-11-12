import Seo from '../components/layout/Seo'
import CompanyHero from '../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, BookingBand } from '../components/company/Sections'
import ContactSplit from '../components/company/ContactSplit'
import usePresetFromUrl from '../lib/usePresetFromUrl'
import { hero, about, visionMission, services, consultation, contact, constructionContactForm } from '../data/construction'
import { EMAILS } from '../data/contact'
import { CONSTRUCTION_BOOKING_FORM } from '../data/links'
import heroImg from '../assets/images/construction/hero.webp'
import aboutImg from '../assets/images/construction/about.webp'
import residentialImg from '../assets/images/construction/residential.webp'
import commercialImg from '../assets/images/construction/commercial.webp'
import architectureImg from '../assets/images/construction/architecture.webp'
import renovationImg from '../assets/images/construction/renovation.webp'
import interiorImg from '../assets/images/construction/interior.webp'
import pmImg from '../assets/images/construction/pm.webp'

const SERVICE_IMG = [residentialImg, commercialImg, architectureImg, renovationImg, interiorImg, pmImg]

/** /construction — About · Services · Booking (Google Form) · Contact. Shared company template. */
export default function Construction() {
  const preset = usePresetFromUrl('project', constructionContactForm)
  return (
    <>
      <Seo page="construction" />
      <CompanyHero
        brandKey="construction"
        title={hero.title}
        small={hero.small}
        primary={hero.primary}
        secondary={hero.secondary}
        image={heroImg}
        imageAlt="An engineering team reviewing a construction site"
      />

      <AboutSplit
        eyebrow={about.title}
        lead={about.paragraphs[0]}
        paragraphs={[about.paragraphs[1]]}
        tiles={visionMission}
        image={aboutImg}
        imageAlt="Modern architecture against a clear sky"
      />

      <ServiceGrid
        eyebrow="What We Do"
        title={services.title}
        tagline={services.tagline}
        intro={services.intro}
        items={services.items.map((s, i) => ({ ...s, image: SERVICE_IMG[i] }))}
        closing={{ title: services.closing.title, sub: services.closing.sub }}
      />

      <BookingBand
        title={consultation.title}
        sub={consultation.sub}
        body={consultation.body}
        enquiry={{ title: consultation.enquiryTitle, body: consultation.enquiryBody }}
        helper={CONSTRUCTION_BOOKING_FORM ? consultation.helper : null}
        button={CONSTRUCTION_BOOKING_FORM ? consultation.button : 'Send an Enquiry'}
        href={CONSTRUCTION_BOOKING_FORM || '#contact'}
        signoff={consultation.signoff}
        image={heroImg}
      />

      <ContactSplit
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
