export function displayName(value, fallback = 'Unknown athlete') {
  if (typeof value === 'string') return value
  return value?.name || value?.username || fallback
}

export function formatLabel(value) {
  if (!value) return 'Not specified'
  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

export function formatDate(value) {
  if (!value) return 'Not recorded'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Not recorded'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export function formatNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number.toLocaleString() : '0'
}