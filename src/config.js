// Business details, taken from the live INFYRO website. Edit here to update them everywhere.
// Anything left empty is simply hidden.

export const CONFIG = {
  name: 'INFYRO Technology Solutions',
  email: 'info@infyroinc.com',
  phone: '+91 8438938918',
  address: 'Tiruchirappalli, Tamil Nadu, India',
  hours: 'Mon–Fri 9am–5pm · Sat 9am–2pm IST',
  mapsUrl: 'https://maps.google.com/?q=Tiruchirappalli+Tamil+Nadu',

  // Contact forms POST JSON here. FormSubmit forwards each submission to `email` with no account needed;
  // the very first submission triggers a one-time activation email to that inbox.
  // Swap for Formspree/Getform/your own API at any time. If empty, forms fall back to opening the visitor's email app.
  formEndpoint: 'https://formsubmit.co/ajax/info@infyroinc.com',

  social: {
    linkedin: 'https://www.linkedin.com/company/infyrosolutions/',
    instagram: 'https://www.instagram.com/infyro.in',
  },

  // Headline figures shown on the home page, copied from the live site. Update or remove as needed.
  stats: [
    { value: '100+', label: 'Projects Delivered' },
    { value: '25+', label: 'Happy Clients' },
    { value: '6', label: 'Service Pillars' },
    { value: '<24h', label: 'Avg Response Time' },
  ],
}
