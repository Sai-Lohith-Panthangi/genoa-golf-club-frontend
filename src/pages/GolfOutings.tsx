import EnquiryForm from '../components/EnquiryForm';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import { OUTING_PACKAGES, OUTING_STEPS } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function GolfOutings() {
  useDocumentTitle('Golf Outings');
  return (
    <>
      <PageHero
        eyebrow="Groups and tournaments"
        title="Golf Outings"
        subtitle="From a foursome with friends to a 144-player charity day, we run the details so you can enjoy the round."
        video="dawn"
      >
        <a className="btn btn-gold" href="#enquire">Request a date</a>
      </PageHero>

      <Section title="Packages">
        <ul className="cards">
          {OUTING_PACKAGES.map((p) => (
            <li key={p.name} className="card">
              <h3>{p.name}</h3>
              <p className="card-meta">{p.size}</p>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title="How it works">
        <ol className="steps">
          {OUTING_STEPS.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="enquire" title="Plan your outing" intro="Share up to three dates and we will confirm availability.">
        <EnquiryForm defaultType="GOLF_OUTING" />
      </Section>
    </>
  );
}
