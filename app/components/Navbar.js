'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import Icon from './Icon'

const SEARCH_URL = 'https://kwcherokee.kw.com/search'
const OH_DIBS_URL = 'https://kwcherokee.ohdibs.com/'

// [href, label, section prefixes that keep this tab highlighted]
const links = [
  [SEARCH_URL, 'Search Properties', []],
  ['/portal', 'Agent Portal', ['/portal', '/rooms', '/admin']],
  ['/events', 'Events', ['/events', '/calendar']],
  ['/about', 'About Us', ['/about']],
  ['/vendors', 'Our Vendors', ['/vendors']],
  ['/locations', 'Locations', ['/locations']],
  ['/contact', 'Contact', ['/contact']],
]

const agentLinks = [
  ['/rooms', 'Book a Conference Room', 'building'],
  ['/calendar', 'Training Calendar', 'calendar'],
  [OH_DIBS_URL, 'OH Dibs', 'home'],
]

const external = href => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)
  const isActive = prefixes => prefixes.some(p => pathname === p || pathname.startsWith(`${p}/`))

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo" onClick={close} aria-label="KW Partners home">
          <Logo />
        </a>

        <div className="nav-links">
          {links.map(([href, label, prefixes]) => {
            const active = isActive(prefixes)
            const cls = `nav-link${active ? ' nav-link-active' : ''}`
            const aria = active ? { 'aria-current': 'page' } : {}

            if (href !== '/portal') return <a key={href} href={href} className={cls} {...aria} {...external(href)}>{label}</a>

            // Agent Portal opens a pop-out for existing agents (hover or keyboard focus).
            return (
              <div key={href} className="nav-dd">
                <a href={href} className={cls} {...aria}>{label} <Icon name="chevron" className="nav-dd-chevron" /></a>
                <div className="nav-pop" role="region" aria-label="Agent shortcuts">
                  <div className="nav-pop-card">
                    <div className="nav-pop-title">Already an agent?</div>
                    <p className="nav-pop-sub">Jump straight into your portal for resources, training and room booking.</p>
                    <a href="/portal" className="btn btn-red nav-pop-cta">Go to Agent Portal <Icon name="arrow" /></a>
                    <div className="nav-pop-list">
                      {agentLinks.map(([h, l, icon]) => (
                        <a key={h} href={h} {...external(h)}><Icon name={icon} /> {l}</a>
                      ))}
                    </div>
                    <div className="nav-pop-foot">New to KWRP? <a href="/sign-up">Request access</a></div>
                  </div>
                </div>
              </div>
            )
          })}
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
        {links.map(([href, label, prefixes]) => (
          <div key={href}>
            <a href={href} className={`mobile-link${isActive(prefixes) ? ' mobile-link-active' : ''}`} onClick={close} {...external(href)}>{label}</a>
            {href === '/portal' && agentLinks.map(([h, l]) => (
              <a key={h} href={h} className="mobile-link mobile-sub" onClick={close} {...external(h)}>{l}</a>
            ))}
          </div>
        ))}
        <a href="/sign-in" className="mobile-link" onClick={close}>Log In</a>
      </div>
    </nav>
  )
}
