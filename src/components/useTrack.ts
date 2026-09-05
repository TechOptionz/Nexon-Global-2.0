"use client";

import { useCallback, useRef } from "react";

/**
 * Drives the horizontal snap carousels. Scrolls by exactly one card
 * width plus the 24px gutter, matching the artboards' arrow behaviour.
 */
export function useTrack<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.firstElementChild;
    if (!el || !first) return;
    const step = first.getBoundingClientRect().width + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const prev = useCallback(() => scrollBy(-1), [scrollBy]);
  const next = useCallback(() => scrollBy(1), [scrollBy]);

  return { ref, prev, next };
}
