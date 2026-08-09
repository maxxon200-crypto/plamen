import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { legal } from "@/config/legal";

/**
 * RFC 9116 security.txt. Contact and Expires are derived from
 * src/config/legal.ts so this file can never silently drift from the
 * site's real contact details — if contactEmail is still the TODO_OWNER
 * placeholder, that shows up here literally rather than as an invented
 * address, same convention as the rest of the legal pages.
 */
export function GET() {
  const expires = new Date(legal.lastUpdated);
  expires.setFullYear(expires.getFullYear() + 1);

  const body = [
    `Contact: mailto:${legal.contactEmail}`,
    `Contact: tel:${legal.contactPhone.replace(/\s+/g, "")}`,
    `Expires: ${expires.toISOString()}`,
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
