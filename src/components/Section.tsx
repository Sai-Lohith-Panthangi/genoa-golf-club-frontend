import type { ReactNode } from 'react';

export default function Section({
  id, title, intro, tone, children,
}: { id?: string; title?: string; intro?: string; tone?: 'alt'; children: ReactNode }) {
  return (
    <section id={id} className={`section${tone ? ` section-${tone}` : ''}`} aria-labelledby={title ? `${id ?? title}-h` : undefined}>
      <div className="container">
        {title && (
          <header className="section-head">
            <h2 id={`${id ?? title}-h`}>{title}</h2>
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
