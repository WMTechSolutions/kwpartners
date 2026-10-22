'use server'
import { getDb } from '../../lib/supabase'
import { sendEmail } from '../../lib/email'

// Agent-recruiting inquiries go to the team leader; everything else to the front desk.
const AGENT_TO = () => process.env.CONTACT_AGENT_TO || 'misty@kwcherokee.com'
const FRONTDESK_TO = () => process.env.CONTACT_FRONTDESK_TO || 'Frontdesk406@kw.com'

export async function submitContact(formData) {
  const first = String(formData.get('first_name') || '').trim()
  const last = String(formData.get('last_name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim() || null
  const interest = String(formData.get('interest') || '').trim() || null
  const message = String(formData.get('message') || '').trim()
  if (!first || !last || !/^\S+@\S+\.\S+$/.test(email) || !message) return { ok: false }

  const name = `${first} ${last}`
  const isAgent = interest === 'Joining the KW Partners team' || interest === 'Learning about real estate'

  const db = getDb()
  if (db) {
    const { error } = await db.from('form_submissions').insert({
      form: isAgent ? 'agent' : 'general', name, email, phone, interest, message,
    })
    if (error) console.error('[contact]', error.message)
  }

  const to = isAgent ? AGENT_TO() : FRONTDESK_TO()
  const notified = await sendEmail({
    to,
    replyTo: email,
    subject: `Website inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nInterested in: ${interest || '-'}\n\n${message}`,
  })
  // With no database and no email provider the message would vanish; tell the visitor instead.
  if (!db && !notified) return { ok: false }

  await sendEmail({
    to: email,
    subject: 'Thanks for contacting Keller Williams Realty Partners',
    text: `Hi ${first},\n\nThanks for reaching out! We'll get back to you within one business day.\n\nKeller Williams Realty Partners`,
  })
  return { ok: true }
}
