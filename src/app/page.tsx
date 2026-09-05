"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { DESTINATION_LIST } from "@/data/destinations";
import { PRACTICES } from "@/data/services";
import { PROCESS_STEPS, SITE } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import FaqBlock from "@/components/FaqBlock";
import InsightsRow from "@/components/InsightsRow";
import TestimonialBand from "@/components/TestimonialBand";
import EligibilityCheck from "@/components/EligibilityCheck";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/motion/SplitText";
import { useTrack } from "@/components/useTrack";
import {
  CredentialsBand,
  DestinationCard,
  FeatureRow,
  Marquee,
  TeamGrid,
} from "@/components/Blocks";
import {
  ArrowLeft,
  ArrowRight,
  BuildingIcon,
  CaseIcon,
  ChatIcon,
  ClockIcon,
  Close,
  DocIcon,
  GlobeIcon,
  LanguagesIcon,
  PassportIcon,
  ShieldIcon,
  TrendIcon,
} from "@/components/Icons";

const AUDIENCE_CARDS = [
  {
    href: "/contact",
    slot: "families",
    pill: "Families",
    title: "Education, healthcare and a secure future in one application.",
    photo: "family embracing at arrivals",
  },
  {
    href: "/for-business",
    slot: "business",
    pill: "Businesses",
    title: "Relocating a business and team with minimal disruption.",
    photo: "founders in a bright Dubai office",
  },
  {
    href: "/contact",
    slot: "individuals",
    pill: "Individuals",
    title: "A second residency or passport as a plan B and travel freedom.",
    photo: "traveller with passport at the gate",
  },
];

const PRACTICE_ICONS = [PassportIcon, BuildingIcon, TrendIcon, CaseIcon];

const BUSINESS_LINKS = [
  ["UAE company formation — free zone and mainland", "Executive and employee work permits", "Dependent and domestic-staff visas"],
  ["Payroll and Emiratisation compliance guidance", "Ongoing PRO and renewals service"],
];

const FAMILY_LINKS: [string, string][] = [
  ["Family inclusion strategy — spouse, children, parents", "/services/citizenship"],
  ["Program comparison across all authorised CBI jurisdictions", "/services/citizenship"],
  ["Qualifying-investment selection and verification", "/destinations/portugal"],
  ["Residency-card processing and renewals", "/services/residency"],
  ["Path-to-citizenship planning where available", "/services/residency"],
  ["Passport issuance and renewal support", "/services/citizenship"],
];

const PRO_LINKS: [string, string][] = [
  ["Points assessment and score-improvement plan", "/services/skilled"],
  ["Express Entry, PNP, SkillSelect and UK Skilled Worker routes", "/services/skilled"],
  ["Credential recognition and language-test guidance", "/services/skilled"],
  ["Family sponsorship and dependent visas", "/services/skilled"],
  ["Job-search and settlement orientation", "/services/skilled"],
];

const TRUST_POINTS = [
  {
    Icon: ShieldIcon,
    title: "Licensed and accountable",
    desc: "UAE-licensed consultancy with written fee schedules and engagement terms on every file.",
  },
  {
    Icon: GlobeIcon,
    title: "Government-authorised programs only",
    desc: "We work exclusively with official, legally established residency and citizenship routes.",
  },
  {
    Icon: ChatIcon,
    title: "Honest eligibility advice",
    desc: "If your profile is not ready, we say so — and tell you what would change the answer.",
  },
  {
    Icon: LanguagesIcon,
    title: "End-to-end, in your language",
    desc: "From due diligence to relocation, in English, Arabic and four more languages.",
  },
];

