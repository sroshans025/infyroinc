export default function Eyebrow({ children, className = '', tone = 'brand', as: Tag = 'p' }) {
  const color = tone === 'light' ? 'text-white/80' : tone === 'muted' ? 'text-muted' : 'text-brand-ink'
  return <Tag className={`t-eyebrow ${color} ${className}`}>{children}</Tag>
}
