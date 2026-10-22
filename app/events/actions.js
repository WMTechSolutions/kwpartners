'use server'
import { getDb } from '../../lib/supabase'
import { sendEmail } from '../../lib/email'
import { fmtDateLong, fmtTime } from '../../lib/time'

export async function rsvp(_prev, formData) {
  const db = getDb()
  if (!db) return { ok: false, error: 'RSVPs are not available yet.' }

  const eventId = String(formData.get('event_id') || '')
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim() || null
  const guests = Math.min(10, Math.max(1, parseInt(formData.get('guests'), 10) || 1))
  if (!eventId || !name || !/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Please enter your name and a valid email.' }

  const { data: event } = await db.from('events').select('*').eq('id', eventId).eq('published', true).maybeSingle()
  if (!event) return { ok: false, error: 'That event is no longer available.' }
  if (new Date(event.starts_at) < new Date()) return { ok: false, error: 'This event has already happened.' }

  if (event.capacity) {
    const { data: taken } = await db.from('rsvps').select('guests').eq('event_id', eventId)
    const used = (taken ?? []).reduce((n, r) => n + r.guests, 0)
    if (used + guests > event.capacity) return { ok: false, error: 'Sorry, this event is full.' }
  }

  const { error } = await db.from('rsvps').insert({ event_id: eventId, name, email, phone, guests })
  if (error) {
    if (error.code === '23505') return { ok: false, error: 'This email is already registered for this event.' }
    console.error('[rsvp]', error.message)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }

  await sendEmail({
    to: email,
    subject: `You're registered: ${event.title}`,
    text: [
      `Hi ${name},`, '',
      `You're registered for ${event.title}.`,
      `${fmtDateLong(event.starts_at)} at ${fmtTime(event.starts_at)}`,
      event.location ? `Where: ${event.location}` : '',
      event.zoom_url ? `Join link: ${event.zoom_url}` : '',
      `Guests: ${guests}`, '',
      'Keller Williams Realty Partners',
    ].filter(l => l !== '').join('\n'),
  })
  return { ok: true }
}
