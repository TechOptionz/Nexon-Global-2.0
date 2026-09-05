"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { MENUS, TILE_BG, type NavKey } from "@/data/site";
import ImageSlot from "./ImageSlot";
import { ChevronDown, Close, Menu, Search } from "./Icons";

type Props = { active?: NavKey };

export default function SiteHeader({ active }: Props) {
  const { lang, dir, setLang, t } = useLang();
  const [open, setOpen] = useState<NavKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);

  // Hairline appears under the header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const menu = MENUS.find((m) => m.key === open) ?? null;
  const hairline = scrolled ? "var(--stone)" : "transparent";
  const ar = lang === "ar";

  const wordmark = (
    <span style={{ display: "flex", flexDirection: "column", lineHeight: 1, color: "var(--ink)" }}>
      <span
        style={{
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        NEXON
      </span>
      <span
        style={{
          fontSize: 8,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginTop: 5,
        }}
      >
        Global Immigration
      </span>
    </span>
  );

  return (
    <div
      dir={dir}
      style={{ position: "sticky", top: 0, zIndex: 50 }}
      onMouseLeave={() => setOpen(null)}
    >
      {/* Scrim behind the open mega-menu */}
      {menu && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(25,31,29,0.22)", zIndex: 0 }}
        />
      )}

      <div className="site-header" style={{ borderBottomColor: hairline }}>
        <Link href="/" style={{ flex: "none", width: 140 }} aria-label={SITE_LABEL}>
          {wordmark}
        </Link>

        {/* Desktop navigation */}
        <nav className="header-nav" style={{ display: "flex", alignItems: "center", gap: 28, height: 72 }}>
          {MENUS.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className="nav-link"
              onMouseEnter={() => setOpen(m.key)}
              onFocus={() => setOpen(m.key)}
            >
              <span>{t(m.label)}</span>
              <ChevronDown />
              {active === m.key && <span className="nav-link__active" />}
            </Link>
          ))}
        </nav>

        <div
          className="header-actions"
          style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 12 }}
        >
          <button className="icon-btn-round" aria-label="Search" type="button">
            <Search />
          </button>

          <div className="lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={!ar}
              style={{ background: ar ? "var(--white)" : "var(--ink)", color: ar ? "var(--ink)" : "var(--white)" }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("ar")}
              aria-pressed={ar}
              style={{ background: ar ? "var(--ink)" : "var(--white)", color: ar ? "var(--white)" : "var(--ink)" }}
            >
              العربية
            </button>
          </div>

          <Link href="/contact" className="btn btn--primary btn--sm">
            {t("Book a Consultation")}
          </Link>

          {/* Hamburger — only rendered below the desktop breakpoint */}
          <button
            className="icon-btn-round header-burger"
            aria-label="Menu"
            type="button"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mega-menu panel */}
      {menu && (
        <div className="mega-panel">
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="mega-tiles">
              {menu.tiles.map((tile, i) => {
                const body = (
                  <>
                    <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 8 }}>
                      {t(tile.title)}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>
                      {t(tile.desc)}
                    </div>
                  </>
                );

                /* Tiles carrying related links can't be one big anchor —
                   nested links are invalid — so the heading links instead. */
                if (tile.items?.length) {
                  return (
                    <div
                      key={tile.title}
                      className="mega-tile mega-tile--rich"
                      style={{ background: TILE_BG[i][0] }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = TILE_BG[i][1];
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = TILE_BG[i][0];
                      }}
                    >
                      <Link href={tile.href} className="mega-tile-head">
                        {body}
                      </Link>
                      <div className="mega-tile-items">
                        {tile.itemsEyebrow && (
                          <div className="kicker" style={{ marginBottom: 10 }}>
                            {t(tile.itemsEyebrow)}
                          </div>
                        )}
                        {tile.items.map((l) => (
                          <Link key={l.label} href={l.href}>
                            {t(l.label)}
                          </Link>
                        ))}
                      </div>
                      <Link href={tile.href} className="mega-tile-all">
                        {t(tile.title === "FAQs" ? "All questions" : "All articles")}
                        <span aria-hidden>{ar ? "←" : "→"}</span>
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={tile.title}
                    href={tile.href}
                    className="mega-tile"
                    style={{ background: TILE_BG[i][0] }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = TILE_BG[i][1];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = TILE_BG[i][0];
                    }}
                  >
                    {body}
                  </Link>
                );
              })}
            </div>

            {menu.columns.length > 0 && (
              <div style={{ display: "flex", gap: 56 }}>
                {menu.columns.map((col) => (
                  <div key={col.eyebrow} style={{ minWidth: 200 }}>
                    <div className="kicker" style={{ marginBottom: 12 }}>
                      {t(col.eyebrow)}
                    </div>
                    <div className="mega-col-links">
                      {col.links.map((l) => (
                        <Link key={l.label} href={l.href}>
                          {t(l.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href={menu.card.href}
            className="photo-card"
            style={{ minHeight: 316, borderRadius: 12 }}
          >
            <ImageSlot placeholder={menu.photo} />
            <div className="card-scrim card-scrim--menu" />
            <div style={{ position: "absolute", insetInline: 20, bottom: 20, color: "#fff", pointerEvents: "none" }}>
              <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 8, textWrap: "balance" }}>
                {t(menu.card.title)}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{t(menu.card.desc)}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  borderRadius: 8,
                  background: "var(--white)",
                  color: "var(--ink)",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {t(menu.card.button)}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          dir={dir}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--white)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            padding: "0 24px 24px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: "none",
            }}
          >
            {wordmark}
            <button
              className="icon-btn-round"
              style={{ width: 44, height: 44 }}
              aria-label="Close menu"
              type="button"
              onClick={() => setMenuOpen(false)}
            >
              <Close size={18} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--stone)", marginTop: 8 }}>
            {MENUS.map((m) => {
              const isOpen = group === m.key;
              const links = [
                ...m.tiles.flatMap((x) => [
                  { label: x.title, href: x.href },
                  ...(x.items ?? []),
                ]),
                ...m.columns.flatMap((c) => c.links),
              ];
              return (
                <div key={m.key} style={{ borderBottom: "1px solid var(--stone)" }}>
                  <button
                    type="button"
                    onClick={() => setGroup(isOpen ? null : m.key)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 56,
                      background: "none",
                      border: 0,
                      padding: 0,
                      fontSize: 17,
                      fontWeight: 500,
                      color: "var(--ink)",
                      cursor: "pointer",
                      textAlign: "start",
                    }}
                  >
                    <span>{t(m.label)}</span>
                    <span
                      style={{
                        display: "inline-flex",
                        transition: "transform 0.25s",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        padding: "4px 0 20px",
                        paddingInlineStart: 16,
                        borderInlineStart: "1px solid var(--stone)",
                        marginBottom: 16,
                      }}
                    >
                      {links.map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          onClick={() => setMenuOpen(false)}
                          style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}
                        >
                          {t(l.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }} />

          <div className="lang-switch" style={{ display: "flex", height: 44, marginTop: 24 }} role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("en")}
              style={{ flex: 1, background: ar ? "var(--white)" : "var(--ink)", color: ar ? "var(--ink)" : "var(--white)", fontSize: 14 }}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("ar")}
              style={{ flex: 1, background: ar ? "var(--ink)" : "var(--white)", color: ar ? "var(--white)" : "var(--ink)", fontSize: 14 }}
            >
              العربية
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 12 }}>
            <Link href="/contact" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
              {t("Book a Consultation")}
            </Link>
            <Link href="/#eligibility" className="btn btn--secondary" onClick={() => setMenuOpen(false)}>
              {t("Check Your Eligibility")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const SITE_LABEL = "NEXON Global Immigration — home";
