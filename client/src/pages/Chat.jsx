import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Sparkles, User, Loader2, FileText } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import { INITIAL_CHAT, SAMPLE_QUESTIONS } from '../mock/chat.js'
import { findMemory } from '../mock/memories.js'
import { cn } from '../utils/cn.js'
import { relativeTime } from '../utils/format.js'
import FileTypeBadge from '../components/memory/FileTypeBadge.jsx'

const CANNED_REPLY = {
  content:
    "Based on your stored memories, here's what I found: (this is a UI preview — real answers will come from your documents via RAG once M4 lands). The AI will always cite the specific memories it used, and if it can't find enough context, it will say so instead of guessing.",
  sources: [
    { id: 'm-01', title: 'Aditya_Resume_2026.pdf', snippet: 'Aditya Sharma — Final-year B.Tech…' },
    { id: 'm-05', title: 'DBMS Semester Notes', snippet: 'Normalization: 1NF removes repeating groups…' },
  ],
}

export default function Chat() {
  const [messages, setMessages] = useState(INITIAL_CHAT)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  function send(text) {
    const q = (text ?? input).trim()
    if (!q || busy) return
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: q, at: new Date().toISOString() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setBusy(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: CANNED_REPLY.content,
          sources: CANNED_REPLY.sources,
          at: new Date().toISOString(),
        },
      ])
      setBusy(false)
    }, 1200)
  }

  const empty = messages.length === 0

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <p className="text-sm text-muted">RAG-powered</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">AI Chat</h2>
        <p className="mt-1 text-sm text-muted">
          Ask your memories anything. Answers cite the exact sources they came from.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto card p-6 space-y-6">
        {empty && (
          <div className="text-center py-8">
            <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-brand/10 text-brand">
              <Sparkles size={20} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink">Ask anything about your memories</h3>
            <p className="mt-1 text-sm text-muted max-w-md mx-auto">
              Every answer is generated from your own uploaded documents and notes.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto text-left">
              {SAMPLE_QUESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-sm text-ink border border-line rounded-lg px-3 py-2 hover:border-brand/40 hover:bg-canvas/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <Message key={m.id} m={m} />
        ))}

        {busy && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 grid place-items-center rounded-full bg-brand/10">
              <Logo size={16} />
            </div>
            <div className="pt-1.5 flex items-center gap-2 text-sm text-muted">
              <Loader2 size={14} className="animate-spin" />
              Retrieving relevant memories…
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => { e.preventDefault(); send() }}
        className="mt-4 card p-2 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          rows={1}
          placeholder="Ask your memories anything…"
          className="flex-1 resize-none max-h-32 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:outline-none"
        />
        <button type="submit" disabled={!input.trim() || busy} className="btn-primary shrink-0">
          <Send size={14} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  )
}

function Message({ m }) {
  if (m.role === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-brand text-white px-4 py-2.5 text-sm leading-relaxed">
          {m.content}
        </div>
        <div className="h-8 w-8 grid place-items-center rounded-full bg-canvas border border-line text-muted">
          <User size={15} />
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 grid place-items-center rounded-full bg-brand/10">
        <Logo size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-ink leading-relaxed">{m.content}</div>
        {m.sources?.length > 0 && (
          <div className="mt-3">
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-2">
              Sources
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {m.sources.map((s) => {
                const mem = findMemory(s.id)
                return (
                  <Link
                    key={s.id}
                    to="/memories"
                    className="group flex items-start gap-2 rounded-lg border border-line bg-canvas/50 hover:bg-surface hover:border-brand/40 p-2.5 transition-colors"
                  >
                    <FileTypeBadge type={mem?.fileType || 'pdf'} showLabel={false} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-ink truncate">{s.title}</div>
                      <div className="text-[11px] text-muted line-clamp-1">{s.snippet}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
