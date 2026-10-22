import { getDb } from './supabase'

// Every reader returns an empty result when the database isn't configured or errors,
// so public pages degrade to empty states instead of crashing.
async function rows(query) {
  const { data, error } = await query
  if (error) { console.error('[db]', error.message); return [] }
  return data ?? []
}

export async function upcomingEvents(limit = 50) {
  const db = getDb(); if (!db) return []
  return rows(db.from('events').select('*').eq('published', true)
    .gte('starts_at', new Date().toISOString()).order('starts_at').limit(limit))
}

export async function eventsBetween(fromIso, toIso) {
  const db = getDb(); if (!db) return []
  return rows(db.from('events').select('*').eq('published', true)
    .gte('starts_at', fromIso).lt('starts_at', toIso).order('starts_at'))
}

export async function getEventBySlug(slug) {
  const db = getDb(); if (!db) return null
  const { data } = await db.from('events').select('*').eq('slug', slug).eq('published', true).maybeSingle()
  return data
}

export async function rsvpCount(eventId) {
  const db = getDb(); if (!db) return 0
  const list = await rows(db.from('rsvps').select('guests').eq('event_id', eventId))
  return list.reduce((n, r) => n + r.guests, 0)
}

export async function activeRooms() {
  const db = getDb(); if (!db) return []
  return rows(db.from('rooms').select('*').eq('active', true).order('sort'))
}

export async function bookingsForDay(startIso, endIso) {
  const db = getDb(); if (!db) return []
  return rows(db.from('bookings').select('*').is('cancelled_at', null)
    .gte('start_at', startIso).lt('start_at', endIso))
}

export async function myBookings(email) {
  const db = getDb(); if (!db) return []
  return rows(db.from('bookings').select('*, rooms(name, location)').is('cancelled_at', null)
    .eq('user_email', email).gte('end_at', new Date().toISOString()).order('start_at'))
}

export async function resourcesBySection() {
  const db = getDb(); if (!db) return {}
  const list = await rows(db.from('resources').select('*').order('sort').order('title'))
  return list.reduce((acc, r) => ((acc[r.section] ??= []).push(r), acc), {})
}

export async function videosByCategory() {
  const db = getDb(); if (!db) return {}
  const list = await rows(db.from('videos').select('*').order('sort').order('created_at', { ascending: false }))
  return list.reduce((acc, v) => ((acc[v.category] ??= []).push(v), acc), {})
}

export function youtubeId(url) {
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return m ? m[1] : null
}

export function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}
