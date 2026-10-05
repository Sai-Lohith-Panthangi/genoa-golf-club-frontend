import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <Section title="Out of bounds">
      <p>We could not find that page.</p>
      <Link className="btn btn-green" to="/">Back to the clubhouse</Link>
    </Section>
  );
}
