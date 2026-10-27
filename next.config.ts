import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Pin the workspace root. Without it Turbopack walks up and finds a stray
  // package-lock.json in the user's home directory, outside this repo.
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },

  // Tailwind v4 runs through PostCSS (see postcss.config.mjs), which works for
  // both `next dev --turbopack` and `next build`. The scaffold's
  // @tailwindcss/turbopack loader rule was removed with the package.

  images: {
    // design.md §12 — AVIF first, WebP fallback. V2 shipped ~8 MB of PNGs.
    formats: ["image/avif", "image/webp"],
    // Matches the 4-column grid's realistic render widths plus 2x retina.
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [64, 128, 256, 352, 704],
  },

  // The site is content, not an app — fail the build on a type error rather than
  // shipping a broken page. (Next 16 moved `eslint` out of NextConfig; linting
  // runs via `npm run lint`.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
