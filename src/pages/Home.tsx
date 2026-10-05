import { Link } from 'react-router-dom';
import EClubSignup from '../components/EClubSignup';
import EnquiryForm from '../components/EnquiryForm';
import EventsPreview from '../components/EventsPreview';
import FeatureTiles from '../components/FeatureTiles';
import Gallery from '../components/Gallery';
import PageHero from '../components/PageHero';
import Scene from '../components/Scene';
import Section from '../components/Section';
import { BOOKING_URL, SOCIAL_POSTS, STAY_PLAY } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Championship Golf, Weddings & Events');
  return (
    <>
      <PageHero
        tall
        eyebrow="Genoa, Nevada"
        title="Golf the way it should feel."
        subtitle="Two championship courses, a warm clubhouse and a team that remembers your name."
      >
        <a className="btn btn-gold" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Tee Time</a>
        <a className="btn btn-ghost" href="#enquire">Enquire About Events</a>
      </PageHero>

      <Section title="Find your way in" intro="Everything the club offers, a tap away.">
        <FeatureTiles />
      </Section>

      <Section tone="alt" title="Two courses, two characters">
        <div className="split">
          {(['lakes', 'ranch'] as const).map((k) => (
            <Link key={k} to={k === 'lakes' ? '/lakes-course' : '/ranch-course'} className="course-card">
              <Scene tone={k === 'lakes' ? 'sky' : 'gold'} className="course-art" />
              <span>
                <strong>{k === 'lakes' ? 'Lakes Course' : 'Ranch Course'}</strong>
                <span>{k === 'lakes' ? 'Water, views and a signature par 3.' : 'Open country and relaxed pace.'}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="events" title="Upcoming events" intro="Tournaments, socials and clinics. Join in.">
        <EventsPreview />
      </Section>

      <Section tone="alt" title="Around the club">
        <Gallery />
      </Section>

      <Section title="From our feed" intro="Follow along @genoagolfclub">
        <ul className="social">
          {SOCIAL_POSTS.map((p) => (
            <li key={p.id} className="social-card">
              <Scene tone={p.tone} className="social-art" />
              <p>{p.text}</p>
              <small>{p.handle}</small>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt">
        <div className="stay">
          <div>
            <h2>{STAY_PLAY.title}</h2>
            <p>{STAY_PLAY.text}</p>
          </div>
          <a className="btn btn-green" href="#enquire">Plan a getaway</a>
        </div>
      </Section>

      <Section title="Join the E-Club" intro="Offers, news and first notice of new events. No spam.">
        <EClubSignup sourcePage="home" />
      </Section>

      <Section id="enquire" tone="alt" title="Enquire about a venue" intro="Weddings, corporate days and private functions. We reply within one business day.">
        <EnquiryForm />
      </Section>
    </>
  );
}
