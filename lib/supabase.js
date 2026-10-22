import { createClient } from '@supabase/supabase-js'

let client

// Server-only. Returns null when Supabase isn't configured so pages still render.
export function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  client ??= createClient(url, key, {
    auth: { persistSession: false },
    // Next.js caches GET fetches by default; we always want fresh rows.
    global: { fetch: (u, o) => fetch(u, { ...o, cache: 'no-store' }) },
  })
  return client
}
