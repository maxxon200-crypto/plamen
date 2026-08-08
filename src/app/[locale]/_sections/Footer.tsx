import Container from "@/components/ui/Container";

const NAME = "Фитнес Пламен GYM Sunny Beach";
const ADDRESS = "Център, Слънчев бряг 8240, Несебър, България";
const PHONE_DISPLAY = "+359 87 882 1115";
const TEL_HREF = "tel:+359878821115";
const FACEBOOK_HREF = "https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/";

// Real routes — /bg /en /ru /de all resolve since Phase 0. Copy on the
// other three locales isn't localized yet (that's Phase 3), so these are
// working navigation, not dead links: they render the same real page.
const languages = [
  { code: "bg", label: "BG" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
];

export default function Footer() {
  return (
    <footer className="bg-black py-10">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="font-sans text-body text-steel">
            <p className="font-condensed text-h3 uppercase text-white">{NAME}</p>
            <p className="mt-2">{ADDRESS}</p>
            <p className="mt-1">
              <a href={TEL_HREF} className="underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
            </p>
            <a
              href={FACEBOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block underline underline-offset-2"
            >
              Facebook
            </a>
          </div>

          <nav aria-label="Език">
            <ul className="flex gap-2 font-condensed text-caption uppercase tracking-[0.1em] text-steel">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <a
                    href={`/${lang.code}`}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-white"
                  >
                    {lang.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 font-sans text-caption text-steel/70">
          © {new Date().getFullYear()} {NAME}
        </p>
      </Container>
    </footer>
  );
}
