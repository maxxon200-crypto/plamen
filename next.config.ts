import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Content-Security-Policy is NOT set here — it's per-request nonce-based
// CSP set in middleware.ts instead. Reason: Next.js App Router injects
// inline <script> tags for RSC hydration payload (the __next_f streaming
// data) on every rendered page. A static `script-src 'self'` with no
// nonce/hash blocks every one of those — verified via a real headless
// Chromium console check across all 12 locale/page combinations, each
// throwing "Refused to execute inline script ... violates ... script-src
// 'self'". The fix is a per-request nonce (Next's own documented pattern
// for App Router + strict CSP), not loosening to 'unsafe-inline' or
// 'unsafe-eval' — nonces are stricter than either, scoped to a single
// request. Static headers() can't generate a fresh nonce per request, so
// CSP has to live in middleware; the other five headers below have no such
// constraint and apply globally from here, including to the few routes
// middleware's matcher excludes (icon, opengraph-image, robots.txt,
// sitemap.xml, /.well-known/security.txt) — none of which render
// arbitrary inline scripts, so they don't need a per-request CSP anyway.
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
];

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

  // Phase 4.5 hardening: no x-powered-by fingerprint, no source maps in the
  // production bundle (both are opt-in leaks, not opt-out here).
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
