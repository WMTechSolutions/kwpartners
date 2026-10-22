'use client'
import { useState, useEffect } from 'react'

// Official logos live in /public: logo-dark.png (white artwork, for dark mode) and
// logo-light.png (full-colour artwork, for light mode). CSS shows whichever matches the theme.
// If a file is missing, fall back to the text wordmark so the header never breaks.
export default function Logo({ large = false }) {
  const [broken, setBroken] = useState(false)

  // An <img> can fail before React attaches onError (server-rendered HTML), so probe after mount too.
  useEffect(() => {
    for (const src of ['/logo-dark.png', '/logo-light.png']) {
      const probe = new Image()
      probe.onerror = () => setBroken(true)
      probe.src = src
    }
  }, [])

  if (broken) {
    return (
      <span className="logo logo-text">
        <span className="logo-text-partners">KW PARTNERS</span>
        <span className="logo-text-sub">Keller Williams Realty</span>
      </span>
    )
  }

  return (
    <span className={`logo${large ? ' logo-lg' : ''}`}>
      <img className="logo-img logo-for-dark" src="/logo-dark.png" alt="KW Partners, Keller Williams Realty" onError={() => setBroken(true)} />
      <img className="logo-img logo-for-light" src="/logo-light.png" alt="" aria-hidden="true" onError={() => setBroken(true)} />
    </span>
  )
}
