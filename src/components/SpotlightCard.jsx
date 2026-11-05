// A card whose glow follows the cursor. Pass `as` to change the element.
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onMouseMove={onMove} className={`spot rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:border-brand-400/40 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
