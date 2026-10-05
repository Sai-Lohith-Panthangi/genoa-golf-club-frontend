import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BOOKING_URL, NAV } from '../data/site';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu on small screens.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="Genoa Golf Club, home">
          <Logo />
        </Link>

        <button className="nav-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`burger${open ? ' is-open' : ''}`} aria-hidden="true"><i /><i /><i /></span>
        </button>

        <nav id="primary-nav" className={`primary-nav${open ? ' open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {n.label}
            </NavLink>
          ))}
          <a className="btn btn-green nav-cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Tee Time
          </a>
        </nav>
      </div>
    </header>
  );
}
