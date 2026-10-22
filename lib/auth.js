import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const adminEmails = () =>
  (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)

// Roles live in Clerk publicMetadata: { approved: boolean, role?: 'staff' | 'admin' }.
// Anyone listed in ADMIN_EMAILS is always an approved admin (bootstraps the first admin).
export async function getViewer() {
  const u = await currentUser()
  if (!u) return null
  const email = u.primaryEmailAddress?.emailAddress?.toLowerCase() ?? ''
  const meta = u.publicMetadata || {}
  const isAdmin = meta.role === 'admin' || adminEmails().includes(email)
  const isStaff = isAdmin || meta.role === 'staff'
  return {
    id: u.id,
    email,
    name: [u.firstName, u.lastName].filter(Boolean).join(' ') || email,
    approved: isStaff || meta.approved === true,
    denied: meta.denied === true,
    isAdmin,
    isStaff,
  }
}

export async function requireApproved() {
  const v = await getViewer()
  if (!v) redirect('/sign-in')
  if (!v.approved) redirect('/pending-approval')
  return v
}

export async function requireStaff() {
  const v = await requireApproved()
  if (!v.isStaff) redirect('/portal')
  return v
}
