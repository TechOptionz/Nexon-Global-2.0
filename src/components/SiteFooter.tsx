"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { inView, prefersReducedMotion, settle, watch } from "@/lib/reveal";
import { useLang } from "@/lib/i18n";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import { ChevronDown } from "./Icons";

const WORDMARK = "NEXON".split("");
const SUBMARK = "GLOBAL IMMIGRATION".split("");

/* Letter-by-letter timings for the footer wordmark. The sub-line steps
   faster and starts before NEXON has finished landing, so the two
   lines read as one gesture rather than two separate ones. The last
   letter must settle inside reveal.ts's SETTLE_MS (1700ms), after
   which the transition is torn down: 220 + 16 * 28 + 820 = 1488ms. */
const LETTER_STEP = 74;
const SUB_STEP = 28;
const SUB_LEAD = 220;

export default function SiteFooter() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <footer className="site-footer">
      {/* ---- Desktop ---- */}
      <div className="footer-desktop" style={{ padding: "96px 0 40px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 32 }}>
            {FOOTER_COLUMNS.map((c) => (
              <div key={c.heading}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {t(c.heading)}
                </div>
                <div className="footer-col-links">
                  {c.links.map((l) => (
                    <Link key={l.label} href={l.href}>
                      {t(l.label)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Wordmark big />

          <div
            className="footer-legal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: 24,
              fontSize: 14,
              color: "var(--on-ink)",
              flexWrap: "wrap",
            }}
          >
            <span>{t(SITE.copyright)}</span>
            <div style={{ display: "flex", gap: 24 }}>
              <Link href="#">{t("Privacy Policy")}</Link>
              <Link href="#">{t("Terms")}</Link>
              <Link href="/contact">{t("Contact")}</Link>
            </div>
          </div>

          <p
            style={{
              fontSize: 12,
              lineHeight: 1.6,
              color: "var(--on-ink)",
              maxWidth: 960,
              margin: "24px 0 0",
            }}
          >
            {t(SITE.licence)}
          </p>

          <div
            className="footer-legal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              marginTop: 40,
              fontSize: 14,
              color: "var(--on-ink)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span>{t(SITE.address)}</span>
              <span>·</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <span>·</span>
              <a href={SITE.emailHref}>{SITE.email}</a>
            </div>
            <span>English · العربية</span>
          </div>
        </div>
      </div>

      {/* ---- Mobile ---- */}
      <div className="footer-mobile" style={{ padding: "64px 24px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          {FOOTER_COLUMNS.map((c, i) => {
            const isOpen = open === i;
            return (
              <div key={c.heading} style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 56,
                    background: "none",
                    border: 0,
                    padding: 0,
                    color: "var(--white)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    textAlign: "start",
                  }}
                >
                  <span>{t(c.heading)}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      transition: "transform 0.32s var(--ease-premium)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                {/* Kept mounted so the column can grow rather than jump. */}
                <div className={`acc-panel${isOpen ? " is-open" : ""}`} inert={!isOpen}>
                  <div className="acc-inner">
                    <div className="footer-col-links" style={{ margin: "0 0 20px" }}>
                      {c.links.map((l) => (
                        <Link key={l.label} href={l.href}>
                          {t(l.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Wordmark />

        <div
          className="footer-legal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 24,
            fontSize: 14,
            color: "var(--on-ink)",
          }}
        >
          <span>{t(SITE.copyright)}</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="#">{t("Privacy Policy")}</Link>
            <Link href="#">{t("Terms")}</Link>
            <Link href="/contact">{t("Contact")}</Link>
          </div>
        </div>

        <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--on-ink)", margin: "24px 0 0" }}>
          {t(SITE.licence)}
        </p>

        <div
          className="footer-legal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 32,
            fontSize: 14,
            color: "var(--on-ink)",
            lineHeight: 1.5,
          }}
        >
          <span>{t(SITE.address)}</span>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <a href={SITE.emailHref}>{SITE.email}</a>
          <span style={{ marginTop: 8 }}>English · العربية</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * The letter-spread wordmark that anchors the footer.
 *
 * Each letter sits in its own mask and drops in from above, one after
 * the next, so the mark assembles itself as the footer arrives. The
 * spacer between the two sub-line words is left outside the masks — it
 * carries no glyph, so animating it would only cost a beat.
 */
function Wordmark({ big = false }: { big?: boolean }) {
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

  let sub = 0;

  return (
    <div
      ref={ref}
      className="wordmark"
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "var(--sky-mid)",
        margin: big ? "96px 0 48px" : "56px 0 32px",
        userSelect: "none",
        lineHeight: 1,
      }}
    >
      <div className="wordmark-row" style={{ fontSize: big ? "clamp(72px, 16.4vw, 236px)" : 84 }}>
        {WORDMARK.map((c, i) => (
          <span
            key={i}
            className="wordmark-letter"
            style={{
              ["--letter-delay" as string]: `${i * LETTER_STEP}ms`,
              ...(c === "X" ? { color: "var(--deep-red-on-ink)" } : null),
            }}
          >
            <span>{c}</span>
          </span>
        ))}
      </div>
      <div
        className="wordmark-row"
        style={{ fontSize: big ? "clamp(13px, 2.64vw, 38px)" : 15, marginTop: big ? 24 : 12 }}
      >
        {SUBMARK.map((c, i) =>
          c === " " ? (
            <span key={i} style={{ width: "0.5em" }} />
          ) : (
            <span
              key={i}
              className="wordmark-letter"
              style={{ ["--letter-delay" as string]: `${SUB_LEAD + sub++ * SUB_STEP}ms` }}
            >
              <span>{c}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
