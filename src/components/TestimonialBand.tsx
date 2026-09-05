"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { testimonialSet } from "@/data/testimonials";
import { ArrowLeft, ArrowRight, WaveBg } from "./Icons";

type Props = {
  variant?: string;
  tone?: "forest" | "mint";
};

/** The oversized pull-quote band, in deep green or pale mint. */
export default function TestimonialBand({ variant = "individual", tone }: Props) {
  const { t } = useLang();
  const [i, setI] = useState(0);

  const list = testimonialSet(variant);
  const n = list.length;
  const idx = ((i % n) + n) % n;
  const q = list[idx];
  const isForest = (tone ?? (variant === "business" ? "forest" : "mint")) === "forest";
  const hasArrows = n > 1;

  return (
    <section
      className={`cq${isForest ? " forest-section" : ""}`}
      style={{
        background: isForest ? undefined : "var(--mint)",
        color: isForest ? "var(--white)" : "var(--ink)",
        padding: "clamp(72px,8.9cqw,128px) 0",
      }}
    >
      {isForest && <WaveBg />}

      <div className="container-wide" style={{ position: "relative" }}>
        <blockquote
          className="serif"
          style={{
            fontSize: "clamp(28px,3.6cqw,52px)",
            lineHeight: 1.1,
            margin: "0 0 48px",
            maxWidth: 900,
            textWrap: "pretty",
          }}
        >
          “{t(q.quote)}”
        </blockquote>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              borderInlineStart: `1px solid ${isForest ? "rgba(255,255,255,0.25)" : "rgba(25,31,29,0.25)"}`,
              paddingInlineStart: 16,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600 }}>{q.name}</div>
            <div
              style={{
                fontSize: 14,
                color: isForest ? "var(--on-forest)" : "var(--muted)",
                marginTop: 4,
              }}
            >
              {t(q.role)}
            </div>
          </div>

          {hasArrows && (
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                aria-label="Previous"
                className={`arrow-btn${isForest ? " arrow-btn--onforest" : ""}`}
                onClick={() => setI((v) => v - 1)}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Next"
                className={`arrow-btn${isForest ? " arrow-btn--onforest" : ""}`}
                onClick={() => setI((v) => v + 1)}
              >
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
