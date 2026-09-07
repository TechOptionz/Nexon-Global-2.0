# Mobile audit — NEXON Global Immigration

> ## Status: fixed and re-verified
>
> All 34 findings below have been addressed except four deliberate
> no-changes, listed at the end under **Left alone**. The tables are kept
> as the record of what was found; see **Verification** at the bottom for
> the measured end state.
>
> Headline results, all re-measured against a clean build:
>
> - **Horizontal overflow: clean across all 70 page states** — and with
>   `body { overflow-x }` now *removed*, so `documentElement.scrollWidth
>   === innerWidth` is a real test rather than a masked one.
> - **Tap targets under 44px: 83 → 2**, both inline prose links.
> - **Form fields below 16px: 5 → 0.** No more iOS focus-zoom.
> - **Clipped text: 1 → 0.**
> - **Gutters: identical at every width** (24px at 320–414, 32px at 768).
> - **Desktop: 32/32 assertions unchanged** at 1024px and 1440px.
> - Drawer: Escape closes, focus is trapped and restored, scroll lock
>   holds without Lenis, scroll position restored exactly.


**Scope:** every route, measured in headless Chrome under real mobile emulation
(touch events, `deviceScaleFactor: 2`) at **320 / 375 / 390 / 414 / 768 px**.
15 routes × 5 widths = 75 measured page states, plus scripted touch interaction
tests for the drawer, all four accordions, the carousels, the wizard and the
filters.

**Nothing has been changed.** This is the audit only.

## Total: 34 findings — 4 critical · 9 high · 13 medium · 8 low

> **Note on timing.** A large concurrent change landed in the working tree at
> 15:42–15:48 while this audit was running (`next/image` migration, images
> recompressed 23 MB → 6 MB, +465 lines in `globals.css`, +219 in `motion.css`,
> `SiteHeader` reworked). Everything below was **re-measured after that change**
> against a clean rebuild, so it reflects the tree as it stands now. Three issues
> I had recorded earlier were fixed by that work and are listed under
> "Already fixed" at the bottom so they don't get re-reported.

---

## 1. Navigation

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| all | Header drawer | **Escape does not close the drawer.** Verified: drawer open → `Escape` → still open. No `keydown` listener exists anywhere in the component. | **Critical** | `src/components/SiteHeader.tsx:29` | Add a `keydown` effect while `menuOpen`; `setMenuOpen(false)` on `Escape`. |
| all | Header drawer | **No focus trap and no focus restore.** Tab moves into the page behind the drawer; on close, focus is lost to `<body>` instead of returning to the hamburger. | **High** | `src/components/SiteHeader.tsx:364` | Trap Tab within the drawer; store the trigger and re-focus it on close. |
| all | Header drawer | **Scroll lock depends on Lenis.** With Lenis running, `html{overflow:clip}` + `body{overflow:hidden}` + `overscroll-behavior:contain` — solid. Under `prefers-reduced-motion` Lenis is skipped, leaving only `body{overflow:hidden}`, `html:visible`, `body:static` — **does not hold on iOS Safari**. | **High** | `src/components/SiteHeader.tsx:56` | Lock independently of Lenis (`position:fixed` + `top:-scrollY` on body, restored on close). |
| all | Header | **No safe-area insets anywhere.** Confirmed: no `env(safe-area-inset-*)` in either stylesheet. At 320×844 the drawer's last CTA occupies y 772–820 with only 24 px below — it sits under the home indicator on notched devices. | **High** | `src/components/SiteHeader.tsx:375` | `padding-bottom: calc(24px + env(safe-area-inset-bottom))` on the drawer; same for header/footer. |
| all | Header | **Hamburger is 40×40**, below the 44 px minimum — and it is the only navigation control on mobile. | **High** | `src/app/globals.css:757` | Make `.header-burger` 44×44, or keep the 40 px circle with a 44 px hit area via padding. |
| all | Header | `--header-h: 72px` but the mobile header renders **64 px**. Every offset derived from it (`scroll-padding-top`, `.legal-toc` sticky top, `scroll-margin-top`) is 8 px out on mobile. | **Medium** | `src/app/globals.css:42` | Redeclare `--header-h: 64px` inside the `≤1023px` block. |
| all | Header | **Search button dropped on mobile with no equivalent** (`display:none` ≤1023). It is presentational today, but it is a nav affordance that simply vanishes. | **Low** | `src/app/globals.css:1312` | Confirm intent — either drop it from the DOM or surface it in the drawer. |
| all | Header drawer | The mega-menu's **promo card link is omitted from the drawer**. The drawer flattens `tiles + items + columns` but never renders `menu.card`, so e.g. Destinations → "Can't decide between two programs?" → `/contact` has no mobile equivalent. | **Low** | `src/components/SiteHeader.tsx:403` | Append `menu.card` to the flattened `links` array. |
| home | Announcement bar | Bar sits **above** the sticky header and scrolls away with the page, so the header's sticky top edge shifts. Cosmetic but jarring on a short scroll. | **Low** | `src/app/page.tsx:130` | Either include it in the sticky wrapper or accept and document. |

