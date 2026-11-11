// Per-page SEO — docs/05-BUILD-PLAN-AND-QA.md §4.
export const SITE_URL = 'https://www.infyroinc.com'

export const SEO = {
  home: {
    path: '/',
    title: 'Infyro Inc. — One Vision. Three Businesses.',
    description: 'Infyro Inc. is the parent company behind Infyro Technologies, Infyro Studios, and Infyro Construction.',
    favicon: '/favicon.svg',
  },
  tech: {
    path: '/technologies',
    title: 'Infyro Technologies — Innovative Ideas into Digital Reality',
    description: 'IT services and technology solutions: software development, AI, web and mobile apps, data, cloud and digital transformation.',
    favicon: '/favicon.svg',
  },
  internships: {
    path: '/technologies/internships',
    title: 'Internship Programs — Infyro Technologies',
    description: 'Internship programs at Infyro Technologies: academic training, internship programs, and technical skill development.',
    favicon: '/favicon.svg',
  },
  studios: {
    path: '/studios',
    title: 'Infyro Studios — Your Story, Our Frame.',
    description: 'Photography, cinematic videography, wedding & event management and creative production.',
    favicon: '/favicon.svg',
  },
  construction: {
    path: '/construction',
    title: 'Infyro Construction — Building Trust. Creating Futures.',
    description: 'Residential and commercial construction, architectural design, renovation and interiors.',
    favicon: '/favicon.svg',
  },
  notFound: { path: '/404', title: 'Page not found — Infyro Inc.', description: 'The page you are looking for does not exist.', favicon: '/favicon.svg', noindex: true },
}
