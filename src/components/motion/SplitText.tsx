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

  /* Split on the whitespace and keep it: the gaps stay outside the
     spans, so an inline-block word never glues itself to the next one
     and the line wraps exactly as it did before. */
  const parts: Array<{ chunk: string; wordDelay: number | null }> = [];
  let word = 0;
  for (const chunk of text.split(/(\s+)/)) {
    if (chunk.trim()) {
      parts.push({ chunk, wordDelay: delay + word * stagger });
      word += 1;
    } else if (chunk) {
      parts.push({ chunk, wordDelay: null });
    }
  }

  return (
    <Tag
      ref={ref}
      className={`split ${className}`.trim()}
      style={style}
      data-split-trigger={trigger}
    >
      {parts.map(({ chunk, wordDelay }, i) =>
        wordDelay === null ? (
          chunk
        ) : (
          <span
            key={i}
            className="split-word"
            style={{ ["--word-delay" as string]: `${wordDelay}ms` }}
          >
            {chunk}
          </span>
        ),
      )}
    </Tag>
  );
}