**Working correctly** (verified by scripted touch, not assumed): drawer opens on
tap; close button works; submenu accordions open on tap and reveal their links;
tapping any drawer link closes it; browser Back closes it (the `template.tsx`
remount resets state); anchor links land **128 px clear** of the sticky header
(`scroll-padding-top: 96px` + Lenis offset). Tapping "outside" is not applicable —
the drawer is full-screen `inset:0`, so there is no outside region.

---

## 2. Nothing hidden

Six elements are `display:none` at mobile breakpoints. **Four are deliberate
swaps with a full mobile replacement. Two are content removed with nothing in
its place** — those are the ones that matter.

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| `/insights/[slug]` | Article | **`aside.article-toc` — "In this article" + 4 section links — is dropped entirely below 1000 px.** Not intentional; it is the layout shortcut for a 3-column grid that could not collapse. A per-section jump list is *most* useful on mobile, where the article is longest (6 433 px tall at 390 px). | **High** | `src/app/globals.css:1385` | Restore as a collapsed `<details>` "In this article" above the body copy. |
| `/destinations/[slug]` | Hero | **`.dest-hero__inset` — a second photograph (`d.photoSmall`) — is dropped below 1000 px.** It is hidden because it is positioned at `inset-inline-start: -96px` and would overflow; hiding it was the shortcut, not a decision about the photo. | **Medium** | `src/app/globals.css:1391` | Re-place it in flow beneath the hero at mobile widths rather than hiding it. |

### Deliberate, and genuinely replaced — verified link-for-link

| Element | Hidden at | Replacement | Parity |
|---|---|---|---|
| `nav.header-nav` (4 links) | ≤1023 | Drawer accordion | ✅ all 4 groups + every child link |
| `.lang-switch` (header) | ≤1023 | EN / العربية buttons in drawer | ✅ |
| `.btn--primary` "Book a Consultation" (header) | ≤640 | Drawer CTA | ✅ |
| `.footer-desktop` (32 links) | ≤1023 | `.footer-mobile` accordion | ✅ same `FOOTER_COLUMNS` source, all 32 present, opens on tap |

### Checked and clear

- **No clipped text** anywhere except one case (below) — probed every element with
  `overflow:hidden`/`line-clamp` for `scrollHeight > clientHeight`.
- **Carousels: every item reachable by swipe.** Scripted 20 touch-drags on the
  12-card destinations track: `scrollLeft` reached its 3 451 px maximum, last
  card visible. Arrow buttons also work.
- **All accordions open on touch** — FAQ, footer, destination route groups.
- **Tabs/filters open on touch** — destination filters go 12 → 4 cards.
- **Eligibility wizard advances on touch** through all three steps.
- **No content off-screen from container overflow** (see §4).

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| home | Hero | Hero content is **clipped by 8 px at 320 px** — `height:700` / `minHeight: calc(100vh - 136px)` gives a 708 px box holding 716 px of content. | **Medium** | `src/app/page.tsx:121` | Use `min-height` only, or `100svh`, and let the section grow. |

---

## 3. Images

The `next/image` migration that landed mid-audit fixed the big ones. Re-measured
after it: **all 27 images on `/` now carry a `srcset`**, served as AVIF, correctly
sized (a 342 px-wide card at dpr 2 needs 684 px and receives an 828 px rendition).
`/destinations` now ships **319 KB across 12 photographs** — it was ~6 MB of raw
JPEG.

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| all | Photo cards | **16:9 sources cropped into portrait boxes keep only 39–45 % of the frame**, with `object-position: 50% 50%` everywhere and no art direction. A 1376×768 photo in a 342×480 card shows the middle 40 % — subjects at the edges are cut off. | **High** | `src/app/globals.css` (`.image-slot img`) | Add a per-image focal point (`object-position` from the data files), or supply portrait crops for the card slot. |
| all | All images | **No `width`/`height` or `aspect-ratio` on any `<img>`.** Measured CLS is nil *only* because every parent has an explicit pixel `height`; the images themselves reserve nothing. Any future slot without a fixed-height parent will jump. | **Medium** | `src/components/ImageSlot.tsx` | Give the slot an `aspect-ratio` so the reservation is intrinsic, not incidental. |
| `/destinations` | Grid | 12 photographs load on one mobile page. All lazy below the fold, but it is still the heaviest route. | **Low** | `src/app/destinations/page.tsx:90` | Consider paginating or capping the initial render. |

