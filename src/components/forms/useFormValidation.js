import { useCallback, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// 10-digit Indian mobile (starts 6–9), optional +91 / 91 / 0 prefix; spaces and dashes ignored.
const PHONE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/

export function validateField(field, raw) {
  const value = typeof raw === 'string' ? raw.trim() : raw
  if (field.required && !value) {
    return field.type === 'select' ? `Please choose an option for ${field.label}.` : `Please enter your ${field.label.toLowerCase().replace(/^your /, '')}.`
  }
  if (!value) return ''
  if (field.type === 'email' && !EMAIL_RE.test(value)) return 'Please enter a valid email address.'
  if (field.type === 'tel' && !PHONE_RE.test(value.replace(/[\s-]/g, ''))) return 'Please enter a valid 10-digit mobile number (with or without +91).'
  if (field.minLength && value.length < field.minLength) return `${field.label} must be at least ${field.minLength} characters.`
  return ''
}

/** Minimal form state: values, per-field errors, touched-on-blur validation, full validate on submit. */
export default function useFormValidation(fields, initial = {}) {
  const blank = Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? '']))
  const [values, setValues] = useState(blank)
  const [errors, setErrors] = useState({})

  const setValue = useCallback(
    (name, value) => {
      setValues((v) => ({ ...v, [name]: value }))
      setErrors((e) => {
        if (!e[name]) return e
        const field = fields.find((f) => f.name === name)
        return { ...e, [name]: validateField(field, value) }
      })
    },
    [fields],
  )

  const onBlur = useCallback(
    (name) => {
      const field = fields.find((f) => f.name === name)
      setErrors((e) => ({ ...e, [name]: validateField(field, values[name]) }))
    },
    [fields, values],
  )

  const validateAll = useCallback(() => {
    const next = Object.fromEntries(fields.map((f) => [f.name, validateField(f, values[f.name])]))
    setErrors(next)
    return Object.values(next).every((m) => !m)
  }, [fields, values])

  const reset = useCallback(() => {
    setValues(Object.fromEntries(fields.map((f) => [f.name, ''])))
    setErrors({})
  }, [fields])

  return { values, errors, setValue, onBlur, validateAll, reset }
}
