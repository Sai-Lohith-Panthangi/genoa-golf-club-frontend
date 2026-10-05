import type { ReactNode } from 'react';
import type { PhotoKey } from '../data/media';
import Photo from './Photo';

/** Inner-page hero: deep-green panel with the title, photo on the other side. */
export default function HeroSplit({ label, title, subtitle, photo, pos, children }: { label: string; title: string; subtitle?: string; photo: PhotoKey; pos?: string; children?: ReactNode }) {
  return (
    <section className="hero-split">
      <div className="hero-split-media">
        <Photo name={photo} pos={pos} eager alt="" />
      </div>
      <div className="hero-split-copy">
        <div className="hero-split-inner">
          <p className="label light">{label}</p>
          <h1>{title}</h1>
          {subtitle && <p className="lede">{subtitle}</p>}
          {children && <div className="hero-actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
