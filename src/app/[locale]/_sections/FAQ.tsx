import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { buildFaqSchema } from "@/lib/schema";
import type { Locale } from "@/lib/site";

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Answer-first FAQ, trimmed to 5 of the original 7 questions (dropped the
 * two most redundant with content already shown in ProofBar/Equipment
 * above). Each item is a native <details>/<summary> accordion — no-JS-safe,
 * no client component needed, the browser's own disclosure triangle is the
 * expand/collapse affordance. The first sentence of each `answer` string in
 * messages/{locale}.json is still written as a complete, standalone,
 * extractable statement (per Phase 4 brief). The JSON-LD FAQPage block
 * below mirrors this same content exactly — no aggregateRating anywhere
 * near it.
 */
export default async function FAQ() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const faqSchema = buildFaqSchema(locale, items);

  return (
    <Section background="bone">
      <Container className="max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h2>
        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="border-t-2 border-blood pt-4"
            >
              <summary className="min-h-11 cursor-pointer font-condensed text-h3 uppercase text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                {item.question}
              </summary>
              <p className="mt-2 font-sans text-body text-ink/80">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
