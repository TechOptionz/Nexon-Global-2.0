"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ARTICLES, ARTICLE_BY_SLUG, type Block } from "@/data/articles";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CtaBand from "./CtaBand";
import ImageSlot from "./ImageSlot";
import { ArrowLeft, Check } from "./Icons";

export default function ArticleView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const ar = lang === "ar";

  const a = ARTICLE_BY_SLUG[slug];

  // Word-count fallback matches the source: ~200 words a minute, min 3.
  const words = a.blocks.reduce(
    (n, b) => n + (Array.isArray(b[lang]) ? (b[lang] as string[]).join(" ") : (b[lang] as string)).split(/\s+/).length,
    0,
  );
  const mins = a.readMins ?? Math.max(3, Math.round(words / 200));
  const readTime = ar ? `${mins} دقائق قراءة` : `${mins} min read`;

  const labels = ar
    ? { back: "كل المقالات", toc: "في هذا المقال", more: "اقرأ أيضًا" }
    : { back: "All articles", toc: "In this article", more: "More from our desk" };

  // Headings get sequential ids so the sidebar can anchor to them.
  let h = 0;
  const rendered = a.blocks.map((b, i) => {
    const id = b.type === "h2" ? `s${++h}` : undefined;
    return { ...b, id, key: i };
  });

  let k = 0;
  const toc = a.blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ text: b[lang], href: `#s${++k}` }));

  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="artboard">
      <SiteHeader active="resources" />

      {/* ---- Article header ---- */}
      <section style={{ padding: "96px 0 0" }}>
        <div style={{ width: "min(760px, 100% - 48px)", margin: "0 auto", textAlign: "center" }}>
          <Link
            href="/insights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--muted)",
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={16} />
            {labels.back}
          </Link>

          <div>
            <span className="eyebrow">{a.tag[lang]}</span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(36px, 4.4vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              margin: "24px 0",
              textWrap: "balance",
            }}
          >
            {a.title[lang]}
          </h1>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: "0 auto",
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            {a.excerpt[lang]}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
              fontSize: 14,
              color: "var(--muted)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                background: "var(--sand)",
                flex: "none",
              }}
            >
              <ImageSlot placeholder={a.authorPhoto} shape="circle" />
            </div>
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>{a.author[lang]}</span>
            <span>·</span>
            <span>{a.date[lang]}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "min(1080px, 100% - 48px)",
            height: "min(560px, 56vw)",
            margin: "56px auto 0",
            borderRadius: 16,
            overflow: "hidden",
            background: "var(--sand)",
          }}
        >
          <ImageSlot placeholder={a.photo} />
        </div>
      </section>

      {/* ---- Body + table of contents ---- */}
      <section className="section-pad" style={{ padding: "80px 0 128px" }}>
        <div
          className="article-grid"
          style={{
            width: "min(1280px, 100% - 48px)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr min(760px, 100%) 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div className="article-gutter" />

          <article style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            {rendered.map((b) => {
              if (b.type === "h2") {
                return (
                  <h2
                    key={b.key}
                    id={b.id}
                    className="serif"
                    style={{
                      fontSize: 40,
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                      margin: "40px 0 0",
                      scrollMarginTop: 104,
                      textWrap: "balance",
                    }}
                  >
                    {b[lang] as string}
                  </h2>
                );
              }
              if (b.type === "p") {
                return (
                  <p
                    key={b.key}
                    style={{ fontSize: 18, lineHeight: 1.7, margin: 0, textWrap: "pretty" }}
                  >
                    {b[lang] as string}
                  </p>
                );
              }
              if (b.type === "quote") {
                return (
                  <blockquote
                    key={b.key}
                    className="serif"
                    style={{
                      fontSize: 32,
                      lineHeight: 1.15,
                      margin: "16px 0",
                      padding: 32,
                      background: "var(--sand)",
                      borderRadius: 16,
                      textWrap: "pretty",
                    }}
                  >
                    “{b[lang] as string}”
                  </blockquote>
                );
              }
              return (
                <div
                  key={b.key}
                  style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0" }}
                >
                  {(b[lang] as string[]).map((it) => (
                    <div
                      key={it}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        fontSize: 17,
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ flex: "none", marginTop: 4 }}>
                        <Check size={20} />
                      </span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              );
            })}

            <div
              style={{
                marginTop: 40,
                paddingTop: 32,
                borderTop: "1px solid var(--stone)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <p className="body-14">
                {t("Program requirements change.")}{" "}
                <Link href="/contact" className="inline-link">
                  {t("Speak to an expert")}
                </Link>{" "}
                {t("for figures verified this month.")}
              </p>

              <div
                className="author-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "var(--mint)",
                  borderRadius: 16,
                  padding: 24,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "var(--sand)",
                    flex: "none",
                  }}
                >
                  <ImageSlot placeholder={a.authorPhoto} shape="circle" />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{a.author[lang]}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
                    {a.authorRole[lang]}
                  </div>
                </div>
                <Link href="/contact" className="btn btn--primary btn--sm" style={{ flex: "none" }}>
                  {t("Book a Consultation")}
                </Link>
              </div>
            </div>
          </article>

          <aside className="article-toc" style={{ position: "sticky", top: 104 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>
              {labels.toc}
            </div>
            <div className="link-list">
              {toc.map((s) => (
                <a key={s.href} href={s.href} style={{ fontSize: 14 }}>
                  {s.text}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ---- Related ---- */}
      <section className="section-pad" style={{ padding: "0 0 128px" }}>
        <div className="container">
          <h2 className="h2-64" style={{ marginBottom: 48, maxWidth: 760 }}>
            {labels.more}
          </h2>
          <div
            className="grid-collapse"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {related.map((r) => (
              <Link key={r.slug} href={r.href} className="photo-card" style={{ height: 480 }}>
                <ImageSlot placeholder={r.photo} className="photo-card__media" />
                <div className="card-scrim" />
                <div className="card-body">
                  <span className="pill-frosted">{r.tag[lang]}</span>
                  <div className="card-title-32" style={{ margin: "12px 0 8px" }}>
                    {r.title[lang]}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5 }}>{r.excerpt[lang]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand tone="yellow" title="Prefer answers specific to your case?" button="Book a Consultation" />
      <SiteFooter />
    </div>
  );
}
