// One place for every photo and clip. To use your own media, replace the files in
// public/images and public/media (same names) or point these paths at any URL.
const base = import.meta.env.BASE_URL;

export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
}

export const PHOTOS = {
  panorama: { src: `${base}images/panorama.jpg`, w: 1572, h: 535, alt: 'Snow-capped Sierra Nevada rising behind a golf green and lake' },
  river: { src: `${base}images/lakes-river.jpg`, w: 701, h: 590, alt: 'Golfers on a green beside the Carson River' },
  trail: { src: `${base}images/trail.jpg`, w: 757, h: 421, alt: 'A golfer on a fairway path through golden grass with mountains behind' },
  pond: { src: `${base}images/pond.jpg`, w: 757, h: 421, alt: 'Pine trees reflected in a still pond beside the fairway' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

export interface Clip {
  key: PhotoKey;
  src: string;
  poster: string;
  title: string;
  caption: string;
  duration: string;
}

const clip = (key: PhotoKey, title: string, caption: string): Clip => ({
  key,
  src: `${base}media/${key}.mp4`,
  poster: `${base}media/${key}.jpg`,
  title,
  caption,
  duration: '0:12',
});

export const CLIPS: Record<PhotoKey, Clip> = {
  panorama: clip('panorama', 'Sierra Nevada Views', 'Snow-capped peaks above the course'),
  river: clip('river', 'The Lakes Course', 'Where the Carson River meets the green'),
  trail: clip('trail', 'The Ranch Course', 'Open country and golden grass'),
  pond: clip('pond', 'Water in Play', 'Still water, long reflections'),
};

export const TOUR: PhotoKey[] = ['river', 'trail', 'pond', 'panorama'];
