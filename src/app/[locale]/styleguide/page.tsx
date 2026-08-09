import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import PaletteSwatches from "./_sections/PaletteSwatches";
import TypeScale from "./_sections/TypeScale";
import Primitives from "./_sections/Primitives";
import Texture from "./_sections/Texture";

/**
 * Temporary internal route (Phase 1). Renders every design primitive and
 * type scale style for human review. Not linked from the public site and
 * not indexed. Remove once the design system is validated on real pages.
 */
export default function StyleguidePage() {
  return (
    <main>
      <Section background="ink">
        <Container>
          <h1 className="font-condensed text-h2 uppercase">Style Guide</h1>
          <p className="font-sans text-body text-steel mt-2">
            Design foundation reference — palette, type scale, primitives, texture.
          </p>
        </Container>
      </Section>

      <Rule />

      <Section background="ink">
        <Container>
          <h2 className="font-condensed text-h3 uppercase mb-6">Palette</h2>
          <PaletteSwatches />
        </Container>
      </Section>

      <Rule />

      <Section background="bone">
        <Container>
          <h2 className="font-condensed text-h3 uppercase mb-6">Type Scale</h2>
          <TypeScale />
        </Container>
      </Section>

      <Rule />

      <Section background="ink">
        <Container>
          <h2 className="font-condensed text-h3 uppercase mb-6">Primitives</h2>
          <Primitives />
        </Container>
      </Section>

      <Rule />

      <Section background="ink">
        <Container>
          <h2 className="font-condensed text-h3 uppercase mb-6">Texture</h2>
          <Texture />
        </Container>
      </Section>
    </main>
  );
}
