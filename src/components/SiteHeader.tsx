"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useSmoothScroll } from "./motion/SmoothScroll";
import { useLastValue, usePresence } from "./motion/usePresence";
import { MENUS, TILE_BG, type NavKey } from "@/data/site";
import ImageSlot from "./ImageSlot";
import { ChevronDown, Close, Menu, Search } from "./Icons";

const WORDMARK = "NEXON".split("");

/* Grace period before an open mega-menu closes on mouse-out. Long
   enough that a fast diagonal from a nav link to the far side of the
   panel doesn't dismiss it mid-travel, short enough to feel immediate. */
const CLOSE_DELAY = 140;

/* How long the panel and the drawer take to leave. Matches
   --dur-exit in globals.css; the two must not drift apart. */
const EXIT_MS = 220;

/* Everything the keyboard can reach, used to cycle focus inside the
   open drawer. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = { active?: NavKey };

export default function SiteHeader({ active }: Props) {
  const { lang, dir, setLang, t } = useLang();
  const [open, setOpen] = useState<NavKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const smooth = useSmoothScroll();

  const menu = MENUS.find((m) => m.key === open) ?? null;

  /* Both overlays outlive the state that opened them, just long enough
     to animate out. `useLastValue` keeps the panel's own content on
     screen while it goes, so it fades rather than emptying first. */
  const mega = usePresence(menu !== null, EXIT_MS);
  const shownMenu = useLastValue(menu);
  const drawer = usePresence(menuOpen, EXIT_MS);

  // Hairline appears under the header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock the page behind the mobile drawer. Keyed on the drawer's
     presence rather than on `menuOpen`, so the lock outlasts the
     closing animation — the page must not start moving under a drawer
     that is still on screen.

     `overflow: hidden` alone does not hold on iOS Safari, and the
     smooth-scroll runtime is skipped entirely under reduced motion, so
     neither can be relied on to do this. Pinning the body and offsetting
     it by the current scroll position works everywhere, and is the only
     lock that survives with scripting-driven scrolling switched off.
     The drawer itself is `position: fixed`; a fixed ancestor does not
     become its containing block, so it stays pinned to the viewport. */
  useEffect(() => {
    if (!drawer.present) return;

    const body = document.body;
    const y = window.scrollY;
    const from = window.location.pathname;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    smooth?.stop();

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      smooth?.start();

      /* Only put the reader back where they were if this is the same
         page. When the drawer closes because a navigation unmounted it,
         the new route owns the scroll position and must keep its own. */
      if (window.location.pathname !== from) return;

      /* A pinned body is out of flow, so while the drawer was up the
         document had no height to scroll through. Restoring the styles
         is not enough on its own: without forcing layout first, the
         scroll is clamped to the height the page had a moment ago and
         the reader lands part way up. Reading a layout property flushes
         that, and the second pass on the next frame catches the smooth
         -scroll runtime re-syncing itself after it restarts. */
      void body.offsetHeight;
      window.scrollTo(0, y);
      requestAnimationFrame(() => window.scrollTo(0, y));
    };
  }, [drawer.present, smooth]);

  /* Escape closes whichever overlay is open, and the drawer keeps the
     keyboard inside itself while it is up: it covers the whole screen,
     so tabbing to the page behind it would move focus somewhere the
     reader cannot see. Focus returns to the control that opened it. */
  const drawerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!drawer.present) return;

    const el = drawerRef.current;
    el?.querySelector<HTMLElement>("[data-drawer-close]")?.focus();

    const focusable = () =>
      Array.from(el?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (n) => n.offsetParent !== null && !n.closest("[inert]"),
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!el.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [drawer.present]);

  /* Escape also dismisses the desktop mega-menu, which until now could
     only be closed by moving the pointer away.

     This closes the panel and leaves the mouse-out timer alone. Letting
     a pending timer run costs nothing — it calls the same setter with
     the same value — whereas clearing it here would mean touching the
     ref from an effect declared above the functions that own it. */
  useEffect(() => {
    if (!mega.present) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega.present]);

  /* The scrim is fixed to the whole viewport and lives *inside* this
     subtree, so the wrapper's mouseleave only fires when the pointer
     leaves the window. Entering the scrim is the real "left the menu"
     signal: it sits under the header and the panel, so any pointer
     that isn't over one of those is over it. */
  const closeTimer = useRef(0);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = 0;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  const closeNow = () => {
    cancelClose();
    setOpen(null);
  };

  useEffect(() => cancelClose, []);

  const hairline = scrolled ? "var(--stone)" : "transparent";
  const ar = lang === "ar";

  // Same construction as the footer wordmark: the sub-line sets the block
  // width at its own natural tracking, and NEXON is justified across it with
  // space-between, so both rows sit flush on the left and right edges.
  const wordmark = (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "fit-content",
        lineHeight: 1,
        color: "var(--ink)",
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {WORDMARK.map((c, i) => (
          <span key={i} style={c === "X" ? { color: "var(--deep-red)" } : undefined}>
            {c}
          </span>
        ))}
      </span>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: "0.3em",
          marginInlineEnd: "-0.3em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginTop: 6,
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
      onMouseLeave={closeNow}
    >
      {/* Scrim behind the open mega-menu */}
      {mega.present && (
        <div
          className="mega-scrim"
          data-leaving={mega.leaving ? "" : undefined}
          onClick={closeNow}
          onMouseEnter={scheduleClose}
          onMouseLeave={cancelClose}
          style={{ position: "fixed", inset: 0, background: "rgba(25,31,29,0.22)", zIndex: 0 }}
        />
      )}

      <div
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        style={{ borderBottomColor: hairline }}
      >
        <Link href="/" style={{ flex: "none" }} aria-label={SITE_LABEL}>
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
            aria-expanded={menuOpen}
            type="button"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setMenuOpen(true);
            }}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mega-menu panel */}
      {mega.present && shownMenu && (
        /* On its way out it is scenery: not clickable, not focusable,
           not announced. `inert` covers all three. */
        <div className="mega-panel" data-leaving={mega.leaving ? "" : undefined} inert={mega.leaving}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="mega-tiles">
              {shownMenu.tiles.map((tile, i) => {
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

            {/* The link columns share one card, sized and styled to sit with
                the tiles above rather than as loose text under them. */}
            {shownMenu.columns.length > 0 && (
              <div
                className="mega-cols-card"
                style={{
                  background: TILE_BG[shownMenu.tiles.length][0],
                  gridTemplateColumns: `repeat(${shownMenu.columns.length}, minmax(0, 1fr))`,
                }}
              >
                {shownMenu.columns.map((col) => (
                  <div key={col.eyebrow}>
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
            href={shownMenu.card.href}
            className="photo-card"
            style={{ minHeight: 316, borderRadius: 12 }}
          >
            <ImageSlot placeholder={shownMenu.photo} sizes="360px" />
            <div className="card-scrim card-scrim--menu" />
            <div style={{ position: "absolute", insetInline: 20, bottom: 20, color: "#fff", pointerEvents: "none" }}>
              <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 8, textWrap: "balance" }}>
                {t(shownMenu.card.title)}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{t(shownMenu.card.desc)}</div>
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
                {t(shownMenu.card.button)}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Mobile drawer */}
      {drawer.present && (
        <div
          ref={drawerRef}
          dir={dir}
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t("Menu")}
          data-leaving={drawer.leaving ? "" : undefined}
          inert={drawer.leaving}
          data-lenis-prevent
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--white)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
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
              data-drawer-close
              type="button"
              onClick={() => setMenuOpen(false)}
            >
              <Close size={18} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--stone)", marginTop: 8 }}>
            {MENUS.map((m, mi) => {
              const isOpen = group === m.key;
              /* The panel's promotional card is a link too, and the
                 drawer is the only place it can appear on a phone — so
                 it joins the list rather than being dropped with the
                 photograph it sat on. */
              const links = [
                ...m.tiles.flatMap((x) => [
                  { label: x.title, href: x.href },
                  ...(x.items ?? []),
                ]),
                ...m.columns.flatMap((c) => c.links),
                { label: m.card.button, href: m.card.href },
              ];
              return (
                <div
                  key={m.key}
                  className="drawer-row"
                  style={{
                    borderBottom: "1px solid var(--stone)",
                    ["--row-delay" as string]: `${60 + mi * 45}ms`,
                  }}
                >
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
                        transition: "transform 0.32s var(--ease-premium)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {/* Kept mounted so the panel can animate open; `inert`
                      keeps the collapsed links out of the tab order. */}
                  <div className={`acc-panel${isOpen ? " is-open" : ""}`} inert={!isOpen}>
                    <div className="acc-inner">
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
                    </div>
                  </div>
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
