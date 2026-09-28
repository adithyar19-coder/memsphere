import { useMemo, useState } from 'react'
import { Plus, StickyNote, Trash2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { getActiveMemories } from '../mock/memories.js'
import EmptyState from '../components/ui/EmptyState.jsx'
import { relativeTime, truncate } from '../utils/format.js'
import { cn } from '../utils/cn.js'

const MOCK_NOTES = getActiveMemories()
  .filter((m) => m.sourceType === 'note')
  .map((m) => ({ id: m.id, title: m.title, content: m.contentPreview, updatedAt: m.createdAt }))

export default function Notes() {
  const [notes, setNotes] = useState(MOCK_NOTES)
  const [selectedId, setSelectedId] = useState(MOCK_NOTES[0]?.id || null)
  const [draft, setDraft] = useState(null) // { id, title, content }

  const selected = useMemo(
    () => draft || notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId, draft],
  )

  function newNote() {
    const empty = { id: `new-${Date.now()}`, title: '', content: '', updatedAt: new Date().toISOString() }
    setDraft(empty)
    setSelectedId(empty.id)
  }

  function save() {
    if (!draft) return
    if (!draft.title.trim() && !draft.content.trim()) {
      toast.error('Give your note a title or some content.')
      return
    }
    const saved = { ...draft, updatedAt: new Date().toISOString() }
    setNotes((prev) => [saved, ...prev.filter((n) => n.id !== saved.id)])
    setDraft(null)
    setSelectedId(saved.id)
    toast.success('Note saved', { description: 'Indexed and searchable (mock).' })
  }

  function remove(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selectedId === id) setSelectedId(null)
    toast.error('Note deleted')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-muted">Quick thoughts</p>
          <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">Notes</h2>
        </div>
        <button className="btn-primary" onClick={newNote}>
          <Plus size={16} /> New note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* List */}
        <div className="card overflow-hidden">
          <div className="px-4 py-3 border-b border-line text-xs font-medium text-muted uppercase tracking-wider">
            All notes ({notes.length})
          </div>
          {notes.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted">
              No notes yet.
            </div>
          ) : (
            <div className="divide-y divide-line max-h-[560px] overflow-y-auto">
              {notes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setDraft(null); setSelectedId(n.id) }}
                  className={cn(
                    'block w-full text-left px-4 py-3 transition-colors',
                    selectedId === n.id ? 'bg-brand/5' : 'hover:bg-canvas/70',
                  )}
                >
                  <div className="text-sm font-medium text-ink truncate">
                    {n.title || 'Untitled'}
                  </div>
                  <div className="text-xs text-muted truncate mt-0.5">
                    {truncate(n.content, 60) || 'No content'}
                  </div>
                  <div className="text-[11px] text-muted mt-1">
                    {relativeTime(n.updatedAt)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editor / detail */}
        <div className="card p-6 min-h-[560px]">
          {selected ? (
            draft ? (
              <div className="flex flex-col h-full min-h-[500px]">
                <input
                  autoFocus
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Note title"
                  className="text-2xl font-semibold text-ink bg-transparent placeholder:text-muted/60 focus:outline-none tracking-tight"
                />
                <textarea
                  value={draft.content}
                  onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                  placeholder="Start writing…"
                  className="flex-1 mt-4 w-full resize-none bg-transparent text-sm text-ink placeholder:text-muted/60 leading-relaxed focus:outline-none"
                />
                <div className="mt-4 flex items-center justify-end gap-2 pt-4 border-t border-line">
                  <button className="btn-secondary" onClick={() => setDraft(null)}>Cancel</button>
                  <button className="btn-primary" onClick={save}>
                    <Save size={14} /> Save note
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full min-h-[500px]">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl font-semibold text-ink tracking-tight">
                    {selected.title || 'Untitled'}
                  </h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDraft({ ...selected })}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(selected.id)}
                      className="btn-ghost text-danger hover:text-danger hover:bg-danger/10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted">
                  Updated {relativeTime(selected.updatedAt)}
                </div>
                <div className="mt-6 text-sm text-ink leading-relaxed whitespace-pre-wrap">
                  {selected.content || (
                    <span className="text-muted italic">This note is empty.</span>
                  )}
                </div>
              </div>
            )
          ) : (
            <EmptyState
              icon={StickyNote}
              title="No note selected"
              description="Pick a note from the list, or create a new one."
              action={
                <button className="btn-primary" onClick={newNote}>
                  <Plus size={14} /> New note
                </button>
              }
              className="border-0 shadow-none"
            />
          )}
        </div>
      </div>
    </div>
  )
}
