import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

interface Review {
  quote: string;
  author: string;
  meta: string;
}

// Verbatim quotes from CLAUDE.md's approved review list — do not paraphrase,
// translate, or invent. These are direct quotes from real English-language
// Google reviews; translating them would misrepresent the source, so the
// `quote`/`author` values stay identical across locale message files (only
// `meta`'s date formatting is locale-adapted).
export default async function Reviews() {
  const t = await getTranslations("reviews");
  const reviews = t.raw("items") as Review[];

  return (
    <Section background="white">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.author} className="border-t-2 border-blood pt-4">
              <blockquote className="font-sans text-body text-ink">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 font-condensed text-caption uppercase tracking-[0.1em] text-ink/60">
                {review.author} — {review.meta} · {t("sourceLabel")}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
