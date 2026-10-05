import { PHOTOS, type PhotoKey } from '../data/media';

interface Props {
  name: PhotoKey;
  pos?: string; // object-position, e.g. "50% 40%"
  alt?: string;
  className?: string;
  eager?: boolean;
}

/** An <img> with intrinsic size attributes so the page never jumps while images load. */
export default function Photo({ name, pos = '50% 50%', alt, className, eager }: Props) {
  const p = PHOTOS[name];
  return (
    <img
      className={className}
      src={p.src}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      style={{ objectPosition: pos }}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
