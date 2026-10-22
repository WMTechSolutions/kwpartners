import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventCard from './components/EventCard'
import Icon from './components/Icon'
import { upcomingEvents } from '../lib/data'

export const revalidate = 60

export default async function Home() {
  const events = await upcomingEvents(6)
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="container hero-content">
            <h1 className="hero-title">
              Interested in a Career<br />
              in <span>Real Estate?</span>
            </h1>
            <p className="hero-subtitle">
              Join one of the top-performing Keller Williams offices in Georgia.
              Home to the dreamers, the doers, and the entrepreneurs.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn btn-red btn-lg">Learn More</a>
              <a href="#events" className="btn btn-outline btn-lg">See Upcoming Trainings</a>
            </div>
            <div className="hero-meta">
              <span><Icon name="pin" /> Woodstock &amp; Canton, GA</span>
              <span><Icon name="calendar" /> Weekly training &amp; events</span>
              <span><Icon name="building" /> Independently owned &amp; operated</span>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="section events-section" id="events">
          <div className="container">
            <span className="section-label">What's Coming Up</span>
            <h2 className="section-title">Upcoming Trainings & Events</h2>
            <p className="section-subtitle">Classes, orientations and networking events. RSVP to save your seat.</p>
            {events.length === 0
              ? <p className="section-subtitle" style={{ marginTop: '32px' }}>No upcoming events right now. Check back soon.</p>
              : <div className="events-grid">{events.map(e => <EventCard key={e.id} event={e} />)}</div>}
            <a href="/events" className="btn btn-outline-red" style={{ marginTop: '24px' }}>All Events</a>
          </div>
        </section>

        {/* Career Banner */}
        <section className="career-banner">
          <div className="container career-banner-inner">
            <div>
              <h2>Ready to Build Your Real Estate Business?</h2>
              <p>Connect with our leadership team and discover what KWRP can do for your career.</p>
            </div>
            <a href="/contact" className="btn btn-outline btn-lg" style={{flexShrink:0}}>Get In Touch</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
