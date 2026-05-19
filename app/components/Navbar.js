'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo" onClick={close}>
          <div className="nav-logo-top">
            <span className="nav-logo-kw">kw</span>
            <span className="nav-logo-partners">PARTNERS</span>
          </div>
          <span className="nav-logo-sub">Keller Williams Realty</span>
        </a>

        <div className="nav-links">
          <a href="/search-properties" className="nav-link">Search Properties</a>
          <a href="/portal" className="nav-link nav-link-portal">Agent Portal</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/vendors" className="nav-link">Our Vendors</a>
          <a href="/locations" className="nav-link">Locations</a>
          <a href="/contact" className="nav-link">Contact</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="/sign-in" className="nav-login">Log In</a>
          <button
            className={`hamburger${open ? ' hamburger-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? ' mobile-menu-open' : ''}`}>
        <a href="/search-properties" className="mobile-link" onClick={close}>Search Properties</a>
        <a href="/portal" className="mobile-link mobile-link-red" onClick={close}>Agent Portal</a>
        <a href="/about" className="mobile-link" onClick={close}>About Us</a>
        <a href="/vendors" className="mobile-link" onClick={close}>Our Vendors</a>
        <a href="/locations" className="mobile-link" onClick={close}>Locations</a>
        <a href="/contact" className="mobile-link" onClick={close}>Contact</a>
        <a href="/sign-in" className="mobile-link" onClick={close}>Log In</a>
      </div>
    </nav>
  )
}
