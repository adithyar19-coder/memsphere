import { useState } from 'react'
import { Archive as ArchiveIcon, Info } from 'lucide-react'
import { toast } from 'sonner'
import { getArchivedMemories } from '../mock/memories.js'
import MemoryCard from '../components/memory/MemoryCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import SearchInput from '../components/ui/SearchInput.jsx'

export default function Archive() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState(getArchivedMemories())

  const filtered = q.trim()
    ? items.filter(
        (m) =>
          m.title.toLowerCase().includes(q.toLowerCase()) ||
          m.contentPreview.toLowerCase().includes(q.toLowerCase()),
      )
    : items

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-muted">Adaptive forgetting</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">Archive</h2>
      </div>

      <div className="card p-4 flex items-start gap-3 border-brand/20 bg-brand/5">
        <Info size={18} className="text-brand shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-ink">Nothing here is deleted.</p>
          <p className="text-muted mt-0.5">
            These memories were quietly archived because they scored low on importance and haven&apos;t been
            accessed in a while. You can restore any of them any time — they&apos;ll rejoin your active library.
          </p>
        </div>
      </div>

      <SearchInput value={q} onChange={setQ} placeholder="Search archived memories…" />

      {filtered.length === 0 ? (
        <EmptyState
          icon={ArchiveIcon}
          title={q ? 'No archived memories match' : 'Archive is empty'}
          description={
            q
              ? 'Try a different query.'
              : 'When the system archives a low-importance memory, it will appear here for you to restore.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              variant="archived"
              onOpen={(mem) => toast.info(`Opening "${mem.title}"`)}
              onRestore={(mem) => {
                setItems((prev) => prev.filter((x) => x.id !== mem.id))
                toast.success(`Restored "${mem.title}"`, {
                  description: 'Moved back to your active library.',
                })
              }}
              onDelete={(mem) => {
                setItems((prev) => prev.filter((x) => x.id !== mem.id))
                toast.error(`Deleted "${mem.title}" permanently`)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
