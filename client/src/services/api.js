import { supabase } from '../lib/supabase.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Fetch wrapper that automatically attaches the current Supabase access token.
 * Used by future milestones for hitting the Express API.
 */
export async function apiFetch(path, options = {}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  const headers = new Headers(options.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const contentType = res.headers.get('Content-Type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json().catch(() => null) : await res.text()

  if (!res.ok) {
    const message = (isJson && payload?.error) || `Request failed: ${res.status}`
    throw new Error(message)
  }
  return payload
}
