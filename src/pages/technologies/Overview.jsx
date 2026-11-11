import { useSearchParams } from 'react-router-dom'
import Seo from '../../components/layout/Seo'
import Button from '../../components/ui/Button'
import CompanyHero from '../../components/company/CompanyHero'
import { AboutSplit, ServiceGrid, ProgramSection } from '../../components/company/Sections'
import ContactSplit from '../../components/company/ContactSplit'
import { hero, overview, pillars, academic, corporate, careers, contact, techContactForm, ENQUIRY_TYPES, internshipsLink } from '../../data/tech'
import { EMAILS } from '../../data/contact'

/**
 * /technologies — FINAL §1 flow: About · Six Pillars · Academic Training (+ Know More: Internships)
 * · Corporate Training · Career Opportunity · Contact. One page, shared company template.
 */
export default function Overview() {
  const [params, setParams] = useSearchParams()
  const type = ENQUIRY_TYPES[params.get('type')] ? params.get('type') : null
  const select = (t) => setParams(t === type ? {} : { type: t }, { replace: true, preventScrollReset: true })

  return (
    <>
      <Seo page="tech" />
      <CompanyHero brandKey="tech" label="Technologies" title={hero.title} small={hero.small} primary={hero.primary} secondary={hero.secondary} />

      <AboutSplit
        n={2}
        eyebrow={overview.eyebrow}
        lead={overview.paragraphs[0]}
        paragraphs={[overview.paragraphs[1]]}
        pills={overview.expertise}
        tiles={[{ label: overview.purpose.label.replace(':', ''), text: overview.purpose.text }]}
        closing={[overview.closing]}
      />

      <ServiceGrid
        id="pillars"
        n={3}
        eyebrow="Pillars"
        title={pillars.title}
        intro={pillars.intro}
        items={pillars.items.map((p) => ({ ...p, n: Number(p.n) }))}
        hrefFor={() => '/technologies?type=software#contact'}
        closing={{ title: `${pillars.commitment.label} ${pillars.commitment.text}` }}
      />

      <ProgramSection
        id="academic"
        n={4}
        label="Academic Training"
        data={academic}
        tone="alt"
        extra={
          <Button href={internshipsLink.href} variant="secondary">
            {internshipsLink.label}
          </Button>
        }
      />
      <ProgramSection id="corporate" n={5} label="Corporate Training" data={corporate} tone="white" />
      <ProgramSection id="careers" n={6} label="Careers" data={careers} tone="alt" />

      <ContactSplit
        n={7}
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
