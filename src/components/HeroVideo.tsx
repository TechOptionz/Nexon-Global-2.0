"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** First frame, shown until the video is ready and whenever it is paused. */
  poster: string;
  className?: string;
};

/** Runs `fn` once the page is idle, so the loop never competes with the
 *  first screen's images for bandwidth. Falls back to a short timer where
 *  `requestIdleCallback` is missing (Safari). */
function whenIdle(fn: () => void): () => void {
  const ric = window.requestIdleCallback;
  if (ric) {
    const id = ric(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(fn, 600);
  return () => window.clearTimeout(id);
}

/**
 * The hero's moving backdrop. Purely decorative — muted, looping and hidden
 * from assistive tech — so it carries no controls and no caption track.
 * Under `prefers-reduced-motion` it holds on the poster frame instead.
 *
 * The file is attached from JavaScript rather than through a `src` attribute:
 * a `<video autoplay>` in the markup starts downloading during the initial
 * parse, ahead of the images the visitor is actually looking at. Attaching it
 * once the page goes idle keeps the poster on screen either way.
 */
export default function HeroVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelIdle: (() => void) | undefined;

    const apply = () => {
      if (reduced.matches) {
        el.pause();
        el.currentTime = 0;
        return;
      }
      cancelIdle?.();
      cancelIdle = whenIdle(() => {
        if (!el.src) el.src = src;
        /* Autoplay can still be refused (low-power mode, data saver);
           the poster remains, which is the correct fallback. */
        void el.play().catch(() => {});
      });
    };

    apply();
    reduced.addEventListener("change", apply);
    return () => {
      cancelIdle?.();
      reduced.removeEventListener("change", apply);
    };
  }, [src]);

  return (
    <div className={`hero-video ${className}`.trim()}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
