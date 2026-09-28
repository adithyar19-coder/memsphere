import * as TP from '@radix-ui/react-tooltip'
import { cn } from '../../utils/cn.js'

export function TooltipProvider({ children }) {
  return <TP.Provider delayDuration={200}>{children}</TP.Provider>
}

export function Tooltip({ content, children, side = 'top', className }) {
  return (
    <TP.Root>
      <TP.Trigger asChild>{children}</TP.Trigger>
      <TP.Portal>
        <TP.Content
          side={side}
          sideOffset={6}
          className={cn(
            'z-50 rounded-md bg-ink text-canvas px-2.5 py-1.5 text-xs shadow-pop',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0',
            className,
          )}
        >
          {content}
          <TP.Arrow className="fill-ink" />
        </TP.Content>
      </TP.Portal>
    </TP.Root>
  )
}
