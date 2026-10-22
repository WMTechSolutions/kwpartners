import { fmtDate, fmtTime } from '../../lib/time'

export default function EventCard({ event: e }) {
  return (
    <div className="event-card">
      <div className="event-card-bar" />
      <div className="event-card-body">
        {e.category && <div className="event-date">{e.category}</div>}
        <h3 className="event-title">{e.title}</h3>
        <div className="event-meta">
          <span>📅 {fmtDate(e.starts_at)}</span>
          <span>🕐 {fmtTime(e.starts_at)}</span>
          {e.location && <span>📍 {e.location}</span>}
        </div>
        <a href={`/events/${e.slug}`} className="event-rsvp">RSVP Now</a>
      </div>
    </div>
  )
}
