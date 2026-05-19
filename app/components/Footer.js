export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-kw">kw</div>
            <div className="footer-brand-name">PARTNERS</div>
            <div className="footer-brand-sub">Keller Williams Realty</div>
            <p className="footer-tagline">Home to the dreamers, the doers, and the entrepreneurs. Each office is independently owned and operated.</p>
          </div>
          <div>
            <div className="footer-heading">Navigate</div>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/vendors">Our Vendors</a>
              <a href="/locations">Locations</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Woodstock</div>
            <div className="footer-links">
              <a href="tel:6784940644">678-494-0644</a>
              <a href="mailto:Frontdesk406@kw.com">Frontdesk406@kw.com</a>
              <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:'1.5'}}>722 Stonecroft Lane<br/>Woodstock, GA 30188</span>
            </div>
          </div>
          <div>
            <div className="footer-heading">Canton</div>
            <div className="footer-links">
              <a href="tel:6784932100">678-493-2100</a>
              <a href="mailto:frontdesk@kwcanton.com">frontdesk@kwcanton.com</a>
              <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:'1.5'}}>149 Reinhardt College Pkwy Ste 3<br/>Canton, GA 30114</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {year} KW Partners · Keller Williams Realty. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">in</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
