import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { requireApproved } from '../../../lib/auth'
import { activeRooms, bookingsForDay, myBookings } from '../../../lib/data'
import { zonedToUtc, addDays, todayET, fmtDate, fmtTime, fmtDateLong } from '../../../lib/time'
import { slotsForDay, parseDate, hourLabel, isBookableDay } from '../../../lib/rooms'
import { bookSlot, cancelBooking } from './actions'

export const metadata = { title: 'Conference Rooms | KW Partners' }

export default async function Rooms({ searchParams }) {
  const viewer = await requireApproved()
  const date = parseDate(searchParams.date)
  const slots = slotsForDay(date)
  const [rooms, booked, mine] = await Promise.all([
    activeRooms(),
    bookingsForDay(zonedToUtc(date).toISOString(), zonedToUtc(addDays(date, 1)).toISOString()),
    myBookings(viewer.email),
  ])
  const taken = new Map(booked.map(b => [`${b.room_id}|${new Date(b.start_at).getTime()}`, b]))
  const now = new Date()

  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Agent Portal</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>Conference Rooms</h1>
            <p className="section-subtitle">Book a room in 1-hour blocks, Monday through Friday, 6 AM to 8 PM.</p>
          </div>
        </div>

        <section className="section section-dark">
          <div className="container">
            {searchParams.booked && <p className="notice notice-ok">Booked! A confirmation email is on its way.</p>}
            {searchParams.error && <p className="notice notice-err">{searchParams.error}</p>}

            <div className="cal-head">
              <a href={`/rooms?date=${addDays(date, -1)}`} className="btn btn-outline">‹ Prev day</a>
              <form method="get" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input className="form-input" type="date" name="date" defaultValue={date} min={todayET()} />
                <button className="btn btn-outline" type="submit">Go</button>
              </form>
              <a href={`/rooms?date=${addDays(date, 1)}`} className="btn btn-outline">Next day ›</a>
            </div>
            <h2 style={{ marginBottom: '20px' }}>{fmtDateLong(zonedToUtc(date, '12:00'))}</h2>

            {!isBookableDay(date) ? <p>Rooms can't be booked on weekends.</p>
              : rooms.length === 0 ? <p>No rooms are set up yet.</p>
              : (
                <div className="slot-scroll">
                  <table className="slot-table">
                    <thead>
                      <tr><th />{rooms.map(r => <th key={r.id}>{r.name}<small>{r.location}</small></th>)}</tr>
                    </thead>
                    <tbody>
                      {slots.map(s => (
                        <tr key={s.hour}>
                          <th>{hourLabel(s.hour)}</th>
                          {rooms.map(r => {
                            const b = taken.get(`${r.id}|${s.start.getTime()}`)
                            if (b) {
                              const own = b.user_email === viewer.email
                              return <td key={r.id} className="slot slot-taken">{own ? 'You' : b.user_name}</td>
                            }
                            if (s.end < now) return <td key={r.id} className="slot slot-past">–</td>
                            return (
                              <td key={r.id} className="slot">
                                <form action={bookSlot}>
                                  <input type="hidden" name="room_id" value={r.id} />
                                  <input type="hidden" name="date" value={date} />
                                  <input type="hidden" name="hour" value={s.hour} />
                                  <button type="submit" className="slot-btn">Book</button>
                                </form>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">My Bookings</h2>
            {mine.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>You have no upcoming bookings.</p> : (
              <div className="portal-grid">
                {mine.map(b => (
                  <div key={b.id} className="portal-link">
                    <strong>{b.rooms?.name} · {b.rooms?.location}</strong>
                    <span>{fmtDate(b.start_at)}, {fmtTime(b.start_at)} – {fmtTime(b.end_at)}</span>
                    <form action={cancelBooking}>
                      <input type="hidden" name="id" value={b.id} />
                      <button type="submit" className="slot-btn slot-btn-cancel">Cancel</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