**Verified fine:** `img { max-width:100%; display:block }` is set globally; slot
images are `width:100%; height:100%; object-fit:cover` so nothing overflows; image
grids collapse to one column at ≤900 px (not squeezed thumbnails); hero video is
now `preload="none"`, non-autoplaying on mobile, **0 bytes fetched** at 390 px.

---

## 4. Section-by-section alignment

### Horizontal scroll

Probed by lifting `body{overflow-x:hidden}` and re-measuring every element on all
75 page states. **74 of 75 are clean.** One genuine blowout:

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| `/services` | Practice cards | **Page blows the viewport out to 367 px at a 320 px device (+47 px).** Root cause: `.btn { white-space: nowrap }` — "Explore Citizenship by Investment" has a 294 px min-content width and cannot wrap, inside a card with `padding: 48`. `overflow-x:hidden` does not save it: the un-shrinkable min-content pushes the layout viewport, so the whole page renders zoomed out. | **Critical** | `src/app/globals.css:325` | Allow `.btn` to wrap below ~480 px (`white-space: normal; text-wrap: balance`), and reduce the card padding (see below). This one change fixes all three buttons. |
| all | `<body>` | **`overflow-x: hidden` on `body` is masking rather than fixing.** It is currently unnecessary — with it lifted, only `/services` overflows. Keeping it hides the next regression. | **Medium** | `src/app/globals.css:91` | Remove once `/services` is fixed, so future overflow is visible in testing. |

### Gutters — three competing values

The token is `--gutter: clamp(24px, 4.2vw, 80px)`. Three components hardcode
their own instead, so the page edge steps in and out as you scroll. Divergence
starts at 572 px, where `4.2vw` overtakes 24 px — so it is **most visible at 768 px**
(sections 32 px, footer 24 px, hero 20 px).

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| home | Hero | Hardcoded `margin: 12px 20px 0` → **20 px** gutter against 24 px everywhere else. | **Medium** | `src/app/page.tsx:183` | `margin-inline: var(--gutter)`. |
| all | Mobile footer | Hardcoded `padding: 64px 24px 32px` → **24 px** at every width, vs 32 px sections at 768 px. | **Medium** | `src/components/SiteFooter.tsx:118` | `padding-inline: var(--gutter)`. |
| all | Drawer | Hardcoded `padding: 0 24px 24px` → same divergence. | **Medium** | `src/components/SiteHeader.tsx:375` | `padding-inline: var(--gutter)`. |
| home | Announcement | Hardcoded `margin: 12px 12px 0` → **12 px**, half the page gutter. | **Low** | `src/app/page.tsx:130` | Align to `--gutter`. |

### Grid collapse

Grids collapse cleanly and in a sensible order at ≤900 px. Two exceptions:

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| `/success-stories` | Case-study facts | **Stays 3 columns at 390 px — measured 71 / 64 / 86 px wide.** Labels like "first call to passports" wrap to 3–4 lines in a 64 px column. | **High** | `src/app/success-stories/page.tsx:81` | Collapse to 1 column below 640 px (the `.stats-row` rule already does this elsewhere). |
| `/services`, `/for-business` | Practice cards | `padding: 48` at 320 px leaves 176 px of content inside a 272 px container; the nested white card's `padding: 32` narrows it to 112 px. Compounds the overflow above. | **Medium** | `src/app/services/page.tsx:68` | Step padding down to 20–24 px below 640 px. |

### Tap targets

