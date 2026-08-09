import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Real owner photo (Phase 8), same B&W treatment as the Hero background.
 * Source is a small, chat-compressed selfie — swap
 * public/photos/owner-portrait.jpg for a full-resolution version when one's
 * available.
 */
export default async function TheGym() {
  const t = await getTranslations("theGym");

  return (
    <Section background="ink">
      <Container className="max-w-3xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-2 font-condensed text-h2 uppercase">
          {t("headingPlain")}{" "}
          <span className="bg-blood px-2 text-white">{t("headingAccent")}</span>
        </h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="space-y-4 font-sans text-body text-steel">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
          <div className="relative h-48 w-full flex-shrink-0 sm:h-40 sm:w-40">
            <Image
              src="/photos/owner-portrait.jpg"
              alt={t("ownerPhotoAlt")}
              fill
              sizes="(min-width: 640px) 10rem, 100vw"
              className="object-cover grayscale contrast-125"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
