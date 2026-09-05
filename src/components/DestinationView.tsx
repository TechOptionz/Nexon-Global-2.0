"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { DESTINATIONS, type Destination } from "@/data/destinations";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CtaBand from "./CtaBand";
import FaqBlock from "./FaqBlock";
import TestimonialBand from "./TestimonialBand";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";
import { DestinationCard, PromisesForest, StatsRow } from "./Blocks";
import { Check, Icon, PassportIcon, Plus } from "./Icons";

export default function DestinationView({ slug }: { slug: string }) {
  const { t } = useLang();
  const [group, setGroup] = useState(0);

  const d: Destination = DESTINATIONS[slug];
  const enquire = `Enquire about ${d.short}`;

  return (
    <div className="artboard">
      <SiteHeader active="destinations" />

      {/* ---- Header ---- */}
      <section className="section-pad" style={{ padding: "96px 0 0" }}>
        <div
          className="container grid-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 560px",
            gap: 96,
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow">{t(d.tag)}</span>
            <h1 className={d.heroSize === 104 ? "h1-page" : "h1-96"}>{t(d.title)}</h1>
            <p className="lede" style={{ maxWidth: 520, margin: "0 0 32px" }}>
              {t(d.intro)}
            </p>
            <Link href="/contact" className="btn btn--primary">
              {t(enquire)}
            </Link>
          </div>

          <div className="dest-hero" style={{ position: "relative", height: 620 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--sand)",
              }}
            >
              <ImageSlot placeholder={d.photoHero} />
            </div>
            <div
              className="dest-hero__inset"
              style={{
                position: "absolute",
                insetInlineStart: -96,
                bottom: 72,
                width: 280,
                height: 280,
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--mint)",
                boxShadow: "0 24px 48px rgba(25,31,29,0.12)",
              }}
            >
              <ImageSlot placeholder={d.photoSmall} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Key numbers ---- */}
      <section className="section-pad" style={{ padding: "96px 0 128px" }}>
        <div className="container">
          <StatsRow stats={d.stats} />
        </div>
      </section>

      {/* ---- Qualifying routes ---- */}
      <section className="section-pad" style={{ background: "var(--mint)", padding: "128px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 56px" }}>
            <h2 className="h2-64" style={{ marginBottom: 20 }}>
              {t(d.routesTitle)}
            </h2>
            <p className="body-14">{t(d.routesNote)}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {d.groups.map((g, i) => {
              const isOpen = group === i;
              return (
                <div key={g.title} style={{ background: "var(--white)", borderRadius: 16, padding: 8 }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setGroup(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      background: "none",
                      border: 0,
                      padding: 24,
                      textAlign: "start",
                      color: "var(--ink)",
                      cursor: "pointer",
                    }}
                  >
                    <span>
                      <span style={{ display: "block", fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>
                        {t(g.title)}
                      </span>
                      <span
                        style={{ display: "block", fontSize: 13, color: "var(--muted)", marginTop: 4 }}
                      >
                        {t(g.subtitle)}
                      </span>
                    </span>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        flex: "none",
                        border: "1px solid var(--stone)",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.25s ease",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="grid-collapse"
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
                    >
                      <RouteCard
                        route={g.a}
                        amountLabel={d.amountLabel}
                        included={d.included}
                        enquire={enquire}
                      />
                      <RouteCard
                        route={g.b}
                        amountLabel={d.amountLabel}
                        included={d.included}
                        enquire={enquire}
                        dark
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Who can apply ---- */}
      <section className="section-pad" style={{ padding: "128px 0" }}>
        <div
          className="container grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}
        >
          <div>
            <h2 className="h2-48" style={{ marginBottom: 16 }}>
              {t("Who can apply")}
            </h2>
            <p className="lede" style={{ maxWidth: 480 }}>
              {t(`A ${d.short} specialist replies within one business day with current requirements and a fee schedule.`)}
            </p>
          </div>

          <div
            style={{
              background: "var(--white)",
              border: "1px solid var(--stone)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {d.eligibility.map((e) => (
              <div
                key={e}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  minHeight: 56,
                  padding: "12px 24px",
                  borderTop: "1px solid var(--stone)",
                  marginTop: -1,
                  fontSize: 15,
                  lineHeight: 1.4,
                }}
              >
                <PassportIcon size={20} />
                <span style={{ flex: 1 }}>{t(e)}</span>
                <Check />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialBand variant={d.testimonial} tone="forest" />

      {/* ---- Why this destination ---- */}
      <section className="section-pad" style={{ padding: "160px 0" }}>
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
            <ImageSlot placeholder={d.photoWhy} />
          </div>

          <div style={{ paddingTop: 8 }}>
            <h2 className="h2-64" style={{ marginBottom: 24 }}>
              {t(`Why ${d.short}`)}
            </h2>
            <p className="lede" style={{ margin: "0 0 48px", maxWidth: 560 }}>
              {t(d.why)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 48 }}>
              {d.benefits.map(([icon, text], i) => (
                <Reveal
                  key={text}
                  delay={i * 120}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <span style={{ flex: "none" }}>
                    <Icon name={icon} />
                  </span>
                  <div className="feature-title" style={{ maxWidth: 560 }}>
                    {t(text)}
                  </div>
                </Reveal>
              ))}
            </div>
            <Link href="/contact" className="btn btn--primary">
              {t(enquire)}
            </Link>
          </div>
        </div>
      </section>

      <PromisesForest />
      <FaqBlock set={d.faq} />

      {/* ---- Related destinations ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 48, maxWidth: 760 }}>
            {t("Where would you like to belong?")}
          </h2>
          <div
            className="grid-collapse"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {d.related.map((k) => (
              <DestinationCard key={k} d={DESTINATIONS[k]} height={480} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Can't decide between two programs?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}

/** One half of an expanded route group — sand on the left, forest on the right. */
function RouteCard({
  route,
  amountLabel,
  included,
  enquire,
  dark = false,
}: {
  route: { title: string; note: string; amount: string };
  amountLabel: string;
  included: string[];
  enquire: string;
  dark?: boolean;
}) {
  const { t } = useLang();
  return (
    <div
      className="route-card"
      style={{
        background: dark ? "var(--forest)" : "var(--sand)",
        color: dark ? "var(--white)" : "var(--ink)",
        borderRadius: 12,
      }}
    >
      <div className="route-card__title serif">{t(route.title)}</div>
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.5,
          color: dark ? "var(--on-forest)" : "var(--muted)",
          marginTop: 8,
        }}
      >
        {t(route.note)}
      </div>
      <div className="stat-value route-card__amount">{t(route.amount)}</div>
      <div style={{ fontSize: 13, color: dark ? "var(--on-forest)" : "var(--muted)" }}>
        {t(amountLabel)}
      </div>

      <Link
        href="/contact"
        className="btn btn--primary"
        style={{ display: "flex", margin: "32px 0" }}
      >
        {t(enquire)}
      </Link>

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
        {t("Included in our service:")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {included.map((it) => (
          <div
            key={it}
            style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5 }}
          >
            <span style={{ flex: "none", marginTop: 2 }}>
              <Check stroke={dark ? "#FDB72A" : "#10413B"} />
            </span>
            <span>{t(it)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
