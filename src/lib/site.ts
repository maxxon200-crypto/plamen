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

/**
 * Real, verified Google rating (see CLAUDE.md's business facts — ~4.4-4.5,
 * ~149 reviews). Single numeric source of truth for the star-fill visuals
 * in StarRating; the localized display strings (e.g. "4.4" / German
 * "4,4") live in messages/{locale}.json — keep both in sync if this ever
 * changes, never let the star fill drift from the number actually shown.
 */
export const GOOGLE_RATING = 4.4;

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
