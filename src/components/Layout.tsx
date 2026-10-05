import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EClubBand from './EClubBand';
import Footer from './Footer';
import Header from './Header';
import Popup from './Popup';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change, or to the #anchor when one is present.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <EClubBand />
      <Footer />
      <Popup />
    </>
  );
}
