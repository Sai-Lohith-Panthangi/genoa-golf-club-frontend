import { Link } from 'react-router-dom';
import { NAV } from '../data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">Genoa Golf Club</p>
          <p>Two courses, one clubhouse, and the best view in the valley.</p>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Visit</p>
          <address>
            1 Clubhouse Drive
            <br />
            Genoa, NV
            <br />
            <a href="tel:+17755550100">(775) 555-0100</a>
          </address>
        </div>
      </div>
      <div className="container footer-base">
        <small>© {new Date().getFullYear()} Genoa Golf Club. Demo build, not the live site.</small>
      </div>
    </footer>
  );
}
