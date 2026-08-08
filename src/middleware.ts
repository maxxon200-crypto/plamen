import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Also exclude Next's file-convention metadata routes (icon,
  // opengraph-image) — they have no file extension in their URL, so without
  // this they'd otherwise match the locale-prefix redirect below and 404.
  matcher: ["/((?!api|trpc|_next|_vercel|icon|opengraph-image|.*\\..*).*)"],
};
