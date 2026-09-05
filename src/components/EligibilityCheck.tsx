"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { ArrowLeft } from "./Icons";

const GOALS = [
  "Second citizenship",
  "Residency abroad",
  "Skilled migration (work visa)",
  "Relocate my business",
];

const BUDGETS = ["Under $100k", "$100k – $250k", "$250k – $500k", "$500k+", "Not investment-based"];

const MATCHES: Record<string, number> = {
  "Under $100k": 2,
  "$100k – $250k": 4,
  "$250k – $500k": 6,
  "$500k+": 8,
  "Not investment-based": 3,
};

/** Three-question wizard on a sand panel. Front-end only, as designed. */
export default function EligibilityCheck() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<string | null>(null);

  const bar = (i: number) => (i <= Math.min(step, 2) ? "var(--accent)" : "var(--stone)");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const back = (
    <button
      type="button"
      onClick={() => setStep((s) => Math.max(0, s - 1))}
      style={{
        marginTop: 20,
        background: "none",
        border: 0,
        padding: 0,
        color: "var(--muted)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <ArrowLeft size={16} />
      {t("Back")}
    </button>
  );

  return (
    <section
      id="eligibility"
      className="cq"
      style={{ background: "var(--white)", padding: "clamp(72px,8.9cqw,128px) 0" }}
    >
      <div className="container-wide">
        <div
          style={{
            background: "var(--sand)",
            borderRadius: 16,
            padding: "clamp(32px,4.4cqw,64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
            gap: "clamp(32px,4.4cqw,64px)",
            alignItems: "start",
          }}
        >
          <div>
            <span className="eyebrow">{t("Eligibility check")}</span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(36px,3.3cqw,48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                margin: "20px 0 16px",
                textWrap: "balance",
              }}
            >
              {t("Find out where you stand in two minutes")}
            </h2>
            <p className="lede" style={{ maxWidth: 440 }}>
              {t(
                "Three quick questions. A consultant reviews every submission personally — no automated rejections.",
              )}
            </p>
          </div>

          <div
            style={{
              background: "var(--white)",
              borderRadius: 12,
              padding: "clamp(24px,2.8cqw,40px)",
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }} aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 4,
                    flex: 1,
                    borderRadius: 2,
                    background: bar(i),
                    transition: "background 360ms var(--ease-premium)",
                  }}
                />
              ))}
            </div>

            {/* Each question replaces the last with a short fade rather
                than a jump. */}
            <div key={step} className="swap-in">
              {step === 0 && (
                <>
                  <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 16 }}>
                    {t("What is your primary goal?")}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                      gap: 10,
                    }}
                  >
                    {GOALS.map((g) => (
                      <button key={g} type="button" className="choice-btn" onClick={() => setStep(1)}>
                        {t(g)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 16 }}>
                    {t("What budget could you commit, if the route involves investment?")}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))",
                      gap: 10,
                    }}
                  >
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        className="choice-btn"
                        onClick={() => {
                          setBudget(b);
                          setStep(2);
                        }}
                      >
                        {t(b)}
                      </button>
                    ))}
                  </div>
                  {back}
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>
                    {t("Where should we send your assessment?")}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
                    {t("Based on your answers:")}{" "}
                    <strong style={{ color: "var(--ink)" }}>
                      {(budget && MATCHES[budget]) ?? 3} {t("programs")}
                    </strong>{" "}
                    {t("look worth exploring.")}
                  </div>
                  <form
                    onSubmit={onSubmit}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                      gap: 12,
                    }}
                  >
                    <input required type="text" className="field" placeholder={t("Full name")} />
                    <input required type="email" className="field" placeholder={t("Email address")} />
                    <input
                      type="tel"
                      className="field"
                      placeholder={t("Phone / WhatsApp (optional)")}
                    />
                    <button type="submit" className="btn btn--primary">
                      {t("Get my assessment")}
                    </button>
                  </form>
                  {back}
                </>
              )}

              {step === 3 && (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div className="serif" style={{ fontSize: 32, lineHeight: 1.05, marginBottom: 12 }}>
                    {t("Thank you — assessment on its way.")}
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      margin: "0 auto 24px",
                      maxWidth: 420,
                    }}
                  >
                    {t(
                      "A consultant will review your answers and reply within one business day with a shortlist and honest next steps.",
                    )}
                  </p>
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={() => {
                      setStep(0);
                      setBudget(null);
                    }}
                  >
                    {t("Start over")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
