import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroBackground from "@/components/HeroBackground";
import { telHref, mapsUrl } from "@/config/business";

const TEL_HREF = telHref();
const MAPS_HREF = mapsUrl();

/**
 * Full-bleed hero. First real gym photo landed here in Phase 8 (owner-
 * supplied); CLAUDE.md's Outstanding Decision #2 (min. 10 real shots) is
 * still open — this is one of a handful received so far, not the full set.
 *
 * Phase 4.6: the strap-line claim moved from a sibling <p> into the <h1>
 * itself (as a block-level <span>, same classes as before — zero visual
 * change) so the page's one H1 actually carries the primary search
 * keyword. Previously the H1 was just the brand line ("Iron Temple"),
 * with the keyword-bearing claim living in an adjacent paragraph the H1
 * tag itself didn't cover — technically failing "one H1 carrying the
 * primary keyword." `hero.claim` was also reworded per locale (see
 * messages/{locale}.json) to naturally contain the target phrase instead
 * of only implying it.
 */
export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroBackground alt={t("imageAlt")} />
      </div>
      {/* Dark scrim so hero copy stays legible once a real photo lands here */}
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />

      <Container className="relative z-10 pb-10 pt-28 sm:pb-14 sm:pt-36">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-3 font-condensed text-display uppercase text-white">
          {t("headingPlain")}{" "}
          <span className="bg-blood px-2 text-white">{t("headingAccent")}</span>
          <span className="mt-3 block text-h3 text-white">{t("claim")}</span>
        </h1>
        <div className="mt-6 space-y-1 font-sans text-body text-steel">
          <p>{t("hours")}</p>
          <p>{t("location")}</p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href={TEL_HREF} variant="filled">
            {t("ctaCall")}
          </Button>
          <Button
            href={MAPS_HREF}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaFind")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
