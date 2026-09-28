import 'dotenv/config'

function read(name) {
  const value = process.env[name]
  if (!value || value.startsWith('your-')) return undefined
  return value
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

  supabaseUrl: read('SUPABASE_URL'),
  supabaseAnonKey: read('SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: read('SUPABASE_SERVICE_ROLE_KEY'),

  geminiApiKey: read('GEMINI_API_KEY'),
}

/**
 * Returns a list of missing required env vars. Used at boot to print a
 * single friendly warning instead of crashing.
 */
export function missingEnv() {
  const missing = []
  if (!env.supabaseUrl) missing.push('SUPABASE_URL')
  if (!env.supabaseAnonKey) missing.push('SUPABASE_ANON_KEY')
  if (!env.supabaseServiceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (!env.geminiApiKey) missing.push('GEMINI_API_KEY')
  return missing
}
