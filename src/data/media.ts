// Single place to control photos and video. The clips in public/media were
// rendered from the animated scenes (npm run media). To use real footage,
// drop your own files into public/media with the same names, or point
// `src`/`poster` at any URL (CDN, Vimeo MP4 link, etc.).
import type { Variant } from '../components/Scene';

const base = import.meta.env.BASE_URL;

export interface Clip {
  src: string;
  poster: string;
  variant: Variant; // fallback artwork if the file is missing
  title: string;
  caption: string;
  duration: string;
}

const clip = (key: Variant, title: string, caption: string, duration = '0:12'): Clip => ({
  src: `${base}media/${key}.mp4`,
  poster: `${base}media/${key}.jpg`,
  variant: key,
  title,
  caption,
  duration,
});

export const CLIPS: Record<Variant, Clip> = {
  lake: clip('lake', 'The Lakes Course', 'Morning light over the 7th'),
  ranch: clip('ranch', 'The Ranch Course', 'Open country, long views'),
  clubhouse: clip('clubhouse', 'The Clubhouse', 'Dining, terrace and pro shop'),
  sunset: clip('sunset', 'Weddings & Events', 'Golden hour on the water'),
  dawn: clip('dawn', 'First Tee', 'Early rounds in the mist'),
};

export const TOUR: Variant[] = ['lake', 'ranch', 'clubhouse', 'sunset'];
