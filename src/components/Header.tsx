import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BOOKING_URL, NAV } from '../data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="Genoa Golf Club home">
          <span className="brand-mark" aria-hidden="true">⛳</span>
          <span>
            Genoa <em>Golf Club</em>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>

        <nav id="primary-nav" className={`primary-nav${open ? ' open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {n.label}
            </NavLink>
          ))}
          <a className="btn btn-gold nav-cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Tee Time
          </a>
        </nav>
      </div>
    </header>
  );
}
