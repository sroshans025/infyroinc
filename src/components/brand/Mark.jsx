/** The Infyro mark (official single-colour logo, traced to vector). Height-driven; width follows the 580:825 ratio. */
const D =
  'M853 235 H660 Q628 235 610 258 L350 520 Q320 548 320 590 V675 Q320 720 350 745 L580 975 L632 1018 Q642 1022 652 1018 L685 985 L825 845 Q858 810 858 745 V410 L720 548 Q690 575 690 610 V835 L472 620 Z'

export default function Mark({ size = 32, color = '#0A78F2', className = '', title }) {
  return (
    <svg
      viewBox="300 215 580 825"
      height={size}
      width={Math.round((size * 580) / 825)}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
    >
      <path fill={color} d={D} />
    </svg>
  )
}
