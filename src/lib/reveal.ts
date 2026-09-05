/* ------------------------------------------------------------------
   One watcher for every scroll reveal on the page.

   State is written as attributes (`data-in`, `data-done`) rather than
   class names on purpose: React owns `className` on these nodes and
   would wipe a class the moment anything re-rendered — a language
   switch, an accordion, a carousel. Attributes React never set are
   left alone.
   ------------------------------------------------------------------ */

/** Reveal once the element's top passes 90% of the viewport height. */
const FOLD = 0.9;

/** Long enough for the slowest reveal (delay + duration) to finish. */
const SETTLE_MS = 1700;

let observer: IntersectionObserver | null = null;
let sweepTimer = 0;
let bound = false;

const tracked = new Set<HTMLElement>();

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Mark an element as arrived, with no animation at all. */
export function settle(el: HTMLElement) {
  el.setAttribute("data-in", "");
  clear(el);
}

function show(el: HTMLElement) {
  if (!tracked.delete(el)) return;
  observer?.unobserve(el);
  el.setAttribute("data-in", "");
  /* Once it has arrived the element hands itself back: the reveal
     attributes come off entirely, so the long entrance transition can
     never replay, and — more importantly — never slows down the short
     hover transitions the component defines for itself. */
  window.setTimeout(() => clear(el), SETTLE_MS);
  if (tracked.size === 0) unbind();
}

function clear(el: HTMLElement) {
  el.setAttribute("data-done", "");
  if (el.hasAttribute("data-anim")) {
    el.removeAttribute("data-anim");
    el.removeAttribute("data-in");
    el.style.removeProperty("--anim-delay");
  }
}

/* A viewport jump — an anchor link, a restored scroll position, a back
   navigation — can move an element from below the fold to above it
   without the intersection ratio ever changing, so the observer never
   fires and the element would stay invisible for good. A single sweep
   once scrolling settles catches those, and costs nothing while the
   page is actually moving. */
function sweep() {
  sweepTimer = 0;
  const limit = window.innerHeight * FOLD;
  for (const el of Array.from(tracked)) {
    if (el.getBoundingClientRect().top <= limit) show(el);
  }
}

function queueSweep() {
  if (sweepTimer) window.clearTimeout(sweepTimer);
  sweepTimer = window.setTimeout(sweep, 150);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", queueSweep, { passive: true });
  window.addEventListener("resize", queueSweep, { passive: true });
}

function unbind() {
  if (!bound) return;
  bound = false;
  window.removeEventListener("scroll", queueSweep);
  window.removeEventListener("resize", queueSweep);
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - FOLD) * 100)}% 0px`, threshold: 0 },
    );
  }
  return observer;
}

/** True when the element is already at or above the fold. */
export function inView(el: HTMLElement): boolean {
  return el.getBoundingClientRect().top <= window.innerHeight * FOLD;
}

/** Reveal `el` when it scrolls into view. Returns an unsubscribe. */
export function watch(el: HTMLElement): () => void {
  if (prefersReducedMotion()) {
    settle(el);
    return () => {};
  }
  tracked.add(el);
  bind();
  getObserver().observe(el);
  return () => {
    tracked.delete(el);
    observer?.unobserve(el);
  };
}
