import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Magic UI border beam: a short light streak travelling around the parent's border.
export function BorderBeam({ className, size = 120, duration = 9, delay = 0 }) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] motion-reduce:hidden">
      <motion.div
        className={cn('absolute aspect-square bg-gradient-to-l from-brand-300 via-brand to-transparent', className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay }}
      />
    </div>
  )
}
