import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, LayoutGrid, List, ArrowUpDown, FileX } from 'lucide-react'
import { toast } from 'sonner'
import { getActiveMemories } from '../mock/memories.js'
import MemoryCard from '../components/memory/MemoryCard.jsx'
import SearchInput from '../components/ui/SearchInput.jsx'
import FilterChip from '../components/ui/FilterChip.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
} from '../components/ui/DropdownMenu.jsx'
import { cn } from '../utils/cn.js'
import { relativeTime, truncate } from '../utils/format.js'
import FileTypeBadge from '../components/memory/FileTypeBadge.jsx'
import ImportanceDot from '../components/memory/ImportanceDot.jsx'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'document', label: 'Documents' },
  { key: 'note', label: 'Notes' },
  { key: 'voice', label: 'Voice' },
  { key: 'image', label: 'Images' },
]

const SORTS = {
  newest: { label: 'Newest first', fn: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt) },
  oldest: { label: 'Oldest first', fn: (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt) },
  important: { label: 'Most important', fn: (a, b) => b.importanceScore - a.importanceScore },
  least: { label: 'Least important', fn: (a, b) => a.importanceScore - b.importanceScore },
}

export default function Memories() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortKey, setSortKey] = useState('newest')
  const [view, setView] = useState('grid')

  const all = getActiveMemories()

  const counts = useMemo(() => {
    return {
      all: all.length,
      document: all.filter((m) => m.sourceType === 'document').length,
      note: all.filter((m) => m.sourceType === 'note').length,
      voice: all.filter((m) => m.sourceType === 'voice').length,
      image: all.filter((m) => m.sourceType === 'image').length,
    }
  }, [all])

  const list = useMemo(() => {
    let out = all
    if (filter !== 'all') out = out.filter((m) => m.sourceType === filter)
    if (q.trim()) {
      const needle = q.toLowerCase()
      out = out.filter(
        (m) =>
          m.title.toLowerCase().includes(needle) ||
          m.contentPreview.toLowerCase().includes(needle),
      )
    }
    return [...out].sort(SORTS[sortKey].fn)
  }, [all, filter, sortKey, q])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-muted">Your library</p>
          <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">
            Memories <span className="text-muted font-normal">({list.length})</span>
          </h2>
        </div>
        <Link to="/upload" className="btn-primary">
          <Upload size={16} /> Upload
        </Link>
      </div>

      {/* Toolbar */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Search titles and content…"
            className="flex-1 min-w-[260px]"
          />
          <DropdownRoot>
            <DropdownTrigger asChild>
              <button className="btn-secondary">
                <ArrowUpDown size={14} />
                <span className="hidden sm:inline">{SORTS[sortKey].label}</span>
              </button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>Sort by</DropdownLabel>
              {Object.entries(SORTS).map(([k, v]) => (
                <DropdownItem key={k} onSelect={() => setSortKey(k)}>
                  <span
                    className={cn(
                      'inline-block h-1.5 w-1.5 rounded-full',
                      sortKey === k ? 'bg-brand' : 'bg-transparent',
                    )}
                  />
                  {v.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownRoot>
          <div className="inline-flex rounded-lg border border-line bg-canvas p-0.5">
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              className={cn(
                'h-8 w-8 grid place-items-center rounded-md transition-colors',
                view === 'grid'
                  ? 'bg-surface text-ink shadow-card'
                  : 'text-muted hover:text-ink',
              )}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              className={cn(
                'h-8 w-8 grid place-items-center rounded-md transition-colors',
                view === 'list'
                  ? 'bg-surface text-ink shadow-card'
                  : 'text-muted hover:text-ink',
              )}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
              count={counts[f.key]}
            >
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Results */}
      {list.length === 0 ? (
        <EmptyState
          icon={FileX}
          title="No memories match"
          description="Try clearing the search or a different filter."
          action={
            <button className="btn-secondary" onClick={() => { setQ(''); setFilter('all') }}>
              Reset filters
            </button>
          }
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              onOpen={(mem) => toast.info(`Opening "${mem.title}"`)}
              onArchive={(mem) => toast.success(`Archived "${mem.title}"`)}
              onDelete={(mem) => toast.error(`Deleted "${mem.title}"`)}
            />
          ))}
        </div>
      ) : (
        <div className="card divide-y divide-line overflow-hidden">
          {list.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 p-4 hover:bg-canvas/70 transition-colors cursor-pointer"
              onClick={() => toast.info(`Opening "${m.title}"`)}
            >
              <FileTypeBadge type={m.fileType} showLabel={false} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink truncate">{m.title}</div>
                <div className="text-xs text-muted truncate">{truncate(m.contentPreview, 120)}</div>
              </div>
              <div className="text-xs text-muted whitespace-nowrap">{relativeTime(m.createdAt)}</div>
              <ImportanceDot score={m.importanceScore} showScore />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
