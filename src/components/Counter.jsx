import { NumberTicker } from '@/components/magicui/number-ticker'

// Counts up values like "100+", "99%" or "<24h" once scrolled into view. Non-numeric values render as-is.
export default function Counter({ value }) {
  const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return <span>{value}</span>
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0
  return (
    <span>
      {m[1]}
      <NumberTicker value={parseFloat(m[2])} decimals={decimals} />
      {m[3]}
    </span>
  )
}
