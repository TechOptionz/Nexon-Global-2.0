# NEXON Global Immigration — Next.js site

A Next.js implementation of the NEXON Global Immigration artboards designed in
Claude Design. The source `.dc.html` artboards live in the parent directory and
remain the visual reference; this app reproduces them as a real, routable site.

```bash
npm run dev     # http://localhost:3000
npm run build   # static prerender of all 32 routes
npm run start
npm run lint
npm run warm-images   # against a running server; see Images below
```

## Images

Photographs go through `next/image`, which encodes AVIF on demand: the first
request for a given (photo, width) costs 1-2s of CPU, every request after it
is served from `.next/cache/images` in ~15ms. Unwarmed, that cost lands on
whoever browses first, once per rendition, as slots that sit on the sand
placeholder for a beat before the picture appears.

`npm run warm-images` pays it up front. It reads the routes from the build's
prerender manifest, collects the `srcset` URLs each page actually emits, and
requests every one, so nothing is left to encode at view time:

```bash
npm run start &
npm run warm-images                  # ~135s cold, ~2s once warm
npm run warm-images -- --webp        # also warm the pre-Safari-16 fallback
npm run warm-images -- --base http://localhost:3001
```

Run it after `next build` and before the site takes traffic. It is safe to
re-run — already-cached renditions are skipped. A non-zero exit means a slot
points at a photograph that isn't in `public/`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · plain CSS.

There is no CSS framework. The design is specified in exact pixel values, so
`src/app/globals.css` carries the tokens and component classes transcribed
directly from the artboards — a utility framework's resets and rounding would
only fight it.

## Routes

| Route | Artboard |
|---|---|
| `/` | NEXON Home |
| `/services` | Services |
| `/services/[slug]` | Service — `citizenship`, `residency`, `skilled` |
| `/for-business` | For Business |
| `/destinations` | Destinations (filterable) |
| `/destinations/[slug]` | Destination — 12 programs, incl. `portugal` |
| `/how-it-works` | How It Works |
| `/about` | About / Why NEXON |
| `/success-stories` | Success Stories |
| `/insights` | Insights |
| `/insights/[slug]` | Article — 7 posts |
| `/faqs` | FAQs |
| `/contact` | Contact |

Every route is statically prerendered.

## Structure

```
src/
  app/            routes; each page mirrors one artboard section for section
  components/     shared chrome and the three page templates
  data/           the single source of truth for all content
  lib/            i18n runtime + the Arabic dictionary
```

### Data

The artboards duplicated their content: the article list appeared in five
files, the destination list in three. Here each set is defined once.

- `data/destinations.ts` — 12 programs (summary + full detail)
- `data/services.ts` — 3 service templates plus the four practices
- `data/articles.ts` — 7 bilingual articles, extracted verbatim from the source
- `data/faqs.ts` — the shared question bank and its named sets
- `data/testimonials.ts` — quote sets, case studies, reviews
- `data/site.ts` — navigation, footer, team, process, promises, credentials

Adding an article or destination now means editing one file.

### Design system

`globals.css` defines the tokens (`--ink`, `--accent`, `--forest`, `--sky`,
`--sand`, `--mint`, `--stone`) and the recurring components: `.eyebrow`,
`.pill-frosted`, `.btn--primary`, `.photo-card`, `.sand-card`, `.link-list`,
`.faq-row`, `.arrow-btn`, `.marquee`, `.forest-section`.

Typography is the two families the brief allows — Instrument Serif for display,
Inter for UI — loaded through `next/font`.

### Images

The artboards used empty `<image-slot>` placeholders, so `components/ImageSlot`
renders the same sand block with its art-direction caption. Pass `src` to drop
a real photograph in:

```tsx
<ImageSlot placeholder="Lisbon tram street" src="/assets/lisbon.jpg" />
```

Only the homepage and About hero ship with a real image
(`public/assets/airport-collage.jpg`); every other slot is still a placeholder
awaiting photography.

### Bilingual EN / AR

`lib/i18n.tsx` holds the language state; `lib/dict.ts` is the 445-entry Arabic
dictionary lifted verbatim from the source `i18n.js`. UI strings pass through
`t()` and fall back to English when the dictionary has no entry — the same
behaviour the artboards had. Article bodies carry their own Arabic inline.

Choosing Arabic sets `dir="rtl"` on `<html>`; the layout mirrors through CSS
logical properties, and headings fall back to the sans stack because Instrument
Serif has no Arabic coverage. The preference persists in `localStorage` under
`nexon-lang`, and an inline script in the document head applies it before first
paint so Arabic readers never see a frame of the left-to-right layout.

## Responsive behaviour

The artboards are fixed 1440px compositions with one 390px mobile board. The
site holds that composition down to ~1024px, then switches to the mobile
board's behaviour: the nav becomes a drawer, the footer becomes an accordion,
and multi-column grids collapse to one column.

## Notes

- Forms (contact, eligibility check) are front-end only, matching the design.
  They need a backend before launch.
- Contact details are the design's placeholders (`+971 4 000 0000`,
  `hello@nexonglobal.ae`) and must be replaced with real ones.
- Search in the header is presentational, as it was in the artboards.
