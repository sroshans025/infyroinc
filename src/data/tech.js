// Infyro Technologies page copy.
import { INTERNSHIP_FORM } from './links'
import { Code2, Smartphone, BrainCircuit, BarChart3, Cloud, Compass, GraduationCap, Building2, Briefcase } from 'lucide-react'

export const overview = {
  eyebrow: 'About Us',
  title: 'Transforming Ideas into Intelligent Digital Solutions',
  paragraphs: [
    'Infyro Technologies is an IT services and technology solutions company focused on software development, AI-driven solutions, web and mobile applications, and digital transformation. As a subsidiary of Infyro Inc., we combine creativity, technical expertise, and innovation to develop high-quality software products and customized solutions that address real-world business challenges.',
    'Our expertise spans Artificial Intelligence, Machine Learning, Data Science, Business Intelligence, Cloud Computing, and IT Consulting. Through our technology services, digital products, academic training, and internship programs, we aim to empower businesses, nurture emerging talent, and create meaningful opportunities in the digital world.',
  ],
  expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Business Intelligence', 'Cloud Computing', 'IT Consulting'],
  purpose: {
    label: 'Our Purpose:',
    text: "To turn innovative ideas into reliable technology solutions that improve businesses and people's lives.",
  },
  closing: 'Infyro Technologies — Innovative Ideas into Digital Reality.',
}

export const pillars = {
  title: 'Our Six Operational Pillars',
  intro:
    'At Infyro Technologies, our six operational pillars define our expertise and approach to digital innovation. From custom software and mobile applications to artificial intelligence, data analytics, cloud infrastructure, and strategic IT consulting, we deliver technology solutions designed to solve real-world challenges, improve business efficiency, and support sustainable growth.',
  items: [
    { n: '01', title: 'Custom Web & System Development', text: 'Building scalable websites, web applications, enterprise systems, and customized software solutions.', icon: Code2 },
    { n: '02', title: 'Mobile Application Engineering', text: 'Creating intuitive, responsive, and reliable mobile applications for modern digital experiences.', icon: Smartphone },
    { n: '03', title: 'AI, ML & Workflow Automation', text: 'Developing intelligent systems and automated workflows that improve productivity and decision-making.', icon: BrainCircuit },
    { n: '04', title: 'Data Science & Business Intelligence', text: 'Transforming data into actionable insights through analytics, visualization, and predictive intelligence.', icon: BarChart3 },
    { n: '05', title: 'Cloud Architecture & Infrastructure', text: 'Enabling secure, scalable, and reliable digital infrastructure through cloud technologies and DevOps practices.', icon: Cloud },
    { n: '06', title: 'Strategic IT Consulting', text: 'Helping businesses adopt the right technologies, optimize systems, and achieve their digital transformation goals.', icon: Compass },
  ],
  commitment: {
    label: 'Our Commitment:',
    text: 'Innovation in every idea. Excellence in every solution. Value in every partnership.',
  },
}

// Teaser cards on /technologies. Titles + taglines reuse the sub-page copy; no new claims.
export const teasers = [
  { title: 'Academic Training Programs', tagline: 'Learn. Build. Innovate.', href: '/technologies#academic', icon: GraduationCap },
  { title: 'Corporate Training Programs', tagline: 'Empower Teams. Enhance Skills. Drive Growth.', href: '/technologies#corporate', icon: Building2 },
  { title: 'Career Opportunities', tagline: 'Build Your Future with Infyro Technologies', href: '/technologies#careers', icon: Briefcase },
]

// Section 6 CTA band — same copy as the Technologies footer CTA (docs/04 §3.1).
export const ctaBand = {
  title: "Let's Build the Future Together",
  body: 'Have a project idea, business requirement, or training enquiry? Connect with Infyro Technologies and explore opportunities to innovate, collaborate, and grow.',
  primary: { label: 'Get in Touch', href: '#contact' },
}

export const overviewCta = {
  title: "Let's Build Something Great Together.",
  body: 'Have a project in mind, need a technology solution, or want to explore a partnership? We\'re here to help. Connect with Infyro Technologies to discuss your requirements, explore opportunities, and turn your ideas into practical digital solutions.',
  primary: { label: 'Get in Touch', href: '/technologies#contact' },
  secondary: { label: 'Our Services', href: '#services' },
}

// Hero (FINAL §8.1) — h1 + small line + [Get in Touch] (Our Pillars)
export const hero = {
  title: 'Transforming Ideas into Intelligent Digital Solutions',
  small: 'An Infyro Inc. Company',
  primary: { label: 'Get in Touch', href: '#contact' },
  secondary: { label: 'Our Pillars', href: '#pillars' },
}

// "Know More: Internship Programs" — button label from FINAL §1.
export const internshipsLink = { label: 'Know More: Internship Programs', href: '/technologies/internships' }

