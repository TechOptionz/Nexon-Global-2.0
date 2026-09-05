"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SplitText from "@/components/motion/SplitText";
import { ChatIcon, ChevronDown, ClockIcon, PinIcon } from "@/components/Icons";

const PRACTICE_OPTIONS = [
  "Select a practice",
  "Citizenship by investment",
  "Residency by investment",
  "Skilled or family migration",
  "Corporate / global mobility",
];

const MEETING_OPTIONS = ["Select an option", "Video call", "Phone call", "In person — Dubai office"];

const LANGUAGE_OPTIONS = ["Select a language", "English", "العربية"];

export default function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="artboard">
      <SiteHeader active="contact" />

      <section className="section-pad" style={{ padding: "128px 0 160px" }}>
        <div
          className="container grid-collapse"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}
        >
          {/* ---- Details ---- */}
          <div>
            <SplitText
              as="h1"
              className="h2-64"
              delay={120}
              stagger={45}
              style={{ marginBottom: 24, maxWidth: 520 }}
              text={t("Talk to a consultant this week.")}
            />
            <p className="lede hero-4" data-hero style={{ margin: "0 0 24px", maxWidth: 480 }}>
              {t(
                "Thirty minutes, free of charge, in English or Arabic. We reply to every enquiry within one business day.",
              )}
            </p>
            <p className="body-14" style={{ margin: "0 0 48px", maxWidth: 480, lineHeight: 1.5 }}>
              {t("Prefer WhatsApp?")}{" "}
              <a href={SITE.whatsappHref} className="inline-link">
                {t("Message us")}
              </a>{" "}
              {t(
                "and a consultant — not a bot — replies during office hours, usually within the hour.",
              )}
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 15, lineHeight: 1.5 }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flex: "none", marginTop: 2 }}>
                  <PinIcon />
                </span>
                <span>{t(SITE.address)}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flex: "none", marginTop: 2 }}>
                  <ClockIcon size={20} />
                </span>
                <span>{t(SITE.hours)}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flex: "none", marginTop: 2 }}>
                  <ChatIcon size={20} />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <a href={SITE.phoneHref} style={{ color: "var(--ink)" }}>
                    {SITE.phone}
                  </a>
                  <a href={SITE.whatsappHref} style={{ color: "var(--ink)" }}>
                    {t(SITE.whatsapp)}
                  </a>
                  <a href={SITE.emailHref} style={{ color: "var(--ink)" }}>
                    {SITE.email}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* ---- Form ---- */}
          <div>
            {sent ? (
              <div
                style={{
                  background: "var(--mint)",
                  borderRadius: 16,
                  padding: "64px 48px",
                  textAlign: "center",
                }}
              >
                <div className="serif" style={{ fontSize: 40, lineHeight: 1.05, marginBottom: 16 }}>
                  {t("Request received.")}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                    margin: "0 auto",
                    maxWidth: 420,
                  }}
                >
                  {t(
                    "A consultant will contact you within one business day to schedule your consultation.",
                  )}
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="contact-form"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
              >
                <label className="field-label">
                  <span>
                    {t("Full name")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>*</span>
                  </span>
                  <input required type="text" className="field" placeholder={t("Your full name")} />
                </label>

                <label className="field-label">
                  <span>
                    {t("Email")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>*</span>
                  </span>
                  <input required type="email" className="field" placeholder="name@example.com" />
                </label>

                <label className="field-label">
                  <span>{t("Phone / WhatsApp")}</span>
                  <input type="tel" className="field" placeholder="+971 50 000 0000" />
                </label>

                <SelectField label={t("I'm interested in")} options={PRACTICE_OPTIONS} />
                <SelectField label={t("Preferred meeting")} options={MEETING_OPTIONS} />
                <SelectField label={t("Preferred language")} options={LANGUAGE_OPTIONS} />

                <label className="field-label" style={{ gridColumn: "1 / -1" }}>
                  <span>{t("Message")}</span>
                  <textarea
                    rows={5}
                    className="field"
                    placeholder={t("Tell us briefly about your situation (optional)")}
                  />
                </label>

                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <button type="submit" className="btn btn--primary" style={{ alignSelf: "flex-start" }}>
                    {t("Book my free consultation")}
                  </button>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    {t("Your details stay private and are never shared.")}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/** Select with the design's custom chevron, since appearance is stripped. */
function SelectField({ label, options }: { label: string; options: string[] }) {
  const { t } = useLang();
  return (
    <label className="field-label">
      <span>{label}</span>
      <span style={{ position: "relative", display: "block" }}>
        <select className="field" defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o}>{t(o)}</option>
          ))}
        </select>
        <span
          style={{
            position: "absolute",
            insetInlineEnd: 16,
            top: 16,
            pointerEvents: "none",
            display: "inline-flex",
          }}
        >
          <ChevronDown size={16} stroke="#191F1D" />
        </span>
      </span>
    </label>
  );
}
