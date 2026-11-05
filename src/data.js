// All site content lives here. Copy comes from the live INFYRO website.

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', primary: true },
  { to: '/services', label: 'Services', primary: true },
  { to: '/projects', label: 'Projects', primary: true },
  { to: '/careers', label: 'Careers', primary: true },
  { to: '/hackathon-2026', label: 'Hackathon 2026' },
  { to: '/icsi-2026', label: 'ICSI 2026' },
  { to: '/contact', label: 'Contact', primary: true },
]

export const SUBJECTS = ['New Project Inquiry', 'IT Consulting', 'Technical Support', 'Partnership Opportunity', 'Career / Internship', 'General Inquiry']

/* ---------- Six operational pillars (used on Home explorer, About, footer) ---------- */
export const PILLARS = [
  {
    icon: 'code',
    title: 'Custom Web & System Development',
    short: 'Web & Systems',
    text: 'High-availability corporate portals, ERP modules, and inventory systems.',
    points: ['Corporate portals and web apps', 'ERP and inventory modules', 'SaaS and e-commerce platforms', 'Database design and engineering'],
    stack: ['React', 'Next.js', 'Node.js', 'Django', 'PostgreSQL'],
  },
  {
    icon: 'mobile',
    title: 'Mobile Application Engineering',
    short: 'Mobile Apps',
    text: 'Native iOS/Android and cross-platform hybrid apps using modern UI frameworks.',
    points: ['Native iOS and Android', 'React Native and Flutter', 'Intuitive, user-tested UX', 'Store release and updates'],
    stack: ['React Native', 'Flutter', 'Kotlin', 'Swift'],
  },
  {
    icon: 'ai',
    title: 'AI, ML & Workflow Automation',
    short: 'AI & Automation',
    text: 'Predictive models, NLP assistants, and automated data pipelines.',
    points: ['Predictive models and recommendations', 'NLP assistants and chatbots', 'RPA for repetitive office work', 'Document and data pipelines'],
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'NLP', 'RPA'],
  },
  {
    icon: 'chart',
    title: 'Data Science & Business Intelligence',
    short: 'Data & BI',
    text: 'Interactive dashboards via Python, SQL, and Power BI for stakeholders.',
    points: ['Interactive stakeholder dashboards', 'Predictive analytics', 'Data cleaning and pipelines', 'Reporting and market insights'],
    stack: ['Python', 'SQL', 'Power BI', 'Pandas'],
  },
  {
    icon: 'cloud',
    title: 'Cloud Architecture & Infrastructure',
    short: 'Cloud & DevOps',
    text: 'Seamless cloud transitions, database migrations, and cost-optimized provisioning.',
    points: ['Cloud migration and provisioning', 'CI/CD and DevOps automation', 'Monitoring and uptime management', 'Security audits and compliance'],
    stack: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    icon: 'transform',
    title: 'Strategic IT Consulting',
    short: 'IT Consulting',
    text: 'End-to-end technology roadmaps aligned with long-term commercial goals.',
    points: ['Requirement analysis', 'Technology roadmaps', 'Advisory for non-technical founders', 'Digital transformation planning'],
    stack: ['Roadmaps', 'Architecture', 'Vendor selection'],
  },
]

/* ---------- Full services catalogue ---------- */
export const SERVICE_GROUPS = ['All', 'Build', 'Data & AI', 'Cloud & Security', 'Design & Growth', 'Quality & Support']

