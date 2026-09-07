"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

/* ------------------------------------------------------------------
   Magnetic wrapper for the primary calls to action.

   The element leans a few pixels toward the cursor and eases back when
   it leaves. It is a pointer-only enhancement layered on top of a
   button that is already complete without it: nothing here changes
   layout, size, or what the button does, and the button keeps its own
   hover lift and press — the two transforms simply compose, because
   they sit on different elements.

   Switched off entirely for touch, coarse pointers and anyone who has
   asked for reduced motion.
   ------------------------------------------------------------------ */

/** Furthest the element will ever travel from rest, in pixels. */
const MAX = 6;
/** Fraction of the cursor's offset the element follows. */
const PULL = 0.28;
/** Per-frame approach to the target. Higher is snappier. */
const EASE = 0.18;
/** Below this, the remaining distance is not worth another frame. */
const REST = 0.08;

function clamp(v: number) {
  return Math.max(-MAX, Math.min(MAX, v));
}

export default function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || prefersReducedMotion()) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    /* The rect is measured once on entry rather than on every pointer
       event: reading layout mid-frame, straight after the previous
       frame wrote a transform, forces a synchronous reflow. The element
       moves at most MAX pixels, so a cached rect stays accurate. */
    let rect: DOMRect | null = null;

    const tick = () => {
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;

      const settled = Math.abs(tx - x) < REST && Math.abs(ty - y) < REST;
      if (settled) {
        x = tx;
        y = ty;
      }

      el.style.transform = x || y ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` : "";

      if (settled) {
        raf = 0;
        // Back at rest and no longer moving: hand the layer back.
        if (!tx && !ty) el.style.willChange = "";
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const run = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.style.willChange = "transform";
    };

    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      tx = clamp((e.clientX - (rect.left + rect.width / 2)) * PULL);
      ty = clamp((e.clientY - (rect.top + rect.height / 2)) * PULL);
      run();
    };

    const onLeave = () => {
      rect = null;
      tx = 0;
      ty = 0;
      run();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    /* A press or a route change can take the cursor away without a
       leave event ever firing; both would otherwise strand the offset. */
    el.addEventListener("pointercancel", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, []);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
