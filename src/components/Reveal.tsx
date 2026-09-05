"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { inView, prefersReducedMotion, settle, watch } from "@/lib/reveal";

/** The entrances the design uses. See motion.css for each one. */
export type RevealVariant = "up" | "fade" | "rise" | "card" | "scale" | "start" | "end";

type Props = {
  /** Stagger in milliseconds, matching the artboards' data-reveal values. */
  delay?: number;
  /** Which entrance to use. Defaults to the artboards' fade-up. */
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Explicit scroll reveal, for content that wants a specific entrance or
 * a specific place in a sequence. Everything else on the page is
 * choreographed automatically by <ScrollMotion>, which skips anything
 * already inside one of these.
 *
 * Content that is on screen at mount appears immediately rather than
 * flashing in, and the shared watcher in lib/reveal handles viewport
 * jumps — an anchor link or a restored scroll position — that an
 * IntersectionObserver alone would miss.
 */
export default function Reveal({
  delay = 0,
  variant = "up",
  className = "",
  style,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || inView(el)) {
      settle(el);
      return;
    }
    return watch(el);
  }, []);

  return (
    <div
      ref={ref}
      className={className || undefined}
      data-anim={variant}
      style={{ ["--anim-delay" as string]: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