export const SERVICES = [
  { group: 'Build', tag: 'Web', icon: 'code', title: 'Custom Web Development', text: 'High-availability, responsive, and secure web applications built for your exact business workflows, from corporate portals to complex enterprise systems.' },
  { group: 'Build', tag: 'Mobile', icon: 'mobile', title: 'Mobile App Development', text: 'Native iOS & Android apps and cross-platform solutions using React Native and Flutter, built for performance, usability, and scale.' },
  { group: 'Build', tag: 'Full Stack', icon: 'layers', title: 'Full Stack Development', text: 'End-to-end product development covering front-end, back-end, database, and deployment: one team, one solution.' },
  { group: 'Build', tag: 'E-Commerce', icon: 'cart', title: 'E-Commerce Solutions', text: 'Full-featured online stores with payment integration, inventory management, and multi-vendor support tailored for Indian and global markets.' },
  { group: 'Build', tag: 'Database', icon: 'db', title: 'Database Engineering', text: 'Design, optimize, and manage robust database systems for high-speed access, reliability, and long-term scalability.' },
  { group: 'Build', tag: 'SaaS', icon: 'rocket', title: 'SaaS Product Development', text: 'Build multi-tenant SaaS platforms from scratch, with subscription billing, role-based access, and scalable architecture included.' },
  { group: 'Data & AI', tag: 'AI / ML', icon: 'ai', title: 'AI & Machine Learning', text: 'Deploy predictive models, recommendation engines, and intelligent automation systems that learn and improve over time.' },
  { group: 'Data & AI', tag: 'Automation', icon: 'bolt', title: 'Workflow Automation (RPA)', text: 'Replace repetitive manual office tasks with intelligent automated pipelines, saving time, reducing errors, and cutting costs.' },
  { group: 'Data & AI', tag: 'BI', icon: 'chart', title: 'Business Intelligence', text: 'Interactive dashboards, deep data analysis, and market insights to help stakeholders make faster, smarter decisions.' },
  { group: 'Data & AI', tag: 'Analytics', icon: 'chart', title: 'Data Analytics & Visualization', text: 'Turn raw data into clear, actionable visual stories, from operational metrics to financial performance reports.' },
  { group: 'Cloud & Security', tag: 'Cloud', icon: 'cloud', title: 'Cloud Architecture & Migration', text: 'Seamless cloud transitions, infrastructure provisioning, and cost-optimized architecture on AWS, Azure, and GCP.' },
  { group: 'Cloud & Security', tag: 'DevOps', icon: 'transform', title: 'DevOps & CI/CD', text: 'Automate your software delivery pipeline with Docker, Kubernetes, and CI/CD tools for faster, reliable deployments.' },
  { group: 'Cloud & Security', tag: 'Infrastructure', icon: 'cpu', title: 'IT Infrastructure Management', text: 'Ongoing management, monitoring, and optimization of your servers, networks, and cloud resources to maximize uptime.' },
  { group: 'Cloud & Security', tag: 'Security', icon: 'lock', title: 'Cybersecurity & Compliance', text: 'Protect your digital assets with security audits, vulnerability assessments, and compliance frameworks for Indian and global standards.' },
  { group: 'Design & Growth', tag: 'UI/UX', icon: 'brush', title: 'UI/UX Design & Prototyping', text: 'Intuitive, visually compelling interfaces designed around real user behavior, from wireframes to pixel-perfect final designs.' },
  { group: 'Design & Growth', tag: 'SEO', icon: 'search', title: 'Digital Marketing & SEO', text: 'Data-driven strategies to grow your online visibility, generate qualified leads, and increase revenue through organic and paid channels.' },
  { group: 'Design & Growth', tag: 'Branding', icon: 'award', title: 'Brand Identity & Design', text: 'Build a strong, consistent brand identity, from logo design and color systems to full brand guidelines and marketing collateral.' },
  { group: 'Quality & Support', tag: 'QA', icon: 'check', title: 'Quality Assurance & Testing', text: 'Comprehensive testing services to ensure your software is bug-free, performant, and production-ready before every release.' },
  { group: 'Quality & Support', tag: 'Consulting', icon: 'transform', title: 'IT Consulting & Advisory', text: 'Expert technology advisory for non-technical founders and SMEs, from requirement analysis to full digital transformation roadmaps.' },
  { group: 'Quality & Support', tag: 'Support', icon: 'chat', title: 'IT Support & Maintenance', text: 'Ongoing technical support, bug fixes, performance monitoring, and system upgrades to keep your products running smoothly.' },
  { group: 'Quality & Support', tag: 'Training', icon: 'school', title: 'Corporate IT Training', text: 'Structured upskilling programs for your team, covering modern tech stacks, tools, and best practices with hands-on project work.' },
]

/* ---------- About ---------- */
export const FACTS = [
  { label: 'Structure', value: 'Private Tech Startup', icon: 'briefcase' },
  { label: 'Team Scale', value: '11 to 50 Employees', icon: 'users' },
  { label: 'Headquarters', value: 'Tiruchirappalli, Tamil Nadu, India', icon: 'pin' },
  { label: 'Founded', value: 'November 2025', icon: 'calendar' },
]

