import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import HeroSplit from '../components/HeroSplit';
import SectionHead from '../components/SectionHead';
import { MEMBER_FAQ, TIERS } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Membership() {
  useDocumentTitle('Membership');
  return (
    <>
      <HeroSplit
        label="Join the Club"
        title="Membership"
        subtitle="Play more often, on both courses, with a community that feels like home."
        photo="river"
        pos="50% 45%"
      >
        <Link className="btn btn-green" to="/#enquire">Ask about membership</Link>
      </HeroSplit>

      <section className="section" aria-labelledby="tiers-h">
        <div className="container">
          <SectionHead label="Tiers" title="Choose your membership" id="tiers-h" />
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
                <Link className={`btn ${t.featured ? 'btn-green' : 'btn-outline-dark'}`} to="/#enquire">
                  Ask about {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="faq-h">
        <div className="container narrow">
          <SectionHead label="Good to Know" title="Membership questions" id="faq-h" />
          <dl className="faq">
            {MEMBER_FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand photo="panorama" pos="60% 55%" />
    </>
  );
}
