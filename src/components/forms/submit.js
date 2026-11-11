import { FORM_ENDPOINT } from '../../data/contact'

/**
 * Pluggable submit handler. Default: POST JSON to FormSubmit (forwards to `inbox`).
 * TODO: confirm destination — swap `FORM_ENDPOINT` / this function for Web3Forms, Formspree,
 * EmailJS, Google Apps Script → Sheet, or your own API. Must resolve on success, throw on failure.
 */
export async function submitEnquiry({ inbox, formId, brand, fields, values }) {
  const labelled = Object.fromEntries(fields.map((f) => [f.label, values[f.name]]))
  const res = await fetch(FORM_ENDPOINT(inbox), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New enquiry — ${brand}${values.subject ? `: ${values.subject}` : ''}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: values.email,
      form: formId,
      ...labelled,
    }),
  })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  const data = await res.json().catch(() => ({}))
  if (data && (data.success === false || data.success === 'false')) throw new Error(data.message || 'Submission failed')
  return data
}
