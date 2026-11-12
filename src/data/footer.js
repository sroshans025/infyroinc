// All footer copy and links.
import { PHONE, EMAILS, ADDRESS, SOCIAL_BY_BRAND } from './contact'

/* ─────────────── Mega footer (landing) ─────────────── */
export const megaFooter = {
  letsTalk: {
    eyebrow: "Let's Work Together",
    title: "Let's Talk",
    sub: 'Ready to build the future together?',
    button: { label: 'Get in Touch', href: `mailto:${EMAILS.inc}` },
  },
  brand: {
    blurb:
      'Infyro Inc. is the parent company behind Infyro Technologies, Infyro Studios, and Infyro Construction — three specialized businesses united by a shared vision of innovation, creativity, and sustainable growth.',
  },
  columns: [
    {
      title: 'Our Companies',
      links: [
        { label: 'Infyro Technologies', href: '/technologies' },
        { label: 'Infyro Studios', href: '/studios' },
        { label: 'Infyro Construction', href: '/construction' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/#home' },
        { label: 'About Us', href: '/#about' },
        { label: 'Vision & Mission', href: '/#vision' },
        { label: 'Core Values', href: '/#values' },
        { label: 'Why Infyro', href: '/#why' },
      ],
    },
    {
      title: 'Opportunities',
      links: [
        { label: 'Academic Training', href: '/technologies#academic' },
        { label: 'Corporate Training', href: '/technologies#corporate' },
        { label: 'Careers', href: '/technologies#careers' },
        { label: 'Book a Session (Studios)', href: '/studios#booking' },
        { label: 'Book a Consultation (Construction)', href: '/construction#booking' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: `Call: ${PHONE.display}`, href: PHONE.href },
        { label: `Email: ${EMAILS.inc}`, href: `mailto:${EMAILS.inc}` },
        { label: ADDRESS },
      ],
    },
  ],
  copyright: (year) => `© ${year} Infyro Inc. All Rights Reserved.`,
}

/* ─────────────── Company footers ─────────────── */

export const brandFooters = {
  tech: {
    brandKey: 'tech',
    title: 'INFYRO TECHNOLOGIES',
    tagline: 'Innovative Ideas into Digital Reality.',
    blurb:
      'Infyro Technologies is an IT services and technology solutions company focused on software development, Artificial Intelligence, Machine Learning, Data Analytics, Cloud Computing, and digital transformation. We transform innovative ideas into practical digital solutions that help businesses grow and individuals develop their potential.',
    company: 'An Infyro Inc. Company',
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Home', href: '/technologies' },
          { label: 'About Us', href: '/technologies#about' },
          { label: 'Our Services', href: '/technologies#pillars' },
          // TODO: "Our Products" has no page yet — points at Services for now.
          { label: 'Our Products', href: '/technologies#pillars' },
          { label: 'Academic Training', href: '/technologies#academic' },
          { label: 'Corporate Training', href: '/technologies#corporate' },
          { label: 'Internship Programs', href: '/technologies/internships' },
          { label: 'Career Opportunities', href: '/technologies#careers' },
          { label: 'Contact Us', href: '/technologies#contact' },
        ],
      },
      {
        title: 'Our Services',
        links: [
          { label: 'Software Development', href: '/technologies#pillars' },
          { label: 'Web & Mobile Applications', href: '/technologies#pillars' },
          { label: 'AI & Machine Learning', href: '/technologies#pillars' },
          { label: 'Data Science & Business Intelligence', href: '/technologies#pillars' },
          { label: 'Cloud Computing & DevOps', href: '/technologies#pillars' },
          { label: 'IT Consulting', href: '/technologies#pillars' },
        ],
      },
      {
        title: 'Training & Opportunities',
        links: [
          { label: 'Academic Training Programs', href: '/technologies#academic' },
          { label: 'Corporate Training Programs', href: '/technologies#corporate' },
          { label: 'Internship Programs', href: '/technologies/internships' },
          { label: 'Career Opportunities', href: '/technologies#careers' },
        ],
      },
    ],
    contactTitle: 'Contact Us',
    contact: [
      { label: `Call: ${PHONE.display}`, href: PHONE.href },
      { label: `Email: ${EMAILS.tech}`, href: `mailto:${EMAILS.tech}` },
      { label: ADDRESS },
      { label: 'Instagram: Follow Us', href: SOCIAL_BY_BRAND.tech.instagram, external: true },
      { label: 'LinkedIn: Connect With Us', href: SOCIAL_BY_BRAND.tech.linkedin, external: true },
    ],
    cta: {
      title: "Let's Build the Future Together",
      body: 'Have a project idea, business requirement, or training enquiry? Connect with Infyro Technologies and explore opportunities to innovate, collaborate, and grow.',
      button: { label: 'Get in Touch', href: '/technologies#contact' },
    },
    copyright: (year) => `© ${year} Infyro Technologies. All Rights Reserved.`,
    subsidiary: 'A subsidiary of Infyro Inc.',
    socials: ['instagram', 'linkedin'],
  },
  studios: {
    brandKey: 'studios',
    title: 'INFYRO STUDIOS',
    tagline: 'Your Story, Our Frame.',
    blurb:
      'We capture meaningful moments, craft compelling visual stories, and create unforgettable experiences through professional photography, cinematic videography, and creative event management.',
    company: 'An Infyro Inc. Company.',
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Home', href: '/studios' },
          { label: 'About Us', href: '/studios#about' },
          { label: 'Our Services', href: '/studios#services' },
          // TODO: the portfolio section was removed in the FINAL page flow — points at Services until a gallery exists.
          { label: 'Our Portfolio', href: '/studios#services' },
          { label: 'Booking Session', href: '/studios#booking' },
          { label: 'Contact Us', href: '/studios#contact' },
        ],
      },
      {
        title: 'Our Services',
        links: [
          'Photography', 'Cinematic Videography', 'Wedding & Event Management',
          'Commercial & Brand Production', 'Digital Content Creation', 'Creative Production',
        ].map((label) => ({ label, href: '/studios#services' })),
      },
    ],
    contactTitle: 'Get in Touch',
    contact: [
      { label: `Call: ${PHONE.display}`, href: PHONE.href },
      { label: `Email: ${EMAILS.studios}`, href: `mailto:${EMAILS.studios}` },
      { label: ADDRESS },
    ],
    follow: { label: 'Follow Our Journey:', keys: ['instagram', 'linkedin'] },
    cta: {
      title: "Let's Create Something Extraordinary.",
      body: "Have a story to tell or an experience to create? Let's bring your vision to life.",
      button: { label: 'Book a Session', href: '/studios#booking' },
    },
    copyright: (year) => `© ${year} Infyro Studios. All Rights Reserved.`,
    subsidiary: 'A creative brand of Infyro Inc.',
    socials: ['instagram', 'linkedin'],
  },
  construction: {
    brandKey: 'construction',
    title: 'INFYRO CONSTRUCTION',
    tagline: 'Building Trust. Creating Futures.',
    blurb:
      'Infyro Construction is dedicated to delivering quality-focused construction solutions through thoughtful planning, modern design, and reliable execution. We aim to create spaces that inspire confidence, provide lasting value, and stand the test of time.',
    company: 'An Infyro Inc. Company.',
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Home', href: '/construction' },
          { label: 'About Us', href: '/construction#about' },
          { label: 'Our Services', href: '/construction#services' },
          { label: 'Book a Consultation', href: '/construction#booking' },
          { label: 'Contact Us', href: '/construction#contact' },
        ],
      },
      {
        title: 'Our Services',
        links: [
          'Residential Construction', 'Commercial Construction', 'Architectural Design & Planning',
          'Renovation & Remodeling', 'Interior Design & Finishing', 'Construction Project Management',
        ].map((label) => ({ label, href: '/construction#services' })),
      },
    ],
    contactTitle: 'Get in Touch',
    contact: [
      { label: `Call: ${PHONE.display}`, href: PHONE.href },
      { label: `Email: ${EMAILS.construction}`, href: `mailto:${EMAILS.construction}` },
      { label: ADDRESS },
    ],
    follow: { label: 'Follow Us:', keys: ['instagram', 'linkedin'] },
    cta: {
      title: 'Start Your Project',
      body: "Have a vision for your next project? Let's discuss your requirements and take the first step towards building your future.",
      button: { label: 'Book a Consultation', href: '/construction#booking' },
    },
    copyright: (year) => `© ${year} Infyro Construction. All Rights Reserved.`,
    subsidiary: 'A subsidiary of Infyro Inc.',
    socials: ['instagram', 'linkedin'],
  },
}

