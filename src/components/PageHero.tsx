import type { ReactNode } from 'react';
import Scene, { type Tone } from './Scene';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: Tone;
  tall?: boolean;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, tone = 'green', tall, children }: Props) {
  return (
    <section className={`hero${tall ? ' hero-tall' : ''}`}>
      <Scene tone={tone} className="hero-art" />
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
