"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** First frame, shown until the video is ready and whenever it is paused. */
  poster: string;
  className?: string;
};

/**
 * The hero's moving backdrop. Purely decorative — muted, looping and hidden
 * from assistive tech — so it carries no controls and no caption track.
 * Under `prefers-reduced-motion` it holds on the poster frame instead.
 */
export default function HeroVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduced.matches) {
        el.pause();
        el.currentTime = 0;
      } else {
        /* Autoplay can still be refused (low-power mode, data saver);
           the poster remains, which is the correct fallback. */
        void el.play().catch(() => {});
      }
    };

    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, []);

  return (
    <div className={`hero-video ${className}`.trim()}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
