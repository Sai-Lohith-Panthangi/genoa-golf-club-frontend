import { useEffect, useState } from 'react';
import { getUpcomingEvents } from '../api/client';
import type { EventResponse } from '../api/types';

const fmt = (iso: string) => {
  const d = new Date(iso);
  return {
    month: d.toLocaleString('en-US', { month: 'short' }),
    day: d.getDate(),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
};

export default function EventsPreview() {
  const [events, setEvents] = useState<EventResponse[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    getUpcomingEvents(3)
      .then((e) => live && setEvents(e))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  if (failed) return <p className="muted">Upcoming events are unavailable right now. Please check back soon.</p>;
  if (!events) return <p className="muted" aria-live="polite">Loading events…</p>;
  if (events.length === 0) return <p className="muted">No events scheduled. New dates are added regularly.</p>;

  return (
    <ul className="events">
      {events.map((ev) => {
        const f = fmt(ev.startsAt);
        return (
          <li key={ev.id} className="event-card">
            <div className="event-date" style={{ background: ev.categoryColour ?? undefined }}>
              <span>{f.month}</span>
              <strong>{f.day}</strong>
            </div>
            <div>
              {ev.categoryName && <p className="event-cat">{ev.categoryName}</p>}
              <h3>{ev.title}</h3>
              <p className="muted">
                {ev.allDay ? 'All day' : f.time}
                {ev.venueName ? ` · ${ev.venueName}` : ''}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
