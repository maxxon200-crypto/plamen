/**
 * Single source of truth for every legally-identifying fact the privacy and
 * terms pages render. No page may hardcode these values — always import
 * from here, so a correction only ever needs to happen in one place.
 *
 * Fields the owner has not yet supplied are the literal string
 * "TODO_OWNER" rather than an invented placeholder (no fake EIK, no fake
 * address) — see `missingLegalFields()` below, which the legal pages use to
 * render a visible warning in development so a half-filled page can't ship
 * unnoticed.
 */
export interface LegalInfo {
  /** Registered company name operating the gym. */
  legalEntityName: string;
  /** Bulgarian company number (ЕИК/Булстат). */
  eik: string;
  /** Registered seat address. */
  registeredAddress: string;
  contactEmail: string;
  contactPhone: string;
  /** ISO date (YYYY-MM-DD) this legal content was last reviewed. */
  lastUpdated: string;
}

export const legal: LegalInfo = {
  legalEntityName: "TODO_OWNER",
  eik: "TODO_OWNER",
  registeredAddress: "TODO_OWNER",
  contactEmail: "TODO_OWNER",
  contactPhone: "+359 87 882 1115",
  lastUpdated: "2026-08-09",
};

export function missingLegalFields(): (keyof LegalInfo)[] {
  return (Object.keys(legal) as (keyof LegalInfo)[]).filter(
    (key) => legal[key] === "TODO_OWNER",
  );
}
