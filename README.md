# Genoa Golf Club: Front End

React + Vite + TypeScript front end for the Genoa Golf Club website redesign.
It pairs with the Spring Boot API in `genoa-golf-club-backend`, but also runs
on its own in **demo mode** with built-in sample data.

**Pages:** Home · Lakes Course · Ranch Course · Golf Outings · Membership (+ 404)

## Run it

Requires Node 20 or newer.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server with hot reload            |
| `npm run build`     | Type-check, then production build     |
| `npm run preview`   | Serve the production build locally    |
| `npm test`          | Run the test suite (Vitest)           |
| `npm run typecheck` | TypeScript only                       |

## Connect to the backend

```bash
cp .env.example .env.local     # sets VITE_API_BASE_URL=http://localhost:8080
```

With `VITE_API_BASE_URL` unset the site uses demo data and simulated form posts.
With it set, these endpoints are called:

| Feature            | Endpoint                                  |
| ------------------ | ----------------------------------------- |
| Events preview     | `GET  /api/v1/events/upcoming`            |
| Promotional popup  | `GET  /api/v1/popups/active` (204 = none) |
| Venue enquiry      | `POST /api/v1/enquiries`                  |
| E-Club signup      | `POST /api/v1/eclub/subscribe`            |

The backend must allow this origin in its CORS settings
(`http://localhost:5173` for development).

## What is in it

- Responsive, mobile-first layout with a collapsing nav
- Fortnightly popup, dismissal remembered with a cookie whose lifetime comes from the server (default 14 days)
- Venue enquiry form with client-side validation that mirrors the backend rules, and server field errors shown inline
- E-Club signup, events preview, gallery with keyboard-accessible lightbox
- Accessibility: skip link, labelled fields, `aria-live` status messages, focus management in dialogs, reduced-motion support
- Hero background video, tap-to-play video previews with a modal player, animated landscape artwork
- Lazy-loaded secondary pages; 17 automated tests

## Images and video

No licensed photography was available when this was built, so the visuals are
layered, animated landscape scenes (`src/components/Scene.tsx`) and five looping
12-second clips in `public/media/` (`lake`, `ranch`, `clubhouse`, `sunset`, `dawn`,
each with a `.jpg` poster). They drive the hero background video, the
"Take a tour" preview cards and the course-page previews.

- **Use real footage or photos:** replace the files in `public/media/` keeping the
  same names, or edit `src/data/media.ts` to point at any URL.
- **Re-render the clips** after changing a scene: run `npm run dev` in one terminal,
  then `npm run media` in another (needs ffmpeg and Chrome; set `CHROMIUM_PATH` if
  Chrome is not auto-detected). Every animation loops in 12 s, so the clips loop cleanly.
- Hero video is muted, loops, skips itself for visitors who prefer reduced motion,
  and falls back to the animated artwork if the file cannot load.

## Project layout

```
src/
  api/         client + DTO types (demo-mode fallback)
  components/  Header, Footer, Popup, EnquiryForm, Gallery, ...
  pages/       Home, CoursePage (Lakes/Ranch), GolfOutings, Membership
  data/        static page content
  lib/         validation, cookies
  styles/      global.css
```

## Placeholders to replace

- Images are generated SVG scenes (`components/Scene.tsx`). Swap in real photography.
- `BOOKING_URL` in `src/data/site.ts` is a stand-in for the real ForeUP link.
- Prices, hole data, address and phone number are sample content.
- The reCAPTCHA token is a dev value; wire up reCAPTCHA v3 before going live.

## Deploy

Static output in `dist/`. `vercel.json` and `public/_redirects` handle SPA routing
on Vercel and Netlify. For GitHub Pages: `VITE_BASE=/genoa-golf-web/ npm run build`
(Pages needs a 404 fallback copy of `index.html` for deep links).
