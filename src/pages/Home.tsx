import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import EnquiryForm from '../components/EnquiryForm';
import EventsPreview from '../components/EventsPreview';
import HeroFull from '../components/HeroFull';
import Photo from '../components/Photo';
import SectionHead from '../components/SectionHead';
import VideoCard from '../components/VideoCard';
import { COURSES } from '../data/courses';
import { TOUR } from '../data/media';
import { BOOKING_URL, FEATURE_TILES, SOCIAL_POSTS, STAY_PLAY } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Championship Golf, Weddings & Events');
  return (
    <>
      <HeroFull
        eyebrow="Genoa, Nevada"
        title="Golf at the foot of the Sierra Nevada."
        subtitle="Two championship courses, a welcoming clubhouse and mountain views from the first tee to the last putt."
      >
        <a className="btn btn-green" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Tee Time</a>
        <a className="btn btn-ghost" href="#enquire">Enquire About Events</a>
      </HeroFull>

      <section className="section" aria-labelledby="explore-h">
        <div className="container">
          <SectionHead label="Explore the Club" title="Find your way in" id="explore-h" />
          <ul className="tiles">
            {FEATURE_TILES.map((t) => (
              <li key={t.title}>
                <Link to={t.to} className="tile">
                  <Photo name={t.photo} pos={t.pos} alt="" />
                  <span className="tile-body">
                    <strong>{t.title}</strong>
                    <span>{t.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="courses-h">
        <div className="container">
          <SectionHead label="The Courses" title="Two courses, two characters" id="courses-h" />
          <div className="course-pair">
            {Object.values(COURSES).map((c) => (
              <Link key={c.slug} to={c.path} className="course-card">
                <Photo name={c.introPhoto} pos={c.introPos} alt="" />
                <span className="course-card-body">
                  <span className="label light">{c.slug === 'lakes' ? 'Links-style · water on 14 holes' : 'Open country · long views'}</span>
                  <strong>{c.name}</strong>
                  <span className="course-card-link">Explore the course →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tour-h">
        <div className="container">
          <SectionHead label="Take a Tour" title="See the club in motion" id="tour-h" intro="Four short clips. Press play." />
          <div className="tour">
            {TOUR.map((k) => (
              <VideoCard key={k} clip={k} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="events-h" id="events">
        <div className="container">
          <SectionHead label="What's On" title="Upcoming events" id="events-h" />
          <EventsPreview />
        </div>
      </section>

      <section className="stay" aria-labelledby="stay-h" id="dining">
        <Photo name="panorama" pos="70% 60%" className="stay-media" alt="" />
        <div className="stay-shade" />
        <div className="container stay-copy">
          <p className="label light">Stay &amp; Play · Dining</p>
          <h2 id="stay-h">{STAY_PLAY.title}</h2>
          <p>{STAY_PLAY.text}</p>
          <a className="btn btn-green" href="#enquire">Plan a getaway</a>
        </div>
      </section>

      <section className="section" aria-labelledby="social-h">
        <div className="container">
          <SectionHead label="Follow Along" title="From our feed" id="social-h" />
          <ul className="social">
            {SOCIAL_POSTS.map((p) => (
              <li key={p.id} className="social-card">
                <Photo name={p.photo} pos={p.pos} alt="" />
                <p>{p.text}</p>
                <small>{p.handle}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-cream" id="enquire" aria-labelledby="enquire-h">
        <div className="container narrow">
          <SectionHead label="Weddings · Corporate · Private Functions" title="Enquire about a venue" id="enquire-h" intro="Tell us a little about your event. We reply within one business day." />
          <EnquiryForm />
        </div>
      </section>

      <CtaBand photo="pond" pos="50% 62%" />
    </>
  );
}
