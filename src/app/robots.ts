import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Explicitly allows the major AI-crawler user agents (GPTBot, ClaudeBot,
 * PerplexityBot, OAI-SearchBot) alongside the general allow-all rule, and
 * keeps the dev-only /styleguide route out of the index for every crawler.
 * No llms.txt here — CLAUDE.md and the seo-schema brief are explicit that's
 * skipped (unsupported by Google, unused by AI crawlers).
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/styleguide", "/*/styleguide"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
