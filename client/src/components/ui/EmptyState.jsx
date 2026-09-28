import { cn } from '../../utils/cn.js'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('card px-8 py-14 text-center', className)}>
      {Icon && (
        <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-brand/10 text-brand">
          <Icon size={22} />
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold text-ink tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-muted max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
