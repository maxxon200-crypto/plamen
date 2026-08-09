import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroBackground from "@/components/HeroBackground";

const TEL_HREF = "tel:+359878821115";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Fitness+Plamen+GYM&query_place_id=ChIJIxshlPafpkARpBnO0sV6nrc";

/**
 * Full-bleed hero. First real gym photo landed here in Phase 8 (owner-
 * supplied); CLAUDE.md's Outstanding Decision #2 (min. 10 real shots) is
 * still open — this is one of a handful received so far, not the full set.
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
        </h1>
        <p className="mt-3 font-condensed text-h3 uppercase text-white">
          {t("claim")}
        </p>
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
