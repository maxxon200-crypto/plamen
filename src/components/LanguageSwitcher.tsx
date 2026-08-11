"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import { FLAGS } from "@/components/Flags";

/**
 * Real locale switcher — not a placeholder. Uses next-intl's locale-aware
 * `Link` (from src/i18n/navigation.ts) so every language keeps the visitor
 * on the current page and the request to the new locale-prefixed URL lets
 * middleware.ts persist the NEXT_LOCALE cookie, same as any other
 * locale-prefixed navigation. Flag-only per stakeholder direction (see
 * src/components/Flags.tsx — national flag colours are an explicit,
 * narrowly-scoped exception to CLAUDE.md's fixed palette) — the own-script
 * text label (Български/English/Русский/Deutsch) is kept as `sr-only` so
 * the accessible name survives even though nothing renders visually.
 *
 * Client component because it needs to know the active locale and the
 * current (locale-stripped) pathname to build the other three links and to
 * mark the current language with aria-current.
 */
export default function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languages");
  const t2 = useTranslations("footer");

  return (
    <nav aria-label={t2("languageLabel")}>
      <ul className="flex flex-wrap gap-2">
        {routing.locales.map((locale) => {
          const Flag = FLAGS[locale];
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                aria-current={locale === activeLocale ? "true" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  locale === activeLocale ? "border-blood" : "border-steel/40 hover:border-steel"
                }`}
              >
                <Flag className="h-5 w-8 flex-shrink-0" />
                <span className="sr-only">{t(locale)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
