"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import InsightsRow from "@/components/InsightsRow";
import TestimonialBand from "@/components/TestimonialBand";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { useTrack } from "@/components/useTrack";
import { CredentialsBand, TeamGrid } from "@/components/Blocks";
import {
  ArrowLeft,
  ArrowRight,
  ChatIcon,
  DocIcon,
  PeopleIcon,
  ShieldIcon,
  WaveBg,
} from "@/components/Icons";

const CHAPTERS = [
  {
    num: "01",
    slot: "origins",
    photo: "archival photo — the founders’ first Gulf office",
    caption: "Part 1 of 3",
    text: "NEXON was founded by consultants who spent a combined twenty years inside investment-migration firms and skilled-visa practices across the Gulf. We saw what worked — and what clients were never told.",
  },
  {
    num: "02",
    slot: "promise",
    photo: "a written fee schedule on a desk",
    caption: "Part 2 of 3",
    text: "So we built a consultancy around written fee schedules, realistic timelines, and government-authorised programs only. Every file is handled by a named consultant you can call, in English or Arabic, from first meeting to final approval.",
  },
  {
    num: "03",
    slot: "today",
    photo: "the team at the Business Bay office",
    caption: "Part 3 of 3",
    text: "Today we advise individuals, families, investors, entrepreneurs and skilled professionals across 35+ residency and citizenship programs worldwide.",
  },
];

const AUDIENCE_CARDS = [
  {
    slot: "individuals",
    who: "Individuals",
    need: "A second residency or passport as a plan B and travel freedom.",
    photo: "traveller with passport at the gate",
  },
  {
    slot: "families",
    who: "Families",
    need: "Education, healthcare and a secure future in one application.",
    photo: "family embracing at arrivals",
  },
  {
    slot: "investors",
    who: "Investors",
    need: "Programs that protect capital and open new markets.",
    photo: "investor reviewing documents",
  },
  {
    slot: "entrepreneurs",
    who: "Entrepreneurs",
    need: "Relocating a business and team with minimal disruption.",
    photo: "founders in a bright Dubai office",
  },
  {
    slot: "professionals",
    who: "Skilled professionals",
    need: "Points-based visas that turn experience into permanent residency.",
    photo: "engineer at work",
  },
];

const VALUES = [
  {
    Icon: DocIcon,
    title: "Transparency first",
    desc: "Written fee schedules and engagement terms before you commit a dirham. No hidden charges, ever.",
  },
  {
    Icon: ShieldIcon,
    title: "Authorised programs only",
    desc: "We work exclusively with official, legally established residency and citizenship routes.",
  },
  {
    Icon: ChatIcon,
    title: "Honesty over sales",
    desc: "If your profile is not ready, we say so — and tell you exactly what would change the answer.",
  },
  {
    Icon: PeopleIcon,
    title: "One consultant, end to end",
    desc: "A named advisor owns your file from first meeting to approval. You always know who to call.",
  },
];

