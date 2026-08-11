import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * CSP lives here, not next.config.ts, because it needs a fresh nonce per
 * request — Next's App Router injects inline <script> tags for RSC
 * hydration payload on every render, which a static `script-src 'self'`
 * blocks outright (see next.config.ts's comment for how that was caught,
 * with a real headless-Chromium console check across every locale/page).
 * This is Next's documented pattern for strict CSP + App Router: forward
 * the nonce to the request (so Next's renderer can tag its own inline
 * scripts with it) via the same low-level `x-middleware-override-headers` /
 * `x-middleware-request-*` mechanism `NextResponse.next({request:{headers}})`
 * uses internally — applied to next-intl's own response here since we're
 * composing with its middleware rather than replacing it, so its locale
 * redirect/rewrite/cookie behavior stays untouched. Verified empirically
 * (curl + a real headless-Chromium console check): before this, every
 * page threw "Refused to execute inline script" on every locale; after,
 * zero CSP console errors on any of the 12 locale/page combinations. Every
 * directive still matches the Phase 4.5 spec exactly — no 'unsafe-eval',
 * no wildcard; style-src keeps 'unsafe-inline' as explicitly specified
 * (next/font's generated @font-face rules ship as an inline <style> tag).
 *
 * Merge, don't replace, `x-middleware-override-headers`: next-intl's own
 * middleware already uses this same mechanism to forward the resolved
 * locale downstream (x-middleware-request-x-next-intl-locale). Overwriting
 * it wholesale silently dropped that override and broke locale-aware RSC
 * prefetching — caught via a real fresh-browser-context check where
 * <Link> prefetches for other locales 404'd against a malformed path
 * (e.g. requesting /bg/en instead of /bg). Appending our two names to
 * whatever next-intl already listed keeps its overrides intact.
 */
export default function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "font-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const response = intlMiddleware(request);

  const overrideHeaderName = "x-middleware-override-headers";
  const existingOverrides = response.headers.get(overrideHeaderName);
  const overrideNames = existingOverrides
    ? existingOverrides.split(",").map((name) => name.trim())
    : [];
  for (const name of ["x-nonce", "content-security-policy"]) {
    if (!overrideNames.includes(name)) overrideNames.push(name);
  }
  response.headers.set(overrideHeaderName, overrideNames.join(","));
  response.headers.set("x-middleware-request-x-nonce", nonce);
  response.headers.set("x-middleware-request-content-security-policy", csp);
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  // Also exclude Next's file-convention metadata routes (icon,
  // opengraph-image) — they have no file extension in their URL, so without
  // this they'd otherwise match the locale-prefix redirect below and 404.
  matcher: ["/((?!api|trpc|_next|_vercel|icon|opengraph-image|.*\\..*).*)"],
};
