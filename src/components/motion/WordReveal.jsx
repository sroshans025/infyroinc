/** Plain statement text (the scroll-linked word reveal is retired). */
export default function WordReveal({ id, text, as: Tag = 'p', className }) {
  return (
    <Tag id={id} className={className}>
      {text}
    </Tag>
  )
}
