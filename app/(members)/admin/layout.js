import Navbar from '../../components/Navbar'
import { requireStaff } from '../../../lib/auth'

export const metadata = { title: 'Admin | KW Partners' }

const tabs = [
  ['/admin', 'Members'],
  ['/admin/events', 'Events'],
  ['/admin/rooms', 'Rooms'],
  ['/admin/content', 'Portal Content'],
  ['/admin/submissions', 'Form Submissions'],
]

export default async function AdminLayout({ children }) {
  await requireStaff()
  return (
    <>
      <Navbar />
      <main className="admin">
        <div className="container">
          <h1 className="admin-title">Admin</h1>
          <nav className="admin-nav">
            {tabs.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          {children}
        </div>
      </main>
    </>
  )
}