export default function AboutPage() {
  const { t } = useLang();
  const [chapter, setChapter] = useState(0);
  const { ref: trackRef, prev: trackPrev, next: trackNext } = useTrack();

  const n = CHAPTERS.length;
  const ch = CHAPTERS[((chapter % n) + n) % n];

  return (
    <div className="artboard">
      <SiteHeader active="why" />

      <section style={{ padding: "128px 0 0" }}>
        <div className="container">
          <span className="eyebrow hero-1" data-hero>
            {t("Why NEXON")}
          </span>
          <SplitText
            as="h1"
            className="h1-96"
            delay={170}
            stagger={45}
            style={{ maxWidth: 1100 }}
            text={t("Built in Dubai on a simple promise: honest migration advice.")}
          />
          <p className="lede hero-4" data-hero style={{ maxWidth: 560, margin: "0 0 32px" }}>
            {t(
              "NEXON Global Immigration Services exists because too many families receive vague timelines, hidden fees and programs they were never going to qualify for. We set out to do the opposite.",
            )}
          </p>
          <div className="hero-5" data-hero style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--primary">
              {t("Book a Consultation")}
            </Link>
            <Link href="/how-it-works" className="btn btn--secondary">
              {t("How It Works")}
            </Link>
          </div>
          <div
            className="hover-media"
            style={{
              position: "relative",
              height: 360,
              margin: "80px 40px 0",
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--sand)",
            }}
          >
            <ImageSlot
              placeholder="photo collage — families travelling"
              src="/assets/airport-collage.jpg"
            />
          </div>
        </div>
      </section>

      {/* ---- Our story, as a three-chapter carousel ---- */}
      <section
        className="forest-section section-pad"
        style={{ padding: "128px 0", marginTop: 128 }}
      >
        <WaveBg />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow eyebrow--light">{t("Our story")}</span>
          <h2 className="h2-64" style={{ margin: "20px 0 64px", maxWidth: 760 }}>
            {t("Our story")}
          </h2>
          <div
            className="grid-collapse"
            style={{
              display: "grid",
              gridTemplateColumns: "520px 1fr",
              gap: 96,
              alignItems: "center",
            }}
          >
            <div
              className="hover-media story-figure"
              style={{
                position: "relative",
                height: 520,
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--sand)",
              }}
            >
              <ImageSlot placeholder={ch.photo} />
            </div>
            <div>
              <div
                className="serif story-num"
                style={{
                  fontSize: "clamp(72px, 8.3vw, 120px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {ch.num}
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--on-forest)",
                  margin: "24px 0 16px",
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                {t(ch.text)}
              </p>
              <div className="stat-label">{t(ch.caption)}</div>
              <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
                <button
                  type="button"
                  className="arrow-btn arrow-btn--onforest"
                  aria-label="Previous"
                  onClick={() => setChapter((c) => c - 1)}
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  className="arrow-btn arrow-btn--onforest"
                  aria-label="Next"
                  onClick={() => setChapter((c) => c + 1)}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Who we serve ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">{t("Who we serve")}</span>
            <h2 className="h2-64" style={{ margin: "20px auto 56px", maxWidth: 760 }}>
              {t("Who we serve")}
            </h2>
          </div>

          <div ref={trackRef} className="track">
            {AUDIENCE_CARDS.map((au) => (
              <Link
                key={au.slot}
                href="/contact"
                className="photo-card"
                style={{ flex: "0 0 calc((100% - 48px)/3)", minWidth: 260, height: 480 }}
              >
                <ImageSlot placeholder={au.photo} className="photo-card__media" />
                <div className="card-scrim" />
                <div className="card-body">
                  <span className="pill-frosted">{t(au.who)}</span>
                  <div className="card-title-36" style={{ marginTop: 12 }}>
                    {t(au.need)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 40 }}>
            <button type="button" className="arrow-btn" aria-label="Previous" onClick={trackPrev}>
              <ArrowLeft />
            </button>
            <button type="button" className="arrow-btn" aria-label="Next" onClick={trackNext}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ---- What we hold ourselves to ---- */}
      <section className="section-pad" style={{ padding: "24px 0 128px" }}>
        <div className="container">
          <div className="standards-head">
            <div>
              <span className="eyebrow">{t("Our standards")}</span>
              <h2 className="h2-64" style={{ margin: "20px 0 0", maxWidth: 620 }}>
                {t("What we hold ourselves to")}
              </h2>
            </div>
          </div>

          <div className="standards-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="standards-card">
                <div className="standards-card__top">
                  <span className="standards-card__badge">
                    <v.Icon size={22} />
                  </span>
                  <span className="standards-card__num">{`0${i + 1}`}</span>
                </div>
                <h3 className="feature-title standards-card__title">{t(v.title)}</h3>
                <p className="body-15">{t(v.desc)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialBand variant="individual" tone="mint" />
      <CredentialsBand />

      {/* ---- Advisors ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">{t("Your advisors")}</span>
            <h2 className="h2-64" style={{ margin: "20px auto 56px", maxWidth: 760 }}>
              {t("The people behind every application")}
            </h2>
          </div>
          <TeamGrid height={520} linked={false} />
        </div>
      </section>

      <CtaBand title="Meet us before you decide anything." button="Book a Consultation" />
      <InsightsRow />
      <SiteFooter />
    </div>
  );
}
