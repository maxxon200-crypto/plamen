import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Rule from "@/components/ui/Rule";

/**
 * Interactive/structural primitives — Button (filled + outline), Rule,
 * Eyebrow. Buttons are wired to real hrefs, never dead links.
 */
export default function Primitives() {
  return (
    <div className="space-y-10">
      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-3">
          Eyebrow
        </p>
        <Eyebrow>The Gym</Eyebrow>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-2">
            Button — filled
          </p>
          <Button href="tel:+359878821115" variant="filled">
            Call the gym
          </Button>
        </div>
        <div>
          <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-2">
            Button — outline
          </p>
          <Button
            href="https://www.google.com/maps/place/?q=place_id:ChIJIxshlPafpkARpBnO0sV6nrc"
            variant="outline"
          >
            Get directions
          </Button>
        </div>
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-2">
          Rule — 2px blood
        </p>
        <Rule />
      </div>
    </div>
  );
}
