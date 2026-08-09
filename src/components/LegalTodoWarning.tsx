import { missingLegalFields } from "@/config/legal";

/**
 * Development-only guardrail: renders a visible banner on any legal page
 * that still has TODO_OWNER fields, so a half-filled privacy/terms page
 * can't ship unnoticed. Never renders in production — if the owner hasn't
 * supplied a value by then, that's a real content gap, not something to
 * silently hide from a live visitor either way, but this banner's job is
 * catching it during development, not policing prod.
 */
export default function LegalTodoWarning() {
  if (process.env.NODE_ENV !== "development") return null;

  const missing = missingLegalFields();
  if (missing.length === 0) return null;

  return (
    <div className="border-2 border-blood bg-white px-4 py-3 font-sans text-body text-ink">
      <strong className="font-condensed uppercase tracking-[0.05em] text-blood">
        Dev warning:
      </strong>{" "}
      src/config/legal.ts still has placeholder TODO_OWNER values for:{" "}
      {missing.join(", ")}. Do not deploy until the owner supplies these.
    </div>
  );
}
