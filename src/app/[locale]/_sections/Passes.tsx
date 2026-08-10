import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { telHref } from "@/config/business";

const TEL_HREF = telHref();

interface Pass {
  name: string;
  desc: string;
}

export default async function Passes() {
  const t = await getTranslations("passes");
  const passes = t.raw("items") as Pass[];

  return (
    <Section background="charcoal">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-steel">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase">{t("heading")}</h2>
        <p className="mt-4 max-w-2xl font-sans text-body text-steel">
          {t("intro")}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {passes.map((pass) => (
            <div key={pass.name} className="border border-white/15 p-6">
              <h3 className="font-condensed text-h3 uppercase">{pass.name}</h3>
              <p className="mt-3 font-sans text-body text-steel">{pass.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={TEL_HREF} variant="filled">
            {t("ctaCall")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
