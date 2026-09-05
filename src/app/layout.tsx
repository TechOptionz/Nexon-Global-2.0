import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

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
  title: {
    default: "NEXON Global Immigration",
    template: "%s · NEXON Global Immigration",
  },
  description:
    "NEXON Global Immigration Services — residency, citizenship and global mobility consultancy in Dubai, UAE.",
};

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
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
