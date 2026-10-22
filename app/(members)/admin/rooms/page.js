import { getDb } from '../../../../lib/supabase'
import { fmtDate, fmtTime, todayET } from '../../../../lib/time'
import { hourLabel, OPEN_HOUR, CLOSE_HOUR } from '../../../../lib/rooms'
import { addRoom, toggleRoom, bookOnBehalf } from '../actions'
import { cancelBooking } from '../../rooms/actions'

export default async function AdminRooms({ searchParams }) {
  const db = getDb()
  const [{ data: rooms }, { data: bookings }] = db ? await Promise.all([
    db.from('rooms').select('*').order('sort'),
    db.from('bookings').select('*, rooms(name, location)').is('cancelled_at', null)
      .gte('end_at', new Date().toISOString()).order('start_at').limit(200),
  ]) : [{ data: [] }, { data: [] }]
  const hours = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i)

  return (
    <>
      {searchParams.error && <p className="notice notice-err">{searchParams.error}</p>}
      {searchParams.saved && <p className="notice notice-ok">Booked.</p>}

      <h2>Rooms</h2>
      <table className="data-table">
        <thead><tr><th>Name</th><th>Location</th><th>Status</th><th /></tr></thead>
        <tbody>
          {(rooms ?? []).map(r => (
            <tr key={r.id}>
              <td>{r.name}</td><td>{r.location}</td><td>{r.active ? 'Active' : 'Hidden'}</td>
              <td className="admin-actions">
                <form action={toggleRoom}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="active" value={String(r.active)} />
                  <button className="slot-btn">{r.active ? 'Hide' : 'Show'}</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={addRoom} className="admin-form">
        <input className="form-input" name="name" placeholder="New room name" required />
        <select className="form-input form-select" name="location"><option>Woodstock</option><option>Canton</option></select>
        <button className="btn btn-outline" type="submit">Add room</button>
      </form>

      <h2>Book on behalf of an agent</h2>
      <form action={bookOnBehalf} className="admin-form">
        <input className="form-input" name="name" placeholder="Agent name" required />
        <input className="form-input" type="email" name="email" placeholder="Agent email" required />
        <select className="form-input form-select" name="room_id" required>
          {(rooms ?? []).filter(r => r.active).map(r => <option key={r.id} value={r.id}>{r.name} ({r.location})</option>)}
        </select>
        <input className="form-input" type="date" name="date" defaultValue={todayET()} required />
        <select className="form-input form-select" name="hour">
          {hours.map(h => <option key={h} value={h}>{hourLabel(h)}</option>)}
        </select>
        <input className="form-input" name="note" placeholder="Note (optional)" />
        <button className="btn btn-red" type="submit">Book</button>
      </form>

      <h2>Upcoming bookings</h2>
      <table className="data-table">
        <thead><tr><th>When</th><th>Room</th><th>Agent</th><th /></tr></thead>
        <tbody>
          {(bookings ?? []).map(b => (
            <tr key={b.id}>
              <td>{fmtDate(b.start_at)} {fmtTime(b.start_at)}</td>
              <td>{b.rooms?.name}</td>
              <td>{b.user_name}<br /><small>{b.user_email}{b.booked_by ? ` · booked by ${b.booked_by}` : ''}</small></td>
              <td className="admin-actions">
                <form action={cancelBooking}>
                  <input type="hidden" name="id" value={b.id} />
                  <input type="hidden" name="back" value="/admin/rooms" />
                  <button className="slot-btn slot-btn-cancel">Cancel</button>
                </form>
              </td>
            </tr>
          ))}
          {(bookings ?? []).length === 0 && <tr><td colSpan="4">No upcoming bookings.</td></tr>}
        </tbody>
      </table>
    </>
  )
}
