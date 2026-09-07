import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP for browsers without it. Both are a fraction of the
       size of the source JPEGs at the same perceived quality. */
    formats: ["image/avif", "image/webp"],
    /* Next 16 requires the allowlist; 90 is what ImageSlot asks for.
       Next rescales quality for AVIF by 50/80, so this encodes AVIF at 56.
       Anything lower visibly smears these sources, which are already
       once-compressed JPEGs — a second lossy pass at AVIF 45 was showing. */
    qualities: [90],
    /* The source photographs top out at 1376px wide, so the larger default
       breakpoints only produce duplicate renditions. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [128, 256, 384, 512],
    /* Optimised renditions are derived from files that only change on deploy,
       so there is nothing to revalidate for. */
    minimumCacheTTL: 31536000,
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/assets/**", search: "" },
    ],
  },
};

export default nextConfig;
