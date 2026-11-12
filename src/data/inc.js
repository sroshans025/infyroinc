// The Infyro Group landing page copy.
import { Lightbulb, ShieldCheck, Award, Users, HeartHandshake, TrendingUp, Eye, Target } from 'lucide-react'

export const hero = {
  lines: ['One Parent Company.', 'Three Distinct Businesses.'],
  lead: 'Infyro Inc. is the parent company behind Infyro Technologies, Infyro Studios, and Infyro Construction — three specialized businesses united by a shared vision of innovation, creativity, and sustainable growth.',
  tagline: 'Innovative Ideas into Digital Reality.',
  primary: { label: 'Explore Our Companies', href: '#companies' },
  secondary: { label: 'Discover Infyro', href: '#about' },
}

export const companies = {
  eyebrow: 'What We Do',
  title: 'Our Companies',
  items: [
    {
      key: 'tech',
      name: 'Infyro Technologies',
      tagline: 'Innovative Ideas into Digital Reality.',
      description:
        'An IT services and technology solutions company focused on software development, AI-driven solutions, web and mobile applications, and digital transformation.',
      href: '/technologies',
      cta: 'Explore Infyro Technologies',
    },
    {
      key: 'studios',
      name: 'Infyro Studios',
      tagline: 'Your Story, Our Frame.',
      description:
        'A creative media and event management brand dedicated to cinematic storytelling, exceptional photography, and unforgettable experiences.',
      href: '/studios',
      cta: 'Explore Infyro Studios',
    },
    {
      key: 'construction',
      name: 'Infyro Construction',
      tagline: 'Building Trust. Creating Futures.',
      description:
        'Dedicated to transforming visions into enduring structures through quality craftsmanship, thoughtful planning, and reliable construction solutions.',
      href: '/construction',
      cta: 'Explore Infyro Construction',
    },
  ],
}

export const about = {
  statement:
    'Every great business begins with a vision. Ours is to build businesses that create meaningful impact.',
  eyebrow: 'About Us',
  paragraphs: [
    'Infyro Inc. is a parent company established with a vision to bring together diverse business domains under one unified identity. With a focus on innovation, creativity, and continuous growth, we are building a business ecosystem that connects technology, creative media, and construction.',
    'Our journey extends across three specialized subsidiaries: Infyro Technologies, Infyro Studios, and Infyro Construction. Each company operates within its own domain, bringing distinct expertise, services, and opportunities while sharing the broader vision and values of Infyro Inc.',
  ],
  // Third paragraph, visualised as three mini-tiles while keeping the exact sentences.
  pillars: [
    { key: 'tech', label: 'Technology', text: 'Through our technology business, we aim to develop digital solutions and embrace emerging innovations.' },
    { key: 'studios', label: 'Creative Studio', text: 'Through our creative studio, we transform ideas and moments into meaningful visual experiences.' },
    { key: 'construction', label: 'Construction', text: 'Through our construction business, we aspire to contribute to building spaces and shaping the environments of tomorrow.' },
  ],
  closingParagraph:
    'We believe that sustainable growth comes from strong values, continuous learning, collaboration, and a commitment to quality. As we continue to evolve, our goal is to strengthen each business, explore new opportunities, and establish a trusted presence across the industries we serve.',
}

export const visionMission = [
  { label: 'Our Vision', icon: Eye, text: 'To build a trusted business group that drives innovation and sustainable growth across diverse industries.' },
  { label: 'Our Mission', icon: Target, text: 'To empower our subsidiary companies through innovation, quality, and collaboration, creating lasting value and new opportunities.' },
]

export const values = {
  title: 'Our Core Values',
  intro: 'The principles that guide every company in the group — how we work, decide and deliver.',
  items: [
    { name: 'Innovation', icon: Lightbulb, text: 'We embrace new ideas and emerging technologies to create solutions that move people and businesses forward.' },
    { name: 'Integrity', icon: ShieldCheck, text: 'We act with honesty, transparency and accountability in every partnership, project and decision.' },
    { name: 'Excellence', icon: Award, text: 'We hold ourselves to high standards of quality and care in everything we design, build and deliver.' },
    { name: 'Collaboration', icon: Users, text: 'We achieve more together — across our three companies and side by side with our clients and partners.' },
    { name: 'Customer Commitment', icon: HeartHandshake, text: "We put our clients' needs first and build lasting relationships founded on trust and reliability." },
    { name: 'Continuous Growth', icon: TrendingUp, text: 'We keep learning, improving and evolving — as individuals, as teams and as a business group.' },
  ],
  closing: 'Infyro Inc. — Driven by Values. United by Vision.',
}

export const why = {
  title: 'Why Infyro?',
  // Segments: `strong: true` phrases are highlighted in ink while the rest stays muted.
  segments: [
    { text: 'Infyro Inc. brings together three specialized businesses — Infyro Technologies, Infyro Studios, and Infyro Construction — under ' },
    { text: 'one unified vision', strong: true },
    { text: '. Driven by ' },
    { text: 'innovation, quality, and collaboration', strong: true },
    { text: ', we focus on developing expertise, creating meaningful opportunities, and delivering value across diverse industries. Our commitment to continuous growth and excellence drives us to build trusted relationships and shape a better future.' },
  ],
}

export const workTogether = {
  title: "Let's Work Together",
  body: "At Infyro Inc., we believe great things happen through collaboration. Whether you're looking for business partnerships, exploring new opportunities, or planning an innovative idea, we're ready to connect, collaborate, and grow together.",
  sub: "Let's turn ideas into impact and build a better future together.",
  primary: { label: 'Get in Touch', href: 'mailto:info@infyroinc.com' },
  secondary: { label: 'Explore Our Companies', href: '#companies' },
}
