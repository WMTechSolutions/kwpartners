import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { upcomingEvents } from '../../lib/data'

export const metadata = { title: 'Events & Classes | KW Partners' }
export const revalidate = 60

export default async function Events() {
  const events = await upcomingEvents()
  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">What's Coming Up</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>Events & Classes</h1>
            <p className="section-subtitle">Training, networking, and career events at KW Partners.</p>
            <a href="/calendar" className="btn btn-outline" style={{ marginTop: '16px' }}>View Full Calendar</a>
          </div>
        </div>
        <section className="section events-section">
          <div className="container">
            {events.length === 0
              ? <p className="section-subtitle">No upcoming events right now. Check back soon.</p>
              : <div className="events-grid">{events.map(e => <EventCard key={e.id} event={e} />)}</div>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
