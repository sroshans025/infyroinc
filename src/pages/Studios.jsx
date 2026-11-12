import Seo from '../components/layout/Seo'
import CompanyHero from '../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, BookingBand } from '../components/company/Sections'
import ContactSplit from '../components/company/ContactSplit'
import { hero, about, visionMission, services, book, contact, studiosContactForm } from '../data/studios'
import { EMAILS } from '../data/contact'
import { STUDIOS_BOOKING_FORM } from '../data/links'
import usePresetFromUrl from '../lib/usePresetFromUrl'
import heroImg from '../assets/images/studios/hero.webp'
import aboutImg from '../assets/images/studios/about.webp'
import photoImg from '../assets/images/studios/photo.webp'
import videoImg from '../assets/images/studios/video.webp'
import weddingImg from '../assets/images/studios/wedding.webp'
import commercialImg from '../assets/images/studios/commercial.webp'
import contentImg from '../assets/images/studios/content.webp'
import creativeImg from '../assets/images/studios/creative.webp'
import bookingImg from '../assets/images/studios/booking.webp'

const SERVICE_IMG = [photoImg, videoImg, weddingImg, commercialImg, contentImg, creativeImg]

/** /studios — About · Services · Booking (Google Form) · Contact. Shared company template. */
export default function Studios() {
  const preset = usePresetFromUrl('service', studiosContactForm)
  return (
    <>
      <Seo page="studios" />
      <CompanyHero
        brandKey="studios"
        title={hero.title}
        small={hero.small}
        primary={hero.primary}
        secondary={hero.secondary}
        image={heroImg}
        imageAlt="Professional camera and lenses"
      />

      <AboutSplit eyebrow={about.title} lead={about.text} tiles={visionMission} image={aboutImg} imageAlt="A photographer capturing a misty mountain landscape" />

      <ServiceGrid
        eyebrow="What We Do"
        title={services.title}
        tagline={services.tagline}
        intro={services.intro}
        items={services.items.map((s, i) => ({ ...s, image: SERVICE_IMG[i] }))}
        closing={{ title: services.closing.title, sub: services.closing.sub }}
      />

      <BookingBand
        title={book.title}
        sub={book.sub}
        body={book.body}
        button={STUDIOS_BOOKING_FORM ? book.button : 'Send an Enquiry'}
        href={STUDIOS_BOOKING_FORM || '#contact'}
        note={book.note}
        signoff={[book.signoff]}
        image={bookingImg}
      />

      <ContactSplit
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
