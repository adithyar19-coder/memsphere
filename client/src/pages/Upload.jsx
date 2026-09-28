import { useRef, useState } from 'react'
import { UploadCloud, X, CheckCircle2, FileText, FileType2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../utils/cn.js'
import { formatBytes } from '../utils/format.js'
import FileTypeBadge from '../components/memory/FileTypeBadge.jsx'

const ACCEPTED = '.pdf,.docx,.jpg,.jpeg,.png'
const MAX_SIZE = 10 * 1024 * 1024

function extOf(name = '') {
  return name.split('.').pop().toLowerCase()
}

export default function UploadPage() {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])

  function addFiles(list) {
    const arr = Array.from(list || [])
    if (arr.length === 0) return
    const next = arr
      .filter((f) => {
        const ext = extOf(f.name)
        if (!['pdf', 'docx', 'jpg', 'jpeg', 'png'].includes(ext)) {
          toast.error(`${f.name} — unsupported file type`)
          return false
        }
        if (f.size > MAX_SIZE) {
          toast.error(`${f.name} — over 10 MB limit`)
          return false
        }
        return true
      })
      .map((f) => ({
        id: `${f.name}-${f.size}-${Date.now() + Math.random()}`,
        name: f.name,
        size: f.size,
        ext: extOf(f.name),
        status: 'uploading',
        progress: 0,
      }))
    setFiles((prev) => [...next, ...prev])
    next.forEach(fakeProcess)
  }

  function fakeProcess(file) {
    let progress = 0
    const step = () => {
      progress += Math.random() * 22 + 6
      if (progress >= 100) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, progress: 100, status: 'extracting' } : f,
          ),
        )
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: 'done' } : f)),
          )
          toast.success(`${file.name} ready`, {
            description: 'Extracted and indexed as a memory (mock).',
          })
        }, 1200)
        return
      }
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
      )
      setTimeout(step, 200 + Math.random() * 200)
    }
    step()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-muted">Add a new memory</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">Upload</h2>
      </div>

      {/* Dropzone */}
      <label
        htmlFor="file-input"
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          'block card cursor-pointer transition-colors border-2 border-dashed',
          dragging
            ? 'border-brand bg-brand/5'
            : 'border-line hover:border-brand/60 hover:bg-canvas/60',
        )}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept={ACCEPTED}
          multiple
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="py-14 px-6 text-center">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-brand/10 text-brand">
            <UploadCloud size={24} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-ink tracking-tight">
            Drop files here or click to browse
          </h3>
          <p className="mt-1 text-sm text-muted">
            Up to 10 MB each. We&apos;ll extract the text and make it searchable.
          </p>

          <div className="mt-5 inline-flex items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><FileText size={13} className="text-red-500" />PDF</span>
            <span className="inline-flex items-center gap-1.5"><FileType2 size={13} className="text-blue-500" />DOCX</span>
            <span className="inline-flex items-center gap-1.5"><ImageIcon size={13} className="text-emerald-500" />JPG / PNG</span>
          </div>
        </div>
      </label>

      {/* Queue */}
      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ink tracking-tight mb-3">
            {files.filter((f) => f.status !== 'done').length > 0
              ? 'Processing…'
              : 'Recently added'}
          </h3>
          <div className="card divide-y divide-line overflow-hidden">
            {files.map((f) => (
              <div key={f.id} className="p-4 flex items-center gap-4">
                <FileTypeBadge type={f.ext} showLabel={false} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-ink truncate">{f.name}</div>
                    <div className="text-xs text-muted whitespace-nowrap tabular-nums">
                      {formatBytes(f.size)}
                    </div>
                  </div>
                  {f.status !== 'done' ? (
                    <>
                      <div className="mt-2 h-1 rounded-full bg-canvas overflow-hidden">
                        <div
                          className="h-full bg-brand transition-all"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                        <Loader2 size={12} className="animate-spin" />
                        {f.status === 'uploading'
                          ? `Uploading… ${Math.floor(f.progress)}%`
                          : 'Extracting text…'}
                      </div>
                    </>
                  ) : (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-success">
                      <CheckCircle2 size={13} />
                      Ready — added to memories
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                  className="h-7 w-7 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-canvas transition-colors"
                  aria-label="Remove"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
