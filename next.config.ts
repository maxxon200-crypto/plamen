import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Next.js 15 streams <title>/<meta>/<link> tags produced by an async
  // generateMetadata() outside <head> by default, and only falls back to
  // blocking (head-included) metadata for a fixed list of known bot user
  // agents (see next/dist/shared/lib/router/utils/html-bots.js) — plain
  // Googlebot and ordinary browsers are NOT on that list. Verified via a
  // real headless-Chromium DOM check that this left title/meta description/
  // canonical/hreflang permanently as children of <body>, never relocated
  // to <head>, which breaks the per-page hreflang/canonical signals Phase 4
  // exists for. Matching every user agent here forces the safe, blocking
  // metadata path for everyone, at the cost of the streaming performance
  // optimization — correct <head> placement matters more for this site.
  htmlLimitedBots: /.*/,
};

export default withNextIntl(nextConfig);
