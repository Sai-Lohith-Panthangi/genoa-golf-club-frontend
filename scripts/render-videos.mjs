// Renders the animated scenes to public/media/<variant>.mp4 and .jpg poster.
//
// Needs: ffmpeg on PATH, a Chromium/Chrome (set CHROMIUM_PATH, or Chrome is auto-detected),
// and the dev server running:  npm run dev   (in another terminal)
// Then:                         npm run media
//
// Every animation in the scene loops with a period that divides 12 s, so the clips loop seamlessly.
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_BASE = process.env.DEV_URL ?? 'http://localhost:5173';
const VARIANTS = (process.env.VARIANTS ?? 'lake,ranch,clubhouse,sunset,dawn').split(',');
const FPS = 20, SECONDS = 12, W = 1280, H = 720;
const OUT = new URL('../public/media/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
mkdirSync(OUT, { recursive: true });

const launchOpts = process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] }
  : { channel: 'chrome' };
const browser = await chromium.launch(launchOpts);

for (const v of VARIANTS) {
  const dir = join(tmpdir(), `ggc-frames-${v}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto(`${URL_BASE}/__capture?v=${v}`);
  await page.waitForSelector('#capture svg');

  const n = FPS * SECONDS;
  for (let i = 0; i < n; i++) {
    const ms = (i / FPS) * 1000;
    await page.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), ms);
    await page.screenshot({ path: join(dir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 88 });
  }
  await page.close();

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(dir, 'f%04d.jpg'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '29', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-vf', 'scale=1280:720', join(OUT, `${v}.mp4`)]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', join(dir, 'f0060.jpg'), '-q:v', '4', '-vf', 'scale=1280:720', join(OUT, `${v}.jpg`)]);
  rmSync(dir, { recursive: true, force: true });
  console.log('rendered', v);
}
await browser.close();
if (!existsSync(OUT)) process.exit(1);
