"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { DESTINATIONS } from "@/data/destinations";
import { SERVICES, type Service } from "@/data/services";
import SiteHeader from "./SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "./SiteFooter";
import CtaBand from "./CtaBand";
import FaqBlock from "./FaqBlock";
import InsightsRow from "./InsightsRow";
import TestimonialBand from "./TestimonialBand";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";
import { useTrack } from "./useTrack";
import {
  DestinationCard,
  Marquee,
  PracticesGrid,
  PromisesForest,
  RequirementsNote,
  StatsRow,
} from "./Blocks";
import { ArrowLeft, ArrowRight, Icon } from "./Icons";

export default function ServiceView({ slug }: { slug: string }) {
  const { t } = useLang();
  const { ref: trackRef, prev: trackPrev, next: trackNext } = useTrack();
  const sv: Service = SERVICES[slug];

  return (
    <div className="artboard">
      <SiteHeader active="services" />

      {/* ---- Header, with the hero photo overlapping the tint ---- */}
      <section style={{ background: sv.tint, padding: "128px 0 0" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t(sv.tag)}
          </span>
          <SplitText
            as="h1"
            className="h1-page"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1000 }}
            text={t(sv.title)}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560, margin: "0 0 32px" }}>
            {t(sv.intro)}
          </p>
          <div className="hero-5" data-hero style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--primary">
              {t("Book a Consultation")}
            </Link>
            <Link href="#programs" className="btn btn--secondary">
              {t(sv.programsCta)}
            </Link>
          </div>
          <div
            className="service-hero"
            data-hero-media
            data-parallax
            style={{
              position: "relative",
              height: 420,
              margin: "80px 40px -160px",
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--sand)",
            }}
          >
            <ImageSlot placeholder={sv.photoHero} />
          </div>
        </div>
      </section>

      <div style={{ height: 160 }} />

      <section style={{ padding: "96px 0 0" }}>
        <div className="container">
          <StatsRow stats={sv.stats} />
        </div>
      </section>

      <Marquee style={{ marginTop: 128 }} />

      {/* ---- Programs ---- */}
      <section id="programs" className="section-pad" style={{ padding: "128px 0", scrollMarginTop: 72 }}>
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
            <div>
              <span className="eyebrow">{t("Destinations & programs")}</span>
              <h2 className="h2-64" style={{ margin: "20px 0 0", maxWidth: 760 }}>
                {t(sv.programsTitle)}
              </h2>
            </div>
            <Link href={sv.filterHref} className="btn btn--primary" style={{ flex: "none" }}>
              {t(sv.filterCta)}
            </Link>
          </div>

          <div className="program-flex" style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {sv.programs.map((k) => (
              <div key={k} style={{ flex: "0 0 calc((100% - 48px)/3)", minWidth: 260 }}>
                <DestinationCard d={DESTINATIONS[k]} showCta />
              </div>
            ))}
          </div>

          <RequirementsNote />
        </div>
      </section>

      {/* ---- What's included ---- */}
      <section className="section-pad" style={{ background: "var(--mint)", padding: "128px 0" }}>
        <div className="container">
          <h2 className="h2-48" style={{ marginBottom: 16 }}>
            {t("What's included")}
          </h2>
          <p className="lede" style={{ margin: "0 0 48px", maxWidth: 560 }}>
            {t("Typical clients:")} {t(sv.clients)}
          </p>

          <div ref={trackRef} className="track">
            {sv.included.map(([icon, text]) => (
              <Link
                key={text}
                href="/contact"
                className="white-card"
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
                  <Icon name={icon} />
                  <ArrowRight stroke="#191F1D" />
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 32, lineHeight: 1.05, marginTop: 48, textWrap: "balance" }}
                >
                  {t(text)}
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

      {/* ---- Process ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 64, maxWidth: 760 }}>
            {t(sv.processTitle)}
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
              <ImageSlot placeholder={sv.photoProcess} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}>
              {sv.steps.map(([title, desc], i) => (
                <Reveal
                  key={title}
                  delay={i * 100}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "64px 1fr",
                    gap: 16,
                    padding: i === 0 ? "0 0 32px" : "32px 0",
                    borderBottom:
                      i === sv.steps.length - 1 ? "1px solid transparent" : "1px solid var(--stone)",
                  }}
                >
                  <div
                    className="serif"
                    style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.02em" }}
                  >
                    {`0${i + 1}`}
                  </div>
                  <div>
                    <div className="feature-title">{t(title)}</div>
                    <p className="body-15" style={{ margin: "8px 0 0", maxWidth: 520 }}>
                      {t(desc)}
                    </p>
                  </div>
                </Reveal>
              ))}
              <Link
                href="/contact"
                className="btn btn--primary"
                style={{ alignSelf: "flex-start", marginTop: 40 }}
              >
                {t("Book a Consultation")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PromisesForest />
      <PracticesGrid />
      <TestimonialBand variant={sv.testimonial} tone="forest" />
      <FaqBlock set={sv.faq} />
      <InsightsRow />
      <CtaBand title="Not sure which program fits your case?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
