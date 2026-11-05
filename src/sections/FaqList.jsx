import { FAQ } from '../data.js'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Container, SectionHead } from '../components/ui.jsx'

export default function FaqList({ title = 'Questions, answered', eyebrow = 'FAQ', text, bg = 'bg-ink' }) {
  return (
    <section id="faq" className={`${bg} py-20 sm:py-28`}>
      <Container>
        <SectionHead eyebrow={eyebrow} title={title} text={text} />
        <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
