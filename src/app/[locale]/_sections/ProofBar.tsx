import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";

/**
 * Thin proof strip. Deliberately not built on the Section primitive — that
 * wrapper's vertical padding (py-16+) is too tall for a strip meant to read
 * in under a second; a plain Container keeps this genuinely thin.
 *
 * The "20 години" founding-year claim from PHASES.md is intentionally
 * OMITTED here: CLAUDE.md's "Outstanding decisions" #1 flags that year as
 * unverified, and the no-fabrication rule outranks the phase checklist.
 * TODO(founding-year): once the owner confirms a real year, add an item
 * here, e.g. `"${YEARS} години в Слънчев бряг"` — never ship a guessed number.
 */
export default async function ProofBar() {
  const t = await getTranslations("proofBar");
  const items = [t("rating"), t("reviewCount"), t("dumbbells"), t("ac")];

  return (
    <div className="bg-black py-4">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel sm:justify-between">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
