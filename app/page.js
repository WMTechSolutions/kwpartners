import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventCard from './components/EventCard'
import { upcomingEvents } from '../lib/data'

export const revalidate = 60

const quickActions = [
  { icon: '🔍', title: 'Search Properties', desc: 'Browse available listings in the Cherokee County area.', href: 'https://kwcherokee.kw.com/search', label: 'Search Now' },
  { icon: '🏠', title: 'Open House Dibs', desc: 'Book and share your open houses with the OH Dibs platform.', href: 'https://ohdibs.com', label: 'Check Out OH Dibs' },
  { icon: '🎯', title: 'Opportunity Agent', desc: 'Register to become an Opportunity Agent and grow your business.', href: '/portal', label: 'Learn More' },
]

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
            <div className="hero-eyebrow">Keller Williams Realty Partners</div>
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
              <a href="/about" className="btn btn-outline btn-lg">Meet the Team</a>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="container">
            <div className="quick-actions-grid">
              {quickActions.map((q, i) => (
                <a key={i} href={q.href} className="quick-card" target={q.href.startsWith('http') ? '_blank' : undefined} rel={q.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <div className="quick-card-icon">{q.icon}</div>
                  <h3>{q.title}</h3>
                  <p>{q.desc}</p>
                  <span className="btn btn-outline-red" style={{fontSize:'12px',padding:'8px 20px'}}>{q.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Events */}
        <section className="section events-section">
          <div className="container">
            <span className="section-label">What's Coming Up</span>
            <h2 className="section-title">Upcoming Events & Classes</h2>
            <p className="section-subtitle">Stay connected with training sessions, networking events, and career opportunities.</p>
            {events.length === 0
              ? <p className="section-subtitle">No upcoming events right now. Check back soon.</p>
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
