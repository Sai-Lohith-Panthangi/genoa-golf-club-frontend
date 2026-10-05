import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getActivePopup } from '../api/client';
import type { PopupResponse } from '../api/types';
import { getCookie, setCookie } from '../lib/cookies';
import { useDialog } from '../hooks/useDialog';

/**
 * Fortnightly promotional popup (SoW 5.1). The server decides which campaign is
 * live and how long to stay quiet after dismissal (cookieTtlDays, default 14).
 */
export default function Popup() {
  const [popup, setPopup] = useState<PopupResponse | null>(null);
  const { pathname } = useLocation();

  // Home page only. Wait a moment so it does not fight the page for attention.
  useEffect(() => {
    if (pathname !== '/') return;
    let live = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    getActivePopup()
      .then((p) => {
        if (live && p && !getCookie(p.cookieName)) timer = setTimeout(() => live && setPopup(p), 700);
      })
      .catch(() => undefined); // a failed promo must never break the page
    return () => {
      live = false;
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  const dismiss = useCallback(() => {
    setPopup((p) => {
      if (p) setCookie(p.cookieName, '1', p.cookieTtlDays);
      return null;
    });
  }, []);

  // Leaving the home page while it is open should close it too.
  useEffect(() => {
    if (pathname !== '/') setPopup(null);
  }, [pathname]);

  const ref = useDialog<HTMLDivElement>(!!popup, dismiss);
  if (!popup) return null;
  const external = popup.ctaUrl?.startsWith('http');

  return (
    <div className="popup-backdrop" onClick={dismiss}>
      <div className="popup" ref={ref} role="dialog" aria-modal="true" aria-labelledby="popup-h" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={dismiss} aria-label="Close announcement">✕</button>
        {popup.flyerImageUrl && <img src={popup.flyerImageUrl} alt={popup.flyerAltText ?? ''} />}
        <p className="label">Club news</p>
        <h2 id="popup-h">{popup.headline}</h2>
        <p>{popup.bodyText}</p>
        {popup.ctaLabel && popup.ctaUrl &&
          (external ? (
            <a className="btn btn-green" href={popup.ctaUrl} onClick={dismiss}>{popup.ctaLabel}</a>
          ) : (
            <Link className="btn btn-green" to={popup.ctaUrl} onClick={dismiss}>{popup.ctaLabel}</Link>
          ))}
      </div>
    </div>
  );
}
