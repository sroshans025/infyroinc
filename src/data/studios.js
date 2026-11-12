// Infyro Studios page copy.
import { Camera, Clapperboard, CalendarHeart, Megaphone, Smartphone, Palette, Eye, Target } from 'lucide-react'

export const hero = {
  title: 'Your Story, Our Frame.',
  small: 'An Infyro Inc. Company.',
  primary: { label: 'Book a Session', href: '#booking' },
  secondary: { label: 'Our Services', href: '#services' },
}

export const about = {
  title: 'About Infyro Studios',
  text: 'Infyro Studios is a creative media and event management brand dedicated to cinematic storytelling, exceptional photography, and unforgettable experiences. Combining creativity, innovation, and precision, we transform meaningful moments into timeless memories and bold ideas into compelling visual stories.',
}

export const visionMission = [
  { label: 'Our Vision', icon: Eye, text: 'To become a globally recognized creative studio redefining visual storytelling through innovation, artistry, and excellence.' },
  { label: 'Our Mission', icon: Target, text: 'To transform meaningful moments and creative ideas into timeless visual stories and exceptional experiences through quality, creativity, and professionalism.' },
]

export const services = {
  title: 'Our Services',
  tagline: 'Creative Vision. Exceptional Execution.',
  intro: 'We bring stories to life through creative media, professional production, and thoughtfully managed experiences.',
  items: [
    { n: '1', title: 'Photography', text: 'Wedding, candid, pre-wedding, portrait, product, and corporate photography.', icon: Camera },
    { n: '2', title: 'Cinematic Videography', text: 'Wedding films, event highlights, promotional videos, and cinematic storytelling.', icon: Clapperboard },
    { n: '3', title: 'Wedding & Event Management', text: 'Wedding planning, birthday celebrations, corporate events, and special occasions.', icon: CalendarHeart },
    { n: '4', title: 'Commercial & Brand Production', text: 'Brand films, product shoots, promotional campaigns, and business visual content.', icon: Megaphone },
    { n: '5', title: 'Digital Content Creation', text: 'Social media reels, creative videos, campaign visuals, and branded content.', icon: Smartphone },
    { n: '6', title: 'Creative Production', text: 'Concept development, visual direction, production planning, and customized creative projects.', icon: Palette },
  ],
  closing: {
    title: 'Your Story, Our Frame.',
    sub: 'From the first idea to the final frame, we create experiences worth remembering.',
  },
}

export const book = {
  title: 'Book a Session',
  sub: "Let's Create Something Unforgettable.",
  body: 'Every special moment deserves to be captured beautifully. Tell us about your vision, and let Infyro Studios transform it into a timeless experience.',
  button: 'Book a Session',
  note: 'Our team will connect with you to discuss your requirements, availability, and personalized package options.',
  signoff: 'Infyro Studios — Your Story, Our Frame.',
}

export const contact = {
  title: 'Contact Us',
  sub: "Let's Bring Your Vision to Life.",
  body: "Have a special moment to capture, an event to plan, or a creative project in mind? Connect with Infyro Studios, and let's create something extraordinary together.",
  getInTouch: 'Get in Touch',
  instagramLabel: 'Follow Our Stories',
  linkedinLabel: 'Connect With Us',
  below: 'We look forward to hearing your story and being part of your next unforgettable experience.',
  signoff: ['Infyro Studios — Your Story, Our Frame.', 'An Infyro Inc. Company.'],
}

export const studiosContactForm = {
  id: 'studios-contact',
  brand: 'Infyro Studios',
  title: 'Enquiry Form',
  submitLabel: 'Send an Enquiry',
  successMessage: 'Thank you — our team will review your enquiry.',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, minLength: 2, autoComplete: 'name' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
    {
      name: 'service', label: 'Service Required', type: 'select', required: true,
      options: ['Photography', 'Cinematic Videography', 'Wedding & Event Management', 'Commercial & Brand Production', 'Digital Content Creation', 'Creative Production'],
    },
    { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true, minLength: 10 },
  ],
}
