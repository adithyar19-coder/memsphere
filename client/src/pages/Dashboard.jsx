import { Link } from 'react-router-dom'
import {
  Files,
  Sparkles,
  Archive as ArchiveIcon,
  Star,
  Upload,
  StickyNote,
  MessagesSquare,
  ArrowUpRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getActiveMemories, getArchivedMemories, MOCK_MEMORIES } from '../mock/memories.js'
import MemoryCard from '../components/memory/MemoryCard.jsx'
import { toast } from 'sonner'

function timeGreeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Still up'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const active = getActiveMemories()
  const archived = getArchivedMemories()
  const important = MOCK_MEMORIES.filter((m) => m.importanceScore >= 70)

  const stats = [
    { label: 'Total Memories', value: MOCK_MEMORIES.length, icon: Files, tone: 'brand' },
    { label: 'Active', value: active.length, icon: Sparkles, tone: 'success' },
    { label: 'Archived', value: archived.length, icon: ArchiveIcon, tone: 'muted' },
    { label: 'Important', value: important.length, icon: Star, tone: 'warn' },
  ]

  const recent = active.slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-ink tracking-tight">
          {timeGreeting()}, {firstName}
        </h2>
        <p className="mt-1 text-sm text-muted">
          You have {active.length} active memories and {important.length} marked as important.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{label}</span>
              <span
                className={[
                  'h-8 w-8 grid place-items-center rounded-lg',
                  tone === 'brand' && 'bg-brand/10 text-brand',
                  tone === 'success' && 'bg-success/10 text-success',
                  tone === 'warn' && 'bg-warn/10 text-warn',
                  tone === 'muted' && 'bg-canvas text-muted',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Icon size={16} />
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-ink tracking-tight tabular-nums">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-ink tracking-tight mb-3">Quick actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { to: '/upload', label: 'Upload a file', desc: 'PDF, DOCX, or image', icon: Upload, tone: 'brand' },
            { to: '/notes', label: 'New note', desc: 'Capture a quick thought', icon: StickyNote, tone: 'warn' },
            { to: '/chat', label: 'Ask AI', desc: 'Chat with your memories', icon: MessagesSquare, tone: 'success' },
          ].map(({ to, label, desc, icon: Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className="card p-5 group hover:shadow-pop hover:border-line/80 transition-all"
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    'h-9 w-9 grid place-items-center rounded-lg',
                    tone === 'brand' && 'bg-brand/10 text-brand',
                    tone === 'success' && 'bg-success/10 text-success',
                    tone === 'warn' && 'bg-warn/10 text-warn',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Icon size={17} />
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <div className="mt-3 font-medium text-ink text-sm">{label}</div>
              <div className="text-xs text-muted mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent memories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-ink tracking-tight">Recent memories</h3>
          <Link to="/memories" className="text-xs text-brand hover:text-brand-hover font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              onOpen={(mem) => toast.info(`Opening "${mem.title}"`)}
              onArchive={(mem) => toast.success(`Archived "${mem.title}"`)}
              onDelete={(mem) => toast.error(`Deleted "${mem.title}"`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
