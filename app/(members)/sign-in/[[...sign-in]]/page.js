import { SignIn } from '@clerk/nextjs'
import Navbar from '../../../components/Navbar'

export const metadata = { title: 'Log In | KW Partners' }

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main className="auth-wrap">
        <SignIn />
      </main>
    </>
  )
}
