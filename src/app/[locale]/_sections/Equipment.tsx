import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export default async function Equipment() {
  const t = await getTranslations("equipment");
  // Verbatim against CLAUDE.md's Equipment list — nothing added, nothing
  // removed. `t.raw` returns the JSON array as-is (message keys don't
  // support numbered items well as plain translate() calls for a list).
  const items = t.raw("items") as string[];

  return (
    <Section background="bone">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h2>
        <ul className="mt-8 grid grid-cols-1 font-condensed text-body uppercase text-ink sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item} className="border-b border-ink/15 py-3">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
