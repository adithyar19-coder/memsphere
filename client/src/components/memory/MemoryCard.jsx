import { MoreHorizontal, Eye, Archive, ArchiveRestore, Trash2 } from 'lucide-react'
import FileTypeBadge from './FileTypeBadge.jsx'
import ImportanceDot from './ImportanceDot.jsx'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '../ui/DropdownMenu.jsx'
import { relativeTime, truncate } from '../../utils/format.js'
import { cn } from '../../utils/cn.js'

export default function MemoryCard({
  memory,
  onOpen,
  onArchive,
  onRestore,
  onDelete,
  variant = 'active',
}) {
  const archived = variant === 'archived'
  return (
    <div
      className={cn(
        'group card p-5 transition-all hover:shadow-pop hover:border-line/80',
        archived && 'opacity-80 hover:opacity-100',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <FileTypeBadge type={memory.fileType} />
        <div className="flex items-center gap-2">
          <ImportanceDot score={memory.importanceScore} showScore />
          <DropdownRoot>
            <DropdownTrigger asChild>
              <button
                aria-label="Memory actions"
                className="h-7 w-7 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-canvas transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <MoreHorizontal size={16} />
              </button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => onOpen?.(memory)}>
                <Eye size={14} /> Open
              </DropdownItem>
              {archived ? (
                <DropdownItem onSelect={() => onRestore?.(memory)}>
                  <ArchiveRestore size={14} /> Restore
                </DropdownItem>
              ) : (
                <DropdownItem onSelect={() => onArchive?.(memory)}>
                  <Archive size={14} /> Archive
                </DropdownItem>
              )}
              <DropdownSeparator />
              <DropdownItem danger onSelect={() => onDelete?.(memory)}>
                <Trash2 size={14} /> Delete
              </DropdownItem>
            </DropdownContent>
          </DropdownRoot>
        </div>
      </div>

      <button
        onClick={() => onOpen?.(memory)}
        className="block w-full text-left mt-3"
      >
        <h3 className="text-sm font-semibold text-ink tracking-tight line-clamp-1">
          {memory.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-3 min-h-[3.9em]">
          {truncate(memory.contentPreview, 180)}
        </p>
      </button>

      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11px] text-muted">
        <span>
          {archived
            ? `Archived ${relativeTime(memory.archivedAt || memory.createdAt)}`
            : relativeTime(memory.createdAt)}
        </span>
        {!archived && memory.accessCount > 0 && (
          <span className="tabular-nums">{memory.accessCount} views</span>
        )}
        {archived && memory.archiveReason && (
          <span className="truncate max-w-[60%]" title={memory.archiveReason}>
            {memory.archiveReason}
          </span>
        )}
      </div>
    </div>
  )
}
