import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/articles";
import { DESTINATION_ORDER } from "@/data/destinations";
import { SERVICE_ORDER } from "@/data/services";
import { SITE } from "@/data/site";

/** Every static route under `src/app`, in navigation order. */
const STATIC_PATHS = [
  "/",
  "/services",
  "/for-business",
  "/destinations",
  "/about",
  "/how-it-works",
  "/success-stories",
  "/insights",
  "/faqs",
  "/contact",
  "/privacy",
  "/terms",
];

/** Served at /sitemap.xml. The dynamic routes come from the same lists
 *  that drive `generateStaticParams`, so a new destination, service or
 *  article is listed the moment it is added to its data file. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...SERVICE_ORDER.map((slug) => `/services/${slug}`),
    ...DESTINATION_ORDER.map((slug) => `/destinations/${slug}`),
    ...ARTICLES.map((a) => `/insights/${a.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, SITE.url).href }));
}
