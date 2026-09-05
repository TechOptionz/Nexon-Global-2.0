"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { faqSet } from "@/data/faqs";
import { Plus } from "./Icons";

/** The pale-blue accordion. The first row starts open, as on the artboards. */
export default function FaqBlock({ set = "home" }: { set?: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  const faqs = faqSet(set);

  return (
    <section
      className="cq"
      style={{ background: "var(--white)", padding: "clamp(72px,8.9cqw,128px) 0" }}
    >
      <div className="container-wide">
        <div style={{ textAlign: "center" }}>
          <span className="eyebrow">{t("Questions, answered")}</span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(40px,4.4cqw,64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              margin: "20px 0 0",
            }}
          >
            {t("Frequently asked")}
          </h2>
        </div>

        <div
          style={{
            maxWidth: 980,
            margin: "48px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="faq-row">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{t(f.q)}</span>
                  <span
                    className="faq-icon"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <Plus />
                  </span>
                </button>
                {/* Kept mounted so the row can grow rather than jump. */}
                <div className={`acc-panel${isOpen ? " is-open" : ""}`} inert={!isOpen}>
                  <div className="acc-inner">
                    <p className="faq-answer">{t(f.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 48,
          }}
        >
          <Link href="/faqs" className="btn btn--primary">
            {t("All FAQs")}
          </Link>
          <Link href="/contact" className="btn btn--secondary">
            {t("Book a Consultation")}
          </Link>
        </div>
      </div>
    </section>
  );
}
