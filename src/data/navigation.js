// Brand registry + navigation for every route.

export const BRANDS = {
  inc: {
    key: 'inc',
    name: 'Infyro Inc.',
    wordmark: 'Infyro',
    sub: null,
    path: '/',
    theme: '',
    accent: '#0A78F2',
    tagline: 'One Vision. Three Businesses. A Future of Possibilities.',
  },
  tech: {
    key: 'tech',
    name: 'Infyro Technologies',
    wordmark: 'Infyro',
    sub: 'Technologies',
    path: '/technologies',
    theme: 'theme-tech',
    accent: '#0A78F2',
    tagline: 'Innovative Ideas into Digital Reality.',
    short: 'Technologies',
  },
  studios: {
    key: 'studios',
    name: 'Infyro Studios',
    wordmark: 'Infyro',
    sub: 'Studios',
    path: '/studios',
    theme: 'theme-studios',
    accent: '#0A78F2',
    tagline: 'Your Story, Our Frame.',
    short: 'Studios',
  },
  construction: {
    key: 'construction',
    name: 'Infyro Construction',
    wordmark: 'Infyro',
    sub: 'Construction',
    path: '/construction',
    theme: 'theme-construct',
    accent: '#0A78F2',
    tagline: 'Building Trust. Creating Futures.',
    short: 'Construction',
  },
}

export const COMPANY_KEYS = ['tech', 'studios', 'construction']

// Brand for a pathname
export const brandForPath = (pathname) => {
  if (pathname.startsWith('/technologies')) return BRANDS.tech
  if (pathname.startsWith('/studios')) return BRANDS.studios
  if (pathname.startsWith('/construction')) return BRANDS.construction
  return BRANDS.inc
}

// One navbar for every page (FINAL §3.2). `id` = section id used for the sliding active underline.
// `children` = dropdown (Technologies "Training ⌄"). The Companies ⌄ switcher is always appended by <Navbar>.
export const NAV_LINKS = {
  inc: [
    { label: 'About', href: '/#about', id: 'about' },
    { label: 'Vision', href: '/#vision', id: 'vision' },
    { label: 'Values', href: '/#values', id: 'values' },
    { label: 'Why Infyro', href: '/#why', id: 'why' },
  ],
  tech: [
    { label: 'About', href: '/technologies#about', id: 'about' },
    { label: 'Pillars', href: '/technologies#pillars', id: 'pillars' },
    {
      label: 'Training',
      ids: ['academic', 'corporate', 'internships'],
      children: [
        { label: 'Academic Training', href: '/technologies#academic', id: 'academic' },
        { label: 'Internships', href: '/technologies/internships', route: '/technologies/internships' },
        { label: 'Corporate Training', href: '/technologies#corporate', id: 'corporate' },
      ],
    },
    { label: 'Careers', href: '/technologies#careers', id: 'careers' },
    { label: 'Contact', href: '/technologies#contact', id: 'contact' },
  ],
  studios: [
    { label: 'About', href: '/studios#about', id: 'about' },
    { label: 'Services', href: '/studios#services', id: 'services' },
    { label: 'Booking', href: '/studios#booking', id: 'booking' },
    { label: 'Contact', href: '/studios#contact', id: 'contact' },
  ],
  construction: [
    { label: 'About', href: '/construction#about', id: 'about' },
    { label: 'Services', href: '/construction#services', id: 'services' },
    { label: 'Booking', href: '/construction#booking', id: 'booking' },
    { label: 'Contact', href: '/construction#contact', id: 'contact' },
  ],
}

export const NAV_CTA = {
  inc: { label: 'Get in Touch', href: '/#contact' },
  tech: { label: 'Get in Touch', href: '/technologies#contact' },
  studios: { label: 'Book a Session', href: '/studios#booking' },
  construction: { label: 'Book a Consultation', href: '/construction#booking' },
}

/** Mobile sheet: flatten dropdowns. */
export const flatLinks = (key) => NAV_LINKS[key].flatMap((l) => l.children ?? [l])
