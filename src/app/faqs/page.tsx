"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { FAQ_GROUPS } from "@/data/faqs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { Plus } from "@/components/Icons";

export default function FaqsPage() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>("g0-0");

  /* Deep links from the header menu (/faqs#faq-g1-0) open and scroll to
     the question they name. */
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id.startsWith("faq-")) return;
    setOpen(id.slice(4));
    document.getElementById(id)?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="artboard">
      <SiteHeader active="resources" />

      <section className="section-pad" style={{ padding: "128px 0 96px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">{t("FAQs")}</span>
          <h1 className="h1-page" style={{ margin: "24px auto", maxWidth: 1000 }}>
            {t("Questions, answered plainly.")}
          </h1>
          <p className="lede" style={{ maxWidth: 560, margin: "0 auto" }}>
            {t(
              "If your question isn't here, a consultant will answer it on a free call — in English or Arabic.",
            )}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div
          style={{
            width: "min(980px, 100% - 48px)",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 64,
          }}
        >
          {FAQ_GROUPS.map((grp, gi) => (
            <div key={grp.title}>
              <h2 className="h2-40" style={{ marginBottom: 24 }}>
                {t(grp.title)}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {grp.items.map((f, i) => {
                  const key = `g${gi}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} id={`faq-${key}`} className="faq-row" style={{ scrollMarginTop: 120 }}>
                      <button
                        type="button"
                        className="faq-trigger"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : key)}
                      >
                        <span>{t(f.q)}</span>
                        <span
                          className="faq-icon"
                          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                        >
                          <Plus />
                        </span>
                      </button>
                      {isOpen && <p className="faq-answer">{t(f.a)}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Still have a question?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
