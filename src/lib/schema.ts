import { localeUrl, type Locale } from "./site";
import { business, mapsUrl } from "@/config/business";

const FACEBOOK_URL = "https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * ExerciseGym JSON-LD, factual and locale-invariant aside from `url`/
 * `inLanguage` (the business's name/address/hours don't change per
 * language). HARD PROHIBITION (CLAUDE.md + seo-schema brief): never add
 * `aggregateRating` here — Google treats self-serving aggregateRating on
 * LocalBusiness/ExerciseGym as a policy violation; the ~4.4–4.5/177 rating
 * stays visible text only (see ProofBar.tsx).
 *
 * `image` is intentionally still omitted — real photography landed in
 * Phase 11/12 (see CLAUDE.md's Photography section), but adding photo URLs
 * to structured data wasn't part of the Phase 4.6 SEO scope; still a real
 * TODO, just not this pass.
 *
 * All identifying facts (name/phone/address/coordinates/Place ID) come
 * from src/config/business.ts, the single source of truth added Phase 4.6
 * — never hardcode them here again.
 */
export function buildExerciseGymSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: business.name,
    url: localeUrl(locale),
    inLanguage: locale,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tsentar (Център)",
      addressLocality: "Sunny Beach",
      addressRegion: "Nesebar",
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.lat,
      longitude: business.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS_OF_WEEK,
      opens: "09:00",
      closes: "21:00",
    },
    // TODO(photography): add real gym photo URLs once the owner supplies
    // at least 10 real shots (CLAUDE.md — no stock/AI imagery, ever).
    // image: [],
    sameAs: [FACEBOOK_URL],
    hasMap: mapsUrl(),
    // Burgas Province is the wider administrative region Sunny Beach and
    // Nesebar sit within — added Phase 4.6 for broader areaServed coverage.
    areaServed: ["Sunny Beach", "Nesebar", "Burgas Province"],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Air conditioning",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free weights up to 55 kg",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Calisthenics park",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Boxing area",
        value: true,
      },
    ],
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage JSON-LD, mirrors the visible FAQ section's Q&A content for the
 * given locale exactly (see _sections/FAQ.tsx). No aggregateRating here
 * either — this block only carries Question/Answer content.
 */
export function buildFaqSchema(locale: Locale, items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
