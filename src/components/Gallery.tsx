import { useCallback, useEffect, useState } from 'react';
import { PHOTOS, type PhotoKey } from '../data/media';
import { useDialog } from '../hooks/useDialog';
import Photo from './Photo';

export interface GalleryItem {
  photo: PhotoKey;
  pos?: string;
  caption?: string;
}

/** `feature` puts the first photo across the top, the rest beneath it. */
export default function Gallery({ items, layout = 'feature' }: { items: GalleryItem[]; layout?: 'feature' | 'grid' }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const ref = useDialog<HTMLDivElement>(index !== null, close);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={`gallery gallery-${layout}`}>
        {items.map((g, i) => (
          <li key={`${g.photo}-${i}`} className={layout === 'feature' && i === 0 ? 'gallery-wide' : undefined}>
            <button onClick={() => setIndex(i)} aria-label={`Enlarge photo: ${g.caption ?? PHOTOS[g.photo].alt}`}>
              <Photo name={g.photo} pos={g.pos} alt="" />
              <span className="zoom-hint" aria-hidden="true">⤢</span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <div className="lightbox-inner" ref={ref} onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[current.photo].src} alt={current.caption ?? PHOTOS[current.photo].alt} />
            <p>{current.caption ?? PHOTOS[current.photo].alt}</p>
            <button className="lb-btn lb-close" onClick={close} aria-label="Close">✕</button>
            {items.length > 1 && (
              <>
                <button className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Previous photo">‹</button>
                <button className="lb-btn lb-next" onClick={() => step(1)} aria-label="Next photo">›</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
