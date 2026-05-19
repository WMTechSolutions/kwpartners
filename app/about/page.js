import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const leadership = [
  { role: 'Operating Principal', name: 'Stephanie Nielsen', phone: '404-840-5077' },
  { role: 'Team Leader', name: 'Misty Monroe', phone: '770-597-4055' },
  { role: 'Market Center Administrator', name: 'Susan Mortimer', phone: '678-569-4006' },
  { role: 'Compliance Manager', name: 'Anthony Matarazzo', phone: '678-569-4011' },
  { role: 'Director of First Impressions', name: 'Rachel Witzigreuter', phone: '678-494-0644' },
  { role: 'Assistant Market Center Administrator', name: 'Brandy Conner', phone: '678-569-1390' },
  { role: 'Agent Services Tech Trainer', name: 'Wesley Manning', phone: '678-304-9906' },
]

const alc = [
  { committee: 'Finance', name: 'Tom Townsend' },
  { committee: 'Culture', name: 'Angel Kennedy' },
  { committee: 'Growth', name: 'Bob Wolf' },
  { committee: 'Education', name: 'Kathy DeOliveira' },
  { committee: 'AI & Tech', name: 'Tina Ritch' },
  { committee: 'Social / Vendor', name: 'Maria Sims' },
  { committee: 'Health & Wellness', name: 'Lisa Schudel' },
]

export const metadata = { title: 'About Us | KW Partners' }

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Who We Are</span>
            <h1 className="section-title" style={{fontSize:'clamp(36px,5vw,56px)'}}>About KW Partners</h1>
            <p className="section-subtitle">
              Home to the dreamers, the doers, and the entrepreneurs. We're one of the top-performing
              Keller Williams offices in Georgia, serving Woodstock and Canton.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <section className="section section-dark">
          <div className="container">
            <span className="section-label">Our People</span>
            <h2 className="section-title">Leadership Team</h2>
            <div className="team-grid">
              {leadership.map((m, i) => (
                <div key={i} className="team-card">
                  <div className="team-role">{m.role}</div>
                  <div className="team-name">{m.name}</div>
                  <a href={`tel:${m.phone.replace(/-/g,'')}`} className="team-phone">{m.phone}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALC */}
        <section className="section">
          <div className="container">
            <span className="section-label">Agent Leadership</span>
            <h2 className="section-title">Agent Leadership Council</h2>
            <p className="section-subtitle">Senior agents serving on committees that drive our culture, growth, and success.</p>
            <div className="alc-grid">
              {alc.map((a, i) => (
                <div key={i} className="alc-card">
                  <div className="alc-committee">{a.committee}</div>
                  <div className="alc-name">{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section section-dark">
          <div className="container" style={{maxWidth:'760px',textAlign:'center'}}>
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">Built for Entrepreneurs</h2>
            <p style={{fontSize:'18px',color:'var(--text-muted)',lineHeight:'1.8'}}>
              At KW Partners, we believe real estate is more than a job — it's a calling.
              We provide our agents with world-class training, technology, and a culture that
              empowers them to build businesses worth owning and lives worth living.
            </p>
            <a href="/contact" className="btn btn-red btn-lg" style={{marginTop:'32px'}}>Join Our Team</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
