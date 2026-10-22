'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireApproved } from '../../../lib/auth'
import { getDb } from '../../../lib/supabase'
import { sendEmail } from '../../../lib/email'
import { fmtDateLong, fmtTime } from '../../../lib/time'
import { slotsForDay, isBookableDay } from '../../../lib/rooms'

// Shared by the member booking grid and the admin "book on behalf" form.
export async function createBooking({ roomId, date, hour, user, bookedBy, note }) {
  const db = getDb()
  if (!db) return { error: 'Booking is not available yet.' }
  if (!isBookableDay(date)) return { error: 'Rooms can only be booked Monday through Friday.' }

  const slot = slotsForDay(date).find(s => s.hour === hour)
  if (!slot) return { error: 'That time is outside booking hours (6 AM - 8 PM).' }
  if (slot.end < new Date()) return { error: 'That time has already passed.' }

  const { data: room } = await db.from('rooms').select('*').eq('id', roomId).eq('active', true).maybeSingle()
  if (!room) return { error: 'Room not found.' }

  const { error } = await db.from('bookings').insert({
    room_id: roomId,
    start_at: slot.start.toISOString(),
    end_at: slot.end.toISOString(),
    user_id: user.id ?? null,
    user_name: user.name,
    user_email: user.email,
    booked_by: bookedBy ?? null,
    note: note || null,
  })
  if (error) {
    if (error.code === '23505') return { error: 'Sorry, that slot was just taken.' }
    console.error('[booking]', error.message)
    return { error: 'Something went wrong. Please try again.' }
  }

  await sendEmail({
    to: user.email,
    subject: `Room booked: ${room.name}`,
    text: `Hi ${user.name},\n\n${room.name} (${room.location}) is booked for ${fmtDateLong(slot.start)}, ${fmtTime(slot.start)} - ${fmtTime(slot.end)}.\n\nNeed to cancel? Log in to the Agent Portal and open Conference Rooms.\n\nKeller Williams Realty Partners`,
  })
  return { ok: true }
}

export async function bookSlot(formData) {
  const viewer = await requireApproved()
  const date = String(formData.get('date'))
  const res = await createBooking({
    roomId: String(formData.get('room_id')),
    date,
    hour: parseInt(formData.get('hour'), 10),
    user: viewer,
  })
  revalidatePath('/rooms')
  redirect(`/rooms?date=${date}&${res.error ? `error=${encodeURIComponent(res.error)}` : 'booked=1'}`)
}

export async function cancelBooking(formData) {
  const viewer = await requireApproved()
  const db = getDb()
  const id = String(formData.get('id'))
  if (db) {
    let q = db.from('bookings').update({ cancelled_at: new Date().toISOString() }).eq('id', id).is('cancelled_at', null)
    if (!viewer.isStaff) q = q.eq('user_email', viewer.email) // members cancel only their own
    const { data } = await q.select('*, rooms(name)').maybeSingle()
    if (data) {
      await sendEmail({
        to: data.user_email,
        subject: `Booking cancelled: ${data.rooms?.name}`,
        text: `Your booking for ${data.rooms?.name} on ${fmtDateLong(data.start_at)} at ${fmtTime(data.start_at)} was cancelled.`,
      })
    }
  }
  revalidatePath('/rooms')
  revalidatePath('/admin/rooms')
  redirect(String(formData.get('back') || '/rooms'))
}
