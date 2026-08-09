import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Rule from "@/components/ui/Rule";
import Reveal from "@/components/Reveal";
import { routing } from "@/i18n/routing";
import { buildExerciseGymSchema } from "@/lib/schema";
import type { Locale } from "@/lib/site";
import Hero from "./_sections/Hero";
import ProofBar from "./_sections/ProofBar";
import TheGym from "./_sections/TheGym";
import Equipment from "./_sections/Equipment";
import Gallery from "./_sections/Gallery";
import Passes from "./_sections/Passes";
import Reviews from "./_sections/Reviews";
import FindUs from "./_sections/FindUs";
import FAQ from "./_sections/FAQ";
import Footer from "./_sections/Footer";

/**
 * Copy comes from messages/{locale}.json (Phase 3). Static, no client JS,
 * no animation (that's Phase 5). The ExerciseGym JSON-LD block lives here
 * (not in layout.tsx) so it renders only on the real marketing page, not on
 * the dev-only /styleguide route. Per CLAUDE.md's hard prohibition, this
 * schema never carries aggregateRating — the visible rating in ProofBar is
 * plain text only.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const exerciseGymSchema = buildExerciseGymSchema(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseGymSchema) }}
      />
      <header>
        <Hero />
      </header>
      <main>
        <Reveal>
          <ProofBar />
        </Reveal>
        <Reveal>
          <TheGym />
        </Reveal>
        <Rule />
        <Reveal>
          <Equipment />
        </Reveal>
        <Reveal>
          <Gallery />
        </Reveal>
        <Reveal>
          <Passes />
        </Reveal>
        <Reveal>
          <Reviews />
        </Reveal>
        <Rule />
        <Reveal>
          <FindUs />
        </Reveal>
        <Rule />
        <Reveal>
          <FAQ />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
