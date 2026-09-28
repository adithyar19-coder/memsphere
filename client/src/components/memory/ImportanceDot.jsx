import { Tooltip } from '../ui/Tooltip.jsx'
import { cn } from '../../utils/cn.js'

function tier(score) {
  if (score >= 70) return { color: 'bg-success', label: 'High' }
  if (score >= 40) return { color: 'bg-warn', label: 'Medium' }
  return { color: 'bg-muted', label: 'Low' }
}

export default function ImportanceDot({ score, size = 'md', showScore = false, className }) {
  const { color, label } = tier(score)
  const dot = (
    <span
      className={cn(
        'inline-block rounded-full',
        color,
        size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
        className,
      )}
    />
  )
  const content = `${label} importance · ${score}/100`

  if (showScore) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
        {dot}
        <span className="tabular-nums text-ink font-medium">{score}</span>
      </span>
    )
  }

  return <Tooltip content={content}>{dot}</Tooltip>
}
