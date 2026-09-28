import * as DM from '@radix-ui/react-dropdown-menu'
import { cn } from '../../utils/cn.js'

export const DropdownRoot = DM.Root
export const DropdownTrigger = DM.Trigger

export function DropdownContent({ align = 'end', sideOffset = 6, className, children }) {
  return (
    <DM.Portal>
      <DM.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[10rem] rounded-lg border border-line bg-surface shadow-pop p-1',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
      >
        {children}
      </DM.Content>
    </DM.Portal>
  )
}

export function DropdownItem({ className, danger, children, ...rest }) {
  return (
    <DM.Item
      className={cn(
        'group flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors',
        danger
          ? 'text-danger data-[highlighted]:bg-danger/10'
          : 'text-ink data-[highlighted]:bg-canvas',
        className,
      )}
      {...rest}
    >
      {children}
    </DM.Item>
  )
}

export function DropdownSeparator() {
  return <DM.Separator className="my-1 h-px bg-line" />
}

export function DropdownLabel({ children }) {
  return (
    <DM.Label className="px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted uppercase tracking-wider">
      {children}
    </DM.Label>
  )
}
