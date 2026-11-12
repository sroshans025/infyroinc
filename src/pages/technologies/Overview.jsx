import { useSearchParams } from 'react-router-dom'
import Seo from '../../components/layout/Seo'
import Button from '../../components/ui/Button'
import CompanyHero from '../../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, ProgramSection } from '../../components/company/Sections'
import ContactSplit from '../../components/company/ContactSplit'
import { hero, overview, pillars, academic, corporate, careers, contact, techContactForm, ENQUIRY_TYPES, internshipsLink } from '../../data/tech'
import { EMAILS } from '../../data/contact'
import heroImg from '../../assets/images/tech/hero.webp'
import aboutImg from '../../assets/images/tech/about.webp'
import softwareImg from '../../assets/images/tech/software.webp'
import mobileImg from '../../assets/images/tech/webmobile.webp'
import aiImg from '../../assets/images/tech/ai.webp'
import dataImg from '../../assets/images/tech/data.webp'
import cloudImg from '../../assets/images/tech/cloud.webp'
import consultingImg from '../../assets/images/tech/consulting.webp'
import academicImg from '../../assets/images/tech/academic.webp'
import corporateImg from '../../assets/images/tech/corporate.webp'
import careersImg from '../../assets/images/tech/careers.webp'

const PILLAR_IMG = [softwareImg, mobileImg, aiImg, dataImg, cloudImg, consultingImg]

/**
 * /technologies — About · Six Pillars · Academic Training (+ Internships) · Corporate Training ·
 * Careers · Contact. One page, shared company template.
 */
export default function Overview() {
  const [params, setParams] = useSearchParams()
  const type = ENQUIRY_TYPES[params.get('type')] ? params.get('type') : null
  const select = (t) => setParams(t === type ? {} : { type: t }, { replace: true, preventScrollReset: true })

  return (
    <>
      <Seo page="tech" />
      <CompanyHero
        brandKey="tech"
        title={hero.title}
        small={hero.small}
        primary={hero.primary}
        secondary={hero.secondary}
        image={heroImg}
        imageAlt="Software engineers working together at their desks"
      />

      <AboutSplit
        eyebrow={overview.eyebrow}
        image={aboutImg}
        imageAlt="An open-plan technology office"
        lead={overview.paragraphs[0]}
        paragraphs={[overview.paragraphs[1]]}
        pills={overview.expertise}
        tiles={[{ label: overview.purpose.label.replace(':', ''), text: overview.purpose.text }]}
        closing={[overview.closing]}
      />

      <ServiceGrid
        id="pillars"
        eyebrow="What We Do"
        title={pillars.title}
        intro={pillars.intro}
        items={pillars.items.map((p, i) => ({ ...p, image: PILLAR_IMG[i] }))}
        closing={{ title: pillars.commitment.text, extra: pillars.commitment.label.replace(':', '') }}
      />

      <ProgramSection
        id="academic"
        label="Academic Training"
        data={academic}
        tone="alt"
        image={academicImg}
        imageAlt="Students learning together around a laptop"
        extra={
          <Button href={internshipsLink.href} variant="secondary">
            {internshipsLink.label}
          </Button>
        }
      />
      <ProgramSection id="corporate" label="Corporate Training" data={corporate} tone="white" image={corporateImg} imageAlt="A corporate training session in a seminar room" />
      <ProgramSection id="careers" label="Careers" data={careers} tone="alt" image={careersImg} imageAlt="A team collaborating on laptops" />

      <ContactSplit
        tone="white"
        title={contact.title}
        lead={contact.intro}
        help={{ title: contact.helpTitle, tiles: contact.help, selected: type, onSelect: select }}
        formTitle={contact.formTitle}
        formIntro={contact.formIntro}
        form={techContactForm}
        inbox={EMAILS.tech}
        preset={type ? { enquiryType: ENQUIRY_TYPES[type] } : undefined}
        asideTitle={contact.connectTitle}
        asideBody={contact.connectBody}
        socials={[{ key: 'instagram' }, { key: 'linkedin' }]}
        signoff={[contact.signoff.name, ...contact.signoff.lines]}
      />
    </>
  )
}
