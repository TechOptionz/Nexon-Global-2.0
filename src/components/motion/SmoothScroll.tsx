"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/lib/reveal";

type Controls = {
  /** Pause the smoothing — used while the mobile drawer owns the screen. */
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | HTMLElement | number) => void;
};

const SmoothScrollContext = createContext<Controls | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/** Distance to leave clear above an anchor target: the sticky header. */
function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return -((parseInt(raw, 10) || 72) + 24);
}

/**
 * Momentum scrolling for the whole document.
 *
 * Wheel and keyboard input are eased; touch is deliberately left to the
 * platform, so a phone keeps its native rubber-banding and its own
 * inertia rather than a JavaScript imitation of it. Lenis also honours
 * `prefers-reduced-motion` itself, and we skip it entirely in that case.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // Lerp rather than a fixed duration: the page keeps up with the
      // wheel instead of running a timed animation behind it.
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Touch devices keep their native scrolling untouched.
      syncTouch: false,
      touchMultiplier: 1,
      autoRaf: true,
      anchors: false,
      allowNestedScroll: true,
    });

    lenisRef.current = lenis;

    /* Anchor links are handled here rather than by Lenis' own `anchors`
       option, because Next's <Link href="/#id"> carries a pathname and
       would otherwise be routed instead of scrolled. Capture phase, so
       this runs before the router's own handler. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: headerOffset(),
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* A route change replaces the whole document height; tell Lenis so its
     scroll limit is right before the first wheel event arrives. */
  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  /* Stable across renders: consumers put it in effect dependencies. */
  const controls = useMemo<Controls>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
      scrollTo: (target) =>
        lenisRef.current?.scrollTo(target, { offset: headerOffset(), duration: 1.1 }),
    }),
    [],
  );

  return <SmoothScrollContext.Provider value={controls}>{children}</SmoothScrollContext.Provider>;
}
