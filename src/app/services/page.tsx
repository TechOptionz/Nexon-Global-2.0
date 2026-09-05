"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PRACTICES } from "@/data/services";
import { AUDIENCES } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import TestimonialBand from "@/components/TestimonialBand";
import { ArrowRight, Check, PeopleIcon } from "@/components/Icons";

export default function ServicesPage() {
  const { t } = useLang();

  return (
    <div className="artboard">
      <SiteHeader active="services" />

      <section className="section-pad" style={{ padding: "128px 0 96px" }}>
        <div className="container">
          <span className="eyebrow">{t("Services")}</span>
          <h1 className="h1-page" style={{ maxWidth: 1100 }}>
            {t("Four practices. One clear path abroad.")}
          </h1>
          <p className="lede" style={{ maxWidth: 560, margin: "0 0 32px" }}>
            {t(
              "Every engagement begins with an honest assessment of your options. We only recommend programs you genuinely qualify for.",
            )}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/#eligibility" className="btn btn--primary">
              {t("Check Your Eligibility")}
            </Link>
            <Link href="/contact" className="btn btn--secondary">
              {t("Speak to an Expert")}
            </Link>
          </div>
        </div>
      </section>

      {/* ---- The four practices in detail ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          {PRACTICES.map((pr) => (
            <div
              key={pr.id}
              id={pr.id}
              className="grid-collapse"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "start",
                background: "var(--sand)",
                borderRadius: 16,
                padding: 48,
                scrollMarginTop: 96,
              }}
            >
              <div>
                <div className="serif" style={{ fontSize: 16, lineHeight: 1, color: "var(--muted)" }}>
                  {pr.num}
                </div>
                <h2 className="h2-48" style={{ margin: "16px 0 20px" }}>
                  {t(pr.title)}
                </h2>
                <p className="lede" style={{ margin: "0 0 20px", maxWidth: 520 }}>
                  {t(pr.desc)}
                </p>
                <p className="body-14" style={{ margin: "0 0 32px" }}>
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    {t("Typical clients:")}
                  </strong>{" "}
                  {t(pr.clients)}
                </p>
                <Link href={pr.href} className="btn btn--primary">
                  {t(pr.cta)}
                </Link>
              </div>

              <div style={{ background: "var(--white)", borderRadius: 12, padding: 32 }}>
                <div className="kicker" style={{ marginBottom: 20 }}>
                  {t("What's included")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {pr.included.map((it) => (
                    <div
                      key={it}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ flex: "none", marginTop: 2 }}>
                        <Check size={20} />
                      </span>
                      <span>{t(it)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Who we serve ---- */}
      <section className="section-pad" style={{ background: "var(--sky)", padding: "128px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">{t("Who we serve")}</span>
            <h2 className="h2-64" style={{ margin: "20px auto 56px", maxWidth: 760 }}>
              {t("Who we serve")}
            </h2>
          </div>
          <div
            className="grid-collapse"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {AUDIENCES.map((au) => (
              <Link
                key={au.who}
                href="/#eligibility"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "var(--white)",
                  border: "1px solid var(--stone)",
                  borderRadius: 12,
                  padding: "20px 24px",
                  color: "var(--ink)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--stone)";
                }}
              >
                <PeopleIcon />
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>
                    {t(au.who)}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                      marginTop: 4,
                    }}
                  >
                    {t(au.need)}
                  </span>
                </span>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialBand variant="individual" tone="mint" />
      <CtaBand title="Not sure which practice fits your case?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
