const TONES = {
  white: 'bg-white',
  alt: 'bg-paper-2',
  navy: 'bg-navy text-white/80',
  dark: 'bg-[#0B0F19] text-white/80',
  brand: 'bg-brand text-white',
  none: '',
}
const PAD = { default: 'py-16 md:py-20 lg:py-24', compact: 'py-12 md:py-16', none: '' }

/** Section wrapper: plain background in one of a few tones; neighbouring sections alternate tones. */
export default function Section({ id, tone = 'white', pad = 'default', className = '', innerClassName = '', labelledBy, children, grid, ...rest }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative ${TONES[tone]} ${PAD[pad]} ${className}`} {...rest}>
      <div className={`container-content relative ${innerClassName}`}>{children}</div>
    </section>
  )
}
