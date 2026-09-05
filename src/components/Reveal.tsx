"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ------------------------------------------------------------------
   A single shared watcher drives every reveal on the page.

   An IntersectionObserver alone is not enough: if the viewport jumps
   past an element (anchor links, restored scroll position, a
   full-page screenshot pass) the element never registers as
   intersecting and would stay invisible for good. So the watcher
   re-checks positions on scroll and resize and reveals anything at or
   above the fold, which also covers elements scrolled past entirely.
   ------------------------------------------------------------------ */

type Entry = { el: HTMLElement; show: () => void };

const watched = new Set<Entry>();
let frame = 0;
let listening = false;

function check() {
  frame = 0;
  const limit = window.innerHeight * 0.92;
  watched.forEach((entry) => {
    if (entry.el.getBoundingClientRect().top <= limit) {
      entry.show();
      watched.delete(entry);
    }
  });
  if (watched.size === 0) stop();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(check);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

function watch(entry: Entry) {
  watched.add(entry);
  start();
  schedule();
  return () => {
    watched.delete(entry);
    if (watched.size === 0) stop();
  };
}

type Props = {
  /** Stagger in milliseconds, matching the artboards' data-reveal values. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * The scroll-in animation from the artboards: content fades up 20px as
 * it enters the viewport. Anything already on screen at mount appears
 * immediately rather than flashing in.
 */
export default function Reveal({ delay = 0, className = "", style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already at or above the fold on first paint — no animation.
    if (el.getBoundingClientRect().top <= window.innerHeight) {
      setVisible(true);
      return;
    }

    return watch({ el, show: () => setVisible(true) });
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
