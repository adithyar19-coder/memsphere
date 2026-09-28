import { cn } from '../../utils/cn.js'

export default function FilterChip({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'bg-brand text-white'
          : 'bg-surface border border-line text-muted hover:text-ink hover:bg-canvas',
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            'rounded-full px-1.5 text-[10px] font-semibold tabular-nums',
            active ? 'bg-white/20 text-white' : 'bg-canvas text-muted',
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
