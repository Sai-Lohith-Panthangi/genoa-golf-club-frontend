import { useCallback, useState } from 'react';
import { CLIPS, type PhotoKey } from '../data/media';
import { useDialog } from '../hooks/useDialog';
import Photo from './Photo';

/** Photo card with a play button that opens a modal player. */
export default function VideoCard({ clip, title, caption, variant }: { clip: PhotoKey; title?: string; caption?: string; variant?: 'wide' }) {
  const c = CLIPS[clip];
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDialog<HTMLDivElement>(open, close);
  const t = title ?? c.title;

  return (
    <>
      <button className={`video-card${variant ? ` video-${variant}` : ''}`} onClick={() => setOpen(true)} aria-label={`Play video: ${t}`}>
        <Photo name={clip} alt="" pos="50% 55%" />
        <span className="vc-play" aria-hidden="true">▶</span>
        <span className="vc-time" aria-hidden="true">{c.duration}</span>
        <span className="vc-meta">
          <strong>{t}</strong>
          <span>{caption ?? c.caption}</span>
        </span>
      </button>

      {open && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={t} onClick={close}>
          <div className="video-modal-inner" ref={ref} onClick={(e) => e.stopPropagation()}>
            <video src={c.src} poster={c.poster} controls autoPlay loop muted playsInline />
            <p>{t}</p>
            <button className="lb-btn lb-close" onClick={close} aria-label="Close video">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
