import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

function assertConfigured() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey || !env.supabaseAnonKey) {
    const missing = []
    if (!env.supabaseUrl) missing.push('SUPABASE_URL')
    if (!env.supabaseAnonKey) missing.push('SUPABASE_ANON_KEY')
    if (!env.supabaseServiceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')
    const err = new Error(
      `Supabase is not configured. Missing env var(s): ${missing.join(', ')}. ` +
        `Copy server/.env.example to server/.env and fill in your Supabase values.`,
    )
    err.status = 503
    throw err
  }
}

let _admin = null

/**
 * Admin client — uses service_role and bypasses RLS. Lazy-instantiated so the
 * server can still boot (health check works) even without env configured.
 * NEVER expose the service_role key to the browser.
 */
export function getSupabaseAdmin() {
  if (_admin) return _admin
  assertConfigured()
  _admin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _admin
}

/**
 * Per-request client scoped to the calling user. Postgres RLS then enforces
 * that users only see their own rows — no server-side "where user_id = …"
 * mistakes can accidentally leak another user's data.
 */
export function supabaseForUser(accessToken) {
  assertConfigured()
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  })
}
