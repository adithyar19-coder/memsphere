import { KeyRound, Terminal, ExternalLink } from 'lucide-react'
import Logo from './Logo.jsx'

export default function SetupNotice() {
  return (
    <div className="min-h-screen bg-canvas grid place-items-center px-6 py-12">
      <div className="w-full max-w-xl card p-8">
        <div className="flex items-center gap-3">
          <Logo size={30} />
          <div>
            <h1 className="text-lg font-semibold text-ink tracking-tight">MemSphere</h1>
            <p className="text-xs text-muted">One-time setup required</p>
          </div>
        </div>

        <div className="mt-7 flex gap-3 items-start rounded-lg border border-warn/30 bg-warn/5 px-4 py-3 text-sm">
          <KeyRound size={18} className="mt-0.5 shrink-0 text-warn" />
          <div>
            <p className="font-medium text-ink">Supabase keys aren't configured yet.</p>
            <p className="mt-0.5 text-muted">
              MemSphere needs a Supabase project for auth and storage before it can run.
            </p>
          </div>
        </div>

        <ol className="mt-6 space-y-4 text-sm text-ink">
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 grid place-items-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
                1
              </span>
              <div>
                Create a free project at{' '}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand hover:text-brand-hover font-medium inline-flex items-center gap-1"
                >
                  supabase.com <ExternalLink size={12} />
                </a>{' '}
                (takes about a minute to provision).
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 grid place-items-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
                2
              </span>
              <div>
                In your project, open <span className="text-muted">Settings → API</span> and copy the
                <span className="text-muted"> Project URL</span> and{' '}
                <span className="text-muted">anon public key</span>.
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 grid place-items-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
                3
              </span>
              <div>
                Copy <code className="text-xs bg-canvas border border-line rounded px-1.5 py-0.5">client/.env.example</code>{' '}
                to <code className="text-xs bg-canvas border border-line rounded px-1.5 py-0.5">client/.env</code> and paste
                the values in.
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 grid place-items-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
                4
              </span>
              <div>Restart the dev server, then refresh this page.</div>
            </div>
          </li>
        </ol>

        <div className="mt-6 rounded-lg border border-line bg-canvas px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <Terminal size={14} />
            <span>Restart</span>
          </div>
          <pre className="text-xs text-ink font-mono">npm run dev</pre>
        </div>

        <p className="mt-6 text-xs text-muted">
          See <code className="bg-canvas border border-line rounded px-1 py-0.5">README.md</code> for the full setup guide,
          including the Google Gemini key for AI features.
        </p>
      </div>
    </div>
  )
}
