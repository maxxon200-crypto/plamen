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
import LegalTodoWarning from "@/components/LegalTodoWarning";

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
  const t = await getTranslations({ locale, namespace: "privacy" });

  const languages: Record<string, string> = {
    "x-default": canonicalFor(routing.defaultLocale as Locale, "/privacy"),
  };
  for (const l of routing.locales) {
    languages[l] = canonicalFor(l as Locale, "/privacy");
  }

  return {
    title: t("heading"),
    alternates: {
      canonical: canonicalFor(locale, "/privacy"),
      languages,
    },
  };
}

/**
 * GDPR + Bulgarian Personal Data Protection Act privacy policy. Bulgarian
 * is the authoritative version (see `privacy.authorityNote`, only
 * substantive in en/ru/de). All identifying facts (entity name, EIK,
 * address, contact) come from src/config/legal.ts, never hardcoded here —
 * see LegalTodoWarning for the dev-only guardrail against shipping this
 * page with unfilled TODO_OWNER fields.
 *
 * The Cookie Policy (Part C of the Phase 4.5 brief) lives as a section
 * inside this page rather than a separate route or consent banner — this
 * site sets exactly one strictly-necessary cookie (NEXT_LOCALE), so a
 * consent banner would be friction with nothing to consent to.
 */
export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const rights = t.raw("s6Rights") as string[];

  return (
    <Section background="bone">
      <Container className="max-w-3xl">
        <LegalTodoWarning />

        <Eyebrow className="mt-6 text-ink/60">{t("eyebrow")}</Eyebrow>
        <h1 className="mt-2 font-condensed text-h2 uppercase text-ink">
          {t("heading")}
        </h1>
        <p className="mt-4 font-sans text-body text-ink/80">
          {t("authorityNote")}
        </p>
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
            <dl className="mt-4 space-y-1 border-2 border-ink/15 p-4 font-sans text-body">
              <div className="flex gap-2">
                <dt className="text-ink/60">{t("controllerNameLabel")}</dt>
                <dd>{legal.legalEntityName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink/60">{t("controllerEikLabel")}</dt>
                <dd>{legal.eik}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink/60">{t("controllerAddressLabel")}</dt>
                <dd>{legal.registeredAddress}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink/60">{t("controllerEmailLabel")}</dt>
                <dd>{legal.contactEmail}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink/60">{t("controllerPhoneLabel")}</dt>
                <dd>{legal.contactPhone}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s2Heading")}
            </h2>
            <p className="mt-3">{t("s2Intro")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>{t("s2Log")}</li>
              <li>{t("s2Cookie")}</li>
            </ul>
            <p className="mt-3">{t("s2None")}</p>
            <p className="mt-3">{t("s2Phone")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s3Heading")}
            </h2>
            <p className="mt-3">
              <strong className="font-condensed uppercase tracking-[0.02em]">
                {t("s3LogsHeading")}
              </strong>{" "}
              — {t("s3LogsBody")}
            </p>
            <p className="mt-3">
              <strong className="font-condensed uppercase tracking-[0.02em]">
                {t("s3CookieHeading")}
              </strong>{" "}
              — {t("s3CookieBody")}
            </p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s4Heading")}
            </h2>
            <p className="mt-3">{t("s4Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s5Heading")}
            </h2>
            <p className="mt-3">{t("s5Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s6Heading")}
            </h2>
            <p className="mt-3">{t("s6Body")}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
            <p className="mt-3">{t("s6Contact")}</p>
            <p className="mt-1">{t("s6ResponseTime")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s7Heading")}
            </h2>
            <p className="mt-3">{t("s7Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s8Heading")}
            </h2>
            <p className="mt-3">{t("s8Body")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("cookiesHeading")}
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse border-2 border-ink/15 text-left">
                <thead>
                  <tr className="border-b-2 border-ink/15">
                    <th className="p-3 font-condensed text-caption uppercase tracking-[0.05em]">
                      {t("cookieTableName")}
                    </th>
                    <th className="p-3 font-condensed text-caption uppercase tracking-[0.05em]">
                      {t("cookieTablePurpose")}
                    </th>
                    <th className="p-3 font-condensed text-caption uppercase tracking-[0.05em]">
                      {t("cookieTableType")}
                    </th>
                    <th className="p-3 font-condensed text-caption uppercase tracking-[0.05em]">
                      {t("cookieTableDuration")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t border-ink/10 p-3 font-sans text-caption">
                      {t("cookieRowName")}
                    </td>
                    <td className="border-t border-ink/10 p-3">
                      {t("cookieRowPurpose")}
                    </td>
                    <td className="border-t border-ink/10 p-3">
                      {t("cookieRowType")}
                    </td>
                    <td className="border-t border-ink/10 p-3">
                      {t("cookieRowDuration")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">{t("cookieNote")}</p>
            <p className="mt-1">{t("cookieClear")}</p>
          </section>

          <section>
            <h2 className="font-condensed text-h3 uppercase text-ink">
              {t("s9Heading")}
            </h2>
            <p className="mt-3">{t("s9Body")}</p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
