'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Reach Out</span>
            <h1 className="section-title" style={{fontSize:'clamp(36px,5vw,56px)'}}>Contact Us</h1>
            <p className="section-subtitle">Have a question about joining our team, a listing, or our services? We'd love to hear from you.</p>
          </div>
        </div>

        <section className="section section-dark">
          <div className="container">
            <div className="contact-grid">

              {/* Info */}
              <div>
                <h3 style={{fontSize:'22px',fontWeight:'700',marginBottom:'28px'}}>Get In Touch</h3>

                <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
                  {[
                    { icon:'📍', label:'Woodstock', val:'722 Stonecroft Lane, Woodstock, GA 30188' },
                    { icon:'📍', label:'Canton', val:'149 Reinhardt College Pkwy Ste 3, Canton, GA 30114' },
                    { icon:'📞', label:'Woodstock Phone', val:'678-494-0644', href:'tel:6784940644' },
                    { icon:'📞', label:'Canton Phone', val:'678-493-2100', href:'tel:6784932100' },
                    { icon:'✉', label:'Woodstock Email', val:'Frontdesk406@kw.com', href:'mailto:Frontdesk406@kw.com' },
                    { icon:'✉', label:'Canton Email', val:'frontdesk@kwcanton.com', href:'mailto:frontdesk@kwcanton.com' },
                    { icon:'🕐', label:'Office Hours', val:'Mon–Fri: 9:00 AM – 5:00 PM' },
                  ].map((item, i) => (
                    <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                      <div style={{fontSize:'20px',flexShrink:0,marginTop:'2px'}}>{item.icon}</div>
                      <div>
                        <div style={{fontSize:'11px',fontWeight:'700',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'3px'}}>{item.label}</div>
                        {item.href
                          ? <a href={item.href} className="contact-info-link">{item.val}</a>
                          : <p style={{fontSize:'15px',color:'var(--white)'}}>{item.val}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>
                {status === 'success' ? (
                  <div className="form-success">
                    <div style={{fontSize:'36px',marginBottom:'16px'}}>✓</div>
                    <p>Thanks for reaching out! We'll get back to you within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">First Name *</label>
                        <input className="form-input" name="first_name" placeholder="Jane" required />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Last Name *</label>
                        <input className="form-input" name="last_name" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email *</label>
                      <input className="form-input" name="email" type="email" placeholder="jane@example.com" required />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Phone</label>
                      <input className="form-input" name="phone" type="tel" placeholder="(678) 000-0000" />
                    </div>
                    <div className="form-field">
                      <label className="form-label">I'm interested in...</label>
                      <select className="form-input form-select" name="interest" defaultValue="">
                        <option value="" disabled>Select one...</option>
                        <option>Joining the KW Partners team</option>
                        <option>Learning about real estate</option>
                        <option>Vendor / Partner opportunities</option>
                        <option>General question</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Message *</label>
                      <textarea className="form-textarea" name="message" placeholder="Tell us how we can help..." required />
                    </div>
                    {status === 'error' && (
                      <p style={{color:'#f87171',fontSize:'14px',marginBottom:'12px'}}>Something went wrong. Please try again or call us directly.</p>
                    )}
                    <button type="submit" className="form-submit" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
