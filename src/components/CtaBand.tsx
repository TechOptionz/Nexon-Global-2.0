"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Props = {
  title?: string;
  button?: string;
  href?: string;
  tone?: "yellow" | "sky";
};

/** The full-width call-to-action rule that closes most sections. */
export default function CtaBand({
  title = "Ready to take the first step?",
  button = "Book a Consultation",
  href = "/contact",
  tone = "yellow",
}: Props) {
  const { t } = useLang();
  const isSky = tone === "sky";

  return (
    <section
      className="cq"
      style={{
        background: isSky ? "var(--sky)" : "var(--accent)",
        color: "var(--ink)",
        padding: "clamp(48px,4.4cqw,64px) 0",
      }}
    >
      <div
        className="container-wide"
        style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}
      >
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px,3.9cqw,56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
            flex: "0 1 auto",
            textWrap: "balance",
          }}
        >
          {t(title)}
        </h2>
        <div style={{ flex: "1 1 80px", minWidth: 80, height: 1, background: "var(--ink)" }} />
        <Link
          href={href}
          className={`btn btn--outline-ink${isSky ? " on-sky" : ""}`}
          style={{ flex: "none" }}
        >
          {t(button)}
        </Link>
      </div>
    </section>
  );
}
