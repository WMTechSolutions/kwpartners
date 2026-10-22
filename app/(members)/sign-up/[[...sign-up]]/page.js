import { SignUp } from '@clerk/nextjs'
import Navbar from '../../../components/Navbar'

export const metadata = { title: 'Request Access | KW Partners' }

export default function SignUpPage() {
  return (
    <>
      <Navbar />
      <main className="auth-wrap">
        <SignUp />
      </main>
    </>
  )
}
