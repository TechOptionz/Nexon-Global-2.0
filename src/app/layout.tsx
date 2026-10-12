import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/lib/i18n";
import { SITE } from "@/data/site";
import ScrollMotion from "@/components/motion/ScrollMotion";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";
import "./motion.css";

/* The two families the design system allows: an editorial display serif
   and Inter for everything else. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  /* Absolute base for every relative URL below (canonical, og:url, og:image). */
  metadataBase: new URL(SITE.url),
  title: {
    /* The homepage title: core service and location alongside the brand,
       kept inside the 50–60 characters a results page shows in full. */
    default: "NEXON Global Immigration | Residency & Citizenship, Dubai",
    template: "%s · NEXON Global Immigration",
  },
  description:
    "NEXON Global Immigration Services — residency, citizenship and global mobility consultancy in Dubai, UAE.",
  /* "./" resolves against the current route, so every page declares
     itself — not the homepage — as its canonical URL. */
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    locale: "en_US",
    url: "./",
    images: [
      {
        url: "/assets/hero-poster.jpg",
        width: 2560,
        height: 1440,
        alt: "NEXON Global Immigration — residency and citizenship consultancy, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/hero-poster.jpg"],
  },
};

/* Organization structured data, emitted once from the root layout so every
   page carries the same entity. Serialised with `<` escaped: JSON inside a
   script element must never be able to close that element. */
const ORGANIZATION_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.fullName,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/assets/logo.svg`,
  description: SITE.licence,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Business Bay",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
}).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Apply the stored language before first paint, so an Arabic
            reader never sees a frame of the left-to-right layout. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('nexon-lang');if(l==='ar'){var e=document.documentElement;e.setAttribute('lang','ar');e.setAttribute('dir','rtl');}}catch(e){}`,
          }}
        />
        {/* Without scripting nothing can reveal itself, so nothing is
            allowed to start hidden. */}
        <noscript>
          <style>{NO_JS_CSS}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_JSON_LD }}
        />
      </head>
      <body>
        <LangProvider>
          <SmoothScroll>
            <ScrollMotion />
            {children}
          </SmoothScroll>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}

/* Entrance animations are progressive enhancement: with scripting off,
   every element that would have been revealed is simply already there. */
const NO_JS_CSS = `[data-anim],[data-hero],[data-hero-media],.split-word,.wordmark-letter>span{opacity:1!important;transform:none!important;animation:none!important}.acc-panel{grid-template-rows:1fr!important}`;
