'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { clerkClient } from '@clerk/nextjs/server'
import { requireStaff } from '../../../lib/auth'
import { getDb } from '../../../lib/supabase'
import { sendEmail } from '../../../lib/email'
import { slugify } from '../../../lib/data'
import { zonedToUtc, addDays } from '../../../lib/time'
import { createBooking } from '../rooms/actions'

const str = (fd, k) => String(fd.get(k) ?? '').trim()

// ── Members ──────────────────────────────────────────────
export async function approveMember(fd) {
  await requireStaff()
  const id = str(fd, 'id')
  const user = await clerkClient.users.getUser(id)
  await clerkClient.users.updateUserMetadata(id, { publicMetadata: { approved: true, denied: false } })
  await sendEmail({
    to: user.primaryEmailAddress?.emailAddress,
    subject: 'Your KWRP Agent Portal access is approved',
    text: `Hi ${user.firstName || ''},\n\nYour access to the KWRP Agent Portal has been approved. Log in at ${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kwcherokee.com'}/portal.\n\nKeller Williams Realty Partners`,
  })
  revalidatePath('/admin')
}

export async function denyMember(fd) {
  await requireStaff()
  await clerkClient.users.updateUserMetadata(str(fd, 'id'), { publicMetadata: { approved: false, denied: true } })
  revalidatePath('/admin')
}

export async function revokeMember(fd) {
  await requireStaff()
  await clerkClient.users.updateUserMetadata(str(fd, 'id'), { publicMetadata: { approved: false, denied: false } })
  revalidatePath('/admin')
}

// ── Events ───────────────────────────────────────────────
export async function createEvent(fd) {
  await requireStaff()
  const db = getDb(); if (!db) redirect('/admin/events?error=Database+not+configured')

  const title = str(fd, 'title')
  const date = str(fd, 'date')
  const start = str(fd, 'start') || '10:00'
  const end = str(fd, 'end')
  if (!title || !date) redirect('/admin/events?error=Title+and+date+are+required')

  const repeat = Math.min(52, Math.max(1, parseInt(fd.get('repeat'), 10) || 1)) // weekly occurrences
  const seriesId = repeat > 1 ? crypto.randomUUID() : null
  const base = slugify(title)
  const capacity = parseInt(fd.get('capacity'), 10) || null

  const rows = Array.from({ length: repeat }, (_, i) => {
    const d = addDays(date, i * 7)
    return {
      slug: `${base}-${d}`,
      title,
      description: str(fd, 'description') || null,
      image_url: str(fd, 'image_url') || null,
      location: str(fd, 'location') || null,
      zoom_url: str(fd, 'zoom_url') || null,
      category: str(fd, 'category') || null,
      capacity,
      series_id: seriesId,
      starts_at: zonedToUtc(d, start).toISOString(),
      ends_at: end ? zonedToUtc(d, end).toISOString() : null,
    }
  })
  const { error } = await db.from('events').insert(rows)
  if (error) redirect(`/admin/events?error=${encodeURIComponent(error.code === '23505' ? 'An event with that title and date already exists' : error.message)}`)
  revalidatePath('/', 'layout')
  redirect('/admin/events?saved=1')
}

export async function deleteEvent(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('events').delete().eq('id', str(fd, 'id'))
  revalidatePath('/', 'layout')
  redirect('/admin/events')
}

// ── Rooms & bookings ─────────────────────────────────────
export async function addRoom(fd) {
  await requireStaff()
  const db = getDb()
  const name = str(fd, 'name')
  if (db && name) {
    const { data } = await db.from('rooms').select('sort').order('sort', { ascending: false }).limit(1)
    await db.from('rooms').insert({ name, location: str(fd, 'location') || 'Woodstock', sort: (data?.[0]?.sort ?? 0) + 1 })
  }
  revalidatePath('/admin/rooms')
}

export async function toggleRoom(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('rooms').update({ active: str(fd, 'active') !== 'true' }).eq('id', str(fd, 'id'))
  revalidatePath('/admin/rooms')
}

export async function bookOnBehalf(fd) {
  const staff = await requireStaff()
  const email = str(fd, 'email').toLowerCase()
  const name = str(fd, 'name') || email
  const date = str(fd, 'date')
  const hour = parseInt(fd.get('hour'), 10)
  if (!/^\S+@\S+\.\S+$/.test(email)) redirect('/admin/rooms?error=Enter+a+valid+email')

  const res = await createBooking({
    roomId: str(fd, 'room_id'), date, hour,
    user: { id: null, name, email },
    bookedBy: staff.email,
    note: str(fd, 'note'),
  })
  revalidatePath('/admin/rooms')
  redirect(`/admin/rooms?${res.error ? `error=${encodeURIComponent(res.error)}` : 'saved=1'}`)
}

// ── Portal content ───────────────────────────────────────
export async function addResource(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('resources').insert({
    section: str(fd, 'section'), title: str(fd, 'title'), url: str(fd, 'url'),
    description: str(fd, 'description') || null, sort: parseInt(fd.get('sort'), 10) || 0,
  })
  revalidatePath('/portal'); revalidatePath('/admin/content')
}

export async function deleteResource(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('resources').delete().eq('id', str(fd, 'id'))
  revalidatePath('/portal'); revalidatePath('/admin/content')
}

export async function addVideo(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('videos').insert({
    category: str(fd, 'category'), title: str(fd, 'title'), youtube_url: str(fd, 'url'),
  })
  revalidatePath('/portal'); revalidatePath('/admin/content')
}

export async function deleteVideo(fd) {
  await requireStaff()
  const db = getDb()
  if (db) await db.from('videos').delete().eq('id', str(fd, 'id'))
  revalidatePath('/portal'); revalidatePath('/admin/content')
}
