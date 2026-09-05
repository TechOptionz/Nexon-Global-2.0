"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ARTICLES } from "@/data/articles";
import ImageSlot from "./ImageSlot";
import { ArrowLeft, ArrowRight } from "./Icons";
import { useTrack } from "./useTrack";

/** "Latest from our desk" — the article carousel shared by four pages. */
export default function InsightsRow() {
  const { lang, t } = useLang();
  const { ref, prev, next } = useTrack();

  return (
    <section
      className="cq"
      style={{ background: "var(--white)", padding: "clamp(72px,8.9cqw,128px) 0" }}
    >
      <div className="container-wide">
        <span className="eyebrow">{t("Insights")}</span>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(40px,4.4cqw,64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            margin: "20px 0 48px",
            maxWidth: 760,
            textWrap: "balance",
          }}
        >
          {t("Latest from our desk")}
        </h2>

        <div ref={ref} className="track" style={{ paddingBottom: 4 }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={a.href}
              className="photo-card"
              style={{
                flex: "0 0 min(100%, max(280px, calc((100% - 48px)/3)))",
                height: 480,
              }}
            >
              <ImageSlot placeholder={a.photo} className="photo-card__media" />
              <div className="card-scrim" />
              <div className="card-body">
                <span className="pill-frosted">{a.tag[lang]}</span>
                <div className="card-title-32" style={{ margin: "12px 0 8px" }}>
                  {a.title[lang]}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>{a.excerpt[lang]}</div>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 40,
          }}
        >
          <Link href="/insights" className="btn btn--primary">
            {t("All articles")}
          </Link>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" className="arrow-btn" aria-label="Previous" onClick={prev}>
              <ArrowLeft />
            </button>
            <button type="button" className="arrow-btn" aria-label="Next" onClick={next}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