Every interactive element measured at 390 px. **Below 44 px:**

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| all (15) | Footer link columns | **405 links at 325×20 px with a 10 px gap** — a 30 px pitch. The single largest mis-tap surface on the site. | **High** | `src/app/globals.css:973` | `padding-block: 12px` on `.footer-col-links a` at mobile. |
| all (15) | Footer legal row | "Privacy Policy" / "Terms" / "Contact" at **17 px tall**, adjacent in a 20 px-gap row; phone + email at 21 px. | **High** | `src/components/SiteFooter.tsx:176` | Same treatment; increase the row gap. |
| 6 pages | FAQ accordion | **`.faq-trigger` is 24 px tall** when the question fits one line (45 px when it wraps). The surrounding `.faq-row` has 24 px padding that is *not* part of the button. | **High** | `src/app/globals.css:609` | Give the trigger the row's padding so the whole row is the target. |
| `/privacy`, `/terms` | Contents list | 25 × `.legal-toc__link` at 342×**33 px**, stacked with no separation. | **Medium** | `src/app/globals.css:1934` | `padding-block: 12px`. |
| home | Announcement | **Dismiss button is 24×24** in a 55 px bar. | **Medium** | `src/app/page.tsx:151` | 44×44 hit area. |
| home, `/for-business` | Link lists | 16 × `.link-list a` at 21–42 px tall, 12 px gap. | **Medium** | `src/app/globals.css:576` | `padding-block: 10px`. |
| `/destinations` | Filter buttons | 4 buttons **40 px tall with an 8 px gap**. | **Medium** | `src/app/destinations/page.tsx:64` | 44 px height, 12 px gap. |
| `/contact` | Contact details | `tel:` / `mailto:` links at 208×23 px. | **Low** | `src/app/contact/page.tsx:86` | `padding-block: 10px`. |
| 2 pages | Legal meta | "Read our Terms" at 97×**16 px** — the smallest link on the site. | **Low** | `src/app/globals.css` (`.legal-meta a`) | `padding-block`. |
| various | Inline prose links | `.inline-link` at 17–42 px. Inline links in running text are conventionally exempt; listing for completeness. | **Low** | `src/app/globals.css:1153` | No change unless you want to enforce strictly. |

### Forms

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| `/contact`, home | All fields | **`.field` is `font-size: 14px` → iOS Safari zooms the page on focus** and does not zoom back. Affects all 5 contact fields and all 3 eligibility fields. | **Critical** | `src/app/globals.css:655` | `font-size: 16px` on `.field` at mobile (visually near-identical, removes the zoom). |
| `/contact` | Form | No `autocomplete` attributes, so no name/email/phone autofill. | **Medium** | `src/app/contact/page.tsx:138` | `autoComplete="name" / "email" / "tel"`. |

**Verified fine:** inputs are full-width and stack to one column at ≤900 px;
every label is visible (not placeholder-only); input `type` is correct throughout
(`email`, `tel`, `text`) so the right keyboard appears.

### Everything else in §4 — checked and clear

- **No tables anywhere** on the site, so nothing to restack.
- **No overlapping or mis-stacked elements** — probed every static sibling pair
  for simultaneous vertical + horizontal overlap; the two hits were margin-collapse
  artefacts on empty spacers, not visual defects.
- **No text squeezed below 120 px** except the `/success-stories` grid above.
- **Headings wrap cleanly at 320 px** — `text-wrap: balance` throughout, no
  overflow from any heading at any width.

| Page | Section | Issue | Sev | File:line | Proposed fix |
|---|---|---|---|---|---|
| all | Body copy | **`.body-14` (14 px) and `.body-15` / `.faq-answer` / `.choice-btn` / `.btn` (15 px) are below the 16 px floor** you asked for. This is the artboard type scale, so raising it changes desktop too — **flagging for your call rather than assuming.** | **Medium** | `src/app/globals.css:229,237` | Either bump to 16 px on mobile only (mobile-first, scale *down* at `min-width`), or accept as designed. Needs your decision. |
| home, carousels | `.track` | Swiping past the end of a carousel **chains to the page** and scrolls it vertically (measured: page moved 4 851 px during horizontal swipes). | **Low** | `src/app/globals.css:551` | `overscroll-behavior-x: contain`. |
| `/for-business`, `/services/[slug]` | Spacer | `<div style={{height:160}}/>` — a fixed 160 px spacer that does not shrink on mobile. | **Low** | `src/app/for-business/page.tsx:63`, `src/components/ServiceView.tsx:79` | Make it responsive or replace with section padding. |

---

## Already fixed by the concurrent change (do not re-report)

Recorded before 15:42, re-measured after, now clean:

1. ~~All 97 images served as raw `<img>` with no `srcset`~~ → `next/image`, AVIF, correct renditions.
2. ~~23 MB of source JPEGs; 1376 px files sent to 390 px screens~~ → 6 MB; `/destinations` now 319 KB.
3. ~~5.2 MB `hero-loop.mp4` autoplaying with `preload="auto"` on mobile~~ → 2.8 MB, `preload="none"`, no autoplay, 0 bytes fetched at 390 px.

