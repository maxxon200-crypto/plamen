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
 * (Български / English / Русский / Deutsch) per CLAUDE.md — text only, no
 * flag icons: a recognisable flag needs its national colours, which don't
 * exist in the fixed 8-token palette (Bulgaria/Russia/Germany/UK-or-US all
 * require hex values outside it), so this stays palette-compliant pill
 * badges instead. Revisit if the palette is ever explicitly extended for
 * this one purpose.
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
      <ul className="flex flex-wrap gap-2 font-condensed text-caption uppercase tracking-[0.1em]">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              aria-current={locale === activeLocale ? "true" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 px-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                locale === activeLocale
                  ? "border-blood text-white"
                  : "border-steel/40 text-steel hover:border-steel hover:text-white"
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
