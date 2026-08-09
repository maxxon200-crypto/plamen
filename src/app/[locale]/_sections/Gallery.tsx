import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const PHOTOS = [
  { src: "/photos/dumbbell-rack.jpg", altKey: "photo1Alt" },
  { src: "/photos/gym-floor-wide-1.jpg", altKey: "photo2Alt" },
  { src: "/photos/gym-floor-wide-2.jpg", altKey: "photo3Alt" },
  { src: "/photos/gym-floor-wide-3.jpg", altKey: "photo4Alt" },
] as const;

/**
 * Real-photo proof section — visual backup for the "oldest & most-reviewed
 * gym in Sunny Beach" claim made in Hero/ProofBar's copy. Same B&W
 * treatment as every other real photo on the site (grayscale + contrast
 * filter, texture-grain overlay via the `ink` Section background) — see
 * CLAUDE.md's Photography section for the full received/committed
 * breakdown these four came from. No captions beyond alt text: the photos
 * are the argument, same principle as Equipment's dense list.
 */
export default async function Gallery() {
  const t = await getTranslations("gallery");

  return (
    <Section background="ink">
      <Container>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-white">
          {t("heading")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PHOTOS.map(({ src, altKey }) => (
            <div key={src} className="relative aspect-[4/3] w-full texture-grain">
              <Image
                src={src}
                alt={t(altKey)}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale contrast-125"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
