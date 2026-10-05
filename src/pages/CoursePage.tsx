import CtaBand from '../components/CtaBand';
import Gallery from '../components/Gallery';
import HeroSplit from '../components/HeroSplit';
import HoursOfOperation from '../components/HoursOfOperation';
import RatesTable from '../components/RatesTable';
import Scorecard from '../components/Scorecard';
import SectionHead from '../components/SectionHead';
import VideoCard from '../components/VideoCard';
import type { Course } from '../data/courses';
import { BOOKING_URL } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function CoursePage({ course }: { course: Course }) {
  useDocumentTitle(course.name);
  const [lead, ...rest] = course.paragraphs;

  return (
    <>
      <HeroSplit label="Genoa Golf Club" title={course.name} subtitle={course.tagline} photo={course.heroPhoto} pos={course.heroPos}>
        <a className="btn btn-green" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Tee Time</a>
        <a className="btn btn-ghost" href="#rates">View Rates</a>
      </HeroSplit>

      <section className="section section-cream" aria-labelledby="exp-h">
        <div className="container experience">
          <div className="exp-media">
            <VideoCard clip={course.flyover} title={`${course.name} flyover`} caption="Watch the flyover" />
          </div>
          <div className="exp-copy">
            <p className="label">{course.label}</p>
            <h2 id="exp-h">{course.heading}</h2>
            <hr className="gold-rule" />
            <p>{lead}</p>
            {rest.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="container">
          <dl className="stats">
            {course.stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-white" aria-labelledby="gallery-h">
        <div className="container">
          <SectionHead label="Gallery" title="Landscape & Design" id="gallery-h" />
          <Gallery
            items={[
              { photo: course.gallery.feature, pos: '50% 50%' },
              { photo: course.gallery.others[0] },
              { photo: course.gallery.others[1] },
            ]}
          />
        </div>
      </section>

      <HoursOfOperation />
      <div id="rates"><RatesTable course={course} /></div>
      <Scorecard course={course} />
      <CtaBand photo={course.slug === 'lakes' ? 'pond' : 'trail'} />
    </>
  );
}
