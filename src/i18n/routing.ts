import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en", "ru", "de"],
  defaultLocale: "bg",
});
