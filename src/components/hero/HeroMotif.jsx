import { AnimatePresence, motion } from 'framer-motion'
import { CircuitTraces, Elevation } from '../precision/Motifs'

/** Background motif behind the hero mark — morphs circuit traces → crop marks → dimension lines (FINAL §6.4). */
export default function HeroMotif({ k }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -inset-[18%]">
      <AnimatePresence initial={false}>
        <motion.div key={k} className="absolute inset-0" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.7 }}>
          {k === 'tech' && <CircuitTraces inView={false} dense className="h-full w-full opacity-60" />}
          {k === 'construction' && <Elevation inView={false} className="h-full w-full opacity-50" />}
          {k === 'studios' && (
            <div className="absolute inset-[10%]">
              {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c, i) => (
                <motion.span
                  key={c}
                  className={`absolute h-12 w-12 border-[rgba(10,120,242,0.45)] ${c}`}
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                />
              ))}
              <span className="absolute inset-x-0 top-1/3 h-px bg-[rgba(245,158,11,0.25)]" />
              <span className="absolute inset-x-0 top-2/3 h-px bg-[rgba(245,158,11,0.25)]" />
              <span className="absolute inset-y-0 left-1/3 w-px bg-[rgba(245,158,11,0.25)]" />
              <span className="absolute inset-y-0 left-2/3 w-px bg-[rgba(245,158,11,0.25)]" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