export const VALUES = [
  { icon: 'shield', title: 'Integrity', text: 'We maintain the highest standards of honesty and transparency in every client engagement.' },
  { icon: 'bulb', title: 'Innovation', text: 'Constantly pushing boundaries with zero-friction software architectures and forward-thinking approaches.' },
  { icon: 'users', title: 'Collaboration', text: 'Working closely with clients and teams to achieve exceptional, scalable results.' },
  { icon: 'award', title: 'Excellence', text: 'Committed to delivering production-ready, uncompromising quality in everything we build.' },
]

export const MILESTONES = [
  { year: 'Nov 2025', title: 'Company Founded', text: 'INFYRO was incorporated in Tiruchirappalli, Tamil Nadu, with a focus on SME digital transformation.' },
  { year: '2025 Q4', title: 'First Client Engagements', text: 'Onboarded early-stage startup clients for custom web and automation projects.' },
  { year: '2026', title: 'Training Division Launch', text: 'Launched structured internship and upskilling programs for engineering graduates.' },
  { year: '2026+', title: 'Scaling Operations', text: 'Expanding service delivery across cloud, AI/ML, and BI for enterprise clients.' },
]

/* ---------- Projects ---------- */
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web & SaaS' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'automation', label: 'Automation' },
]

export const PROJECTS = [
  { cat: 'web', icon: 'layers', title: 'Enterprise ERP Portal', text: 'End-to-end ERP system for a manufacturing firm: inventory, procurement, HR, and finance modules in a single unified platform.' },
  { cat: 'mobile', icon: 'mobile', title: 'FinanceFlow: Banking App', text: 'Secure mobile banking app with real-time transactions, biometric auth, and AI-powered financial insights for a fintech startup.' },
  { cat: 'ai', icon: 'ai', title: 'AI Customer Support Bot', text: 'NLP-powered chatbot handling 10,000+ daily queries with 95% accuracy, integrated into web, WhatsApp, and mobile channels.' },
  { cat: 'analytics', icon: 'chart', title: 'Healthcare Analytics Platform', text: 'Real-time patient data visualization and hospital management dashboard for a multi-branch healthcare network.' },
  { cat: 'web', icon: 'cart', title: 'Multi-Vendor E-Commerce Platform', text: 'Scalable marketplace with 500+ vendors, Razorpay integration, real-time inventory sync, and seller analytics dashboard.' },
  { cat: 'cloud', icon: 'cloud', title: 'Cloud Migration: Legacy to AWS', text: 'Full migration of a 10-year-old on-premise system to AWS: zero downtime, 40% cost reduction, and auto-scaling setup.' },
  { cat: 'ai', icon: 'cpu', title: 'Predictive Maintenance AI', text: 'ML model predicting industrial equipment failures 72 hours in advance, deployed on IoT edge devices for a factory floor.' },
  { cat: 'web', icon: 'users', title: 'HR & Payroll SaaS', text: 'Multi-tenant SaaS platform for SME HR management: attendance, payroll, leave, and appraisal modules with role-based access.' },
  { cat: 'analytics', icon: 'chart', title: 'Sales Intelligence Dashboard', text: 'Real-time sales performance tracker with territory mapping, pipeline forecasting, and automated weekly reports for leadership.' },
  { cat: 'mobile', icon: 'truck', title: 'Logistics Tracking App', text: 'Real-time fleet and shipment tracking app for a logistics company: GPS integration, driver app, and customer delivery portal.' },
  { cat: 'automation', icon: 'bolt', title: 'Invoice & Billing Automation', text: 'Automated invoice generation, GST calculation, payment reminders, and reconciliation pipeline, replacing 3 manual FTEs.' },
  { cat: 'cloud', icon: 'transform', title: 'DevOps Pipeline Overhaul', text: 'Rebuilt CI/CD pipeline for a 50-engineer team: Docker, Kubernetes, GitHub Actions, and automated staging/prod deployments.' },
  { cat: 'web', icon: 'school', title: 'EdTech Learning Platform', text: 'Full-featured LMS with live classes, recorded content, quizzes, certificates, and payment gateway for an online coaching institute.' },
  { cat: 'automation', icon: 'search', title: 'Document Processing Automation', text: 'AI-powered OCR pipeline extracting data from invoices, contracts, and forms, feeding directly into ERP with 98% accuracy.' },
  { cat: 'mobile', icon: 'factory', title: 'Restaurant Chain Management App', text: 'Unified app for 30+ restaurant branches: POS, inventory, staff scheduling, delivery tracking, and daily P&L reports.' },
  { cat: 'analytics', icon: 'chart', title: 'Supply Chain BI Dashboard', text: 'End-to-end supply chain visibility dashboard: vendor performance, demand forecasting, and procurement analytics for a retail chain.' },
  { cat: 'cloud', icon: 'lock', title: 'Cybersecurity Audit Platform', text: 'Internal security audit and compliance tracking tool: vulnerability scanning, GDPR checklist, and automated risk scoring.' },
  { cat: 'automation', icon: 'mail', title: 'Email & CRM Automation', text: 'Automated lead nurturing pipeline: CRM sync, drip email sequences, follow-up triggers, and conversion analytics for a B2B SaaS.' },
]

