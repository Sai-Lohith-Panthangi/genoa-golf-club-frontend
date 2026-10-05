import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '../data/site';
import Scene from './Scene';

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, close, step]);

  return (
    <>
      <ul className="gallery">
        {GALLERY.map((g, i) => (
          <li key={g.id}>
            <button
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Enlarge photo: ${g.alt}`}
            >
              <Scene variant={g.variant} seed={i * 13 + 5} label={g.alt} />
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <Scene variant={GALLERY[index].variant} seed={index * 13 + 5} label={GALLERY[index].alt} live />
            <p>{GALLERY[index].alt}</p>
            <button ref={closeRef} className="lb-close" onClick={close} aria-label="Close">✕</button>
            <button className="lb-prev" onClick={() => step(-1)} aria-label="Previous photo">‹</button>
            <button className="lb-next" onClick={() => step(1)} aria-label="Next photo">›</button>
          </div>
        </div>
      )}
    </>
  );
}
