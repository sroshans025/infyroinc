/** Paragraph with key phrases in bold (no scroll animation). */
export default function HighlightReveal({ segments, className }) {
  return (
    <p className={className}>
      {segments.map((s, i) =>
        s.strong ? (
          <strong key={i} className="font-semibold text-ink">
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </p>
  )
}
