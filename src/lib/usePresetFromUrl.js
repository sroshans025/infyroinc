import { useSearchParams } from 'react-router-dom'

/** Reads ?<param>= so a service card's "Learn more ›" pre-selects that option in the contact form. */
export default function usePresetFromUrl(param, form) {
  const [params] = useSearchParams()
  const v = params.get(param)
  const field = form.fields.find((f) => f.type === 'select')
  return v && field?.options.includes(v) ? { [field.name]: v } : undefined
}
