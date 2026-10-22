'use client'
import { useEffect, useState } from 'react'
import Icon from './Icon'

// The initial theme is set before paint by the inline script in layout.js (no flash).
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => { setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark') }, [])

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === 'light' ? 'moon' : 'sun'} />
    </button>
  )
}
