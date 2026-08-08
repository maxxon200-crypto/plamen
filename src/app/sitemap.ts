import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localeUrl, type Locale } from "@/lib/site";

/**
 * Covers all four locale homepages only — /styleguide is a dev-only route
 * (excluded from robots.txt too) and there are no other public routes yet
 * (single-page marketing site per CLAUDE.md).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    "x-default": localeUrl(routing.defaultLocale as Locale),
  };
  for (const locale of routing.locales) {
    languages[locale] = localeUrl(locale as Locale);
  }

  return routing.locales.map((locale) => ({
    url: localeUrl(locale as Locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
