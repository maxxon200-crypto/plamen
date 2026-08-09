import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import FacebookIcon from "@/components/FacebookIcon";

const FACEBOOK_HREF = "https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/";
const GOOGLE_REVIEW_HREF =
  "https://search.google.com/local/writereview?placeid=ChIJIxshlPafpkARpBnO0sV6nrc";

/**
 * Its own section rather than a Footer afterthought, per direct feedback:
 * "follow us on facebook with the facebook icon and leave a review on
 * google" as an explicit numbered step in the requested page order. The
 * Google review link uses Google's own documented write-review deep link
 * built from the real Place ID (src/config lives in CLAUDE.md's THE
 * BUSINESS section) — a real, functional CTA, not a placeholder. Facebook
 * icon is monochrome (currentColor), matching the palette rule everywhere
 * outside Flags.tsx's narrow exception.
 */
export default async function FollowUs() {
  const t = await getTranslations("followUs");

  return (
    <Section background="charcoal">
      <Container className="text-center">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-white">
          {t("heading")}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={FACEBOOK_HREF}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <FacebookIcon className="h-5 w-5" />
            {t("facebookLabel")}
          </Button>
          <Button
            href={GOOGLE_REVIEW_HREF}
            variant="filled"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("googleLabel")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