export const TESTIMONIALS = [
  { name: 'Jagadeeswaran K', role: 'Product Manager', company: 'TechVentures', avatar: 'JK', text: 'Infyro has been a game-changer, delivering our mobile app ahead of schedule. Their expertise and professionalism exceeded our expectations.' },
  { name: 'Rohan Karthik RS', role: 'CTO', company: 'CloudBase Inc.', avatar: 'RK', text: 'The cloud migration was seamless. Their team handled everything with precision and kept us informed throughout the entire process.' },
  { name: 'Divya S', role: 'Operations Director', company: 'AutoFlow Systems', avatar: 'DS', text: 'Outstanding AI integration services. They transformed our workflow and significantly improved operational efficiency by 40%.' },
]

export const WHY = [
  { icon: 'rocket', title: 'Rapid Delivery', text: 'Agile methodology ensuring on-time, on-budget project completion.' },
  { icon: 'shield', title: 'Quality Assured', text: 'Rigorous QA at every stage, so what ships is production-ready.' },
  { icon: 'chat', title: 'Transparent Communication', text: 'Weekly demos, feedback loops and a reply within one business day.' },
  { icon: 'globe', title: 'Remote-First Reach', text: 'Serving clients across India and globally, fully remote.' },
]

export const STEPS = [
  {
    title: 'Discovery',
    text: 'Deep-dive into your requirements, goals, and technical constraints.',
    points: ['Stakeholder conversations', 'Requirements and constraints review', 'Agreed definition of success'],
  },
  {
    title: 'Strategy',
    text: 'Craft a tailored roadmap with tech stack, timeline, and milestones.',
    points: ['Technology stack selection', 'Timeline and milestones', 'Scoped, transparent proposal'],
  },
  {
    title: 'Build',
    text: 'Agile sprints with weekly demos, feedback loops, and QA at every stage.',
    points: ['Short agile sprints', 'Weekly demos and feedback', 'Testing throughout'],
  },
  {
    title: 'Launch',
    text: 'Production deployment, handover, and ongoing SLA-backed support.',
    points: ['Production deployment', 'Handover and documentation', 'Ongoing support and monitoring'],
  },
]

export const TECH = ['React', 'Next.js', 'Node.js', 'Python', 'Django', 'Flutter', 'React Native', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'TensorFlow', 'PostgreSQL', 'MongoDB', 'Terraform', 'Power BI', 'Tailwind CSS']

export const INDUSTRIES = ['FinTech', 'HealthTech', 'EdTech', 'Logistics', 'Retail & E-Commerce', 'Manufacturing', 'Real Estate', 'HR & Payroll', 'Legal Tech', 'SaaS Startups']

export const FAQ = [
  { q: 'How quickly do you respond?', a: 'Within 1 business day via email. Urgent queries via phone.' },
  { q: 'Do you work with startups?', a: 'Yes. SMEs and early-stage startups are our primary clients.' },
  { q: 'Can I get a free consultation?', a: 'Absolutely. Fill the contact form and select "New Project Inquiry".' },
  { q: 'Do you offer remote services?', a: 'Yes, we serve clients across India and globally, fully remote.' },
  { q: 'How do you price projects?', a: 'Pricing depends on scope and complexity. After discovery you receive a tailored proposal with the approach, timeline and cost before any work starts.' },
  { q: 'Do you support products after launch?', a: 'Yes. IT support and maintenance covers bug fixes, performance monitoring and system upgrades, with SLA-backed support available.' },
]

