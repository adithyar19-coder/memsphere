import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn.js'

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  size = 'md',
  className,
  autoFocus = false,
  onClear,
}) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={size === 'lg' ? 18 : 16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          'w-full rounded-lg border border-line bg-surface pl-9 pr-9 text-ink placeholder:text-muted/70',
          'focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors',
          size === 'lg' ? 'py-3 text-base' : 'py-2 text-sm',
        )}
      />
      {value && (
        <button
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-canvas transition-colors"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
