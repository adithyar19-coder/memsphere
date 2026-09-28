import { getSupabaseAdmin, supabaseForUser } from '../config/supabase.js'

/**
 * Extracts the Supabase JWT from the `Authorization: Bearer …` header,
 * verifies it with Supabase, and attaches:
 *   - req.user           → the authenticated user
 *   - req.accessToken    → the raw JWT (for building per-user clients)
 *   - req.supabase       → a Supabase client scoped to this user (RLS applies)
 *
 * Never trust user IDs sent in the request body — always use req.user.id.
 */
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [scheme, token] = header.split(' ')

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header.' })
    }

    const { data, error } = await getSupabaseAdmin().auth.getUser(token)
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid or expired session.' })
    }

    req.user = data.user
    req.accessToken = token
    req.supabase = supabaseForUser(token)
    next()
  } catch (err) {
    // Missing env vars surface as a helpful 503 rather than a generic 500.
    if (err.status === 503) {
      return res.status(503).json({ error: err.message })
    }
    // eslint-disable-next-line no-console
    console.error('[auth] Unexpected error:', err)
    res.status(500).json({ error: 'Authentication check failed.' })
  }
}
