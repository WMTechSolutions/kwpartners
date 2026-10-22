import { clerkClient } from '@clerk/nextjs/server'
import { approveMember, denyMember, revokeMember } from './actions'

function Row({ u, children }) {
  return (
    <tr>
      <td>{[u.firstName, u.lastName].filter(Boolean).join(' ') || '–'}</td>
      <td>{u.primaryEmailAddress?.emailAddress}</td>
      <td>{new Date(u.createdAt).toLocaleDateString('en-US')}</td>
      <td className="admin-actions">{children}</td>
    </tr>
  )
}

const Btn = ({ action, id, label, danger }) => (
  <form action={action}>
    <input type="hidden" name="id" value={id} />
    <button className={`slot-btn${danger ? ' slot-btn-cancel' : ''}`}>{label}</button>
  </form>
)

export default async function AdminMembers() {
  const { data: users } = await clerkClient.users.getUserList({ limit: 200, orderBy: '-created_at' })
  const pending = users.filter(u => !u.publicMetadata?.approved && !u.publicMetadata?.denied && !u.publicMetadata?.role)
  const approved = users.filter(u => u.publicMetadata?.approved || u.publicMetadata?.role)
  const denied = users.filter(u => u.publicMetadata?.denied)

  return (
    <>
      <h2>Pending approval ({pending.length})</h2>
      <table className="data-table">
        <thead><tr><th>Name</th><th>Email</th><th>Signed up</th><th /></tr></thead>
        <tbody>
          {pending.map(u => (
            <Row key={u.id} u={u}>
              <Btn action={approveMember} id={u.id} label="Approve" />
              <Btn action={denyMember} id={u.id} label="Deny" danger />
            </Row>
          ))}
          {pending.length === 0 && <tr><td colSpan="4">No one is waiting.</td></tr>}
        </tbody>
      </table>

      <h2>Approved ({approved.length})</h2>
      <table className="data-table">
        <thead><tr><th>Name</th><th>Email</th><th>Signed up</th><th /></tr></thead>
        <tbody>
          {approved.map(u => (
            <Row key={u.id} u={u}>
              {u.publicMetadata?.role
                ? <span className="badge">{u.publicMetadata.role}</span>
                : <Btn action={revokeMember} id={u.id} label="Revoke" danger />}
            </Row>
          ))}
        </tbody>
      </table>

      {denied.length > 0 && (
        <>
          <h2>Denied ({denied.length})</h2>
          <table className="data-table">
            <tbody>
              {denied.map(u => (
                <Row key={u.id} u={u}>
                  <Btn action={approveMember} id={u.id} label="Approve" />
                </Row>
              ))}
            </tbody>
          </table>
        </>
      )}
      <p className="admin-note">Staff and admins are set with a <code>role</code> in Clerk public metadata, or by listing their email in <code>ADMIN_EMAILS</code>.</p>
    </>
  )
}
