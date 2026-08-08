import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const TEL_HREF = "tel:+359878821115";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Fitness+Plamen+GYM&query_place_id=ChIJIxshlPafpkARpBnO0sV6nrc";

/**
 * The map is a direct link/CTA block rather than an embedded iframe. An
 * embedded Google Maps iframe needs a Maps Embed API key that isn't
 * provisioned for this project yet, and CLAUDE.md's phase brief only asks
 * for a link to the Place ID pin — a keyless iframe would either fail
 * silently or ship a broken embed, so a real link is the honest choice here.
 */
export default function FindUs() {
  return (
    <Section background="ink">
      <Container className="max-w-3xl">
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-steel">
          Намери ни
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase">Ела днес</h2>

        <dl className="mt-6 space-y-3 font-sans text-body text-steel">
          <div>
            <dt className="inline text-white">Адрес: </dt>
            <dd className="inline">Център, Слънчев бряг 8240, Несебър</dd>
          </div>
          <div>
            <dt className="inline text-white">Часове: </dt>
            <dd className="inline">09:00–21:00, всеки ден</dd>
          </div>
          <div>
            <dt className="inline text-white">Телефон: </dt>
            <dd className="inline">
              <a href={TEL_HREF} className="underline underline-offset-2">
                +359 87 882 1115
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-4 font-sans text-body text-steel">
          Само на няколко минути пеша от плажа.
        </p>

        <p className="mt-6 max-w-xl font-sans text-body text-steel">
          Малка молба, за да е приятно на всички: прибирайте дисковете и
          гирите след себе си и забърсвайте пейката, когато приключите.
          Благодарим.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href={MAPS_HREF}
            variant="filled"
            target="_blank"
            rel="noopener noreferrer"
          >
            Отвори в Google Maps
          </Button>
          <Button href={TEL_HREF} variant="outline">
            Обади се
          </Button>
        </div>
      </Container>
    </Section>
  );
}