/* ---------- Careers ---------- */
export const CAREER_PERKS = [
  { icon: 'rocket', title: 'Real Project Exposure', text: 'Work on live-project environments with production-ready code standards from day one.' },
  { icon: 'users', title: 'Mentorship-Led Growth', text: 'Learn directly from experienced engineers and consultants in a collaborative setup.' },
  { icon: 'award', title: 'PPO Opportunities', text: 'High-performing trainees are considered for Pre-Placement Offers (PPO).' },
  { icon: 'clock', title: 'Flexible Engagement', text: 'Remote-friendly roles with structured schedules and work-life balance.' },
]

export const ROLES = [
  { dept: 'Engineering', title: 'Full Stack Developer', text: 'Build scalable web applications, corporate portals, and ERP modules using modern full-stack technologies for our SME and startup clients.', req: ['React, Node.js, or Django/Flask', 'SQL and NoSQL databases', 'REST API design & integration', 'Git, CI/CD basics'] },
  { dept: 'Engineering', title: 'Frontend Developer (React)', text: 'Craft pixel-perfect, responsive UIs using React and Tailwind CSS. Work closely with designers and backend engineers to ship production-ready features.', req: ['React.js & TypeScript', 'Tailwind CSS / CSS-in-JS', 'REST API consumption', 'Performance optimization basics'] },
  { dept: 'Engineering', title: 'Backend Developer (Node.js / Python)', text: 'Design and build robust server-side APIs, microservices, and database schemas powering our client applications.', req: ['Node.js or Python (Django/FastAPI)', 'PostgreSQL / MongoDB', 'REST & GraphQL API design', 'Authentication & security best practices'] },
  { dept: 'Engineering', title: 'Mobile App Developer', text: 'Develop high-performance native and cross-platform mobile applications for iOS and Android using React Native or Flutter.', req: ['React Native or Flutter', 'Native iOS or Android experience', 'Mobile UI/UX best practices', 'App Store / Play Store deployment'] },
  { dept: 'AI & Data', title: 'AI / ML Engineer', text: 'Deploy predictive models, NLP assistants, and automated data pipelines to replace manual business workflows for our clients.', req: ['Python with scikit-learn / TensorFlow', 'NLP and data pipeline automation', 'Cloud ML services (AWS/GCP)', 'Model deployment & monitoring'] },
  { dept: 'AI & Data', title: 'Data Scientist', text: 'Analyze complex datasets, build statistical models, and deliver actionable insights that drive business decisions for our clients.', req: ['Python, R, and SQL', 'Statistical modeling & hypothesis testing', 'Data visualization (Matplotlib, Seaborn)', 'Jupyter, Pandas, NumPy'] },
  { dept: 'AI & Data', title: 'Data Analyst / BI Developer', text: 'Create interactive financial and operational dashboards and execute complex data analysis for stakeholder reporting.', req: ['Python, SQL, and Power BI', 'Data cleaning and aggregation', 'Stakeholder-ready report building', 'Strong analytical and visualization skills'] },
  { dept: 'Cloud & Security', title: 'Cloud & DevOps Engineer', text: 'Execute cloud migrations, provision infrastructure, and build CI/CD pipelines to minimize costs and maximize uptime for client systems.', req: ['AWS, Azure, or GCP', 'Docker, Kubernetes, and Terraform', 'CI/CD pipeline design', 'Database migration and cost auditing'] },
  { dept: 'Cloud & Security', title: 'Cybersecurity Analyst', text: 'Conduct security audits, vulnerability assessments, and implement compliance frameworks to protect client digital assets.', req: ['Penetration testing & VAPT', 'OWASP Top 10 knowledge', 'GDPR / IT Act compliance', 'Network security fundamentals'] },
  { dept: 'Design & Quality', title: 'UI/UX Designer', text: 'Design intuitive, visually compelling interfaces for web and mobile products, from wireframes to high-fidelity prototypes.', req: ['Figma (proficient)', 'User research & persona mapping', 'Design systems & component libraries', 'Basic HTML/CSS understanding'] },
  { dept: 'Design & Quality', title: 'QA Engineer', text: 'Ensure software quality through manual and automated testing, from unit tests to full end-to-end regression suites.', req: ['Manual & automated testing (Selenium/Cypress)', 'API testing (Postman)', 'Performance & load testing', 'Bug tracking & test case documentation'] },
  { dept: 'Growth & Support', title: 'Digital Marketing Executive', text: "Drive INFYRO's and clients' online presence through SEO, paid ads, social media, and content marketing strategies.", req: ['On-page & technical SEO', 'Google Ads & Meta Ads', 'Social media management', 'Google Analytics & conversion tracking'] },
  { dept: 'Growth & Support', title: 'Business Development Executive', text: "Identify and close new business opportunities, manage client relationships, and drive revenue growth for INFYRO's service lines.", req: ['B2B sales or IT services background', 'Strong communication & negotiation', 'CRM tools (HubSpot / Zoho)', 'Proposal writing & client presentations'] },
  { dept: 'Growth & Support', title: 'Technical Content Writer', text: "Create high-quality technical blogs, case studies, whitepapers, and documentation for INFYRO's website and client projects.", req: ['Strong technical writing skills', 'Understanding of software/IT concepts', 'SEO writing best practices', 'Experience with CMS platforms'] },
  { dept: 'Growth & Support', title: 'IT Support Engineer', text: 'Provide L1/L2 technical support, manage client systems, and ensure SLA-backed uptime for deployed applications and infrastructure.', req: ['Networking & OS fundamentals', 'Ticketing systems (Freshdesk/Jira)', 'Basic cloud & server management', 'Strong communication & problem-solving'] },
]

