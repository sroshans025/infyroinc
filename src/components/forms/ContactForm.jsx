import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'
import InfyroMark from '../brand/InfyroMark'
import Field from './Field'
import Button from '../ui/Button'
import useFormValidation from './useFormValidation'
import { submitEnquiry } from './submit'

/**
 * Config-driven enquiry form (one component for all four forms).
 * `preset` = { fieldName: value } — re-applied whenever it changes (e.g. HelpTile / ?type=).
 */
export default function ContactForm({ config, inbox, preset, className = '' }) {
  const { values, errors, setValue, onBlur, validateAll, reset } = useFormValidation(config.fields, preset)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const formRef = useRef(null)
  const successRef = useRef(null)
  const presetKey = JSON.stringify(preset ?? {})

  useEffect(() => {
    Object.entries(preset ?? {}).forEach(([k, v]) => v && setValue(k, v))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetKey])

  useEffect(() => {
    if (status === 'done') successRef.current?.focus()
  }, [status])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) {
      // Move focus to the first invalid field
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('sending')
    try {
      // Honeypot: bots fill every input; humans never see this one. Pretend success, send nothing.
      const honey = formRef.current?.elements?.namedItem('_honey')?.value
      if (!honey) await submitEnquiry({ inbox, formId: config.id, brand: config.brand, fields: config.fields, values })
      setStatus('done')
      reset()
      Object.entries(preset ?? {}).forEach(([k, v]) => v && setValue(k, v))
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'done' ? (
          <motion.div
            key="done"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-5 rounded-card border border-line-strong bg-blue-50 p-8 outline-none md:p-10"
          >
            {/* FINAL §10 "Form success": the mark assembles inside a check-circle */}
            <span aria-hidden="true" className="relative grid h-16 w-16 place-items-center">
              <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90" fill="none">
                <motion.circle cx="32" cy="32" r="30" stroke="#0A78F2" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
              </svg>
              <InfyroMark size={30} assemble />
              <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#0A78F2] text-white">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.4 }} />
                </svg>
              </span>
            </span>
            <p className="t-h4">{config.successMessage}</p>
            <Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            aria-busy={status === 'sending'}
          >
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" className="absolute -left-[9999px] h-px w-px opacity-0" defaultValue="" />
            {config.fields.map((f) => (
              <Field key={f.name} field={f} idPrefix={config.id} value={values[f.name]} error={errors[f.name]} onChange={setValue} onBlur={onBlur} />
            ))}

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
                {status === 'sending' && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}
                {status === 'sending' ? 'Sending…' : config.submitLabel}
              </Button>
              <p className="text-[13px] text-muted">
                <span aria-hidden="true" className="text-brand-ink">*</span> Required
              </p>
            </div>

            {status === 'error' && (
              <p role="alert" className="text-[14px] text-red-600 sm:col-span-2">
                Something went wrong sending your enquiry. Please try again, or email us at{' '}
                <a href={`mailto:${inbox}`} className="font-medium underline underline-offset-2">
                  {inbox}
                </a>
                .
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
