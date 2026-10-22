import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'

export const metadata = { title: 'Locations | KW Partners' }

const offices = [
  {
    name: 'Woodstock Office',
    tag: 'KW Partners — Main Location',
    address: ['722 Stonecroft Lane', 'Woodstock, GA 30188'],
    phone: '678-494-0644',
    email: 'Frontdesk406@kw.com',
    map: 'https://maps.google.com/?q=722+Stonecroft+Lane+Woodstock+GA+30188',
  },
  {
    name: 'Canton Office',
    tag: 'KW Partners — Canton Location',
    address: ['149 Reinhardt College Pkwy Suite 3', 'Canton, GA 30114'],
    phone: '678-493-2100',
    email: 'frontdesk@kwcanton.com',
    map: 'https://maps.google.com/?q=149+Reinhardt+College+Pkwy+Suite+3+Canton+GA+30114',
  },
]

export default function Locations() {
  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Find Us</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>Our Locations</h1>
            <p className="section-subtitle">Two convenient offices serving Cherokee County and the greater Atlanta area.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="locations-grid">
              {offices.map(o => (
                <div key={o.name} className="location-card">
                  <div className="location-header">
                    <h2>{o.name}</h2>
                    <p>{o.tag}</p>
                  </div>
                  <div className="location-body">
                    <div className="location-detail">
                      <div className="location-detail-icon"><Icon name="pin" /></div>
                      <div><h4>Address</h4><p>{o.address[0]}<br />{o.address[1]}</p></div>
                    </div>
                    <div className="location-detail">
                      <div className="location-detail-icon"><Icon name="phone" /></div>
                      <div><h4>Phone</h4><a href={`tel:${o.phone.replace(/\D/g, '')}`}>{o.phone}</a></div>
                    </div>
                    <div className="location-detail">
                      <div className="location-detail-icon"><Icon name="mail" /></div>
                      <div><h4>Email</h4><a href={`mailto:${o.email}`}>{o.email}</a></div>
                    </div>
                    <div className="location-detail">
                      <div className="location-detail-icon"><Icon name="clock" /></div>
                      <div><h4>Office Hours</h4><p>Monday – Friday: 9:00 AM – 5:00 PM</p></div>
                    </div>
                    <a href={o.map} target="_blank" rel="noopener noreferrer" className="btn btn-red" style={{ marginTop: '8px', width: '100%' }}>
                      Get Directions <Icon name="arrow" />
                    </a>
                  </div>
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
