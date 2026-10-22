import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { requireApproved } from '../../../lib/auth'
import { resourcesBySection, videosByCategory, youtubeId } from '../../../lib/data'

export const metadata = { title: 'Agent Portal | KW Partners' }

const SECTIONS = [
  { key: 'links', title: 'Resource Links', sub: 'Links to resources, websites and FAQs' },
  { key: 'coaching', title: 'Coaching', sub: 'Resources for development coaching and MAPS coaching clients' },
  { key: 'marketing', title: 'Marketing & Advertising', sub: 'Documentation on marketing rules, resources and logos' },
  { key: 'services', title: 'Our Services', sub: 'Services available to KWRP agents' },
]

function External({ href, children, className }) {
  const ext = /^https?:/.test(href)
  return <a href={href} className={className} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
}

export default async function Portal() {
  const viewer = await requireApproved()
  const [resources, videos] = await Promise.all([resourcesBySection(), videosByCategory()])
  const quick = resources.quick ?? []
  const categories = Object.keys(videos)

  return (
    <>
      <Navbar />
      <main>
        <div className="page-hero">
          <div className="container">
            <span className="section-label">Welcome, {viewer.name}</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>Agent Portal</h1>
            <p className="section-subtitle">Your KWRP resource page: links, benefits, manuals and everything you need from the Market Center to run your business.</p>
            <div className="portal-actions">
              <a href="/rooms" className="btn btn-red">Book a Conference Room</a>
              <a href="/calendar" className="btn btn-outline">Training Calendar</a>
              {quick.map(q => <External key={q.id} href={q.url} className="btn btn-outline">{q.title}</External>)}
              {viewer.isStaff && <a href="/admin" className="btn btn-outline">Admin</a>}
            </div>
          </div>
        </div>

        {SECTIONS.map(s => (
          <section key={s.key} className="section section-dark" id={s.key}>
            <div className="container">
              <h2 className="section-title">{s.title}</h2>
              <p className="section-subtitle">{s.sub}</p>
              {(resources[s.key] ?? []).length === 0
                ? <p style={{ color: 'var(--text-muted)' }}>Nothing here yet.</p>
                : <div className="portal-grid">
                    {resources[s.key].map(r => (
                      <External key={r.id} href={r.url} className="portal-link">
                        <strong>{r.title}</strong>
                        {r.description && <span>{r.description}</span>}
                      </External>
                    ))}
                  </div>}
            </div>
          </section>
        ))}

        <section className="section section-dark" id="videos">
          <div className="container">
            <h2 className="section-title">Video Library</h2>
            <p className="section-subtitle">Team meetings, classes and other video resources</p>
            {categories.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No videos yet.</p>}
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '16px' }}>{cat}</h3>
                <div className="video-grid">
                  {videos[cat].map(v => {
                    const id = youtubeId(v.youtube_url)
                    return (
                      <div key={v.id} className="video-card">
                        {id
                          ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={v.title} loading="lazy" allowFullScreen />
                          : <External href={v.youtube_url}>Open video</External>}
                        <p>{v.title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
