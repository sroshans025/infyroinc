import { useEffect, useRef } from 'react'
import { PROJECT_FILTERS } from '../data.js'
import Icon from './Icon.jsx'
import { Arrow, Button } from './ui.jsx'
import { useScrollLock } from './hooks.js'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  useScrollLock(!!project)

  useEffect(() => {
    if (!project) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null
  const label = PROJECT_FILTERS.find((f) => f.id === project.cat)?.label
  const brief = `I'd like to discuss a project similar to "${project.title}".\n\n`

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-label={project.title}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 animate-pop bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg animate-pop rounded-2xl border border-white/10 bg-navy p-7 shadow-2xl sm:p-9">
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
          <Icon name="close" className="h-5 w-5" />
        </button>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
          <Icon name={project.icon} className="h-7 w-7" />
        </span>
        <span className="mt-5 inline-block rounded-full border border-brand-400/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-200">{label}</span>
        <h3 className="mt-3 font-display text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{project.text}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button to={`/contact?service=${encodeURIComponent(project.title)}&brief=${encodeURIComponent(brief)}`} onClick={onClose}>
            Discuss a similar project <Arrow />
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
