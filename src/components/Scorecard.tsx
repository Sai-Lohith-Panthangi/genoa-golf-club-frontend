import { useId, useState } from 'react';
import type { Course } from '../data/courses';
import SectionHead from './SectionHead';

export default function Scorecard({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  const longest = Math.max(...course.tees.map((t) => t.yards));
  const fmt = (n: number) => n.toLocaleString('en-US');

  return (
    <section className="section" aria-labelledby="score-h">
      <div className="container">
        <SectionHead label="Yardage Reference" title="Scorecard" id="score-h" />
        <ul className="tee-grid">
          {course.tees.map((t) => (
            <li key={t.name} className="tee-card">
              <p className="tee-name"><span className="dot" style={{ background: t.color }} aria-hidden="true" />{t.name}</p>
              <p className="tee-yards">{fmt(t.yards)}</p>
              <p className="tee-unit">Total Yards</p>
            </li>
          ))}
        </ul>
        <p className="center">
          <button className="text-link" aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
            {open ? 'Hide full scorecard' : 'View full scorecard'} <span aria-hidden="true">{open ? '↑' : '→'}</span>
          </button>
        </p>
        <div id={panel} hidden={!open} className="tee-compare">
          <h3 className="sr-only">Tee comparison</h3>
          {course.tees.map((t) => (
            <div key={t.name} className="bar-row">
              <span className="bar-label">{t.name}</span>
              <span className="bar-track"><span className="bar" style={{ width: `${(t.yards / longest) * 100}%`, background: t.color }} /></span>
              <span className="bar-value">{fmt(t.yards)} yds</span>
            </div>
          ))}
          <p className="muted">Hole-by-hole yardages are available from the Golf Shop.</p>
        </div>
      </div>
    </section>
  );
}