// /technologies/internships — the only extra page (FINAL §1).
// TODO: Internship Programs copy has not been supplied yet. The intro below reuses the brief's
// "Training & Internships" tile description; replace with real programme details.
export const internships = {
  eyebrow: 'Internship Programs',
  title: 'Internship Programs',
  intro: 'Get information about academic training, internship programs, and technical skill development.',
  cta: {
    title: 'Start Your Learning Journey',
    body: 'Build practical skills, explore emerging technologies, and prepare for future career opportunities with Infyro Technologies.',
    primary: { label: 'Apply Now', href: INTERNSHIP_FORM },
    secondary: { label: 'Enquire Now', href: '/technologies?type=training#contact' },
  },
}

export const academic = {
  seoKey: 'academic',
  title: 'Academic Training Programs',
  tagline: 'Learn. Build. Innovate.',
  intro: [
    'At Infyro Technologies, our Academic Training Programs are designed to bridge the gap between academic knowledge and industry requirements. We help students and aspiring professionals develop practical technical skills through structured learning, hands-on exercises, real-world projects, and industry-oriented guidance.',
  ],
  domainsTitle: 'Our Training Domains',
  domains: [
    { n: '01', title: 'Software Development', text: 'Learn programming fundamentals, application development, web technologies, and software engineering practices.' },
    { n: '02', title: 'Artificial Intelligence & Machine Learning', text: 'Explore AI concepts, machine learning algorithms, intelligent applications, and practical model development.' },
    { n: '03', title: 'Data Science & Analytics', text: 'Develop skills in Python, SQL, data cleaning, data visualization, statistical analysis, and business intelligence.' },
    { n: '04', title: 'Cloud Computing & DevOps', text: 'Understand cloud platforms, deployment workflows, Linux fundamentals, automation, and DevOps practices.' },
    { n: '05', title: 'Cybersecurity', text: 'Learn security fundamentals, network protection, vulnerability awareness, and secure development practices.' },
    { n: '06', title: 'Soft Skills & Career Development', text: 'Improve communication, teamwork, problem-solving, interview preparation, and professional readiness.' },
  ],
  approachTitle: 'Our Learning Approach',
  approach: [
    'Structured, domain-focused learning',
    'Practical exercises and guided implementation',
    'Real-world project development',
    'Technical mentoring and feedback',
    'Industry-oriented skill development',
    'Project evaluation and completion recognition, where applicable',
  ],
  audienceTitle: 'Who Can Join?',
  audience: 'Our programs are designed for college students, final-year students, recent graduates, and aspiring professionals who want to strengthen their technical knowledge and practical skills.',
  audienceChips: ['College students', 'Final-year students', 'Recent graduates', 'Aspiring professionals'],
  cta: {
    title: 'Start Your Learning Journey',
    body: 'Build practical skills, explore emerging technologies, and prepare for future career opportunities with Infyro Technologies.',
    primary: { label: 'Explore Training Programs', href: '#academic-items' },
    secondary: { label: 'Enquire Now', href: '/technologies?type=training#contact' },
  },
}

export const corporate = {
  seoKey: 'corporate',
  title: 'Corporate Training Programs',
  tagline: 'Empower Teams. Enhance Skills. Drive Growth.',
  intro: [
    'At Infyro Technologies, our Corporate Training Programs help organizations strengthen workforce capabilities, improve productivity, and adapt to evolving industry demands. We deliver structured, practical, and business-focused training tailored to organizational goals, team requirements, and emerging technologies.',
  ],
  domainsTitle: 'Our Training Areas',
  domains: [
    { n: '01', title: 'Technical Skills Training', text: 'Upskill employees in software development, programming, AI, data analytics, cloud computing, and modern technologies.' },
    { n: '02', title: 'Leadership & Management Training', text: 'Develop leadership capabilities, strategic thinking, team management, and effective decision-making.' },
    { n: '03', title: 'Business & Domain Training', text: 'Strengthen business knowledge, process understanding, operational efficiency, and industry-specific competencies.' },
    { n: '04', title: 'Soft Skills & Communication', text: 'Improve professional communication, teamwork, presentation skills, collaboration, and workplace effectiveness.' },
    { n: '05', title: 'Cybersecurity & Compliance Awareness', text: 'Build awareness of cybersecurity practices, data protection, secure workflows, and organizational compliance requirements.' },
    { n: '06', title: 'Customized Corporate Workshops', text: "Receive tailored training programs aligned with your organization's objectives, technology stack, skill gaps, and business challenges." },
  ],
  approachTitle: 'Our Training Approach',
  approach: [
    'Customized learning plans based on organizational needs',
    'Practical exercises and real-world business scenarios',
    'Instructor-led sessions and interactive workshops',
    'Flexible training formats based on availability',
    'Progress assessment and learning feedback',
    'Focus on measurable skill development and workplace application',
  ],
  audienceTitle: 'Who Can Benefit?',
  audience: 'Our programs are designed for corporate teams, IT professionals, business departments, managers, startups, and organizations seeking continuous workforce development.',
  audienceChips: ['Corporate teams', 'IT professionals', 'Business departments', 'Managers', 'Startups', 'Organizations'],
  cta: {
    title: "Let's Build a More Capable Workforce",
    body: "Invest in your team's skills, embrace new technologies, and prepare your organization for the future with Infyro Technologies.",
    primary: { label: 'Request Corporate Training', href: '/technologies?type=corporate#contact' },
    secondary: { label: 'Contact Our Team', href: '/technologies#contact' },
  },
}

