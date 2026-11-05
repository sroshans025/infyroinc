import {
  Award, Banknote, Brain, Briefcase, Brush, CalendarDays, Check, ChevronDown, Clock, Cloud, Code2, Cpu, Database, ExternalLink, Factory, Filter,
  Globe, HeartPulse, Lightbulb, Layers, Lock, Mail, MapPin, Menu, MessageCircle, Monitor, Play, Plus, Quote, RefreshCcw, Rocket, Search, Send,
  ShieldCheck, ShoppingCart, Smartphone, Phone, Star, Target, Truck, Users, X, Zap, ArrowRight, GraduationCap, BarChart3,
} from 'lucide-react'

// Icon names used across the site, mapped to lucide-react. LinkedIn and Instagram are not in lucide, so they stay as inline paths.
const LUCIDE = {
  code: Code2, mobile: Smartphone, cloud: Cloud, ai: Brain, web: Monitor, transform: RefreshCcw, shield: ShieldCheck, globe: Globe, pin: MapPin,
  chat: MessageCircle, mail: Mail, phone: Phone, clock: Clock, check: Check, arrow: ArrowRight, menu: Menu, close: X, layers: Layers, rocket: Rocket,
  plus: Plus, health: HeartPulse, bank: Banknote, cart: ShoppingCart, school: GraduationCap, truck: Truck, factory: Factory, bolt: Zap, chart: BarChart3,
  db: Database, users: Users, star: Star, quote: Quote, send: Send, brush: Brush, search: Search, briefcase: Briefcase, calendar: CalendarDays, lock: Lock,
  cpu: Cpu, external: ExternalLink, target: Target, award: Award, bulb: Lightbulb, play: Play, filter: Filter, chev: ChevronDown,
}

const BRAND = {
  linkedin: <path d="M6 9v10M6 5.5v.01M10 19V9m0 4c0-2 1.5-4 4-4s4 1.5 4 4v6" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r=".6" />
    </>
  ),
}

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.8 }) {
  const Lucide = LUCIDE[name]
  if (Lucide) return <Lucide className={className} strokeWidth={strokeWidth} aria-hidden="true" />
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {BRAND[name]}
    </svg>
  )
}
