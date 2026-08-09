import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

const PHONE_DISPLAY = "+359 87 882 1115";
const TEL_HREF = "tel:+359878821115";

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
export default async function Footer() {
  const t = await getTranslations("footer");
  const name = t("name");

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
          <p className="font-condensed text-h3 uppercase text-white">{name}</p>
          <p className="mt-2">{t("address")}</p>
          <p className="mt-1">
            <a
              href={TEL_HREF}
              className="underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>

        <p className="mt-8 font-sans text-caption text-steel/70">
          {t("copyright", { year: new Date().getFullYear(), name })}
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
