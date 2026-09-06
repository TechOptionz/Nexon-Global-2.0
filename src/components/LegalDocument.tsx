"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import type { LegalDoc } from "@/data/legal";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CtaBand from "./CtaBand";
import SplitText from "./motion/SplitText";
import Reveal from "./Reveal";

/* A heading becomes the current section once it rises past the reading
   line. The line has to sit *below* the point an anchor click parks a
   heading at — the sticky header plus the section's scroll margin —
   or following a link from the contents would land you in a section
   the contents still shows as the previous one. */
const READING_LINE_GAP = 150;

function readingLine() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return (parseInt(raw, 10) || 72) + READING_LINE_GAP;
}

type Props = { doc: LegalDoc; siblingHref: string; siblingLabel: string };

/**
 * The shared layout behind /privacy and /terms: an editorial hero, a
 * sticky table of contents, and the numbered sections themselves.
 * Both documents are plain data (see data/legal.ts) so the two pages
 * cannot drift apart in structure, only in content.
 */
export default function LegalDocument({ doc, siblingHref, siblingLabel }: Props) {
  const { t } = useLang();
  const [current, setCurrent] = useState(doc.sections[0]?.id ?? "");
  const frame = useRef(0);

  /* Which section you are reading is a question about scroll position,
     not about what is on screen: by the time a heading has left the
     viewport you are still inside its section. So rather than observe
     intersections, take the last heading to have crossed the reading
     line — and coalesce the work into one frame, since the smooth
     scroller emits a great many events per gesture. */
  useEffect(() => {
    const headings = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const line = readingLine();

    const measure = () => {
      frame.current = 0;
      let active = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) active = h;
        else break;
      }
      setCurrent(active.id);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(measure);
    };

    /* Scheduled rather than called: the first measurement is a paint
       concern, and it keeps this effect from setting state as it runs. */
    frame.current = window.requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [doc]);

  return (
    <div className="artboard">
      <SiteHeader />

      {/* ---- Hero ---- */}
      <section className="section-pad" style={{ background: "var(--sand)", padding: "128px 0 96px" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t(doc.eyebrow)}
          </span>
          <SplitText
            as="h1"
            className="h1-page"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1100 }}
            text={t(doc.title)}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 640, margin: "0 0 32px" }}>
            {t(doc.lede)}
          </p>
          <div className="legal-meta hero-5" data-hero>
            <span>
              {t("Last updated")} · {t(doc.updated)}
            </span>
            <span aria-hidden>·</span>
            <Link href={siblingHref}>{t(siblingLabel)}</Link>
          </div>
        </div>
      </section>

      {/* ---- Contents + document ---- */}
      <section className="section-pad" style={{ padding: "96px 0 128px" }}>
        <div
          className="container grid-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1fr)",
            gap: 96,
            alignItems: "start",
          }}
        >
          <nav className="legal-toc" aria-label={t("On this page")}>
            <div className="legal-toc__heading">{t("On this page")}</div>
            <ol className="legal-toc__list">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`legal-toc__link${current === s.id ? " is-current" : ""}`}
                    aria-current={current === s.id ? "true" : undefined}
                  >
                    <span className="legal-toc__num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t(s.title)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-body">
            {doc.sections.map((s, i) => (
              <Reveal key={s.id} variant="up" className="legal-section">
                <span className="legal-section__num">{String(i + 1).padStart(2, "0")}</span>
                <h2 id={s.id} className="h2-40 legal-section__title">
                  {t(s.title)}
                </h2>
                {s.blocks.map((b, bi) => {
                  if (b.kind === "h3") {
                    return (
                      <h3 key={bi} className="legal-h3">
                        {t(b.text)}
                      </h3>
                    );
                  }
                  if (b.kind === "list") {
                    return (
                      <ul key={bi} className="legal-list">
                        {b.items.map((item) => (
                          <li key={item}>{t(item)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={bi} className="legal-p">
                      {t(b.text)}
                    </p>
                  );
                })}
              </Reveal>
            ))}

            <Reveal variant="up" className="legal-note">
              <p className="legal-p" style={{ margin: 0 }}>
                {t(
                  "This page is written for clarity, not to cover us. If any part of it is unclear, ask your consultant and you will get a straight answer in writing.",
                )}
              </p>
              <div className="legal-note__contact">
                <a href={SITE.emailHref}>{SITE.email}</a>
                <span aria-hidden>·</span>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Still have a question?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
