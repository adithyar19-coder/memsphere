import clsx from 'clsx'

/**
 * Tiny className helper: cn('base', condition && 'active', extra).
 * We keep this in one place so imports stay clean everywhere.
 */
export function cn(...args) {
  return clsx(...args)
}