export const ROLE_DEPTS = ['All', 'Engineering', 'AI & Data', 'Cloud & Security', 'Design & Quality', 'Growth & Support']

export const INTERN_TRACKS = [
  { icon: 'code', title: 'Full Stack Development', text: 'Hands-on training covering front-end (React), back-end (Node.js/Django), databases, and API development on simulated live-project environments.' },
  { icon: 'chart', title: 'Data Analytics', text: 'Practical training in data cleaning, aggregation, visualization, and building BI dashboards using industry-standard tools.' },
  { icon: 'ai', title: 'AI / ML Engineering', text: 'Work on real ML model training, NLP pipelines, and automation scripts in a production-ready code environment.' },
  { icon: 'search', title: 'Digital Marketing', text: "Learn growth marketing, SEO, social media strategy, and analytics to support INFYRO's client-facing digital campaigns." },
]

/* ---------- Events ---------- */
export const EVENTS = {
  hackathon: {
    slug: 'hackathon-2026',
    eyebrow: 'National-Level Online Hackathon',
    title: 'INFYRO HACKATHON 2026',
    tagline: 'Innovate. Build. Solve. Inspire.',
    lead: 'Build Innovative Solutions. Solve Real-World Problems.',
    text: 'Join a national-level online hackathon organized by Infyro. Collaborate with fellow innovators, transform ideas into working solutions, and showcase your technical skills through a 24-hour development challenge.',
    date: '2026-10-31',
    about: [
      'INFYRO HACKATHON 2026 is a national-level online innovation event designed to bring together students, aspiring developers, and technology enthusiasts.',
      'Participants will work on practical challenges, develop innovative solutions, and demonstrate their creativity, technical knowledge, and problem-solving abilities.',
      'The hackathon encourages experimentation, teamwork, and the development of meaningful technology solutions.',
    ],
    overview: [
      ['Event', 'INFYRO HACKATHON 2026'],
      ['Date', 'October 31, 2026'],
      ['Mode', 'Online'],
      ['Duration', '24 Hours'],
      ['Level', 'National Level'],
      ['Organizer', 'INFYRO'],
      ['Registration', 'Individual and Team'],
      ['Registration Fee', 'Starting at ₹299 per participant'],
    ],
    tracksTitle: 'Choose Your Innovation Track',
    tracks: [
      { icon: 'ai', title: 'Artificial Intelligence & Machine Learning', text: 'Build intelligent applications that use AI and machine learning to address practical problems.', items: ['AI-powered applications', 'Intelligent automation', 'Predictive systems', 'Conversational AI'] },
      { icon: 'chart', title: 'Data Science & Analytics', text: 'Transform data into meaningful insights and develop data-driven solutions.', items: ['Interactive dashboards', 'Predictive analytics', 'Data visualization', 'Business intelligence'] },
      { icon: 'web', title: 'Web Development', text: 'Design and develop useful, modern, and responsive web applications.', items: ['Web platforms', 'Productivity applications', 'Digital services', 'Business solutions'] },
      { icon: 'mobile', title: 'Mobile App Development', text: 'Create mobile applications that improve accessibility, convenience, and productivity.', items: ['Student applications', 'Productivity tools', 'Community platforms', 'Mobile services'] },
      { icon: 'globe', title: 'Social Impact & Innovation', text: 'Explore technology-driven solutions for practical social and community challenges.', items: ['Education', 'Healthcare access', 'Agriculture', 'Sustainability'] },
    ],
    why: [
      { icon: 'bulb', title: 'Innovation Experience', text: 'Apply technical skills to a practical challenge.' },
      { icon: 'code', title: 'Project Development', text: 'Build and demonstrate a working solution.' },
      { icon: 'target', title: 'Problem-Solving', text: 'Explore creative approaches to real-world problems.' },
      { icon: 'cpu', title: 'Technical Learning', text: 'Experiment with technologies and development tools.' },
      { icon: 'check', title: 'Project Evaluation', text: 'Submit your work for evaluation under the published judging criteria.' },
      { icon: 'award', title: 'Achievement Recognition', text: 'Eligible participants may receive digital certificates, subject to the official event rules.' },
    ],
    plans: [
      { title: 'Individual Registration', price: '₹299', unit: 'per participant', text: 'For participants who wish to register individually.', items: ['Individual registration', 'Access to the hackathon according to the official rules', 'Project submission eligibility, subject to the rules', 'Certificate eligibility according to the published criteria'] },
      { title: 'Team Registration', price: '₹999', unit: 'per team (up to 4 members)', text: 'A registration option for teams of up to four participants.', items: ['Team registration', 'Team member details', 'Project submission according to the official rules', 'Certificate eligibility according to the published criteria'], featured: true },
    ],
    steps: [
      { title: 'Register', text: 'Choose individual or team registration and complete the registration form.' },
      { title: 'Receive Confirmation', text: 'Follow the instructions provided by the organisers after registration.' },
      { title: 'Build Your Solution', text: 'Participate in the 24-hour challenge according to the official rules and submission requirements.' },
      { title: 'Submit Your Project', text: 'Submit the required project materials using the method and deadline communicated by the organisers.' },
    ],
    note: 'The complete participation rules and official problem statements will be communicated by the organisers.',
    closing: 'Your Ideas. Your Innovation. Your Challenge.',
    closingText: 'Take the next step, build something meaningful, and showcase your creativity at INFYRO HACKATHON 2026.',
  },
  icsi: {
    slug: 'icsi-2026',
    eyebrow: 'Science · Technology · Research · Innovation',
    title: 'INFYRO International Conference on Science & Innovation 2026',
    short: 'ICSI 2026',
    tagline: 'Where Science Meets Technology, Research & Innovation.',
    lead: 'International Conference on Science, Technology, Research & Innovation',
    text: 'Join students, researchers, academicians and industry professionals in an online conference dedicated to exchanging knowledge, exploring emerging technologies and presenting innovative ideas.',
    date: '2026-11-01',
    about: [
      'INFYRO International Conference on Science & Innovation 2026 brings together a diverse community to exchange knowledge, explore emerging ideas and share innovations.',
      'The conference aims to promote scientific research, encourage technological innovation, support interdisciplinary exchange, connect academic research with industry applications and inspire innovative problem-solving.',
    ],
    overview: [
      ['Event', 'ICSI 2026'],
      ['Date', 'November 1, 2026'],
      ['Mode', 'Online only'],
      ['Organizer', 'INFYRO'],
      ['Website', 'www.infyroinc.com'],
      ['Phone', '+91 84389 38918'],
    ],
    tracksTitle: 'Conference Tracks',
    tracks: [
      { icon: 'ai', title: 'Artificial Intelligence & Data Science', text: 'Research in intelligent systems, machine learning, analytics and data-driven discovery.', items: [] },
      { icon: 'cpu', title: 'Computer Science & Information Technology', text: 'Research across computing, software, networks and information technology.', items: [] },
    ],
    why: [],
    plans: [],
    steps: [],
    note: 'Research paper presentation is subject to the conference submission guidelines, review process and acceptance. Publication opportunities, proceedings and any applicable charges will be communicated through the official conference guidelines.',
    closing: 'Your Ideas Can Shape Tomorrow.',
    closingText: 'Be part of a platform celebrating scientific discovery, technological advancement and innovation.',
  },
}
