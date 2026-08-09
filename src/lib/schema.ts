import { localeUrl, type Locale } from "./site";

const TELEPHONE = "+359878821115";
const FACEBOOK_URL = "https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Fitness+Plamen+GYM&query_place_id=ChIJIxshlPafpkARpBnO0sV6nrc";

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
 * LocalBusiness/ExerciseGym as a policy violation; the ~4.4–4.5/~149 rating
 * stays visible text only (see ProofBar.tsx).
 *
 * `image` is intentionally omitted — CLAUDE.md bans stock/AI placeholder
 * imagery and no real gym photography has been supplied yet (Outstanding
 * decisions #2). Add a real image array here once photography lands.
 */
export function buildExerciseGymSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: "Fitness Plamen GYM SUNNY BEACH",
    url: localeUrl(locale),
    inLanguage: locale,
    telephone: TELEPHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tsentar (Център)",
      addressLocality: "Sunny Beach",
      addressRegion: "Nesebar",
      postalCode: "8240",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.690716,
      longitude: 27.707864,
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
    hasMap: MAPS_URL,
    areaServed: ["Sunny Beach", "Nesebar"],
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
