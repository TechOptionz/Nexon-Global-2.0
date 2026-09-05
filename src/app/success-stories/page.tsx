"use client";

import { useLang } from "@/lib/i18n";
import { CASE_STUDIES, REVIEW_QUOTES } from "@/data/testimonials";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { StarIcon, WaveBgCard } from "@/components/Icons";

export default function SuccessStoriesPage() {
  const { t } = useLang();

  return (
    <div className="artboard">
      <SiteHeader active="why" />

      <section className="section-pad" style={{ padding: "128px 0 96px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow hero-1" data-hero>
            {t("Success stories")}
          </span>
          <SplitText
            as="h1"
            className="h1-page"
            delay={170}
            stagger={45}
            style={{ margin: "24px auto", maxWidth: 1000 }}
            text={t("Families who made the move.")}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560, margin: "0 auto" }}>
            {t("Names abbreviated for privacy. Programs, timelines and outcomes as delivered.")}
          </p>
        </div>
      </section>

      {/* ---- Case studies ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div
          className="container grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {CASE_STUDIES.map((c) => (
            <div
              key={c.title}
              className="forest-section"
              style={{
                borderRadius: 16,
                padding: 48,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <WaveBgCard />
              <div
                className="stat-label"
                style={{ position: "relative", color: "var(--on-forest)" }}
              >
                {t("Case study")} · {t(c.tag)}
              </div>
              <h2 className="h2-40" style={{ position: "relative" }}>
                {t(c.title)}
              </h2>
              <p
                style={{
                  position: "relative",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--on-forest)",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                {t(c.body)}
              </p>
              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 16,
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: 24,
                  marginTop: "auto",
                }}
              >
                {c.facts.map((f) => (
                  <div key={f.k}>
                    <div
                      className="serif"
                      style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {f.v}
                    </div>
                    <div
                      className="stat-label"
                      style={{ color: "var(--on-forest)", marginTop: 10 }}
                    >
                      {t(f.k)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="section-pad" style={{ background: "var(--sand)", padding: "128px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              marginBottom: 56,
              flexWrap: "wrap",
            }}
          >
            <h2 className="h2-64" style={{ maxWidth: 760 }}>
              {t("What clients say")}
            </h2>
            <div
              style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--muted)" }}
            >
              <span style={{ display: "inline-flex", gap: 2, color: "var(--forest)" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span>{t("4.9 average · verified reviews")}</span>
            </div>
          </div>

          <div
            className="grid-collapse"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {REVIEW_QUOTES.map((q) => (
              <figure
                key={q.name + q.program}
                style={{
                  background: "var(--white)",
                  borderRadius: 16,
                  padding: 32,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <blockquote
                  className="serif"
                  style={{ margin: 0, fontSize: 28, lineHeight: 1.15, textWrap: "pretty" }}
                >
                  “{t(q.quote)}”
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "auto",
                    borderInlineStart: "1px solid var(--stone)",
                    paddingInlineStart: 16,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{q.name}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
                    {t(q.program)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your story could be next." button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
