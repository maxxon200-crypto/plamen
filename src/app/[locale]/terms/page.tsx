import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL, type Locale } from "@/lib/site";
import { legal } from "@/config/legal";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Rule from "@/components/ui/Rule";

function canonicalFor(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (
    hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale, namespace: "terms" });

  const languages: Record<string, string> = {
    "x-default": canonicalFor(routing.defaultLocale as Locale, "/terms"),
  };
  for (const l of routing.locales) {
    languages[l] = canonicalFor(l as Locale, "/terms");
  }

  return {
    title: t("heading"),
    alternates: {
      canonical: canonicalFor(locale, "/terms"),
      languages,
    },
  };
}

/**
 * Site-use terms + gym house rules. No legal.ts identifying fields needed
 * here beyond lastUpdated — the controller identity lives on /privacy, this
 * page is about site/gym conduct, not data processing.
 */
export default async function TermsPage() {
  const t = await getTranslations("terms");
  const rules = t.raw("rules") as string[];

  return (
    <Section background="bone">
      <Container className="max-w-3xl">
        <Eyebrow className="mt-6 text-ink/60">{t("eyebrow")}</Eyebrow>
        <h1 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h1>
        <p className="mt-4 font-sans text-body text-ink/80">{t("intro")}</p>
        <p className="mt-2 font-condensed text-caption uppercase tracking-[0.1em] text-ink/60">
          {t("lastUpdatedLabel")} {legal.lastUpdated}
        </p>

        <Rule className="mt-8" />

        <div className="mt-8 space-y-10 font-sans text-body leading-relaxed text-ink">
          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s1Heading")}
            </h2>
            <p className="mt-3">{t("s1Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s2Heading")}
            </h2>
            <p className="mt-3">{t("s2Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("rulesHeading")}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("riskHeading")}
            </h2>
            <p className="mt-3">{t("riskBody")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("lawHeading")}
            </h2>
            <p className="mt-3">{t("lawBody")}</p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
