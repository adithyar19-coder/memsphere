/**
 * Human-friendly relative dates: "just now", "2h ago", "3d ago", or a full date after a week.
 */
export function relativeTime(input) {
  const then = typeof input === 'string' ? new Date(input) : input
  const secs = Math.round((Date.now() - then.getTime()) / 1000)

  if (secs < 45) return 'just now'
  if (secs < 60 * 60) return `${Math.round(secs / 60)}m ago`
  if (secs < 60 * 60 * 24) return `${Math.round(secs / 3600)}h ago`
  if (secs < 60 * 60 * 24 * 7) return `${Math.round(secs / 86400)}d ago`

  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatBytes(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function truncate(text, n = 140) {
  if (!text) return ''
  return text.length <= n ? text : text.slice(0, n).trim() + '…'
}
