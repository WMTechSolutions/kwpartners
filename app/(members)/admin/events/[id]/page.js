import { notFound } from 'next/navigation'
import { getDb } from '../../../../../lib/supabase'
import { fmtDateLong, fmtTime } from '../../../../../lib/time'

export default async function EventRsvps({ params }) {
  const db = getDb(); if (!db) notFound()
  const { data: event } = await db.from('events').select('*').eq('id', params.id).maybeSingle()
  if (!event) notFound()
  const { data: rsvps } = await db.from('rsvps').select('*').eq('event_id', event.id).order('created_at')
  const total = rsvps.reduce((n, r) => n + r.guests, 0)

  return (
    <>
      <p><a href="/admin/events">‹ All events</a></p>
      <h2>{event.title}</h2>
      <p>{fmtDateLong(event.starts_at)} · {fmtTime(event.starts_at)} · {total} guests from {rsvps.length} RSVPs</p>
      <p><a className="btn btn-outline" href={`/admin/events/${event.id}/csv`}>Download CSV</a></p>
      <table className="data-table">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Guests</th></tr></thead>
        <tbody>
          {rsvps.map(r => <tr key={r.id}><td>{r.name}</td><td>{r.email}</td><td>{r.phone}</td><td>{r.guests}</td></tr>)}
          {rsvps.length === 0 && <tr><td colSpan="4">No RSVPs yet.</td></tr>}
        </tbody>
      </table>
    </>
  )
}
