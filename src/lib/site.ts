import { routing } from "@/i18n/routing";

/**
 * Placeholder production domain. No real domain has been purchased/configured
 * yet (see CLAUDE.md's outstanding decisions) — this must be swapped for the
 * real domain before deploy, and every canonical/OG/sitemap/robots URL in
 * this codebase is derived from this single constant so that swap is a
 * one-line change.
 */
export const SITE_URL = "https://fitnessplamen.bg";

export const SITE_NAME = "Fitness Plamen GYM Sunny Beach";

export type Locale = (typeof routing.locales)[number];

const OG_LOCALES: Record<Locale, string> = {
  bg: "bg_BG",
  en: "en_US",
  ru: "ru_RU",
  de: "de_DE",
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

export function localeUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}`;
}
