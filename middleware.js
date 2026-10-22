import { clerkMiddleware } from '@clerk/nextjs/server'

// Clerk only runs on member routes, so the public site works even before keys are configured.
// Approval/role checks live in lib/auth.js (requireApproved / requireStaff).
export default clerkMiddleware()

export const config = {
  matcher: ['/portal(.*)', '/admin(.*)', '/rooms(.*)', '/pending-approval', '/sign-in(.*)', '/sign-up(.*)'],
}
