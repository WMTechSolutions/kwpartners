import Navbar from './components/Navbar'
import Footer from './components/Footer'

const events = [
  { title: 'Digital Storefront Training', date: 'May 20', time: '10:00 AM', location: 'Zoom', category: 'Training', rsvp: '#' },
  { title: "Men's Networking Group", date: 'May 21', time: '6:00 PM', location: 'Local Brewery', category: 'Networking', rsvp: '#' },
  { title: 'Design / Canva Workshop', date: 'May 27', time: '2:00 PM', location: 'Zoom', category: 'Training', rsvp: '#' },
  { title: 'Real Estate Career Orientation', date: 'May 27', time: '5:30 PM', location: 'Woodstock Office', category: 'Orientation', rsvp: '#' },
  { title: 'Credit Fundamentals Course', date: 'May 28', time: '10:00 AM', location: 'Zoom', category: '3 CE Credits · Free', rsvp: '#' },
  { title: 'Contract Training Session', date: 'Jun 3', time: '9:00 AM', location: 'Canton Office', category: 'Training', rsvp: '#' },
]

const quickActions = [
  { icon: '🔍', title: 'Search Properties', desc: 'Browse available listings in the Cherokee County area.', href: 'https://kwcherokee.kw.com/search', label: 'Search Now' },
  { icon: '🏠', title: 'Open House Dibs', desc: 'Book and share your open houses with the OH Dibs platform.', href: 'https://ohdibs.com', label: 'Check Out OH Dibs' },
  { icon: '🎯', title: 'Opportunity Agent', desc: 'Register to become an Opportunity Agent and grow your business.', href: '/portal', label: 'Learn More' },
]

export default function Home() {
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
            <div className="events-grid">
              {events.map((e, i) => (
                <div key={i} className="event-card">
                  <div className="event-card-bar" />
                  <div className="event-card-body">
                    <div className="event-date">{e.category}</div>
                    <h3 className="event-title">{e.title}</h3>
                    <div className="event-meta">
                      <span>📅 {e.date}</span>
                      <span>🕐 {e.time}</span>
                      <span>📍 {e.location}</span>
                    </div>
                    <a href={e.rsvp} className="event-rsvp">RSVP Now</a>
                  </div>
                </div>
              ))}
            </div>
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
