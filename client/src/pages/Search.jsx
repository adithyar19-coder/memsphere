import { useMemo, useState } from 'react'
import { Sparkles, ArrowRight, Search as SearchIcon } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput.jsx'
import FilterChip from '../components/ui/FilterChip.jsx'
import FileTypeBadge from '../components/memory/FileTypeBadge.jsx'
import ImportanceDot from '../components/memory/ImportanceDot.jsx'
import { getActiveMemories } from '../mock/memories.js'
import { relativeTime } from '../utils/format.js'
import { cn } from '../utils/cn.js'

const SUGGESTIONS = [
  'what was my internship company',
  'college transcript CGPA',
  'supervisor feedback on project',
  'grocery expenses this month',
]

// Very lightweight fake ranker so the results feel meaningful during the demo.
function fakeRank(memories, query) {
  if (!query.trim()) return []
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  return memories
    .map((m) => {
      const hay = (m.title + ' ' + m.contentPreview).toLowerCase()
      let hits = 0
      for (const w of words) if (hay.includes(w)) hits++
      // add a small boost for importance
      const score = hits * 0.75 + (m.importanceScore / 100) * 0.4 + Math.random() * 0.05
      return { m, score }
    })
    .filter((r) => r.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')

  const results = useMemo(() => {
    const pool = getActiveMemories().filter(
      (m) => type === 'all' || m.sourceType === type,
    )
    return fakeRank(pool, q)
  }, [q, type])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted">Semantic search</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">
          Find anything you&apos;ve saved
        </h2>
      </div>

      <SearchInput
        value={q}
        onChange={setQ}
        placeholder='Try "internship offer" or "college transcript"'
        size="lg"
        autoFocus
      />

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {[
          { key: 'all', label: 'All' },
          { key: 'document', label: 'Documents' },
          { key: 'note', label: 'Notes' },
          { key: 'voice', label: 'Voice' },
          { key: 'image', label: 'Images' },
        ].map((f) => (
          <FilterChip key={f.key} active={type === f.key} onClick={() => setType(f.key)}>
            {f.label}
          </FilterChip>
        ))}
      </div>

      {q.trim() === '' ? (
        <div className="card p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-ink">
            <Sparkles size={16} className="text-brand" />
            Try one of these
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="text-left group flex items-center justify-between gap-2 rounded-lg border border-line bg-canvas/50 hover:bg-surface hover:border-brand/40 px-3 py-2.5 text-sm text-ink transition-colors"
              >
                <span>{s}</span>
                <ArrowRight
                  size={14}
                  className="text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all"
                />
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-canvas text-muted border border-line">
            <SearchIcon size={20} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-ink">No matches</h3>
          <p className="mt-1 text-sm text-muted max-w-sm mx-auto">
            Nothing in your memories matches <span className="text-ink">&quot;{q}&quot;</span>. Try different words
            or upload more content.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-muted">
            {results.length} result{results.length === 1 ? '' : 's'} for &quot;{q}&quot;
          </div>
          {results.map(({ m, score }) => (
            <div
              key={m.id}
              className="card p-5 hover:shadow-pop hover:border-line/80 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileTypeBadge type={m.fileType} />
                <ImportanceDot score={m.importanceScore} showScore />
                <div className="ml-auto text-xs text-muted tabular-nums">
                  {Math.round(Math.min(0.99, score) * 100)}% match
                </div>
              </div>
              <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
              <p
                className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: highlight(m.contentPreview, q) }}
              />
              <div className="mt-3 text-[11px] text-muted">{relativeTime(m.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function highlight(text, q) {
  if (!q.trim()) return text
  const words = q
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (words.length === 0) return text
  return text.replace(
    new RegExp(`(${words.join('|')})`, 'gi'),
    '<mark class="bg-brand/20 text-ink rounded px-0.5">$1</mark>',
  )
}
