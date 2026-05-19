import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = { title: 'Locations | KW Partners' }

export default function Locations() {
  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Find Us</span>
            <h1 className="section-title" style={{fontSize:'clamp(36px,5vw,56px)'}}>Our Locations</h1>
            <p className="section-subtitle">Two convenient offices serving Cherokee County and the greater Atlanta area.</p>
          </div>
        </div>

        <section className="section section-dark">
          <div className="container">
            <div className="locations-grid">

              {/* Woodstock */}
              <div className="location-card">
                <div className="location-header">
                  <h2>Woodstock Office</h2>
                  <p>KW Partners — Main Location</p>
                </div>
                <div className="location-body">
                  <div className="location-detail">
                    <div className="location-detail-icon">📍</div>
                    <div>
                      <h4>Address</h4>
                      <p>722 Stonecroft Lane<br />Woodstock, GA 30188</p>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">📞</div>
                    <div>
                      <h4>Phone</h4>
                      <a href="tel:6784940644">678-494-0644</a>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">✉</div>
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:Frontdesk406@kw.com">Frontdesk406@kw.com</a>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">🕐</div>
                    <div>
                      <h4>Office Hours</h4>
                      <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=722+Stonecroft+Lane+Woodstock+GA+30188"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-red"
                    style={{marginTop:'8px',width:'100%',justifyContent:'center'}}
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Canton */}
              <div className="location-card">
                <div className="location-header">
                  <h2>Canton Office</h2>
                  <p>KW Partners — Canton Location</p>
                </div>
                <div className="location-body">
                  <div className="location-detail">
                    <div className="location-detail-icon">📍</div>
                    <div>
                      <h4>Address</h4>
                      <p>149 Reinhardt College Pkwy Suite 3<br />Canton, GA 30114</p>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">📞</div>
                    <div>
                      <h4>Phone</h4>
                      <a href="tel:6784932100">678-493-2100</a>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">✉</div>
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:frontdesk@kwcanton.com">frontdesk@kwcanton.com</a>
                    </div>
                  </div>
                  <div className="location-detail">
                    <div className="location-detail-icon">🕐</div>
                    <div>
                      <h4>Office Hours</h4>
                      <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=149+Reinhardt+College+Pkwy+Suite+3+Canton+GA+30114"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-red"
                    style={{marginTop:'8px',width:'100%',justifyContent:'center'}}
                  >
                    Get Directions
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
