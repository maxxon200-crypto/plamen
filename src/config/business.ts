import type { Locale } from "@/lib/site";

/**
 * Single source of truth for the gym's NAP (Name/Address/Phone) and other
 * Google Business Profile facts. If the GBP listing ever changes, this
 * file changes in the same commit — nothing downstream (Footer, schema.ts,
 * FindUs, Hero) should hardcode any of these values independently.
 */
export const business = {
  name: "Fitness Plamen GYM SUNNY BEACH",
  street: "Център",
  city: "Слънчев бряг",
  postalCode: "8240",
  country: "BG",
  phone: "+359878821115",
  phoneDisplay: "+359 87 882 1115",
  lat: 42.690716,
  lng: 27.707864,
  placeId: "ChIJIxshlPafpkARpBnO0sV6nrc",
  hours: "09:00-21:00, daily",
} as const;

/**
 * "Център, Слънчев бряг" is never translated — it must match the Google
 * Business Profile character for character so a tourist can show the
 * screen to a taxi driver. Non-Bulgarian locales get a parenthetical
 * transliteration (not a translation) purely for the reader's own
 * pronunciation/recognition; the Cyrillic stays primary and identical
 * across all four locales.
 */
const TRANSLITERATION = "Tsentar, Slanchev bryag";

const REGION_COUNTRY: Record<Locale, string> = {
  bg: "Несебър, България",
  en: "Nesebar, Bulgaria",
  ru: "Несебр, Болгария",
  de: "Nessebar, Bulgarien",
};

export function formatNapAddress(locale: Locale): string {
  const streetCity =
    locale === "bg"
      ? `${business.street}, ${business.city}`
      : `${business.street}, ${business.city} (${TRANSLITERATION})`;
  return `${streetCity} ${business.postalCode}, ${REGION_COUNTRY[locale]}`;
}

export function mapsUrl(): string {
  return `https://www.google.com/maps/place/?q=place_id:${business.placeId}`;
}

export function telHref(): string {
  return `tel:${business.phone}`;
}
