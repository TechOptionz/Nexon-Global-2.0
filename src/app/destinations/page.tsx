"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { DESTINATION_LIST, type DestinationType } from "@/data/destinations";
import SiteHeader from "@/components/SiteHeader";
import SplitText from "@/components/motion/SplitText";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import FlightPath from "@/components/FlightPath";
import { DestinationCard, RequirementsNote } from "@/components/Blocks";

/* The hero route runs west to east across the range on offer, rather
   than repeating any one service's own itinerary. */
const HERO_ROUTE = ["Portugal", "Malta", "UAE", "Australia"];

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
          {/* Relative so the route map can sit in the blank column
              beside the lede without touching the copy's layout. */}
          <div style={{ position: "relative" }}>
            <span className="eyebrow hero-1" data-hero>
              {t("Destinations & programs")}
            </span>
            <SplitText
              as="h1"
              className="h1-page"
              delay={170}
              stagger={45}
              style={{ maxWidth: 1000 }}
              text={t("Where would you like to belong?")}
            />
            <p className="lede hero-4" data-hero style={{ maxWidth: 560 }}>
              {t(
                "Twelve government-authorised routes across citizenship, residency and skilled migration. Every figure below is the official minimum — we confirm current requirements before you commit.",
              )}
            </p>
            <FlightPath className="flight-path--hero" stops={HERO_ROUTE.map(t)} />
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "64px 0 128px" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "0 20px",
                  border: "1px solid var(--ink)",
                  borderRadius: 8,
                  background: filter === f ? "var(--ink)" : "var(--white)",
                  color: filter === f ? "var(--white)" : "var(--ink)",
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

      <CtaBand title="Can't decide between two programs?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
