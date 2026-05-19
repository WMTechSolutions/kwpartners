import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const alliance = [
  { type: 'Legal Services', name: 'Thomas and Brown', contact: 'Kari Green', phone: '770-591-5200' },
  { type: 'Insurance', name: 'Georgia Insurance Advisors', contact: 'Amy Worley', phone: '678-207-7768' },
  { type: 'Mortgage / Lending', name: 'Supreme Lending', contact: 'Multiple Specialists Available', phone: 'Contact for details' },
  { type: 'Home Warranty', name: 'Home Warranty of America', contact: 'Robert Murray', phone: '404-324-2281' },
]

const categories = [
  { icon: '🏗️', name: 'Construction / Renovation / Restoration', desc: 'Contractors, builders, and restoration specialists' },
  { icon: '📋', name: 'Transaction Management', desc: 'TC services and transaction coordinators' },
  { icon: '📦', name: 'Estate Sales / Moving / Storage', desc: 'Moving companies, storage, and estate services' },
  { icon: '🔧', name: 'Home Maintenance', desc: 'Plumbers, electricians, HVAC, and more' },
  { icon: '📸', name: 'Marketing / Photography', desc: 'Real estate photographers and marketing pros' },
  { icon: '🧹', name: 'Cleaning / Junk Removal', desc: 'Cleaning services and junk hauling' },
  { icon: '📚', name: 'Education', desc: 'CE courses, coaching, and training resources' },
  { icon: '💰', name: 'Financial / Legal', desc: 'CPAs, attorneys, and financial advisors' },
  { icon: '🏥', name: 'Health Insurance / Inspection', desc: 'Home inspectors and health insurance providers' },
  { icon: '🏘️', name: 'Property Management', desc: 'Residential and commercial property managers' },
]

export const metadata = { title: 'Our Vendors | KW Partners' }

export default function Vendors() {
  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Preferred Partners</span>
            <h1 className="section-title" style={{fontSize:'clamp(36px,5vw,56px)'}}>Our Vendors</h1>
            <p className="section-subtitle">
              Trusted alliance partners and preferred vendors hand-selected to support
              our agents and their clients throughout every transaction.
            </p>
          </div>
        </div>

        {/* Alliance Partners */}
        <section className="section section-dark">
          <div className="container">
            <span className="section-label">Top Partners</span>
            <h2 className="section-title">Alliance Partners</h2>
            <p className="section-subtitle">Our closest strategic partners — deeply integrated with the KWRP experience.</p>
            <div className="alliance-grid">
              {alliance.map((a, i) => (
                <div key={i} className="alliance-card">
                  <div className="alliance-type">{a.type}</div>
                  <div className="alliance-name">{a.name}</div>
                  <div className="alliance-contact">
                    <strong>{a.contact}</strong>
                    <a href={`tel:${a.phone.replace(/\D/g,'')}`} style={{color:'var(--text-muted)',transition:'color 0.2s'}}
                      onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>
                      {a.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Categories */}
        <section className="section">
          <div className="container">
            <span className="section-label">Browse By Category</span>
            <h2 className="section-title">Preferred Vendors</h2>
            <p className="section-subtitle">Click a category to view our trusted vendors in that space.</p>
            <div className="categories-grid">
              {categories.map((c, i) => (
                <div key={i} className="category-card">
                  <div className="category-icon">{c.icon}</div>
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Vendor CTA */}
        <section className="career-banner">
          <div className="container career-banner-inner">
            <div>
              <h2>Want to Become a Preferred Vendor?</h2>
              <p>Reach out to our team to learn about joining our vendor network.</p>
            </div>
            <a href="/contact" className="btn btn-outline btn-lg" style={{flexShrink:0}}>Contact Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
