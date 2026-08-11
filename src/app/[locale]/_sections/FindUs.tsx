import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { business, telHref, mapsUrl } from "@/config/business";

const TEL_HREF = telHref();
const TEL_DISPLAY = business.phoneDisplay;
const MAPS_HREF = mapsUrl();

/**
 * The map is a direct link/CTA block rather than an embedded iframe —
 * confirmed again in Phase 4.6 (zero iframes anywhere in the codebase).
 * An embedded Google Maps iframe would load third-party cookies and force
 * a consent banner onto a site that currently needs none (see /privacy's
 * cookie table), on top of needing a Maps Embed API key this project
 * doesn't have. A real outbound link to the Place ID is the honest,
 * frictionless choice. URL format standardized Phase 4.6 to
 * `maps/place/?q=place_id:...` via src/config/business.ts's `mapsUrl()` —
 * the same helper Hero.tsx and schema.ts's `hasMap` now use, so there's
 * one place to update if the Place ID ever changes.
 */
export default async function FindUs() {
  const t = await getTranslations("findUs");

  return (
    <Section background="ink">
      <Container className="max-w-3xl">
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-steel">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase">{t("heading")}</h2>

        <dl className="mt-6 space-y-3 font-sans text-body text-steel">
          <div>
            <dt className="inline text-white">{t("addressLabel")} </dt>
            <dd className="inline">{t("address")}</dd>
          </div>
          <div>
            <dt className="inline text-white">{t("hoursLabel")} </dt>
            <dd className="inline">{t("hours")}</dd>
          </div>
          <div>
            <dt className="inline text-white">{t("phoneLabel")} </dt>
            <dd className="inline">
              <a
                href={TEL_HREF}
                className="underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {TEL_DISPLAY}
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-4 font-sans text-body text-steel">{t("walkingTime")}</p>

        <p className="mt-6 max-w-xl font-sans text-body text-steel">
          {t("houseRules")}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href={MAPS_HREF}
            variant="filled"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaMaps")}
          </Button>
          <Button href={TEL_HREF} variant="outline">
            {t("ctaCall")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
