import CtaBand from '../components/CtaBand';
import EnquiryForm from '../components/EnquiryForm';
import HeroSplit from '../components/HeroSplit';
import SectionHead from '../components/SectionHead';
import { OUTING_PACKAGES, OUTING_STEPS } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function GolfOutings() {
  useDocumentTitle('Golf Outings');
  return (
    <>
      <HeroSplit
        label="Groups &amp; Tournaments"
        title="Golf Outings"
        subtitle="From a foursome with friends to a 144-player charity day, we run the details so you can enjoy the round."
        photo="panorama"
        pos="75% 50%"
      >
        <a className="btn btn-green" href="#enquire">Request a date</a>
      </HeroSplit>

      <section className="section" aria-labelledby="pkg-h">
        <div className="container">
          <SectionHead label="Packages" title="Choose your format" id="pkg-h" />
          <ul className="cards">
            {OUTING_PACKAGES.map((p) => (
              <li key={p.name} className="card">
                <p className="label">{p.size}</p>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="how-h">
        <div className="container">
          <SectionHead label="How It Works" title="Four simple steps" id="how-h" />
          <ol className="steps">
            {OUTING_STEPS.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="enquire" aria-labelledby="plan-h">
        <div className="container narrow">
          <SectionHead label="Enquire" title="Plan your outing" id="plan-h" intro="Share up to three dates and we will confirm availability." />
          <EnquiryForm defaultType="GOLF_OUTING" />
        </div>
      </section>

      <CtaBand photo="trail" />
    </>
  );
}
