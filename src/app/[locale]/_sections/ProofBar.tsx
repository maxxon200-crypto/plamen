import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import StarRating from "@/components/StarRating";
import { GOOGLE_RATING } from "@/lib/site";

const numeralClass =
  "font-condensed text-[2.25rem] uppercase leading-none text-white sm:text-[3.5rem] lg:text-[4.5rem]";
const labelClass =
  "mt-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel";
// Oval chips, same `rounded-full` exception Equipment's tag chips use (see
// CLAUDE.md's Design system section) — just re-colored for the black
// background instead of Equipment's bone one. Requested explicitly: the
// dumbbells/AC stats read as an afterthought as plain caption text, so
// they get the same pill treatment as an equipment highlight would.
const secondaryChipClass =
  "rounded-full border-2 border-steel px-4 py-2 font-condensed text-caption uppercase tracking-[0.1em] text-white";

/**
 * Rebuilt from a thin bg-black caption strip into a proper Section — the
 * old version was flagged as "practically inexistent" given the actual
 * numbers behind it (real, verified: ~4.4 rating, 177 reviews — the most
 * of any gym in Sunny Beach — 23 years running, per CLAUDE.md). Same
 * facts, no new/invented numbers, just real visual weight: large numerals
 * + a star row instead of small caption text.
 *
 * `yearsValue`/`yearsLabel` leads the row — the owner-verified "23 years,
 * oldest gym in Sunny Beach" claim is the newest and strongest
 * differentiator (see CLAUDE.md's Positioning section), so it goes first,
 * ahead of the rating/review count.
 *
 * Fixed 3-column grid, not flex-wrap — three large numerals in a
 * flex-wrap row broke unevenly at 375px (the years label especially would
 * wrap under its own numeral with no room to breathe). A grid guarantees
 * each stat an even third of the width at every size instead of fighting
 * for it; the numeral scale steps down at the base breakpoint
 * (2.25rem -> 3.5rem -> 4.5rem) so three columns actually fit on a phone.
 */
export default async function ProofBar() {
  const t = await getTranslations("proofBar");
  const secondaryItems = [t("dumbbells"), t("ac")];

  return (
    <div className="bg-black py-10 sm:py-12">
      <Container>
        <h2 className="font-condensed text-h3 uppercase text-white sm:text-h2">
          {t("claim")}
        </h2>
        <div className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-10">
          <div>
            <span className={numeralClass}>{t("yearsValue")}</span>
            <p className={labelClass}>{t("yearsLabel")}</p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className={numeralClass}>{t("ratingValue")}</span>
              <StarRating
                value={GOOGLE_RATING}
                className="scale-75 origin-left sm:scale-100"
              />
            </div>
            <p className={labelClass}>{t("ratingLabel")}</p>
          </div>

          <div>
            <span className={numeralClass}>{t("reviewCountValue")}</span>
            <p className={labelClass}>{t("reviewCountLabel")}</p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {secondaryItems.map((item) => (
            <li key={item} className={secondaryChipClass}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
