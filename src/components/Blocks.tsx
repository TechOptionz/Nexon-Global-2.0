"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { DestinationSummary } from "@/data/destinations";
import { CREDENTIALS, MARQUEE_LOGOS, PROMISES, TEAM } from "@/data/site";
import { PRACTICES } from "@/data/services";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";
import {
  ArrowRight,
  BuildingIcon,
  CaseIcon,
  ClockIcon,
  GlobeIcon,
  LanguagesIcon,
  PassportIcon,
  SunIcon,
  TrendIcon,
  WaveBg,
} from "./Icons";

/* ------------------------------------------------------------------
   Destination photo card
   ------------------------------------------------------------------ */

export function DestinationCard({
  d,
  height = 420,
  showCta = false,
  note,
}: {
  d: DestinationSummary;
  height?: number;
  showCta?: boolean;
  note?: string;
}) {
  const { t } = useLang();
  return (
    <Link href={d.href} className="photo-card" style={{ height }}>
      <ImageSlot placeholder={d.photo} className="photo-card__media" />
      <div className="card-scrim" />
      <div className="card-body">
        <span className="pill-frosted">{t(d.type)}</span>
        <div className="card-title-36" style={{ margin: "12px 0 8px" }}>
          {t(d.name)}
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>
          {t(d.amount)} · {t(note ?? d.note)}
        </div>
        {showCta && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            {t(d.cta ?? "View program")} <ArrowRight size={16} />
          </div>
        )}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Four-column statistic row (destination and service headers)
   ------------------------------------------------------------------ */

export function StatsRow({ stats }: { stats: [string, string][] }) {
  const { t } = useLang();
  return (
    <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
      {stats.map(([label, value], i) => (
        <div
          key={label}
          style={{
            padding: i === 0 ? "0 32px 0 0" : i === stats.length - 1 ? "0 0 0 32px" : "0 32px",
            borderInlineStart: i === 0 ? "1px solid transparent" : "1px solid var(--stone)",
          }}
        >
          <div className="kicker">{t(label)}</div>
          <div className="stat-value">{t(value)}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Transparency promises — deep-green two-column variant
   ------------------------------------------------------------------ */

export function PromisesForest() {
  const { t } = useLang();
  return (
    <section className="forest-section section-pad" style={{ padding: "128px 0" }}>
      <WaveBg />
      <div
        className="container grid-collapse"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "start",
        }}
      >
        <div>
          <h2 className="h2-64" style={{ marginBottom: 24 }}>
            {t("Our transparency promises")}
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--on-forest)",
              margin: 0,
              maxWidth: 480,
              textWrap: "pretty",
            }}
          >
            {t(
              "Every engagement begins with an honest assessment of your options. We only recommend programs you genuinely qualify for.",
            )}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {PROMISES.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: 16,
                padding: i === 0 ? "0 0 32px" : i === PROMISES.length - 1 ? "32px 0 0" : "32px 0",
                borderBottom:
                  i === PROMISES.length - 1 ? "none" : "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="serif" style={{ fontSize: 16, lineHeight: 1.6 }}>
                {p.n}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>{t(p.title)}</div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--on-forest)",
                    margin: "8px 0 0",
                  }}
                >
                  {t(p.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Credentials band — the yellow strip of headline numbers
   ------------------------------------------------------------------ */

const CRED_ICONS = {
  sun: SunIcon,
  globe: GlobeIcon,
  languages: LanguagesIcon,
  clock: ClockIcon,
} as const;

export function CredentialsBand() {
  const { t } = useLang();
  return (
    <section style={{ background: "var(--accent)", color: "var(--ink)", padding: "96px 0" }}>
      <div
        className="container credentials-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {CREDENTIALS.map((c, i) => {
          const IconEl = CRED_ICONS[c.icon];
          return (
            <div
              key={c.label}
              style={{
                padding:
                  i === 0 ? "0 32px 0 0" : i === CREDENTIALS.length - 1 ? "0 0 0 32px" : "0 32px",
                borderInlineStart: i === 0 ? "none" : "1px solid rgba(25,31,29,0.2)",
              }}
            >
              <IconEl />
              <div className="stat-num" style={{ margin: "24px 0 16px" }}>
                {t(c.value)}
              </div>
              <div className="stat-label">{t(c.label)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Scrolling press / membership strip
   ------------------------------------------------------------------ */

export function Marquee({ bleed = false, style }: { bleed?: boolean; style?: React.CSSProperties }) {
  return (
    <section className={`marquee${bleed ? " bleed" : ""}`} style={style} aria-hidden="true">
      <div className="marquee__inner">
        {MARQUEE_LOGOS.map((name, i) => (
          <span key={`${name}-${i}`} className="marquee__item">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   "Four practices" link grid (pale blue section)
   ------------------------------------------------------------------ */

const PRACTICE_ICONS = [PassportIcon, BuildingIcon, TrendIcon, CaseIcon];

export function PracticesGrid() {
  const { t } = useLang();
  return (
    <section className="section-pad" style={{ background: "var(--sky)", padding: "128px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow">{t("Services")}</span>
        <h2 className="h2-64" style={{ margin: "20px auto 56px", maxWidth: 760 }}>
          {t("Four practices. One clear path abroad.")}
        </h2>
        <div
          className="grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "start" }}
        >
          {PRACTICES.map((p, i) => {
            const IconEl = PRACTICE_ICONS[i];
            return (
              <Link
                key={p.id}
                href={p.href}
                className="btn--secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "var(--white)",
                  border: "1px solid var(--stone)",
                  borderRadius: 12,
                  padding: "0 24px",
                  height: 72,
                  color: "var(--ink)",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                <IconEl />
                <span style={{ flex: 1 }}>{t(p.title)}</span>
                <ArrowRight />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Advisor portraits
   ------------------------------------------------------------------ */

export function TeamGrid({ height = 480, linked = true }: { height?: number; linked?: boolean }) {
  const { t } = useLang();
  return (
    <div
      className="grid-collapse"
      style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
    >
      {TEAM.map((m) => {
        const inner = (
          <>
            <div
              style={{
                position: "relative",
                height,
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--sand)",
                color: "var(--muted-slot)",
              }}
            >
              <ImageSlot placeholder={`portrait — ${m.name}`} />
              <div className="card-scrim card-scrim--low" />
              <div className="card-body">
                <div className="card-title-32">{m.name}</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>{t(m.role)}</div>
              </div>
            </div>
            <p className="body-14" style={{ marginTop: 16 }}>
              {t(m.creds)}
            </p>
          </>
        );
        return linked ? (
          <Link key={m.slot} href="/about" style={{ display: "block", color: "var(--ink)" }}>
            {inner}
          </Link>
        ) : (
          <div key={m.slot}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
   Shared closing line under program grids
   ------------------------------------------------------------------ */

export function RequirementsNote({ align = "center" }: { align?: "center" | "start" }) {
  const { t } = useLang();
  return (
    <p
      style={{
        fontSize: 15,
        lineHeight: 1.5,
        color: "var(--muted)",
        margin: "48px 0 0",
        textAlign: align,
      }}
    >
      {t("Program requirements change.")}{" "}
      <Link href="/contact" className="inline-link">
        {t("Speak to an expert")}
      </Link>{" "}
      {t("for figures verified this month.")}
    </p>
  );
}

/* ------------------------------------------------------------------
   Reveal-wrapped feature row (icon + heading + copy)
   ------------------------------------------------------------------ */

export function FeatureRow({
  icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}) {
  const { t } = useLang();
  return (
    <Reveal delay={delay} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <span style={{ flex: "none", marginTop: 1 }}>{icon}</span>
      <div>
        <div className="feature-title">{t(title)}</div>
        <p className="body-15" style={{ margin: "8px 0 0", maxWidth: 520 }}>
          {t(desc)}
        </p>
      </div>
    </Reveal>
  );
}
