"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PROCESS_STAGES } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import FaqBlock from "@/components/FaqBlock";
import EligibilityCheck from "@/components/EligibilityCheck";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { ClockIcon, DocIcon, ShieldIcon } from "@/components/Icons";

const PROMISE_ICONS = [DocIcon, ClockIcon, ShieldIcon];

const PROMISE_COPY = [
  {
    title: "Fees in writing, day one",
    desc: "Professional fees, government fees and third-party costs itemised before engagement. Nothing added later.",
  },
  {
    title: "No false timelines",
    desc: "We quote the timelines programs actually deliver, not the ones that close a sale.",
  },
  {
    title: "We decline weak cases",
    desc: "If we believe an application will fail, we will not submit it — and we tell you what would change our answer.",
  },
];

export default function HowItWorksPage() {
  const { t } = useLang();

  return (
    <div className="artboard">
      <SiteHeader active="why" />

      <section className="section-pad" style={{ background: "var(--sky)", padding: "128px 0" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t("How it works")}
          </span>
          <SplitText
            as="h1"
            className="h1-96"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1100 }}
            text={t("A clear process, from first call to approval.")}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560, margin: "0 0 32px" }}>
            {t(
              "Five stages. At each one you know exactly what we're doing, what it costs, and what you receive.",
            )}
          </p>
          <Link href="/contact" className="btn btn--primary hero-5" data-hero>
            {t("Book a Consultation")}
          </Link>
        </div>
      </section>

      {/* ---- The five stages ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div
          className="container grid-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "560px 1fr",
            gap: 96,
            alignItems: "start",
          }}
        >
          <div
            className="sticky-media"
            style={{
              position: "sticky",
              top: 104,
              height: 640,
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--sand)",
            }}
          >
            <ImageSlot placeholder="consultant and client reviewing a written timeline" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {PROCESS_STAGES.map((st) => (
              <Reveal
                key={st.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: 24,
                  padding: "0 0 48px",
                  marginBottom: 48,
                  borderBottom: "1px solid var(--stone)",
                }}
              >
                <div
                  className="serif"
                  style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {st.n}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="feature-title">{t(st.title)}</div>
                    <span className="kicker">{t(st.duration)}</span>
                  </div>
                  <p className="body-15" style={{ margin: "12px 0 16px", maxWidth: 560 }}>
                    {t(st.desc)}
                  </p>
                  <div
                    style={{
                      background: "var(--sand)",
                      borderRadius: 12,
                      padding: "16px 20px",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      maxWidth: 560,
                    }}
                  >
                    <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                      {t("You receive:")}
                    </strong>{" "}
                    {t(st.deliverable)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Promises, three-column mint variant ---- */}
      <section
        id="promises"
        className="section-pad"
        style={{ background: "var(--mint)", padding: "128px 0" }}
      >
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 64, maxWidth: 760 }}>
            {t("Our transparency promises")}
          </h2>
          <div
            className="promises-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {PROMISE_COPY.map((p, i) => {
              const IconEl = PROMISE_ICONS[i];
              return (
                <div
                  key={p.title}
                  style={{
                    padding:
                      i === 0 ? "0 32px 0 0" : i === PROMISE_COPY.length - 1 ? "0 0 0 32px" : "0 32px",
                    borderInlineStart: i === 0 ? "none" : "1px solid rgba(25,31,29,0.15)",
                  }}
                >
                  <IconEl />
                  <div className="feature-title" style={{ margin: "24px 0 12px" }}>
                    {t(p.title)}
                  </div>
                  <p className="body-15">{t(p.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EligibilityCheck />
      <FaqBlock set="business" />
      <CtaBand title="Start with stage one — it's free." button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
