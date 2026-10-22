'use client'
import { useState, useEffect } from 'react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const SEARCH_URL = 'https://kwcherokee.kw.com/search'

const links = [
  [SEARCH_URL, 'Search Properties'],
  ['/portal', 'Agent Portal', true],
  ['/events', 'Events'],
  ['/about', 'About Us'],
  ['/vendors', 'Our Vendors'],
  ['/locations', 'Locations'],
  ['/contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo" onClick={close} aria-label="KW Partners home">
          <Logo />
        </a>

        <div className="nav-links">
          {links.map(([href, label, portal]) => (
            <a key={href} href={href} className={`nav-link${portal ? ' nav-link-portal' : ''}`} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>{label}</a>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <a href="/sign-in" className="nav-login">Log In</a>
          <button className={`hamburger${open ? ' hamburger-open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? ' mobile-menu-open' : ''}`}>
        {links.map(([href, label, portal]) => (
          <a key={href} href={href} className={`mobile-link${portal ? ' mobile-link-red' : ''}`} onClick={close} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>{label}</a>
        ))}
        <a href="/sign-in" className="mobile-link" onClick={close}>Log In</a>
      </div>
    </nav>
  )
}
