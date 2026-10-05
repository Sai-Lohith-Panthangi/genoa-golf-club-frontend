import { useEffect, useRef, useState } from 'react';
import { CLIPS } from '../data/media';
import type { Variant } from './Scene';
import Scene from './Scene';

/** Poster card that opens a modal player. Falls back to the live scene if the poster file is absent. */
export default function VideoPreview({ clip, title, caption }: { clip: Variant; title?: string; caption?: string }) {
  const c = CLIPS[clip];
  const [open, setOpen] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
  const opener = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = title ?? c.title;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };

  return (
    <>
      <button ref={opener} className="video-card" onClick={() => setOpen(true)} aria-label={`Play video: ${t}`}>
        {posterOk ? (
          <img src={c.poster} alt="" loading="lazy" onError={() => setPosterOk(false)} />
        ) : (
          <Scene variant={c.variant} />
        )}
        <span className="vc-play" aria-hidden="true">▶</span>
        <span className="vc-time">{c.duration}</span>
        <span className="vc-meta">
          <strong>{t}</strong>
          <span>{caption ?? c.caption}</span>
        </span>
      </button>

      {open && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={t} onClick={close}>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <video src={c.src} poster={c.poster} controls autoPlay loop playsInline />
            <p>{t}</p>
            <button ref={closeRef} className="lb-close" onClick={close} aria-label="Close video">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
