import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";

const PHONE_DISPLAY = "+359 87 882 1115";
const TEL_HREF = "tel:+359878821115";
const FACEBOOK_HREF = "https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/";

// Language switcher moved to TopBar (src/components/TopBar.tsx) per
// stakeholder feedback — reachable at any scroll position, not just once
// down here.
export default async function Footer() {
  const t = await getTranslations("footer");
  const name = t("name");

  return (
    <footer className="bg-black py-10">
      <Container>
        <div className="font-sans text-body text-steel">
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
          <a
            href={FACEBOOK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block underline underline-offset-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("facebook")}
          </a>
        </div>

        <p className="mt-8 font-sans text-caption text-steel/70">
          {t("copyright", { year: new Date().getFullYear(), name })}
        </p>
      </Container>
    </footer>
  );
}
