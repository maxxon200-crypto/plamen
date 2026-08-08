import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const TEL_HREF = "tel:+359878821115";

const passes = [
  {
    name: "Дневен пропуск",
    desc: "За гости на плажа, които искат едно сериозно тренировъчно занимание и после обратно към морето.",
  },
  {
    name: "Седмичен пропуск",
    desc: "За почивка на Слънчев бряг — тренирай през цялата седмица без прекъсване на режима.",
  },
  {
    name: "Месечен пропуск",
    desc: "За по-дълъг престой в района — редовен достъп без излишни ангажименти.",
  },
];

export default function Passes() {
  return (
    <Section background="charcoal">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-steel">
          Пропуски
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase">
          Влез. Тренирай. Без формалности.
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-body text-steel">
          Обадете се или елате направо на място — ще ви кажем всичко за
          пропуските в момента.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {passes.map((pass) => (
            <div key={pass.name} className="border border-white/15 p-6">
              <h3 className="font-condensed text-h3 uppercase">{pass.name}</h3>
              <p className="mt-3 font-sans text-body text-steel">{pass.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={TEL_HREF} variant="filled">
            Обадете се за пропуск
          </Button>
        </div>
      </Container>
    </Section>
  );
}
