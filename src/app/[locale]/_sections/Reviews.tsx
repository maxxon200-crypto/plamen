import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

// Verbatim quotes from CLAUDE.md's approved review list — do not paraphrase,
// translate, or invent. Left in English: these are direct quotes from real
// English-language Google reviews, and translating them would misrepresent
// the source.
const reviews = [
  {
    quote:
      "such a lovely & friendly training environment. This gym has everything and more than you could ever need for training not to mention that the owner built all of the machinery by hand which is crazy cool. Everyone is so helpful and welcoming. Gym has amazing air conditioning not to mention how spotless this gym is.",
    author: "Zara P",
    meta: "5★ · юни 2025",
  },
  {
    quote:
      "A true hidden gem, great atmosphere!! and lots of (old school) machines. A must visit if you are visiting sunny beach.",
    author: "R D",
    meta: "5★ · юни 2023",
  },
  {
    quote:
      "Best gym I've used in sunny beach. I come on holidays here every year and I always use this place. Great equipment and the place is spotless. Owner is very nice",
    author: "Kevin S",
    meta: "5★ · авг. 2025",
  },
];

export default function Reviews() {
  return (
    <Section background="white">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          От Google отзиви
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          Не го казваме само ние
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.author} className="border-t-2 border-blood pt-4">
              <blockquote className="font-sans text-body text-ink">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 font-condensed text-caption uppercase tracking-[0.1em] text-ink/60">
                {review.author} — {review.meta} · Google отзив
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
