import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getActivePopup } from '../api/client';
import type { PopupResponse } from '../api/types';
import { getCookie, setCookie } from '../lib/cookies';

/**
 * Fortnightly promotional popup (SoW 5.1). The server decides which campaign is
 * live and how long to stay quiet after dismissal (cookieTtlDays, default 14).
 */
export default function Popup() {
  const [popup, setPopup] = useState<PopupResponse | null>(null);
  const { pathname } = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Home page only; fetch once.
  useEffect(() => {
    if (pathname !== '/') return;
    let live = true;
    getActivePopup()
      .then((p) => {
        if (live && p && !getCookie(p.cookieName)) setPopup(p);
      })
      .catch(() => undefined); // a failed promo must never break the page
    return () => {
      live = false;
    };
  }, [pathname]);

  const dismiss = () => {
    if (popup) setCookie(popup.cookieName, '1', popup.cookieTtlDays);
    setPopup(null);
  };

  useEffect(() => {
    if (!popup) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  if (!popup) return null;
  const external = popup.ctaUrl?.startsWith('http');

  return (
    <div className="popup-backdrop" onClick={dismiss}>
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-h" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="popup-close" onClick={dismiss} aria-label="Close announcement">✕</button>
        {popup.flyerImageUrl && <img src={popup.flyerImageUrl} alt={popup.flyerAltText ?? ''} />}
        <h2 id="popup-h">{popup.headline}</h2>
        <p>{popup.bodyText}</p>
        {popup.ctaLabel && popup.ctaUrl &&
          (external ? (
            <a className="btn btn-gold" href={popup.ctaUrl} onClick={dismiss}>{popup.ctaLabel}</a>
          ) : (
            <Link className="btn btn-gold" to={popup.ctaUrl} onClick={dismiss}>{popup.ctaLabel}</Link>
          ))}
      </div>
    </div>
  );
}
