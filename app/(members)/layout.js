import { ClerkProvider } from '@clerk/nextjs'

// Only member routes load Clerk, so the public site never needs keys to build or render.
export const dynamic = 'force-dynamic'

export default function MembersLayout({ children }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#cc0000' } }}>
      {children}
    </ClerkProvider>
  )
}
