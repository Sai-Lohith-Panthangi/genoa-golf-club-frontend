# Genoa Golf Club Website (Front End)

The front end for the Genoa Golf Club website redesign, built with React, Vite and TypeScript. It has five pages: Home, Lakes Course, Ranch Course, Golf Outings and Membership. It works with the [Spring Boot backend](https://github.com/Sai-Lohith-Panthangi/genoa-golf-club-backend) I built for the same project, and it also runs by itself with sample data.

## Getting started

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the tests |
| `npm run media` | Re-render the video clips (see below) |

## Using it with the backend

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the backend address (`http://localhost:8080` by default). Without it, the site shows sample events and pretends to submit forms, which is handy for working on the UI alone.

It talks to four endpoints:

- `GET /api/v1/events/upcoming` for the events preview
- `GET /api/v1/popups/active` for the popup
- `POST /api/v1/enquiries` for the venue enquiry form
- `POST /api/v1/eclub/subscribe` for the E-Club signup

The backend needs to allow `http://localhost:5173` in its CORS settings.

## What's in it

- **Home:** full-width hero with a looping video, feature tiles, the two courses, a video tour, upcoming events, Stay & Play, social feed and the venue enquiry form.
- **Lakes Course:** built from the client's sample page: intro with a flyover video, key stats, photo gallery, seasonal hours (the current season is highlighted), green fees, scorecard with a tee comparison, and a booking call to action.
- **Ranch Course:** the same template with the Ranch details.
- **Golf Outings:** packages, how it works, and the enquiry form preset for outings.
- **Membership:** three tiers and a short FAQ.
- **Every page:** sticky header, "Stay Connected" E-Club signup and the footer.
- **Popup:** shown on the home page and not shown again for the number of days the server specifies (14 by default), tracked with a cookie.
- **Enquiry form:** validates on the client using the same rules as the backend, and shows any server errors next to the right field.
- **Accessibility and performance:** skip link, labelled fields, dialogs that trap focus and lock page scroll, reduced-motion support, fonts bundled with the app (no external requests), and lazy-loaded pages and images.

## Project structure

```
src/
  api/          API client and types
  components/   Header, Footer, heroes, Gallery, VideoCard, Popup, EnquiryForm, ...
  data/         page content and media config
  lib/          validation and cookie helpers
  pages/        Home, CoursePage, GolfOutings, Membership
  styles/       global.css
public/images/  course photos
public/media/   hero and preview videos with poster images
scripts/        make-videos.mjs
```

## Images and video

Photos live in `public/images` and the short clips in `public/media`. Every path is listed in `src/data/media.ts`, so swapping in new photography is a matter of replacing files with the same names.

The clips are slow pan and zoom videos made from the photos. After changing a photo, rebuild them with:

```bash
npm run media
```

This only needs ffmpeg installed. Each clip is 12 seconds and loops without a visible jump.

## Before going live

- Replace the photos in `public/images` with the original high-resolution files from the club.
- Check the Ranch Course details, membership prices, events and contact details, which are sample content.
- Set the real ForeUP link in `BOOKING_URL` (`src/data/site.ts`).
- Add reCAPTCHA v3 to the enquiry form. It currently sends a development token.

## Deploying

`npm run build` outputs a static site to `dist/`. `vercel.json` and `public/_redirects` take care of page routing on Vercel and Netlify. For GitHub Pages, build with `VITE_BASE=/genoa-golf-web/ npm run build`.
