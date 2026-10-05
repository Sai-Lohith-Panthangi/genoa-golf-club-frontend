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

- **Home:** hero with video background, feature tiles, a video tour, upcoming events, photo gallery, social feed, Stay & Play, E-Club signup and the enquiry form.
- **Lakes and Ranch courses:** one shared page template filled with each course's stats, highlights, hole table, rates and video previews.
- **Golf Outings:** packages, how it works, and the enquiry form preset for outings.
- **Membership:** three tiers, a short FAQ and E-Club signup.
- **Popup:** shown on the home page and not shown again for the number of days the server specifies (14 by default), tracked with a cookie.
- **Enquiry form:** validates on the client using the same rules as the backend, and shows any server errors next to the right field.
- **Accessibility and performance:** skip link, labelled fields, keyboard-friendly dialogs, reduced-motion support, and lazy-loaded secondary pages.

## Project structure

```
src/
  api/          API client and types
  components/   Header, Footer, Popup, EnquiryForm, Gallery, VideoPreview, ...
  data/         page content and media config
  lib/          validation and cookie helpers
  pages/        Home, CoursePage, GolfOutings, Membership
  styles/       global.css
public/media/   hero and preview videos with poster images
scripts/        render-videos.mjs
```

## Images and video

The visuals are animated landscape scenes (`src/components/Scene.tsx`) and five looping clips in `public/media/`: `lake`, `ranch`, `clubhouse`, `sunset` and `dawn`. To use real photos or footage, replace those files with the same names or change the paths in `src/data/media.ts`.

To re-render the clips after editing a scene, start `npm run dev` in one terminal and run `npm run media` in another. It needs ffmpeg and Chrome installed.

## Before going live

- Replace the sample content: prices, hole details, address and phone number.
- Set the real ForeUP link in `BOOKING_URL` (`src/data/site.ts`).
- Add reCAPTCHA v3 to the enquiry form. It currently sends a development token.

## Deploying

`npm run build` outputs a static site to `dist/`. `vercel.json` and `public/_redirects` take care of page routing on Vercel and Netlify. For GitHub Pages, build with `VITE_BASE=/genoa-golf-web/ npm run build`.
