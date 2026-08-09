import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import StarRating from "@/components/StarRating";
import { GOOGLE_RATING } from "@/lib/site";

/**
 * Rebuilt from a thin bg-black caption strip into a proper Section — the
 * old version was flagged as "practically inexistent" given the actual
 * numbers behind it (real, verified: ~4.4 rating, ~149 reviews, 23 years
 * running, per CLAUDE.md). Same facts, no new/invented numbers, just real
 * visual weight: large numerals + a star row instead of small caption text.
 *
 * `yearsValue`/`yearsLabel` leads the row — the owner-verified "23 years,
 * oldest gym in Sunny Beach" claim is the newest and strongest
 * differentiator (see CLAUDE.md's Positioning section), so it goes first,
 * ahead of the rating/review count.
 */
export default async function ProofBar() {
  const t = await getTranslations("proofBar");
  const secondaryItems = [t("dumbbells"), t("ac")];

  return (
    <div className="bg-black py-10 sm:py-12">
      <Container>
        <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
          <div>
            <span className="font-condensed text-display text-[3.5rem] uppercase leading-none text-white sm:text-[4.5rem]">
              {t("yearsValue")}
            </span>
            <p className="mt-2 max-w-[14rem] font-condensed text-caption uppercase tracking-[0.1em] text-steel">
              {t("yearsLabel")}
            </p>
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-condensed text-display text-[3.5rem] uppercase leading-none text-white sm:text-[4.5rem]">
                {t("ratingValue")}
              </span>
              <StarRating value={GOOGLE_RATING} />
            </div>
            <p className="mt-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel">
              {t("ratingLabel")}
            </p>
          </div>

          <div>
            <span className="font-condensed text-[3.5rem] uppercase leading-none text-white sm:text-[4.5rem]">
              {t("reviewCountValue")}
            </span>
            <p className="mt-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel">
              {t("reviewCountLabel")}
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel">
          {secondaryItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