export const careers = {
  seoKey: 'careers',
  eyebrow: 'Career Opportunities',
  title: 'Build Your Future with Infyro Technologies',
  intro: [
    'At Infyro Technologies, we believe that talented people drive innovation and meaningful growth. We welcome passionate individuals who are eager to learn, solve real-world challenges, explore emerging technologies, and contribute to impactful digital solutions.',
    'Whether you are an experienced professional, a recent graduate, or an aspiring technology enthusiast, we encourage you to explore opportunities to learn, grow, and build your career with us.',
  ],
  domainsTitle: 'Explore Career Domains',
  domains: [
    { n: '01', title: 'Software Development', text: 'Build modern web applications, software systems, APIs, and digital products.' },
    { n: '02', title: 'Artificial Intelligence & Machine Learning', text: 'Develop intelligent applications and explore AI-driven innovation.' },
    { n: '03', title: 'Data Science & Business Intelligence', text: 'Transform data into insights using analytics, visualization, and reporting tools.' },
    { n: '04', title: 'Cloud Computing & DevOps', text: 'Work with cloud platforms, deployment pipelines, infrastructure, and automation.' },
    { n: '05', title: 'UI/UX & Frontend Development', text: 'Create intuitive, accessible, and engaging digital experiences.' },
    { n: '06', title: 'Business & Technology Operations', text: 'Contribute to business analysis, project coordination, technical support, and operational excellence.' },
  ],
  approachTitle: 'Why Build Your Career with Us?',
  approach: [
    'Opportunities to work on practical projects',
    'Continuous learning and skill development',
    'Collaborative and innovation-focused environment',
    'Exposure to emerging technologies',
    'Professional growth and development opportunities',
    'Performance-based career progression, where applicable',
  ],
  audienceTitle: 'Who Can Apply?',
  audience: 'We welcome eligible freshers, graduates, experienced professionals, and individuals with relevant technical or business skills, depending on the requirements of each role.',
  audienceChips: ['Freshers', 'Graduates', 'Experienced professionals'],
  cta: {
    title: 'Ready to Take the Next Step?',
    body: 'Explore opportunities that match your skills, interests, and career goals. Join us in building innovative solutions and shaping the future of technology.',
    // TODO: point "Explore Open Positions" at a real jobs list / URL once one exists.
    primary: { label: 'Explore Open Positions', href: '#careers-items' },
    secondary: { label: 'Submit Your Resume', href: '/technologies?type=careers#contact' },
  },
  disclaimer: "Employment opportunities are subject to available vacancies, eligibility criteria, and the company's recruitment process.",
}

export const contact = {
  eyebrow: 'Contact Us',
  title: "Let's Build Something Great Together.",
  intro: "Have a project in mind, need a technology solution, or want to explore a partnership? We're here to help. Connect with Infyro Technologies to discuss your requirements, explore opportunities, and turn your ideas into practical digital solutions.",
  helpTitle: 'How Can We Help You?',
  help: [
    { type: 'software', title: 'Software & IT Solutions', text: 'Discuss your software development, web applications, mobile apps, AI solutions, and business technology requirements.', icon: Code2 },
    { type: 'training', title: 'Training & Internships', text: 'Get information about academic training, internship programs, and technical skill development.', icon: GraduationCap },
    { type: 'corporate', title: 'Corporate Training', text: 'Explore customized technical training and professional development programs for your organization.', icon: Building2 },
    { type: 'careers', title: 'Careers & Opportunities', text: 'Connect with us regarding job openings, recruitment, and career opportunities.', icon: Briefcase },
  ],
  formTitle: 'Send Us a Message',
  formIntro: "We'd love to hear from you. Fill out the contact form below, and our team will review your enquiry.",
  connectTitle: "Let's Connect",
  connectBody: 'For business enquiries, collaborations, training information, or career-related questions, reach out to our team through our official contact channels.',
  signoff: { name: 'Infyro Technologies', lines: ['An Infyro Inc. Company', 'Innovative Ideas into Digital Reality.'] },
}

// Enquiry type slug ↔ option label
export const ENQUIRY_TYPES = {
  software: 'Software & IT Solutions',
  training: 'Training & Internships',
  corporate: 'Corporate Training',
  careers: 'Careers & Opportunities',
}

export const techContactForm = {
  id: 'tech-contact',
  brand: 'Infyro Technologies',
  submitLabel: 'Submit Enquiry',
  successMessage: 'Thank you — our team will review your enquiry.',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, minLength: 2, autoComplete: 'name' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'enquiryType', label: 'Enquiry Type', type: 'select', required: true, options: Object.values(ENQUIRY_TYPES) },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'message', label: 'Your Message', type: 'textarea', rows: 5, required: true, minLength: 10 },
  ],
}
