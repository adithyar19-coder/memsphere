import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * True when the browser has both Supabase env vars filled in.
 * When false, `supabase` is `null` and the app shows a helpful setup screen
 * instead of crashing with a cryptic "supabaseUrl is required" error.
 */
export const isSupabaseConfigured = Boolean(
  url && anonKey && !url.startsWith('your-') && !anonKey.startsWith('your-'),
)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
