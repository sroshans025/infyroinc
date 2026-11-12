/** Simple card: white, soft border, 16px radius. No hover lift or decorative effects. */
export default function PCard({ as: Tag = 'div', className = '', lift, children, ...rest }) {
  return (
    <Tag className={`relative rounded-card border border-hairline bg-white ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Hover measure line — retired. */
export function HoverMeasure() {
  return null
}
