import { motion } from 'framer-motion'

// Editorial section marker: "02 / Capabilities" with a hairline that draws in.
export default function SectionLabel({ index, children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 ${className}`}>
      <span className="tabular-nums text-brand-400">{String(index).padStart(2, '0')}</span>
      <motion.span
        aria-hidden="true"
        className="h-px w-12 origin-left bg-white/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <span>{children}</span>
    </div>
  )
}
