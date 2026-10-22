// All office times are America/New_York, regardless of where the server runs.
export const TZ = 'America/New_York'

function offsetMinutes(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(date)
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]))
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second)
  return (asUtc - date.getTime()) / 60000
}

// 'YYYY-MM-DD' + 'HH:MM' in Eastern time -> Date (UTC instant)
export function zonedToUtc(dateStr, timeStr = '00:00') {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [hh, mm] = timeStr.split(':').map(Number)
  const guess = Date.UTC(y, m - 1, d, hh, mm)
  let utc = guess - offsetMinutes(new Date(guess)) * 60000
  utc = guess - offsetMinutes(new Date(utc)) * 60000
  return new Date(utc)
}

export function todayET() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date())
}

export function weekdayOf(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10)
}

export const fmtDate = iso => new Date(iso).toLocaleDateString('en-US', { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric' })
export const fmtDateLong = iso => new Date(iso).toLocaleDateString('en-US', { timeZone: TZ, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
export const fmtTime = iso => new Date(iso).toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
export const dateKey = iso => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date(iso))
