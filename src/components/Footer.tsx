import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../data/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" aria-label="Genoa Golf Club, home" className="footer-logo">
            <Logo />
          </Link>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-base">
          <small>© {new Date().getFullYear()} Genoa Golf Club</small>
          <small>
            <span>Privacy Policy</span>
            <span aria-hidden="true"> | </span>
            <span>Terms &amp; Conditions</span>
          </small>
        </div>
      </div>
    </footer>
  );
}
