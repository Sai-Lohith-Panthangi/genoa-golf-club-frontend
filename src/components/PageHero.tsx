import { useEffect, useState, type ReactNode } from 'react';
import { CLIPS } from '../data/media';
import Scene, { type Tone, type Variant } from './Scene';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: Tone;
  variant?: Variant;
  /** Background clip key; plays muted on a loop once it can, scene artwork shows until then. */
  video?: Variant;
  tall?: boolean;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, tone, variant, video, tall, children }: Props) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  const clip = video ? CLIPS[video] : null;

  return (
    <section className={`hero${tall ? ' hero-tall' : ''}`}>
      <Scene tone={tone} variant={variant ?? video} className="hero-art" live={!reduce} seed={clip ? 101 : undefined} />
      {clip && !failed && !reduce && (
        <video
          className={`hero-video${ready ? ' ready' : ''}`}
          src={clip.src}
          poster={clip.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-shade" />
      <div className="container hero-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="lede">{subtitle}</p>}
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  );
}
