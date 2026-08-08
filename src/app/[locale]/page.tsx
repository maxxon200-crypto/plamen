import Rule from "@/components/ui/Rule";
import Hero from "./_sections/Hero";
import ProofBar from "./_sections/ProofBar";
import TheGym from "./_sections/TheGym";
import Equipment from "./_sections/Equipment";
import Passes from "./_sections/Passes";
import Reviews from "./_sections/Reviews";
import FindUs from "./_sections/FindUs";
import Footer from "./_sections/Footer";

/**
 * Phase 2 MVP — Bulgarian copy hardcoded directly in the section components
 * (see ./_sections/). Extraction into messages/bg.json + en/ru/de variants
 * is Phase 3's job, not this one. Static, no client JS, no animation.
 */
export default function Home() {
  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <ProofBar />
        <TheGym />
        <Rule />
        <Equipment />
        <Passes />
        <Reviews />
        <Rule />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
