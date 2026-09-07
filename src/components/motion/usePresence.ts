"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

/* ------------------------------------------------------------------
   Keep a component mounted long enough to animate itself out.

   React unmounts the moment a condition turns false, which is why a
   menu that fades in will otherwise vanish instantly. This holds the
   element in the tree for the length of its exit animation and reports
   which direction it is travelling, so the CSS can describe both.

   Under `prefers-reduced-motion` the wait is skipped entirely: the
   element leaves the instant it is asked to.

   The open/closed change is handled by adjusting state during render
   rather than in an effect — React's own pattern for deriving state
   from a changed input. It commits once, so the exit begins on the
   same frame the menu was dismissed instead of one frame later.
   ------------------------------------------------------------------ */

export type Presence = {
  /** Render the element while this is true. */
  present: boolean;
  /** True while it is on its way out — drive the exit animation from this. */
  leaving: boolean;
};

export function usePresence(open: boolean, exitMs: number): Presence {
  const [exiting, setExiting] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    setExiting(!open && !prefersReducedMotion());
  }

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => setExiting(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [exiting, exitMs]);

  return { present: open || exiting, leaving: !open && exiting };
}

/**
 * Remember the last truthy value, so content stays on screen while its
 * container animates out. Without it a menu would empty itself a frame
 * before it disappeared.
 */
export function useLastValue<T>(value: T): T {
  const [held, setHeld] = useState(value);
  if (value && value !== held) setHeld(value);
  return value || held;
}
