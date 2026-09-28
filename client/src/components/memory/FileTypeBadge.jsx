import { FileText, FileType2, Image, StickyNote, Mic } from 'lucide-react'
import { cn } from '../../utils/cn.js'

const MAP = {
  pdf: { label: 'PDF', icon: FileText, tone: 'text-red-500 bg-red-500/10' },
  docx: { label: 'DOCX', icon: FileType2, tone: 'text-blue-500 bg-blue-500/10' },
  jpg: { label: 'Image', icon: Image, tone: 'text-emerald-500 bg-emerald-500/10' },
  jpeg: { label: 'Image', icon: Image, tone: 'text-emerald-500 bg-emerald-500/10' },
  png: { label: 'Image', icon: Image, tone: 'text-emerald-500 bg-emerald-500/10' },
  note: { label: 'Note', icon: StickyNote, tone: 'text-amber-500 bg-amber-500/10' },
  voice: { label: 'Voice', icon: Mic, tone: 'text-violet-500 bg-violet-500/10' },
}

export default function FileTypeBadge({ type, showLabel = true, className }) {
  const conf = MAP[type] || { label: type?.toUpperCase() || 'FILE', icon: FileText, tone: 'text-muted bg-canvas' }
  const Icon = conf.icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium',
        conf.tone,
        className,
      )}
    >
      <Icon size={12} strokeWidth={2.2} />
      {showLabel && <span>{conf.label}</span>}
    </span>
  )
}
