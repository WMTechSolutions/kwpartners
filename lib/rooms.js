import { zonedToUtc, weekdayOf, todayET } from './time'

// Booking rules: Mon-Fri, 6:00 AM - 8:00 PM, 1-hour blocks (last slot starts 7 PM).
export const OPEN_HOUR = 6
export const CLOSE_HOUR = 20

export function isBookableDay(dateStr) {
  const d = weekdayOf(dateStr)
  return d >= 1 && d <= 5
}

export function slotsForDay(dateStr) {
  if (!isBookableDay(dateStr)) return []
  const out = []
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    const hh = String(h).padStart(2, '0')
    out.push({
      hour: h,
      start: zonedToUtc(dateStr, `${hh}:00`),
      end: zonedToUtc(dateStr, `${String(h + 1).padStart(2, '0')}:00`),
    })
  }
  return out
}

export function parseDate(input) {
  return /^\d{4}-\d{2}-\d{2}$/.test(input || '') ? input : todayET()
}

export const hourLabel = h => `${((h + 11) % 12) + 1}:00 ${h < 12 ? 'AM' : 'PM'}`
