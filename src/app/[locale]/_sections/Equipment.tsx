import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

const chipClass =
  "rounded-full border-2 border-ink px-4 py-2 font-condensed text-body uppercase text-ink";

/**
 * Pill/oval tag chips instead of an exhaustive bordered list — the full
 * 16-item CLAUDE.md equipment inventory is still all here (nothing deleted,
 * see messages/{locale}.json → equipment.highlights + equipment.more), just
 * split into a tight 4-item default view (the categories a tourist actually
 * searches for) plus a no-JS-safe expand via native <details>/<summary> for
 * the other 12, so the section stops eating a third of the page on first
 * load. `rounded-full` here is the one explicit exception to CLAUDE.md's
 * border-radius-above-4px ban — see CLAUDE.md's Design system section for
 * the exact scope of that carve-out.
 */
export default async function Equipment() {
  const t = await getTranslations("equipment");
  const highlights = t.raw("highlights") as string[];
  const more = t.raw("more") as string[];

  return (
    <Section background="bone">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {highlights.map((item) => (
            <li key={item} className={chipClass}>
              {item}
            </li>
          ))}
        </ul>
        <details className="mt-6">
          <summary className="inline-flex min-h-11 cursor-pointer items-center border-2 border-ink px-6 font-condensed text-body uppercase tracking-[0.02em] text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            {t("moreLabel")}
          </summary>
          <ul className="mt-4 flex flex-wrap gap-3">
            {more.map((item) => (
              <li key={item} className={chipClass}>
                {item}
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </Section>
  );
}
