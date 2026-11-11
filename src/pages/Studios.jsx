import Seo from '../components/layout/Seo'
import CompanyHero from '../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, BookingBand } from '../components/company/Sections'
import ContactSplit from '../components/company/ContactSplit'
import { hero, about, visionMission, services, book, contact, studiosContactForm } from '../data/studios'
import { EMAILS, mailto } from '../data/contact'
import usePresetFromUrl from '../lib/usePresetFromUrl'

/** /studios — FINAL §1 flow: About · Services · Booking (email) · Contact. Shared company template. */
export default function Studios() {
  const bookingHref = mailto(EMAILS.studios, 'Booking enquiry — Infyro Studios')
  const preset = usePresetFromUrl('service', studiosContactForm)
  return (
    <>
      <Seo page="studios" />
      <CompanyHero brandKey="studios" label="Studios" title={hero.title} small={hero.small} primary={hero.primary} secondary={hero.secondary} image={hero.image} />

      <AboutSplit n={2} eyebrow={about.title} lead={about.text} tiles={visionMission} />

      <ServiceGrid
        n={3}
        title={services.title}
        tagline={services.tagline}
        intro={services.intro}
        items={services.items.map((s) => ({ ...s, n: Number(s.n) }))}
        hrefFor={(s) => `/studios?service=${encodeURIComponent(s.title)}#contact`}
        closing={{ title: services.closing.title, sub: services.closing.sub }}
      />

      <BookingBand n={4} title={book.title} sub={book.sub} body={book.body} button={book.button} href={bookingHref} note={book.note} signoff={[book.signoff]} />

      <ContactSplit
        n={5}
        title={contact.title}
        tagline={contact.sub}
        lead={contact.body}
        formTitle={studiosContactForm.title}
        form={studiosContactForm}
        inbox={EMAILS.studios}
        preset={preset}
        asideTitle={contact.getInTouch}
        socials={[
          { key: 'instagram', label: contact.instagramLabel },
          { key: 'linkedin', label: contact.linkedinLabel },
        ]}
        below={contact.below}
        signoff={contact.signoff}
      />
    </>
  )
}