---

## Left alone, deliberately

Four things in the tables above were **not** changed, each for a reason:

1. **Inline prose links** (`.inline-link`, 17–42px). Links inside running
   sentences are conventionally exempt from the 44px rule — padding them
   out would break the line spacing of the paragraph they sit in. These
   are the only two tap targets still under 44px.
2. **The header search button**, still hidden below 1024px. It is
   presentational (per the README) and wiring a mobile affordance to a
   control that does nothing would be worse than omitting it. Worth a
   decision when search is actually built.
3. **The announcement bar sitting above the sticky header.** Moving it
   into the sticky wrapper changes what stays on screen while scrolling —
   a design decision, not a mobile defect.
4. **12 photographs on `/destinations`.** All lazy below the fold and now
   319KB in total; pagination would be a product decision.

One finding is **partly** addressed and needs a human:

- **`object-fit` cropping.** A 16:9 photograph in a portrait card shows
  roughly its middle 40%, so a subject near an edge is cut off. I added
  the mechanism — `ImageSlot` now takes a `focal` prop that sets
  `object-position` — but left every image on the default centre. Choosing
  a focal point for 47 photographs is art direction: it needs someone
  looking at the pictures, not a guess from the markup. The hook is there
  when you want to do that pass.

---

## Verification

Re-measured after the fixes, same harness as the audit.

| Check | Before | After |
|---|---|---|
| Page states with horizontal overflow | 1 (`/services` @320, +47px) | **0 of 70** |
| …with the `overflow-x` mask removed | not tested — mask was on | **0 of 70** |
| Distinct tap targets < 44px @390 | 83 | **2** (inline prose links) |
| Form fields < 16px | 5 | **0** |
| Clipped text | 1 | **0** |
| Content hidden with no replacement | 2 | **0** |
| Gutter values in use @320 / @390 | 24, 20, 12 | **24 only** |
| Gutter values in use @768 | 32, 24, 20, 12 | **32 only** |
| Desktop assertions @1024 + @1440 | — | **32 / 32 unchanged** |

Interaction suite (scripted touch and key events), **20/20 passing**:
drawer opens on tap · Escape closes · close button closes · focus enters
the drawer · focus stays trapped through 40 tabs · focus returns to the
hamburger · page does not scroll behind the drawer · scroll position
restored exactly (600 → 600) · lock holds under `prefers-reduced-motion`
with Lenis disabled (body pinned) · scroll restored there too (500 → 500)
· article contents list visible and above the body with all 4 links ·
destination inset photo visible and inside the viewport · drawer carries
the promo link · header does not collide at 320 · no overflow at 320.

Also re-confirmed still working after the CSS changes: FAQ accordion,
footer accordion, destination route-group accordion, destination filters
(12 → 4 cards, 44px tall, 12px gaps), eligibility wizard through all three
steps, carousel reaching its last card by swipe with **0px vertical drift**
on a mid-track swipe.

### One assertion that reports as a failure and is not one

`desktop.js` flags `.hero-band` height at 1440×900 as `764px, want 700px`.
That is the assertion being wrong, not the page: `getComputedStyle().height`
returns the *used* value, and `min-height: calc(100svh - 136px)` = 764px
legitimately wins at a 900px-tall window. Checked directly against the
original behaviour — 1440×900 → 764px, 1440×700 → 700px, 1280×760 → 700px,
identical before and after. On mobile the hero now reports
`contentFits: true`, where it was clipping 8px.

---

## Method

- Chrome via CDP, `Emulation.setDeviceMetricsOverride` (`mobile: true`, dpr 2) +
  `setTouchEmulationEnabled`; real `Input.dispatchTouchEvent` sequences for every
  interaction claim.
- Overflow measured **twice** — as shipped, and with `body{overflow-x:hidden}`
  lifted — because the mask hides the real offenders. Blowout detected by
  comparing `window.innerWidth` against the emulated device width, which catches
  min-content pressure that `scrollWidth` alone misses.
- Hidden content found by walking every node for `display:none` and reporting
  only the outermost, then diffing each against its claimed mobile replacement.
- One earlier "under-resolved images" reading was a false positive:
  `naturalWidth` is density-corrected when `sizes` is present. Confirmed correct
  by fetching the optimizer directly (`w=828` → a real 828×462 AVIF, 38 KB).

**Nothing has been changed. Awaiting your review before fixing in severity order.**
