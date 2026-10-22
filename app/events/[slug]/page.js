import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RsvpForm from '../RsvpForm'
import { getEventBySlug, rsvpCount } from '../../../lib/data'
import { fmtDateLong, fmtTime } from '../../../lib/time'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const e = await getEventBySlug(params.slug)
  return { title: e ? `${e.title} | KW Partners` : 'Event | KW Partners' }
}

export default async function EventPage({ params }) {
  const e = await getEventBySlug(params.slug)
  if (!e) notFound()
  const taken = e.capacity ? await rsvpCount(e.id) : 0
  const full = e.capacity && taken >= e.capacity
  const past = new Date(e.starts_at) < new Date()

  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">{e.category || 'Event'}</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px,5vw,52px)' }}>{e.title}</h1>
            <p className="section-subtitle">
              {fmtDateLong(e.starts_at)} · {fmtTime(e.starts_at)}{e.ends_at ? ` – ${fmtTime(e.ends_at)}` : ''}
              {e.location ? ` · ${e.location}` : ''}
            </p>
          </div>
        </div>
        <section className="section section-dark">
          <div className="container">
            <div className="contact-grid">
              <div>
                {e.image_url && <img src={e.image_url} alt="" style={{ borderRadius: '8px', marginBottom: '24px' }} />}
                {e.description && <p style={{ whiteSpace: 'pre-line', fontSize: '16px' }}>{e.description}</p>}
                {e.capacity && <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Limited to {e.capacity} guests.</p>}
              </div>
              <div className="contact-form-card">
                <h3>Register</h3>
                {past ? <p>This event has already taken place.</p>
                  : full ? <p>This event is full.</p>
                  : <RsvpForm eventId={e.id} />}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
