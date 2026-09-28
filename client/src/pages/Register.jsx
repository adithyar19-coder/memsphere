import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const { session } = await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
      })
      // If Supabase email confirmations are ON, session will be null.
      if (session) {
        navigate('/dashboard', { replace: true })
      } else {
        setNeedsConfirmation(true)
      }
    } catch (err) {
      setError(err?.message || 'Unable to create your account.')
    } finally {
      setLoading(false)
    }
  }

  if (needsConfirmation) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={26} />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-ink">Check your email</h2>
        <p className="mt-2 text-sm text-muted">
          We sent a confirmation link to <span className="text-ink">{email}</span>.
          Click it to activate your account, then come back to sign in.
        </p>
        <Link to="/login" className="btn-primary mt-6 inline-flex">
          Go to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-ink tracking-tight">Create your account</h2>
        <p className="mt-1 text-sm text-muted">Start organising your memories in seconds.</p>
      </div>

      {error && (
        <div className="mb-4 flex gap-2 items-start rounded-lg border border-danger/30 bg-danger/5 px-3 py-2.5 text-sm text-danger">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="fullName">Full name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input pl-9"
              placeholder="Aditya Sharma"
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-9"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-9"
              placeholder="At least 6 characters"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-brand hover:text-brand-hover font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
