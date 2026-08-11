import Container from "@/components/ui/Container";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Slim persistent bar pinned to the very top of the viewport, above Hero.
 * Moved here from the footer per stakeholder feedback — the language
 * switcher needs to be reachable at any scroll position, not just once at
 * the bottom of the page. `fixed` (not part of normal flow) so it never
 * pushes Hero's above-the-fold content down.
 *
 * `min-h-*` + `flex-wrap`, not a fixed `h-*` — on narrow phones the four
 * full-script language badges (Български/English/Русский/Deutsch) don't
 * always fit one row. A fixed height + `items-center` would center the
 * wrapped second row on the box's cross-axis, pushing half of it off-screen
 * above the viewport (verified this actually happened at 390px width
 * before this fix). Growing downward instead keeps every badge on-screen
 * and reachable, at the cost of the bar sometimes being taller than one
 * row. Hero's top padding (pt-28/pt-36) still clears the two-row case.
 */
export default function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-30 bg-black">
      <Container className="flex min-h-12 flex-wrap items-center justify-end gap-y-1 py-2 sm:min-h-14">
        <LanguageSwitcher />
      </Container>
    </div>
  );
}
