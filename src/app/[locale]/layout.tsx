import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sofiaSans, sofiaSansCondensed } from "@/lib/fonts";
import { SITE_NAME, SITE_URL, localeUrl, ogLocale, type Locale } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Per-locale metadata: title/description target real search phrasing (see
 * messages/{locale}.json → "meta"), canonical is self-referencing, and
 * alternates.languages covers all four locales plus x-default → /bg
 * (Bulgarian is the default locale per src/i18n/routing.ts).
 *
 * SITE_URL (src/lib/site.ts) is a placeholder domain — no real production
 * domain is configured yet. Swap that one constant before deploy.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (
    hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  ) as Locale;

  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const url = localeUrl(locale);

  const languages: Record<string, string> = {
    "x-default": localeUrl(routing.defaultLocale as Locale),
  };
  for (const l of routing.locales) {
    languages[l] = localeUrl(l as Locale);
  }

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${sofiaSans.variable} ${sofiaSansCondensed.variable}`}
    >
      <body className="font-sans bg-ink text-white">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
