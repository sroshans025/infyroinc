import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const control =
  'peer w-full rounded-input border bg-paper-2 px-4 text-[16px] text-ink transition-[background-color,border-color,box-shadow] duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[rgb(var(--brand-rgb)/0.12)]'

/**
 * Floating-label field (FINAL §10 "Form focus"): blue 4px focus glow, the label moves up,
 * and corner ticks appear on the field. Error text is linked with aria-describedby.
 */
export default function Field({ field, value, error, onChange, onBlur, idPrefix }) {
  const [focus, setFocus] = useState(false)
  const id = `${idPrefix}-${field.name}`
  const errId = `${id}-error`
  const up = focus || !!value
  const border = error ? 'border-red-600 focus:border-red-600' : 'border-line focus:border-[#0A78F2]'
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    'aria-required': field.required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
    onChange: (e) => onChange(field.name, e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => {
      setFocus(false)
      onBlur(field.name)
    },
  }

  let input
  if (field.type === 'textarea') {
    input = <textarea {...common} rows={field.rows ?? 5} className={`${control} ${border} resize-y pb-3 pt-7 leading-relaxed`} />
  } else if (field.type === 'select') {
    input = (
      <>
        <select {...common} className={`${control} ${border} h-14 cursor-pointer appearance-none pb-2 pr-11 pt-6 ${value ? '' : 'text-transparent'}`}>
          <option value="" disabled />
          {field.options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-7 h-4 w-4 -translate-y-1/2 text-muted" />
      </>
    )
  } else {
    input = (
      <input
        {...common}
        type={field.type}
        autoComplete={field.autoComplete}
        inputMode={field.type === 'tel' ? 'tel' : undefined}
        className={`${control} ${border} h-14 pb-2 pt-6`}
      />
    )
  }

  return (
    <div className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
      <div className="relative">
        {input}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 origin-left transition-[transform,color] duration-200 ease-out ${
            field.type === 'textarea' ? 'top-4' : 'top-[17px]'
          } ${up ? '-translate-y-[9px] scale-[0.78] text-[#0063D1]' : 'translate-y-0 scale-100 text-ink-2'} text-[16px] font-medium`}
        >
          {field.label}
          {field.required && (
            <span aria-hidden="true" className="ml-0.5 text-[#0063D1]">
              *
            </span>
          )}
        </label>
      </div>
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
