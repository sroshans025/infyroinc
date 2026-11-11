// Single source of truth for contact details (docs/03-PAGE-CONTENT.md — Part E).

export const PHONE = {
  display: '+91 84389 38918',
  href: 'tel:+918438938918',
}

export const EMAILS = {
  inc: 'info@infyroinc.com',
  tech: 'info@infyroinc.com',
  studios: 'info@infyroinc.com',
  construction: 'info@infyroinc.com',
}

export const mailto = (email, subject) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

// Official social profiles per company. `null` = no profile (icon/link is hidden).
// TODO: Infyro Inc. (group) has no accounts of its own yet — it shares the Technologies profiles.
const TECH_SOCIAL = {
  instagram: 'https://www.instagram.com/infyroinc',
  linkedin: 'https://www.linkedin.com/company/infyroinc/',
  x: null,
}
export const SOCIAL_BY_BRAND = {
  inc: TECH_SOCIAL,
  tech: TECH_SOCIAL,
  studios: { instagram: 'https://www.instagram.com/infyrostudios', linkedin: null, x: null },
  construction: {
    instagram: 'https://www.instagram.com/infyroconstruction',
    linkedin: 'https://www.linkedin.com/company/infyroconstruction/',
    x: null,
  },
}

const SOCIAL_LABELS = { linkedin: 'LinkedIn', instagram: 'Instagram', x: 'Twitter / X' }

/** Social entries for a company: [{ key, label, href }] — only the ones that exist. */
export const socialList = (brand = 'inc') =>
  Object.entries(SOCIAL_LABELS)
    .map(([key, label]) => ({ key, label, href: (SOCIAL_BY_BRAND[brand] ?? SOCIAL_BY_BRAND.inc)[key] }))
    .filter((s) => s.href)

export const ADDRESS = 'Tiruchirappalli, Tamil Nadu, India'

// Contact-form submission endpoint. FormSubmit (carried over from the previous site) forwards
// JSON posts to the inbox in the URL with no account; the first submission triggers a one-time
// activation email. TODO: confirm destination / swap for Web3Forms, Formspree, EmailJS or an API.
export const FORM_ENDPOINT = (email) =>
  import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${email}`
