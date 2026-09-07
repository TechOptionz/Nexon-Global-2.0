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
    /* Sources are 2528-2752px wide since `scripts/upscale-sources.mjs`, so the
       larger breakpoints now resolve to real pixels instead of duplicates.
       2560 is what a full-bleed hero needs on a 1440 viewport at 2x — capping
       at 1920 left it a 1.5x browser upscale, which is what looked blurry. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
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
