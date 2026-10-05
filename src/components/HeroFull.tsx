import { useEffect, useState, type ReactNode } from 'react';
import { CLIPS } from '../data/media';
import Photo from './Photo';

/** Full-bleed home hero: photo first, looping clip fades in once it can play. */
export default function HeroFull({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children?: ReactNode }) {
  const clip = CLIPS.panorama;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  return (
    <section className="hero-full" aria-labelledby="hero-title">
      <Photo name="panorama" className="hero-media" eager pos="50% 55%" alt="" />
      {!reduce && !failed && (
        <video
          className={`hero-media hero-video${ready ? ' ready' : ''}`}
          src={clip.src}
          poster={clip.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-shade" />
      <div className="container hero-copy">
        <p className="label light">{eyebrow}</p>
        <h1 id="hero-title">{title}</h1>
        <p className="lede">{subtitle}</p>
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  );
}
