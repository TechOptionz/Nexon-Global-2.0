"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ARTICLES } from "@/data/articles";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import ImageSlot from "@/components/ImageSlot";

export default function InsightsPage() {
  const { lang, t } = useLang();

  const [featured, ...rest] = ARTICLES;

  return (
    <div className="artboard">
      <SiteHeader active="resources" />

      <section style={{ padding: "128px 0 64px" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t("Insights")}
          </span>
          <SplitText
            as="h1"
            className="h1-96"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1100 }}
            text={t("Migration, explained without the sales pitch.")}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560 }}>
            {t("Program changes, comparisons and practical guides from our consultants.")}
          </p>
        </div>
      </section>

      {/* ---- Featured article ---- */}
      <section style={{ padding: "0 0 64px" }}>
        <div className="container">
          <Link
            href={featured.href}
            className="featured-card grid-collapse"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--sand)",
              borderRadius: 16,
              overflow: "hidden",
              color: "var(--ink)",
            }}
          >
            <div style={{ position: "relative", minHeight: 480, color: "var(--muted-slot)" }}>
              <ImageSlot placeholder={featured.photo} />
            </div>
            <div
              className="featured-card__body"
              style={{
                padding: 64,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span className="eyebrow" style={{ alignSelf: "flex-start" }}>
                {t("Featured")} · {featured.tag[lang]}
              </span>
              <div
                className="serif"
                style={{
                  fontSize: 48,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  margin: "24px 0 16px",
                  textWrap: "balance",
                }}
              >
                {featured.title[lang]}
              </div>
              <p className="lede" style={{ margin: "0 0 24px" }}>
                {featured.excerpt[lang]}
              </p>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>
                {t("By")} {featured.author[lang]} · {featured.date[lang]} ·{" "}
                {featured.readMins ?? 5} {t("min read")}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---- The rest ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div
          className="container grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {rest.map((a) => (
            <Link key={a.slug} href={a.href} className="photo-card" style={{ height: 480 }}>
              <ImageSlot placeholder={a.photo} className="photo-card__media" />
              <div className="card-scrim" />
              <div className="card-body">
                <span className="pill-frosted">
                  {a.tag[lang]} · {a.date[lang]}
                </span>
                <div className="card-title-32" style={{ margin: "12px 0 8px" }}>
                  {a.title[lang]}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>{a.excerpt[lang]}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Prefer answers specific to your case?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
