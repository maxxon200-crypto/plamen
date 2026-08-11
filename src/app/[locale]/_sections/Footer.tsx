import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { business, formatNapAddress, telHref } from "@/config/business";
import type { Locale } from "@/lib/site";

// Language switcher moved to TopBar (src/components/TopBar.tsx) per
// stakeholder feedback — reachable at any scroll position, not just once
// down here.
//
// The owner-supplied logo (public/logo-supplied.jpg) has a flat white
// background baked into the file (a JPEG, no transparency) — pasted
// directly onto bg-black it would look like a broken/clipped image, so
// it's wrapped in a small bg-white card here instead, reading as an
// intentional badge. CLAUDE.md Outstanding Decision #3 (use as supplied vs.
// redesign to match the site's exact palette/typeface) is still open;
// this is the "use as supplied" path, easy to swap for a redesigned
// transparent-background mark later without touching layout.
//
// Phase 4.6: the NAP block (name/address/phone) below now comes straight
// from src/config/business.ts instead of messages/{locale}.json — it has
// to match the Google Business Profile character for character, and a
// translated JSON string can't guarantee that. Real, selectable HTML
// text, never an image, never JSON-LD-only. `formatNapAddress()` keeps
// "Център, Слънчев бряг" in Cyrillic on every locale (so it still reads
// correctly to a Bulgarian taxi driver no matter what language the page
// is in) and only adds a parenthetical Latin transliteration on the
// non-Bulgarian versions, for the visitor's own reading convenience.
export default async function Footer() {
  const t = await getTranslations("footer");
  const currentLocale = (await getLocale()) as Locale;

  return (
    <footer className="bg-black py-10">
      <Container>
        <div className="font-sans text-body text-steel">
          <div className="mb-4 inline-block bg-white p-2">
            <Image
              src="/logo-supplied.jpg"
              alt={t("logoAlt")}
              width={99}
              height={165}
              className="h-20 w-auto"
            />
          </div>
          <p className="font-condensed text-h3 uppercase text-white">
            {business.name}
          </p>
          <p className="mt-2">{formatNapAddress(currentLocale)}</p>
          <p className="mt-1">
            <a
              href={telHref()}
              className="underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {business.phoneDisplay}
            </a>
          </p>
        </div>

        <p className="mt-8 font-sans text-caption text-steel/70">
          {t("copyright", { year: new Date().getFullYear(), name: business.name })}
        </p>

        <nav className="mt-3 flex gap-4 font-sans text-caption text-steel/70">
          <Link
            href="/privacy"
            className="underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("privacyLink")}
          </Link>
          <Link
            href="/terms"
            className="underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("termsLink")}
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
