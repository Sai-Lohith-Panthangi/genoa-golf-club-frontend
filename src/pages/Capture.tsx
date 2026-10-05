import { useSearchParams } from 'react-router-dom';
import Scene, { type Variant } from '../components/Scene';

/** Dev-only canvas used by scripts/render-videos.mjs. Not included in production builds. */
export default function Capture() {
  const [q] = useSearchParams();
  const variant = (q.get('v') ?? 'lake') as Variant;
  return (
    <div id="capture" style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <Scene variant={variant} live seed={101} />
    </div>
  );
}
