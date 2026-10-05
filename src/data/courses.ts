import type { PhotoKey } from './media';

export interface Tee {
  name: string;
  color: string;
  yards: number;
}

export interface Course {
  slug: 'lakes' | 'ranch';
  name: string;
  path: string;
  label: string;
  heroPhoto: PhotoKey;
  heroPos: string;
  tagline: string;
  introPhoto: PhotoKey;
  introPos: string;
  flyover: PhotoKey;
  heading: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  gallery: { feature: PhotoKey; others: [PhotoKey, PhotoKey] };
  ratesTitle: string;
  rates: { window: string; sunThu: string; friSat: string }[];
  tees: Tee[];
}

// Lakes Course content comes from the client's sample page. The Ranch Course
// figures below are placeholders until the club supplies the real details.
export const COURSES: Record<'lakes' | 'ranch', Course> = {
  lakes: {
    slug: 'lakes',
    name: 'The Lakes Course',
    path: '/lakes-course',
    label: 'The Lakes Experience',
    heroPhoto: 'pond',
    heroPos: '50% 55%',
    tagline: 'Links-style golf beneath the eastern slopes of the Sierra Nevada.',
    introPhoto: 'river',
    introPos: '50% 50%',
    flyover: 'river',
    heading: 'Luxury and performance are the name of the game on the Lakes Course.',
    paragraphs: [
      'Co-designed by PGA Champion Peter Jacobsen and John Harbottle III, this links-style course with rolling fairways meets head-on with the eastern slopes of the breathtaking Sierra Nevada Mountains.',
      'Lush wetlands and the winding Carson River bring water into 14 holes of play, making long, straight drives the order of the day.',
      'Past Home to the U.S. Open Qualifier.',
    ],
    stats: [
      { value: '18', label: 'Holes' },
      { value: '7,359', label: 'Total Yardage' },
      { value: '14', label: 'Holes with Water in Play' },
      { value: '36', label: 'Par' },
    ],
    gallery: { feature: 'panorama', others: ['trail', 'pond'] },
    ratesTitle: 'The Lakes Golf Course Rates',
    rates: [
      { window: '7:00 AM – 11:00 AM', sunThu: '$90', friSat: '$95' },
      { window: '11:01 AM – 2:00 PM', sunThu: '$75', friSat: '$75' },
      { window: 'After 2:00 PM', sunThu: '$55', friSat: '$55' },
    ],
    tees: [
      { name: 'Gold Tees', color: '#c9a94a', yards: 7359 },
      { name: 'Green Tees', color: '#2f9e57', yards: 6774 },
      { name: 'Blue Tees', color: '#2c58a8', yards: 6050 },
      { name: 'Forward Tees', color: '#c0394f', yards: 5057 },
    ],
  },
  ranch: {
    slug: 'ranch',
    name: 'The Ranch Course',
    path: '/ranch-course',
    label: 'The Ranch Experience',
    heroPhoto: 'trail',
    heroPos: '50% 50%',
    tagline: 'Open country, native grasses and long mountain views.',
    introPhoto: 'trail',
    introPos: '55% 50%',
    flyover: 'trail',
    heading: 'Relaxed pace, wide fairways and mountain views at every turn.',
    paragraphs: [
      'Rolling terrain and native grasses define the Ranch Course. It plays a little firmer and a little faster than its neighbour, which makes it a favourite for groups and easygoing rounds.',
      'Generous landing areas reward a free swing, while well-placed hazards keep the scoring honest.',
      'Home to the club’s most popular outing days.',
    ],
    stats: [
      { value: '18', label: 'Holes' },
      { value: '6,540', label: 'Total Yardage' },
      { value: '4', label: 'Sets of Tees' },
      { value: '71', label: 'Par' },
    ],
    gallery: { feature: 'panorama', others: ['pond', 'river'] },
    ratesTitle: 'The Ranch Golf Course Rates',
    rates: [
      { window: '7:00 AM – 11:00 AM', sunThu: '$80', friSat: '$85' },
      { window: '11:01 AM – 2:00 PM', sunThu: '$65', friSat: '$65' },
      { window: 'After 2:00 PM', sunThu: '$45', friSat: '$45' },
    ],
    tees: [
      { name: 'Gold Tees', color: '#c9a94a', yards: 6540 },
      { name: 'Green Tees', color: '#2f9e57', yards: 6120 },
      { name: 'Blue Tees', color: '#2c58a8', yards: 5640 },
      { name: 'Forward Tees', color: '#c0394f', yards: 4780 },
    ],
  },
};
