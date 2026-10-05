import { Link } from 'react-router-dom';
import SectionHead from '../components/SectionHead';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section className="section">
      <div className="container center">
        <SectionHead label="404" title="Out of bounds" />
        <p>We could not find that page.</p>
        <Link className="btn btn-green" to="/">Back to the clubhouse</Link>
      </div>
    </section>
  );
}
