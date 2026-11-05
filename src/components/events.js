// 'past' once the event date (end of that day) has gone by.
export function eventStatus(iso) {
  const end = new Date(`${iso}T23:59:59`)
  return end.getTime() < Date.now() ? 'past' : 'upcoming'
}

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
