import { useEffect, useRef, useState } from 'react'
import { Mic, Square, Save, X, Play, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { getActiveMemories } from '../mock/memories.js'
import { relativeTime } from '../utils/format.js'
import { cn } from '../utils/cn.js'

const PREVIOUS = getActiveMemories()
  .filter((m) => m.sourceType === 'voice')
  .map((m) => ({ id: m.id, title: m.title, transcript: m.contentPreview, at: m.createdAt, duration: '2:34' }))

const DEMO_TRANSCRIPT =
  "Ok so the plan for tomorrow — finish the importance scoring service, wire up the archive page, and send the interim demo to Prof Rao by five pm. Also need to book train tickets for the college trip."

export default function VoiceNotes() {
  const supported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const [state, setState] = useState('idle') // idle | recording | review
  const [seconds, setSeconds] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [notes, setNotes] = useState(PREVIOUS)
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function startFake() {
    setSeconds(0)
    setTranscript('')
    setState('recording')
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  function stopFake() {
    clearInterval(timerRef.current)
    setState('review')
    setTranscript(DEMO_TRANSCRIPT)
  }

  function save() {
    if (!transcript.trim()) {
      toast.error('Nothing to save — transcript is empty.')
      return
    }
    setNotes((p) => [
      {
        id: `v-${Date.now()}`,
        title: transcript.slice(0, 40).trim() + (transcript.length > 40 ? '…' : ''),
        transcript,
        at: new Date().toISOString(),
        duration: fmt(seconds),
      },
      ...p,
    ])
    toast.success('Voice note saved', { description: 'Transcript indexed as a memory (mock).' })
    setState('idle')
    setSeconds(0)
    setTranscript('')
  }

  function discard() {
    setState('idle')
    setSeconds(0)
    setTranscript('')
    toast.error('Discarded')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-muted">Speak, edit, save</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">Voice Notes</h2>
      </div>

      {!supported && (
        <div className="card p-4 flex items-start gap-3 border-warn/30 bg-warn/5">
          <AlertTriangle size={18} className="text-warn shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-ink">Your browser doesn&apos;t support speech recognition.</p>
            <p className="text-muted mt-0.5">Use the latest Chrome or Edge for live transcription. This page still renders as a UI preview.</p>
          </div>
        </div>
      )}

      {/* Recorder */}
      <div className="card p-10">
        {state === 'idle' && (
          <div className="text-center">
            <button
              onClick={startFake}
              className="mx-auto h-24 w-24 rounded-full grid place-items-center bg-brand text-white shadow-pop hover:bg-brand-hover transition-all hover:scale-105 active:scale-95"
            >
              <Mic size={34} />
            </button>
            <p className="mt-5 text-sm font-medium text-ink">Tap to start recording</p>
            <p className="mt-1 text-xs text-muted">
              Speak clearly. You&apos;ll be able to edit the transcript before saving.
            </p>
          </div>
        )}

        {state === 'recording' && (
          <div className="text-center">
            <button
              onClick={stopFake}
              className="mx-auto relative h-24 w-24 rounded-full grid place-items-center bg-danger text-white shadow-pop hover:brightness-110 transition-all"
            >
              <span className="absolute inset-0 rounded-full bg-danger/40 animate-ping" />
              <Square size={28} className="relative" />
            </button>
            <p className="mt-5 text-sm font-medium text-ink tabular-nums">{fmt(seconds)}</p>
            <p className="mt-1 text-xs text-muted">Recording… tap to stop</p>

            {/* fake waveform */}
            <div className="mt-6 flex items-end justify-center gap-1 h-12">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-brand/60"
                  style={{
                    height: `${20 + Math.abs(Math.sin((i + seconds) * 0.7)) * 80}%`,
                    animation: `pulse 1.2s ease-in-out ${i * 60}ms infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {state === 'review' && (
          <div className="space-y-4">
            <div>
              <label className="label">Transcript</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={6}
                className="input font-normal leading-relaxed"
              />
              <p className="mt-1.5 text-xs text-muted">
                Edit any misheard words before saving. Duration: {fmt(seconds)}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button className="btn-secondary" onClick={discard}>
                <X size={14} /> Discard
              </button>
              <button className="btn-primary" onClick={save}>
                <Save size={14} /> Save voice note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Previous voice notes */}
      {notes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ink tracking-tight mb-3">Previous</h3>
          <div className="card divide-y divide-line overflow-hidden">
            {notes.map((n) => (
              <div key={n.id} className="p-4 flex items-start gap-4">
                <button className="h-9 w-9 grid place-items-center rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors">
                  <Play size={14} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink">{n.title}</div>
                  <div className="text-xs text-muted mt-0.5 line-clamp-2">{n.transcript}</div>
                  <div className="mt-1.5 text-[11px] text-muted flex items-center gap-2">
                    <span>{relativeTime(n.at)}</span>
                    <span>·</span>
                    <span className="tabular-nums">{n.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}
