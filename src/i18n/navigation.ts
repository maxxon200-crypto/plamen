import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/usePathname/useRouter/redirect, wired to the shared
// routing config. Using these (instead of next/link and next/navigation
// directly) keeps locale prefixes and the NEXT_LOCALE cookie correct when
// switching languages — see next-intl's navigation APIs docs.
export const { Link, usePathname, useRouter, getPathname } =
  createNavigation(routing);
