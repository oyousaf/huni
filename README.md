# huni — concept redesign

An unofficial portfolio redesign of [huni](https://www.beehuni.com), a honey hair & body care brand.
Not affiliated with, endorsed by or connected to huni Beauty Limited.

## Stack

- [Astro](https://astro.build) — static pages, built-in image optimisation
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens in `src/styles/global.css`
- [Motion](https://motion.dev) — scroll reveals, count-ups, parallax and the scroll-driven bee
- [Leaflet](https://leafletjs.com) — Pollinator Index map, loaded on scroll

## Live data

The Pollinator Index uses open, keyless APIs. Figures are fetched at build time with saved fallbacks, and refreshed in the browser where useful.

| Source | Used for |
| --- | --- |
| GBIF | *Melipona beecheii* (Mayan stingless bee) records in Mexico and Yucatán |
| iNaturalist | Wild bee sightings near a visitor's town |
| Open-Meteo | Mérida weather and place search |
| huni corridor API | Planting corridor pins (read-only — the site never writes to it) |

Sign-ups and planted patches are mocked and stay in the visitor's browser.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
npm run check
```

## Credits

All photography is CC0 / public domain via Openverse (Wikimedia Commons, rawpixel, StockSnap). Fonts are
Fraunces, Instrument Sans and Courier Prime under the SIL Open Font Licence. Full list at `/credits`.
