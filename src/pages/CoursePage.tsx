import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import VideoPreview from '../components/VideoPreview';
import { BOOKING_URL, type CourseInfo } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function CoursePage({ course }: { course: CourseInfo }) {
  useDocumentTitle(course.name);
  return (
    <>
      <PageHero eyebrow="The courses" title={course.name} subtitle={course.tagline} video={course.slug === 'lakes' ? 'sunset' : 'ranch'}>
        <a className="btn btn-gold" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Tee Time</a>
      </PageHero>

      <Section>
        <p className="lead-para">{course.intro}</p>
        <dl className="stats">
          {course.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="alt" title="Course preview">
        <div className="tour tour-2">
          <VideoPreview clip={course.slug === 'lakes' ? 'lake' : 'ranch'} title={`${course.name} flyover`} caption="Tap to play" />
          <VideoPreview clip={course.slug === 'lakes' ? 'sunset' : 'dawn'} title={course.slug === 'lakes' ? 'Evening on the water' : 'First light on the Ranch'} caption="Tap to play" />
        </div>
      </Section>

      <Section title="Highlights">
        <ul className="cards">
          {course.highlights.map((h) => (
            <li key={h.title} className="card">
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title="Hole by hole" intro="A few of the holes you will remember.">
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Selected holes on the {course.name}</caption>
            <thead>
              <tr><th scope="col">Hole</th><th scope="col">Par</th><th scope="col">Yards</th><th scope="col">Notes</th></tr>
            </thead>
            <tbody>
              {course.holes.map((h) => (
                <tr key={h.hole}>
                  <th scope="row">{h.hole}</th>
                  <td>{h.par}</td>
                  <td>{h.yards}</td>
                  <td>{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Rates">
        <ul className="rates">
          {course.rates.map((r) => (
            <li key={r.label}>
              <span>{r.label}</span>
              <strong>{r.price}</strong>
            </li>
          ))}
        </ul>
        <p className="muted">Rates include cart. Sample pricing for this demo.</p>
      </Section>

      <Section tone="alt" title="Gallery">
        <Gallery />
        <p className="cta-line">
          Hosting an event on this course? <Link to="/golf-outings#enquire">Start an enquiry</Link>.
        </p>
      </Section>
    </>
  );
}
