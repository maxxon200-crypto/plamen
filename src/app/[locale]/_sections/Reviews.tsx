import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import StarRating from "@/components/StarRating";

interface Review {
  quote: string;
  author: string;
  meta: string;
}

// Verbatim quotes from CLAUDE.md's approved review list — do not paraphrase,
// translate, or invent. These are direct quotes from real English-language
// Google reviews; translating them would misrepresent the source, so the
// `quote`/`author` values stay identical across locale message files (only
// `meta`'s date formatting is locale-adapted). Every approved quote is a
// verified 5★ review (see CLAUDE.md), hence the fixed 5-star row per card —
// not a fabricated/averaged number, the real rating for each individual
// review.
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
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.author}
              className="border-2 border-ink/15 p-6"
            >
              <StarRating value={5} />
              <blockquote className="mt-4 font-sans text-body leading-relaxed text-ink">
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
