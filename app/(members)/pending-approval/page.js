import { redirect } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import Navbar from '../../components/Navbar'
import { getViewer } from '../../../lib/auth'

export const metadata = { title: 'Pending Approval | KW Partners' }

export default async function PendingApproval() {
  const v = await getViewer()
  if (!v) redirect('/sign-in')
  if (v.approved) redirect('/portal')

  return (
    <>
      <Navbar />
      <main>
        <div className="portal-stub">
          <div className="portal-stub-inner">
            <div className="portal-stub-icon">⏳</div>
            <h2>{v.denied ? 'Access not approved' : 'Waiting for approval'}</h2>
            <p style={{ marginBottom: '32px' }}>
              {v.denied
                ? 'Your request was not approved. Please contact the front desk if you think this is a mistake.'
                : `Thanks for signing up, ${v.name}. A member of the KWRP staff will review your request. You'll be able to log in to the Agent Portal once it's approved.`}
            </p>
            <SignOutButton redirectUrl="/"><button className="btn btn-outline">Sign Out</button></SignOutButton>
          </div>
        </div>
      </main>
    </>
  )
}
