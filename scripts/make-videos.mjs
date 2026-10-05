// Builds the looping preview clips in public/media from the photos in public/images.
// Slow pan and zoom ("Ken Burns") so each photo reads as short footage.
// Needs ffmpeg on your PATH.   Run:  npm run media
//
// The motion is a sine wave over exactly the clip length, so every clip loops without a jump.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const IMAGES = join(root, 'public/images');
const OUT = join(root, 'public/media');
mkdirSync(OUT, { recursive: true });

const FPS = 20;
const SECONDS = 12;
const N = FPS * SECONDS;

// name, source image, output size, mode
const CLIPS = [
  { name: 'panorama', src: 'panorama.jpg', w: 1280, h: 720, mode: 'pan' },
  { name: 'river', src: 'lakes-river.jpg', w: 960, h: 540, mode: 'zoom' },
  { name: 'trail', src: 'trail.jpg', w: 960, h: 540, mode: 'zoom' },
  { name: 'pond', src: 'pond.jpg', w: 960, h: 540, mode: 'zoom' },
];

const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

for (const c of CLIPS) {
  const out = join(OUT, `${c.name}.mp4`);
  const base = `scale=iw*3:ih*3:flags=lanczos`;
  let vf;
  if (c.mode === 'pan') {
    // Slide a 16:9 window left and right across the panorama.
    vf = `${base},crop=w=ih*${c.w}/${c.h}:h=ih:x='(iw-ow)*(0.5-0.5*cos(2*PI*t/${SECONDS}))':y=0,scale=${c.w}:${c.h}:flags=lanczos`;
  } else {
    // Crop to 16:9, then breathe in and out.
    vf =
      `${base},crop=w='min(iw,ih*${c.w}/${c.h})':h='min(ih,iw*${c.h}/${c.w})',` +
      `zoompan=z='1.0+0.09*(0.5-0.5*cos(2*PI*on/${N}))':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s=${c.w}x${c.h}:fps=${FPS}`;
  }
  ff(['-loop', '1', '-framerate', String(FPS), '-i', join(IMAGES, c.src), '-vf', `${vf},format=yuv420p`,
    '-frames:v', String(N), '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-movflags', '+faststart', '-an', out]);
  ff(['-i', out, '-frames:v', '1', '-q:v', '3', join(OUT, `${c.name}.jpg`)]);
  console.log('rendered', c.name);
}
