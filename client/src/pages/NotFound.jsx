import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-canvas text-muted border border-line">
          <Compass size={22} />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-ink tracking-tight">Page not found</h2>
        <p className="mt-2 text-sm text-muted">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary mt-6 inline-flex">Back to dashboard</Link>
      </div>
    </div>
  )
}