export default function HomePage() {
  const { t } = useLang();
  const [announce, setAnnounce] = useState(true);
  const { ref: destsRef, prev: destsPrev, next: destsNext } = useTrack();

  const heroHeight = announce ? "calc(100vh - 136px)" : "calc(100vh - 84px)";

  return (
    <div className="artboard">
      {announce && (
        <div
          data-hero
          style={{
            position: "relative",
            margin: "12px 12px 0",
            minHeight: 40,
            padding: "8px 44px",
            background: "var(--sky)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href="/contact"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink)",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {t(SITE.announcement)}
          </Link>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setAnnounce(false)}
            style={{
              position: "absolute",
              insetInlineEnd: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 24,
              height: 24,
              border: 0,
              background: "none",
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Close />
          </button>
        </div>
      )}

      <SiteHeader active="home" />

      {/* ---- Hero ---- */}
      <section
        style={{
          position: "relative",
          margin: "12px 20px 0",
          height: 700,
          minHeight: heroHeight,
          borderRadius: 24,
          overflow: "hidden",
          background: "var(--forest)",
          color: "var(--white)",
        }}
      >
        <div data-hero-media data-parallax style={{ position: "absolute", inset: 0 }}>
          <ImageSlot
            placeholder="hero video — nature / travel"
            src="/assets/airport-collage.jpg"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(16,65,59,0.55) 0%,rgba(16,65,59,0.72) 50%,rgba(16,65,59,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            insetInline: 0,
            top: "50%",
            height: 560,
            transform: "translateY(-50%)",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(24px, 5.6vw, 80px)",
            pointerEvents: "none",
          }}
        >
          <span className="pill-frosted" data-hero style={{ ["--hero-delay" as string]: "80ms" }}>
            {t("NEXON Global Immigration")}
          </span>
          <SplitText
            as="h1"
            className="h1-hero"
            delay={220}
            text={t("Your next country, handled with care and precision.")}
            style={{
              maxWidth: 1240,
              textShadow: "0 2px 24px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
          <p
            data-hero
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              maxWidth: 640,
              margin: "0 0 32px",
              textWrap: "pretty",
              textShadow: "0 1px 12px rgba(0,0,0,0.45)",
              ["--hero-delay" as string]: "620ms",
            }}
          >
            {t(
              "NEXON guides individuals, families, investors and skilled professionals through residency, citizenship and global mobility programs — from first consultation to approval, with full transparency at every step.",
            )}
          </p>
          <div
            data-hero
            style={{
              display: "flex",
              gap: 12,
              pointerEvents: "auto",
              flexWrap: "wrap",
              justifyContent: "center",
              ["--hero-delay" as string]: "780ms",
            }}
          >
            <Link href="/#eligibility" className="btn btn--primary">
              {t("Check Your Eligibility")}
            </Link>
            <Link href="/contact" className="btn btn--white">
              {t("Speak to an Expert")}
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Who we serve ---- */}
      <section className="section-pad" style={{ padding: "32px 0 128px" }}>
        <div
          className="container grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {AUDIENCE_CARDS.map((c, i) => (
            <Reveal key={c.slot} delay={i * 100}>
              <Link href={c.href} className="photo-card" style={{ height: 480 }}>
                <ImageSlot placeholder={c.photo} className="photo-card__media" />
                <div className="card-scrim" />
                <div className="card-body">
                  <span className="pill-frosted">{t(c.pill)}</span>
                  <div className="card-title-36" style={{ marginTop: 12 }}>
                    {t(c.title)}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee bleed />

      {/* ---- Headline statistic ---- */}
      <section className="section-pad" style={{ padding: "160px 0", textAlign: "center" }}>
        <Reveal
          className="container"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div
            className="serif"
            style={{ fontSize: "clamp(80px, 10.4vw, 150px)", lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            35+
          </div>
          <div
            className="serif"
            style={{
              fontSize: "clamp(32px, 3.9vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: "8px 0 24px",
            }}
          >
            {t("residency & citizenship programs")}
          </div>
          <p className="lede" style={{ maxWidth: 620, margin: "0 0 32px" }}>
            {t(
              "Every engagement begins with an honest assessment of your options — we only recommend programs you genuinely qualify for.",
            )}
          </p>
          <Link href="/services" className="btn btn--primary">
            {t("Explore our services")}
          </Link>
        </Reveal>
      </section>

      {/* ---- Four practices ---- */}
      <section className="section-pad" style={{ padding: "0 0 160px" }}>
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 16, maxWidth: 760 }}>
            {t("Four practices. One clear path abroad.")}
          </h2>
          <p className="lede" style={{ margin: "0 0 48px", maxWidth: 560 }}>
            {t(
              "Every engagement begins with an honest assessment of your options — we only recommend programs you genuinely qualify for.",
            )}
          </p>
          <div
            className="practice-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {PRACTICES.map((p, i) => {
              const IconEl = PRACTICE_ICONS[i];
              return (
                <Reveal key={p.id} delay={i * 100}>
                  <Link href={p.href} className="sand-card" style={{ minHeight: 340, height: "100%" }}>
                    <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <IconEl />
                      <ArrowRight stroke="#191F1D" />
                    </div>
                    <div
                      className="serif"
                      style={{
                        fontSize: 32,
                        lineHeight: 1.05,
                        margin: "auto 0 12px",
                        paddingTop: 48,
                        textWrap: "balance",
                      }}
                    >
                      {t(p.title)}
                    </div>
                    <p className="body-14">{t(p.desc)}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Destinations carousel ---- */}
      <section className="section-pad" style={{ padding: "0 0 160px" }}>
        <div className="container">
          <span className="eyebrow">{t("Destinations & programs")}</span>
          <h2 className="h2-64" style={{ margin: "20px 0 48px", maxWidth: 760 }}>
            {t("Where would you like to belong?")}
          </h2>

          <div ref={destsRef} className="track">
            {DESTINATION_LIST.map((d) => (
              <div key={d.slug} style={{ flex: "0 0 calc((100% - 48px)/3)", minWidth: 260 }}>
                <DestinationCard d={d} />
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <Link href="/destinations" className="btn btn--primary">
              {t("View all 12 destinations")}
            </Link>
            <div style={{ display: "flex", gap: 12 }}>
              <button type="button" className="arrow-btn" aria-label="Previous" onClick={destsPrev}>
                <ArrowLeft />
              </button>
              <button type="button" className="arrow-btn" aria-label="Next" onClick={destsNext}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- For businesses (sticky photo left) ---- */}
      <section className="section-pad" style={{ padding: "0 0 160px" }}>
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
            <ImageSlot placeholder="executives in a Dubai free-zone office" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 128, paddingTop: 16 }}>
            <Reveal>
              <span className="eyebrow">{t("Businesses")}</span>
              <h2 className="h2-64" style={{ margin: "20px 0 24px" }}>
                {t("Corporate & Global Mobility")}
              </h2>
              <p className="lede" style={{ margin: "0 0 32px", maxWidth: 560 }}>
                {t(
                  "Relocation of founders, executives and whole teams. Company setup, work permits and dependent visas handled end to end, with UAE free-zone expertise.",
                )}
              </p>
              <Link href="/for-business" className="btn btn--primary">
                {t("Speak to an Expert")}
              </Link>
            </Reveal>

            <Reveal>
              <h2 className="h2-64" style={{ marginBottom: 32 }}>
                {t("What's included")}
              </h2>
              <div
                className="grid-collapse"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
              >
                {BUSINESS_LINKS.map((col, i) => (
                  <div key={i} className="link-list">
                    {col.map((label) => (
                      <Link key={label} href="/for-business">
                        {t(label)}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <p className="body-14" style={{ margin: "32px 0" }}>
                {t("Typical clients: Startups, family offices, expanding SMEs")}
              </p>
              <Link href="/contact" className="btn btn--primary">
                {t("Book a Consultation")}
              </Link>
            </Reveal>

            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 40 }}>
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
              </div>
              <Link href="/how-it-works" className="btn btn--primary">
                {t("How It Works")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialBand variant="business" tone="forest" />
      <CtaBand title="Not sure which practice fits your case?" button="Book a Consultation" />

      {/* ---- For families & individuals (sticky photo right) ---- */}
      <section className="section-pad" style={{ padding: "160px 0" }}>
        <div
          className="container grid-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 560px",
            gap: 96,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 128, paddingTop: 16 }}>
            <Reveal>
              <h2 className="h2-64" style={{ marginBottom: 40 }}>
                {t("Where would you like to belong?")}
              </h2>
              <div
                className="grid-collapse"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
              >
                <div>
                  <div className="kicker" style={{ color: "var(--ink)", marginBottom: 16 }}>
                    {t("For families")}
                  </div>
                  <div className="link-list">
                    {FAMILY_LINKS.map(([label, href]) => (
                      <Link key={label} href={href}>
                        {t(label)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="kicker" style={{ color: "var(--ink)", marginBottom: 16 }}>
                    {t("For professionals")}
                  </div>
                  <div className="link-list">
                    {PRO_LINKS.map(([label, href]) => (
                      <Link key={label} href={href}>
                        {t(label)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/#eligibility" className="btn btn--primary" style={{ marginTop: 40 }}>
                {t("Check Your Eligibility")}
              </Link>
            </Reveal>

            <Reveal>
              <span className="eyebrow">{t("Families & individuals")}</span>
              <h2 className="h2-64" style={{ margin: "20px 0 24px" }}>
                {t("Migration advice you can hold us to.")}
              </h2>
              <p className="lede" style={{ margin: "0 0 40px", maxWidth: 560 }}>
                {t(
                  "Founded in Dubai by consultants with two decades of combined experience across investment migration and skilled visas, NEXON was built on a simple premise: clients deserve written fee schedules, realistic timelines, and only government-authorised programs.",
                )}
              </p>
              <div
                className="grid-collapse"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "32px 24px",
                  marginBottom: 40,
                }}
              >
                {TRUST_POINTS.map(({ Icon: IconEl, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ flex: "none" }}>
                      <IconEl />
                    </span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{t(title)}</div>
                      <p className="body-14" style={{ marginTop: 6 }}>
                        {t(desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/#eligibility" className="btn btn--primary">
                  {t("Check Your Eligibility")}
                </Link>
                <Link href="/how-it-works" className="btn btn--secondary">
                  {t("How It Works")}
                </Link>
              </div>
            </Reveal>
          </div>

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
            <ImageSlot placeholder="parent carrying a child outdoors" />
          </div>
        </div>
      </section>

      <EligibilityCheck />
      <TestimonialBand variant="individual" tone="mint" />
      <CtaBand title="Ready to take the first step?" button="Book a Consultation" />
      <FaqBlock set="home" />

      {/* ---- Process ---- */}
      <section className="section-pad" style={{ padding: "0 0 160px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              marginBottom: 64,
              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="eyebrow">{t("How it works")}</span>
              <h2 className="h2-64" style={{ margin: "20px 0 0", maxWidth: 760 }}>
                {t("A clear process, from day one")}
              </h2>
            </div>
            <Link href="/how-it-works" className="btn btn--primary" style={{ flex: "none" }}>
              {t("How It Works")}
            </Link>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
            {PROCESS_STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 100}
                style={{
                  padding: "0 24px",
                  borderInlineStart: `1px solid ${i === 0 ? "transparent" : "var(--stone)"}`,
                }}
              >
                <div
                  className="serif"
                  style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, margin: "24px 0 8px" }}>
                  {t(s.title)}
                </div>
                <p className="body-14">{t(s.desc)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Advisors ---- */}
      <section className="section-pad" style={{ padding: "0 0 160px" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">{t("Your advisors")}</span>
            <h2 className="h2-64" style={{ margin: "20px auto 56px", maxWidth: 760 }}>
              {t("The people behind every application")}
            </h2>
          </div>
          <TeamGrid />
        </div>
      </section>

      <InsightsRow />
      <CredentialsBand />
      <SiteFooter />
    </div>
  );
}
