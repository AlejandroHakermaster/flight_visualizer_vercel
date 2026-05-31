# Flight Visualizer for Vercel

This project contains a minimal **Next.js** application intended to serve as the starting point for a flight visualizer that can be deployed on Vercel.  It uses React and the open‑source MapLibre GL library to provide an interactive map that you can enhance with your paragliding flight data.

## Features

* **Next.js 13** scaffold with the App Router.
* Placeholder components for uploading a flight file and rendering a map.
* Map rendering powered by **maplibre-gl**, using the Carto Voyager basemap, which is free and does not require an API key.
* A clean structure in `app/` and `components/` to help you build the full application.

## Running locally

You'll need Node.js (version 18 or later) installed.  Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in the browser.  As you edit files, the page will automatically reload.

## Deployment on Vercel

Vercel supports Next.js projects out of the box.  After pushing this repository to GitHub, you can import it into Vercel (click **New Project** and select your repo).  The default build command (`next build`) and output directory (`.next`) are already configured by Vercel automatically.

## Next steps

This scaffold does **not** yet parse IGC/GPX/KML files or draw flight paths.  It leaves TODO comments in `app/page.tsx` and `components/Map.tsx` where you can:

* Read uploaded files using the File API in the browser.
* Parse the flight data (you may adapt your existing Python parsers into JavaScript or call an API).
* Transform the data into GeoJSON line features and add them to the MapLibre map.
* Adjust the map's centre and zoom based on your flight's bounds.

Use this project as a starting point for a production‑ready Vercel deployment.  Feel free to rename files, create additional components, or adopt TypeScript throughout.
