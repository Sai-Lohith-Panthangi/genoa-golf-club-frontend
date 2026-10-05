import { Link } from 'react-router-dom';
import { FEATURE_TILES } from '../data/site';
import Scene from './Scene';

export default function FeatureTiles() {
  return (
    <ul className="tiles">
      {FEATURE_TILES.map((t) => (
        <li key={t.title}>
          <Link to={t.to} className="tile">
            <Scene tone={t.tone} className="tile-art" />
            <span className="tile-body">
              <strong>{t.title}</strong>
              <span>{t.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
