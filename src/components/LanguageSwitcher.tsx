"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Real locale switcher — not a placeholder. Uses next-intl's locale-aware
 * `Link` (from src/i18n/navigation.ts) so every language keeps the visitor
 * on the current page and the request to the new locale-prefixed URL lets
 * middleware.ts persist the NEXT_LOCALE cookie, same as any other
 * locale-prefixed navigation. Each language is labelled in its own script
 * (Български / English / Русский / Deutsch) per CLAUDE.md.
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
      <ul className="flex flex-wrap gap-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              aria-current={locale === activeLocale ? "true" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-white ${
                locale === activeLocale ? "text-white" : ""
              }`}
            >
              {t(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
