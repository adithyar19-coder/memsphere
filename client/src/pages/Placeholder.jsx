import { Construction } from 'lucide-react'

export default function Placeholder({ title, hint }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-10 text-center">
        <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-brand/10 text-brand">
          <Construction size={22} />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-ink tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-muted">
          {hint ?? 'Coming online in an upcoming milestone.'}
        </p>
      </div>
    </div>
  )
}
