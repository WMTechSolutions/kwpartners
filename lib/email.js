import { Resend } from 'resend'

const from = () => process.env.EMAIL_FROM || 'noreply@kwcherokee.com'

// Fire-and-forget safe: never throws, so a mail problem can't fail a booking or RSVP.
export async function sendEmail({ to, subject, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email skipped: no RESEND_API_KEY] to=${to} subject=${subject}`)
    return false
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: from(), to, subject, text, replyTo })
    if (error) { console.error('[email error]', error); return false }
    return true
  } catch (e) {
    console.error('[email error]', e)
    return false
  }
}
