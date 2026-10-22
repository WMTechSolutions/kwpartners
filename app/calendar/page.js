import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { eventsBetween } from '../../lib/data'
import { zonedToUtc, todayET, weekdayOf, addDays, dateKey, fmtTime } from '../../lib/time'

export const metadata = { title: 'Calendar | KW Partners' }
export const dynamic = 'force-dynamic'

function shiftMonth(ym, n) {
  const [y, m] = ym.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1 + n, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

export default async function Calendar({ searchParams }) {
  const ym = /^\d{4}-\d{2}$/.test(searchParams.m || '') ? searchParams.m : todayET().slice(0, 7)
  const first = `${ym}-01`
  const next = `${shiftMonth(ym, 1)}-01`
  const events = await eventsBetween(zonedToUtc(first).toISOString(), zonedToUtc(next).toISOString())

  const byDay = {}
  for (const e of events) (byDay[dateKey(e.starts_at)] ??= []).push(e)

  const lead = weekdayOf(first)
  const daysInMonth = Math.round((Date.parse(next) - Date.parse(first)) / 86400000)
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i))]
  const label = new Date(`${first}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  const today = todayET()

  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">KWRP</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>Calendar</h1>
          </div>
        </div>
        <section className="section section-dark">
          <div className="container">
            <div className="cal-head">
              <a href={`/calendar?m=${shiftMonth(ym, -1)}`} className="btn btn-outline">‹ Prev</a>
              <h2>{label}</h2>
              <a href={`/calendar?m=${shiftMonth(ym, 1)}`} className="btn btn-outline">Next ›</a>
            </div>
            <div className="cal-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="cal-dow">{d}</div>)}
              {cells.map((d, i) => (
                <div key={i} className={`cal-cell${d === today ? ' cal-today' : ''}${d ? '' : ' cal-empty'}`}>
                  {d && <div className="cal-num">{Number(d.slice(8))}</div>}
                  {d && (byDay[d] ?? []).map(e => (
                    <a key={e.id} href={`/events/${e.slug}`} className="cal-event">
                      <span>{fmtTime(e.starts_at)}</span> {e.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
