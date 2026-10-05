export default function SectionHead({ label, title, id, light, intro }: { label: string; title: string; id?: string; light?: boolean; intro?: string }) {
  return (
    <header className={`section-head${light ? ' on-dark' : ''}`}>
      <p className="label">{label}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
