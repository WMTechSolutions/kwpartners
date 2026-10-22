import { getViewer } from '../../../../../../lib/auth'
import { getDb } from '../../../../../../lib/supabase'

export const dynamic = 'force-dynamic'

// Quote fields and neutralise spreadsheet formulas (=, +, -, @) in user-supplied text.
const cell = v => {
  let s = String(v ?? '')
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return `"${s.replace(/"/g, '""')}"`
}

export async function GET(_req, { params }) {
  const v = await getViewer()
  if (!v?.isStaff) return new Response('Forbidden', { status: 403 })
  const db = getDb()
  if (!db) return new Response('Database not configured', { status: 500 })

  const { data: rsvps } = await db.from('rsvps').select('*').eq('event_id', params.id).order('created_at')
  const lines = [['Name', 'Email', 'Phone', 'Guests', 'Registered'].map(cell).join(',')]
  for (const r of rsvps ?? []) lines.push([r.name, r.email, r.phone, r.guests, r.created_at].map(cell).join(','))
  return new Response(lines.join('\r\n'), {
    headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="rsvps.csv"' },
  })
}
