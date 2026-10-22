import Icon from './Icon'
import { fmtDate, fmtTime, TZ } from '../../lib/time'

const part = (iso, opts) => new Date(iso).toLocaleDateString('en-US', { timeZone: TZ, ...opts })

export default function EventCard({ event: e }) {
  return (
    <a href={`/events/${e.slug}`} className="event-card">
      <div className="event-card-body">
        <div className="event-badge">
          <small>{part(e.starts_at, { month: 'short' })}</small>
          <b>{part(e.starts_at, { day: 'numeric' })}</b>
        </div>
        <div className="event-info">
          {e.category && <div className="event-date">{e.category}</div>}
          <h3 className="event-title">{e.title}</h3>
          <div className="event-meta">
            <span><Icon name="clock" /> {fmtDate(e.starts_at)} · {fmtTime(e.starts_at)}</span>
            {e.location && <span><Icon name="pin" /> {e.location}</span>}
          </div>
          <span className="event-rsvp">RSVP <Icon name="arrow" /></span>
        </div>
      </div>
    </a>
  )
}
