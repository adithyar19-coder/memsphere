import { cn } from '../../utils/cn.js'

const TONES = {
  neutral: 'bg-canvas text-muted border border-line',
  brand: 'bg-brand/10 text-brand',
  success: 'bg-success/10 text-success',
  warn: 'bg-warn/10 text-warn',
  danger: 'bg-danger/10 text-danger',
}

export default function Badge({ tone = 'neutral', className, children }) {
  return (
    <span className={cn('badge', TONES[tone], className)}>{children}</span>
  )
}
