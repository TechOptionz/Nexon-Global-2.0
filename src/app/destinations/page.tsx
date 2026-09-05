"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { DESTINATION_LIST, type DestinationType } from "@/data/destinations";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { DestinationCard, RequirementsNote } from "@/components/Blocks";

const FILTERS = ["All", "Citizenship", "Residency", "Skilled"] as const;
type Filter = (typeof FILTERS)[number];

export default function DestinationsPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("All");

  // Deep links from the service pages arrive as ?type= or #hash.
  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const raw = (params.get("type") ?? window.location.hash.replace("#", "")).toLowerCase();
      const match = FILTERS.find((f) => f.toLowerCase() === raw);
      setFilter(match ?? "All");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const shown =
    filter === "All"
      ? DESTINATION_LIST
      : DESTINATION_LIST.filter((d) => d.type === (filter as DestinationType));

  return (
    <div className="artboard">
      <SiteHeader active="destinations" />

      <section className="section-pad" style={{ background: "var(--sky)", padding: "128px 0" }}>
        <div className="container">
          <span className="eyebrow">{t("Destinations & programs")}</span>
          <h1 className="h1-page" style={{ maxWidth: 1000 }}>
            {t("Where would you like to belong?")}
          </h1>
          <p className="lede" style={{ maxWidth: 560 }}>
            {t(
              "Twelve government-authorised routes across citizenship, residency and skilled migration. Every figure below is the official minimum — we confirm current requirements before you commit.",
            )}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "64px 0 128px" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 40,
                  padding: "0 20px",
                  border: "1px solid var(--ink)",
                  borderRadius: 8,
                  background: filter === f ? "var(--accent)" : "var(--white)",
                  color: "var(--ink)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t(f)}
              </button>
            ))}
          </div>

          <div
            className="grid-collapse"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {shown.map((d) => (
              <DestinationCard key={d.slug} d={d} showCta note={d.indexNote} />
            ))}
          </div>

          <RequirementsNote />
        </div>
      </section>

      <CtaBand tone="yellow" title="Can't decide between two programs?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
