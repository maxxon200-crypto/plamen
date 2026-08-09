import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

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
        <div className="mt-6 space-y-4 font-sans text-body text-steel">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
      </Container>
    </Section>
  );
}
