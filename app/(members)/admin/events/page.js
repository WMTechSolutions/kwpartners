import { getDb } from '../../../../lib/supabase'
import { fmtDate, fmtTime } from '../../../../lib/time'
import { createEvent, deleteEvent } from '../actions'

export default async function AdminEvents({ searchParams }) {
  const db = getDb()
  const { data: events } = db
    ? await db.from('events').select('*, rsvps(guests)').gte('starts_at', new Date(Date.now() - 7 * 864e5).toISOString()).order('starts_at')
    : { data: [] }

  return (
    <>
      {searchParams.error && <p className="notice notice-err">{searchParams.error}</p>}
      {searchParams.saved && <p className="notice notice-ok">Saved.</p>}
      {!db && <p className="notice notice-err">Database not configured (see .env.local.example).</p>}

      <h2>Add event</h2>
      <form action={createEvent} className="admin-form">
        <input className="form-input" name="title" placeholder="Title *" required />
        <input className="form-input" name="category" placeholder="Category (Training, Networking...)" />
        <label>Date * <input className="form-input" type="date" name="date" required /></label>
        <label>Start <input className="form-input" type="time" name="start" defaultValue="10:00" /></label>
        <label>End <input className="form-input" type="time" name="end" /></label>
        <input className="form-input" name="location" placeholder="Location (Woodstock Office, Zoom...)" />
        <input className="form-input" name="zoom_url" placeholder="Zoom / join link" />
        <input className="form-input" name="image_url" placeholder="Image URL" />
        <label>Capacity <input className="form-input" type="number" name="capacity" min="1" placeholder="No limit" /></label>
        <label>Repeat weekly <input className="form-input" type="number" name="repeat" min="1" max="52" defaultValue="1" /> times</label>
        <textarea className="form-textarea" name="description" placeholder="Description" />
        <button className="btn btn-red" type="submit">Create</button>
      </form>
      <p className="admin-note">Times are Eastern. "Repeat weekly" creates that many separate events, one per week.</p>

      <h2>Upcoming & recent</h2>
      <table className="data-table">
        <thead><tr><th>Event</th><th>When</th><th>RSVPs</th><th /></tr></thead>
        <tbody>
          {(events ?? []).map(e => (
            <tr key={e.id}>
              <td><a href={`/events/${e.slug}`}>{e.title}</a></td>
              <td>{fmtDate(e.starts_at)} {fmtTime(e.starts_at)}</td>
              <td><a href={`/admin/events/${e.id}`}>{e.rsvps.reduce((n, r) => n + r.guests, 0)}{e.capacity ? ` / ${e.capacity}` : ''}</a></td>
              <td className="admin-actions">
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <button className="slot-btn slot-btn-cancel">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
