// All hero copy, stats and build-panel content. Edit here; nothing in the components is hard-coded.
import { CONFIG } from '../config.js'

export const HERO = {
  status: 'Taking on new projects · Q1 2027',
  lead: 'We build',
  words: ['software', 'mobile apps', 'cloud systems', 'AI tools'],
  tail: 'that businesses rely on.',
  sub: 'Web, mobile, cloud and AI, built by one team in Tiruchirappalli and handed over clean, for startups and growing businesses.',
  tagline: 'Innovating Ideas Into Digital Reality',
  primaryCta: { label: 'Start a project', to: '/#contact' },
  secondaryCta: { label: 'See our work', href: '#work' },
}

// Projects, clients and response time come from the shared business config so they never drift apart.
const pick = (label) => CONFIG.stats.find((s) => s.label === label)
export const HERO_STATS = [pick('Projects Delivered'), pick('Happy Clients'), pick('Avg Response Time')].filter(Boolean)

export const HERO_TECH = ['React', 'Node.js', 'Python', 'AWS', 'Flutter', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'Django', 'TensorFlow', 'Terraform']

// Each tab: a short build log (typed out in a loop) and three status chips.
// A line starting with "$" is the command, "ok" marks the final success line.
export const BUILD_TABS = [
  {
    id: 'web',
    label: 'Web',
    file: 'web-app',
    lines: [
      { text: '$ npm run build', kind: 'cmd' },
      { text: 'compiling 214 modules', kind: 'step' },
      { text: 'running 128 tests, all passing', kind: 'step' },
      { text: 'optimising bundle, 148 kB gzip', kind: 'step' },
      { text: '✓ Deployed to production in 42s', kind: 'ok' },
    ],
    chips: [
      { label: 'Uptime', value: '99.98%' },
      { label: 'Deploy', value: 'live', accent: true },
      { label: 'p95 latency', value: '118 ms' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    file: 'mobile-app',
    lines: [
      { text: '$ flutter build appbundle', kind: 'cmd' },
      { text: 'resolving 41 packages', kind: 'step' },
      { text: 'signing release for Android + iOS', kind: 'step' },
      { text: 'uploading to store tracks', kind: 'step' },
      { text: '✓ Release candidate ready in 3m 12s', kind: 'ok' },
    ],
    chips: [
      { label: 'Crash-free', value: '99.9%' },
      { label: 'Release', value: 'in review', accent: true },
      { label: 'Cold start', value: '0.9 s' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    file: 'infra',
    lines: [
      { text: '$ terraform apply', kind: 'cmd' },
      { text: 'planning 23 resources', kind: 'step' },
      { text: 'provisioning vpc, db, queue', kind: 'step' },
      { text: 'rolling out 3 services, zero downtime', kind: 'step' },
      { text: '✓ Infrastructure applied in 1m 04s', kind: 'ok' },
    ],
    chips: [
      { label: 'Regions', value: '2 active' },
      { label: 'Rollout', value: 'healthy', accent: true },
      { label: 'Cost', value: '-31% / mo' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    file: 'workflow',
    lines: [
      { text: '$ infyro deploy invoice-agent', kind: 'cmd' },
      { text: 'loading model and prompts', kind: 'step' },
      { text: 'evaluating on 500 sample invoices', kind: 'step' },
      { text: 'accuracy 97.4%, above threshold', kind: 'step' },
      { text: '✓ Automation live, approvals in minutes', kind: 'ok' },
    ],
    chips: [
      { label: 'Accuracy', value: '97.4%' },
      { label: 'Agent', value: 'running', accent: true },
      { label: 'Time saved', value: '26 h / wk' },
    ],
  },
]
