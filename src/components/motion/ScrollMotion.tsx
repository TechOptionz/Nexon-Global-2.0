"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { inView, prefersReducedMotion, watch } from "@/lib/reveal";

/* ------------------------------------------------------------------
   Scroll choreography for the whole site.

   Rather than wrapping several thousand lines of page markup in a
   motion component, this walks the rendered page once per route and
   tags the design system's own components — the classes globals.css
   already defines — with the entrance that suits them. Nothing in the
   markup changes; a page that adds a `.photo-card` is choreographed
   automatically.

   Two things keep it honest:

   - Only elements still *below the fold* are hidden. Anything already
     painted stays painted, so there is never a flash of content
     disappearing after hydration.
   - The outermost match wins. A card is one gesture, not a card plus
     its heading plus its button all animating separately.
   ------------------------------------------------------------------ */

type Rule = { selector: string; variant: string };

/** First match wins, so the list runs from most specific to least. */
const RULES: Rule[] = [
  // Cards are the signature component: they lift as a single object.
  {
    selector: ".photo-card, .sand-card, .white-card, .route-card, .faq-row",
    variant: "card",
  },
  // Headings carry the most travel — they lead each section.
  {
    selector: ".h1-hero, .h1-page, .h1-96, .h2-64, .h2-48, .h2-40, blockquote",
    variant: "rise",
  },
  // Cells of the measured grids rise together in sequence.
  {
    selector:
      ".stats-row > *, .credentials-grid > *, .steps-grid > *, .promises-grid > *, .values-grid > *, .practice-grid > *",
    variant: "up",
  },
  // Large media settles in rather than travelling.
  { selector: ".sticky-media, .image-slot--static", variant: "scale" },
  // Supporting copy and controls simply arrive.
  {
    selector:
      ".eyebrow, .kicker, .lede, .body-15, .body-14, .link-list, .feature-title, .stat-num, .stat-value, .btn, .arrow-btn",
    variant: "fade",
  },
];

/* Regions that run their own motion, or must not be touched at all:
   the sticky header (a transform on an ancestor would break it), the
   menu overlays, the hero, and anything already choreographed. */
const EXCLUDED_ANCESTORS = [
  ".site-header",
  ".mega-panel",
  ".mobile-drawer",
  ".site-footer",
  ".split",
  "[data-hero]",
  "[data-no-anim]",
  "[data-anim]",
].join(", ");

/** Stagger between siblings — small enough to read as one movement. */
const STEP_MS = 65;
const MAX_STEPS = 5;

function collect(): HTMLElement[] {
  const chosen = new Map<HTMLElement, string>();

  for (const { selector, variant } of RULES) {
    for (const node of Array.from(document.querySelectorAll<HTMLElement>(selector))) {
      if (chosen.has(node)) continue;
      if (node.hasAttribute("data-anim") || node.hasAttribute("data-no-anim")) continue;
      if (node.parentElement?.closest(EXCLUDED_ANCESTORS)) continue;
      chosen.set(node, variant);
    }
  }

  // Drop anything nested inside another match: the outer gesture wins.
  const nested = new Set<HTMLElement>();
  for (const node of chosen.keys()) {
    for (let p = node.parentElement; p; p = p.parentElement) {
      if (chosen.has(p)) {
        nested.add(node);
        break;
      }
    }
  }

  const tagged: HTMLElement[] = [];
  const seen = new Map<Element, number>();

  for (const [node, variant] of chosen) {
    if (nested.has(node)) continue;

    /* Already on screen: it was painted at full opacity a moment ago
       and stays that way. Hiding it now would read as a flicker. */
    if (inView(node)) continue;

    // Siblings that animate together do so in sequence.
    const parent = node.parentElement ?? document.body;
    const index = seen.get(parent) ?? 0;
    seen.set(parent, index + 1);

    node.setAttribute("data-anim", variant);
    if (index > 0) {
      node.style.setProperty("--anim-delay", `${Math.min(index, MAX_STEPS) * STEP_MS}ms`);
    }
    tagged.push(node);
  }

  return tagged;
}

export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const unwatchers: Array<() => void> = [];

    const run = () => {
      for (const el of collect()) unwatchers.push(watch(el));
    };

    run();
    // A second pass catches anything the first render had not measured
    // yet — late fonts, images, a client-only section.
    const later = window.setTimeout(run, 400);

    return () => {
      window.clearTimeout(later);
      for (const off of unwatchers) off();
    };
  }, [pathname]);

  return null;
}
