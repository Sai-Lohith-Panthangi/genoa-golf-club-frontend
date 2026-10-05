import { Link } from 'react-router-dom';
import EClubSignup from '../components/EClubSignup';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import { TIERS } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FAQ = [
  { q: 'Is there an initiation fee?', a: 'No. Monthly dues are the whole price in this demo.' },
  { q: 'Can I freeze my membership?', a: 'Yes, for up to three months a year with notice.' },
  { q: 'Do members get priority booking?', a: 'Weekday members book 7 days out, Full Golf and Family 14 days out.' },
];

export default function Membership() {
  useDocumentTitle('Membership');
  return (
    <>
      <PageHero eyebrow="Join the club" title="Membership" subtitle="Play more often, on both courses, with a community that feels like home." video="clubhouse" />

      <Section title="Choose your tier">
        <ul className="tiers">
          {TIERS.map((t) => (
            <li key={t.id} className={`tier${t.featured ? ' featured' : ''}`}>
              {t.featured && <span className="badge">Most popular</span>}
              <h3>{t.name}</h3>
              <p className="price">
                {t.price} <small>{t.cadence}</small>
              </p>
              <ul>
                {t.perks.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <Link className={`btn ${t.featured ? 'btn-gold' : 'btn-green'}`} to="/#enquire">
                Ask about {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title="Good to know">
        <dl className="faq">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Not ready yet?" intro="Join the E-Club for offers and member-event invitations.">
        <EClubSignup sourcePage="membership" />
      </Section>
    </>
  );
}
