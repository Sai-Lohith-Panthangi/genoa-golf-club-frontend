import { PRACTICE_HOURS, PRACTICE_NOTE, SEASONS, currentSeasonIndex } from '../data/site';
import SectionHead from './SectionHead';

export default function HoursOfOperation({ today = new Date() }: { today?: Date }) {
  const now = currentSeasonIndex(today);
  return (
    <section className="section section-cream" aria-labelledby="hours-h">
      <div className="container">
        <SectionHead label="Seasonal Schedule" title="Hours of Operation" id="hours-h" />
        <ul className="hours-grid">
          {SEASONS.map((s, i) => (
            <li key={s.label} className={`hours-card${i === now ? ' is-now' : ''}`}>
              <h3>
                {s.label}
                {i === now && <span className="now-badge">Now</span>}
              </h3>
              <dl>
                <div><dt>First Tee Time</dt><dd>{s.first}</dd></div>
                <div><dt>Last Tee Time</dt><dd>{s.last}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="note-bar">
          <span aria-hidden="true" className="note-icon">◷</span>
          <span>{PRACTICE_NOTE} <strong>{PRACTICE_HOURS}</strong>.</span>
        </p>
        {now === -1 && <p className="muted center">Outside these dates, please call the Golf Shop for tee-sheet hours.</p>}
      </div>
    </section>
  );
}
