import { BOOKING_URL } from '../data/site';
import Photo from './Photo';
import type { PhotoKey } from '../data/media';

export default function CtaBand({ photo = 'pond', pos = '50% 60%' }: { photo?: PhotoKey; pos?: string }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <Photo name={photo} pos={pos} className="cta-media" alt="" />
      <div className="cta-shade" />
      <div className="container cta-copy">
        <h2 id="cta-title">Ready to Book Your Tee Time?</h2>
        <p>Experience unmatched golf on the slopes of the pristine Sierra Nevada Mountains.</p>
        <a className="btn btn-green" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Now</a>
      </div>
    </section>
  );
}
