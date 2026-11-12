// Infyro Construction page copy.
import { Home, Building2, DraftingCompass, Hammer, Sofa, ClipboardCheck, Eye, Target } from 'lucide-react'

export const hero = {
  title: 'Building Trust. Creating Futures.',
  small: 'An Infyro Inc. Company.',
  primary: { label: 'Book a Consultation', href: '#booking' },
  secondary: { label: 'Our Services', href: '#services' },
}

export const about = {
  title: 'About Infyro Construction',
  paragraphs: [
    'Infyro Construction is dedicated to transforming visions into enduring structures through quality craftsmanship, thoughtful planning, and reliable construction solutions. As a subsidiary of Infyro Inc., we focus on creating residential and commercial spaces that combine modern design, functionality, and lasting value.',
    'Driven by integrity, innovation, and customer satisfaction, we strive to build more than structures — we build trust, lasting relationships, and a foundation for a better future.',
  ],
  signoff: ['Infyro Construction — Building Trust. Creating Futures.', 'An Infyro Inc. Company.'],
}

export const visionMission = [
  { label: 'Our Vision', icon: Eye, text: 'To become a trusted construction brand recognized for quality, innovation, and excellence.' },
  { label: 'Our Mission', icon: Target, text: 'To deliver reliable, high-quality construction solutions through professional execution, modern design, and a commitment to customer satisfaction.' },
]

export const services = {
  title: 'Our Services',
  tagline: 'Building Excellence. Delivering Quality.',
  intro: 'At Infyro Construction, we provide thoughtfully planned construction solutions designed around quality, functionality, and lasting value.',
  items: [
    { n: '1', title: 'Residential Construction', text: 'Building modern homes, villas, and residential spaces tailored to your lifestyle.', icon: Home },
    { n: '2', title: 'Commercial Construction', text: 'Developing functional offices, commercial buildings, and business spaces.', icon: Building2 },
    { n: '3', title: 'Architectural Design & Planning', text: 'Transforming ideas into practical, aesthetically appealing architectural designs.', icon: DraftingCompass },
    { n: '4', title: 'Renovation & Remodeling', text: 'Upgrading existing spaces with modern designs, improved functionality, and quality finishes.', icon: Hammer },
    { n: '5', title: 'Interior Design & Finishing', text: 'Creating comfortable, elegant interiors that balance style and practicality.', icon: Sofa },
    { n: '6', title: 'Construction Project Management', text: 'Supporting project planning, coordination, execution, and quality monitoring.', icon: ClipboardCheck },
  ],
  closing: {
    title: "Let's Build Your Vision.",
    sub: 'From the first concept to the final structure, we aim to deliver quality, reliability, and confidence at every stage.',
    signoff: 'Infyro Construction — Building Trust. Creating Futures.',
  },
}

export const consultation = {
  title: 'Book a Consultation',
  sub: "Let's Build Your Vision.",
  body: 'Planning to build your dream home, develop a commercial space, or renovate an existing property? Infyro Construction is here to help turn your vision into reality with thoughtful planning and reliable construction solutions.',
  enquiryTitle: 'Submit Your Project Enquiry',
  enquiryBody: 'Share your project details with us, and our team can connect with you to discuss your requirements and the next steps.',
  helper: 'Click below to submit your project enquiry through our Google Form.',
  button: 'Book a Consultation',
  signoff: ['Infyro Construction — Building Trust. Creating Futures.', 'An Infyro Inc. Company.'],
}

export const contact = {
  title: 'Contact Us',
  sub: "Let's Build Your Future Together.",
  body: "Have a construction project in mind? Whether you're planning your dream home, developing a commercial space, or renovating an existing property, Infyro Construction is ready to help turn your vision into reality.",
  getInTouch: 'Get in Touch',
  formTitle: 'Send Us an Enquiry',
  below: 'Our team looks forward to understanding your requirements and exploring how we can build something exceptional together.',
  signoff: ['Infyro Construction — Building Trust. Creating Futures.', 'An Infyro Inc. Company.'],
}

export const constructionContactForm = {
  id: 'construction-contact',
  brand: 'Infyro Construction',
  submitLabel: 'Send Enquiry',
  successMessage: 'Thank you — our team will review your enquiry.',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, minLength: 2, autoComplete: 'name' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
    {
      name: 'projectType', label: 'Project Type', type: 'select', required: true,
      options: ['Residential Construction', 'Commercial Construction', 'Architectural Design & Planning', 'Renovation & Remodeling', 'Interior Design & Finishing', 'Construction Project Management'],
    },
    { name: 'location', label: 'Project Location', type: 'text', required: true, autoComplete: 'address-level2' },
    { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true, minLength: 10 },
  ],
}
