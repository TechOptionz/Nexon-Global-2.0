"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { BUSINESS_SERVICES } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import FaqBlock from "@/components/FaqBlock";
import InsightsRow from "@/components/InsightsRow";
import TestimonialBand from "@/components/TestimonialBand";
import ImageSlot from "@/components/ImageSlot";
import { useTrack } from "@/components/useTrack";
import { FeatureRow, Marquee, PracticesGrid } from "@/components/Blocks";
import { ArrowLeft, ArrowRight, ClockIcon, DocIcon, ShieldIcon } from "@/components/Icons";

export default function ForBusinessPage() {
  const { t } = useLang();
  const { ref: trackRef, prev: trackPrev, next: trackNext } = useTrack();

  return (
    <div className="artboard">
      <SiteHeader active="services" />

      <section style={{ background: "var(--sky)", padding: "128px 0 0" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t("For business")}
          </span>
          <SplitText
            as="h1"
            className="h1-page"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1000 }}
            text={t("Corporate & Global Mobility")}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560, margin: "0 0 32px" }}>
            {t(
              "Relocation of founders, executives and whole teams. Company setup, work permits and dependent visas handled end to end, with UAE free-zone expertise.",
            )}
          </p>
          <Link href="/contact" className="btn btn--primary hero-5" data-hero>
            {t("Book a Consultation")}
          </Link>
          <div
            className="service-hero"
            style={{
              position: "relative",
              height: 420,
              margin: "80px 40px -160px",
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--sand)",
            }}
          >
            <ImageSlot placeholder="founders and team in a Dubai free-zone office" />
          </div>
        </div>
      </section>

      <div style={{ height: 160 }} />

      <Marquee style={{ marginTop: 64 }} />

      {/* ---- Transparency promises, sticky-photo variant ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 64, maxWidth: 760 }}>
            {t("Our transparency promises")}
          </h2>
          <div
            className="grid-collapse"
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
                height: 560,
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--sand)",
              }}
            >
              <ImageSlot placeholder="consultant reviewing a fee schedule with a client" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, paddingTop: 8 }}>
              <FeatureRow
                icon={<DocIcon />}
                title="Fees in writing, day one"
                desc="Professional fees, government fees and third-party costs itemised before engagement. Nothing added later."
              />
              <FeatureRow
                icon={<ClockIcon />}
                delay={120}
                title="No false timelines"
                desc="We quote the timelines programs actually deliver, not the ones that close a sale."
              />
              <FeatureRow
                icon={<ShieldIcon />}
                delay={240}
                title="We decline weak cases"
                desc="If we believe an application will fail, we will not submit it — and we tell you what would change our answer."
              />
              <Link href="/contact" className="btn btn--primary" style={{ alignSelf: "flex-start" }}>
                {t("Book a Consultation")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- What's included ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div className="container">
          <h2 className="h2-48" style={{ marginBottom: 16 }}>
            {t("What's included")}
          </h2>
          <p className="lede" style={{ margin: "0 0 48px", maxWidth: 560 }}>
            {t("Typical clients: Startups, family offices, expanding SMEs")}
          </p>

          <div ref={trackRef} className="track">
            {BUSINESS_SERVICES.map((s) => (
              <Link
                key={s}
                href="/contact"
                className="sand-card"
                style={{ flex: "0 0 calc((100% - 72px)/4)", minWidth: 240, minHeight: 300 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "auto",
                  }}
                >
                  <DocIcon />
                  <ArrowRight stroke="#191F1D" />
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 32, lineHeight: 1.05, marginTop: 48, textWrap: "balance" }}
                >
                  {t(s)}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            <button type="button" className="arrow-btn" aria-label="Previous" onClick={trackPrev}>
              <ArrowLeft />
            </button>
            <button type="button" className="arrow-btn" aria-label="Next" onClick={trackNext}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      <PracticesGrid />
      <TestimonialBand variant="business" tone="forest" />
      <FaqBlock set="business" />
      <InsightsRow />
      <CtaBand title="Not sure which practice fits your case?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
