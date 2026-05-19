import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = { title: 'Agent Portal | KW Partners' }

export default function Portal() {
  return (
    <>
      <Navbar />
      <main>
        <div className="portal-stub">
          <div className="portal-stub-inner">
            <div className="portal-stub-icon">🔐</div>
            <h2>Agent Portal</h2>
            <p style={{marginBottom:'32px'}}>
              The agent portal is coming soon. Phase 2 will include secure login,
              resource library, video library, and conference room booking.
            </p>
            <a href="/" className="btn btn-red">Back to Home</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
