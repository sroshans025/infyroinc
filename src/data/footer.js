// All footer copy and links.
import { PHONE, EMAILS, ADDRESS } from './contact'

/* The footer shown on every page */
export const megaFooter = {
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
