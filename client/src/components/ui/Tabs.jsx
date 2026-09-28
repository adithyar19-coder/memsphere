import * as T from '@radix-ui/react-tabs'
import { cn } from '../../utils/cn.js'

export const Tabs = T.Root

export function TabsList({ className, children }) {
  return (
    <T.List
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-lg bg-canvas border border-line',
        className,
      )}
    >
      {children}
    </T.List>
  )
}

export function TabsTrigger({ value, children, className }) {
  return (
    <T.Trigger
      value={value}
      className={cn(
        'px-3 py-1.5 text-sm rounded-md text-muted transition-colors',
        'data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-card',
        'hover:text-ink',
        className,
      )}
    >
      {children}
    </T.Trigger>
  )
}

export function TabsContent({ value, children, className }) {
  return (
    <T.Content value={value} className={cn('mt-6 focus:outline-none', className)}>
      {children}
    </T.Content>
  )
}
