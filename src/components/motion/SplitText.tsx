"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";
import { inView, prefersReducedMotion, settle, watch } from "@/lib/reveal";

type Props = {
  /** The line to reveal. Already translated by the caller. */
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** `load` runs on first paint (heroes); `scroll` waits for the fold. */
  trigger?: "load" | "scroll";
  /** Gap between words, in milliseconds. */
  stagger?: number;
  /** Delay before the first word. */
  delay?: number;
};

/**
 * A heading that arrives a word at a time.
 *
 * The words are ordinary React children rather than spans spliced into
 * the DOM after the fact, so switching language simply re-renders them
 * — there is no detached node for React to trip over. Because each
 * word is `inline-block`, the spaces between them are left outside the
 * spans so the line still wraps naturally, in either direction.
 *
 * Use it for display headings. Body copy gets a plain fade.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  style,
  trigger = "load",
  stagger = 55,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || trigger !== "scroll") return;
    if (prefersReducedMotion() || inView(el)) {
      settle(el);
      return;
    }
    return watch(el);
  }, [trigger, text]);

  const words = text.split(/(\s+)/);
  let index = 0;

  return (
    <Tag
      ref={ref}
      className={`split ${className}`.trim()}
      style={style}
      data-split-trigger={trigger}
    >
      {words.map((chunk, i) => {
        if (!chunk.trim()) return chunk;
        const wordDelay = delay + index * stagger;
        index += 1;
        return (
          <span
            key={i}
            className="split-word"
            style={{ ["--word-delay" as string]: `${wordDelay}ms` }}
          >
            {chunk}
          </span>
        );
      })}
    </Tag>
  );
}
