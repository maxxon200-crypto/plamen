import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

// Verbatim against CLAUDE.md's Equipment list — nothing added, nothing removed.
const equipment = [
  "Пейки",
  "Лег преса",
  "Хак клек",
  "Машина за бицепс тип Скот + свободна пейка тип Скот",
  "Флексии за бицепс на крак (лег кърл)",
  "Разгъвания за квадрицепс",
  "Калистеника парк",
  "Боксова зона",
  "Кабелни машини",
  "Всички варианти дърпане надолу",
  "Дип машина",
  "Адуктор + абдуктор",
  "Пек-дек с лакътна опора и пек-дек с права ръка и заден рамен пакет",
  "Пътуваща Смит машина и стандартна Смит машина",
  "Дъмбели до 55 кг",
  "Климатик",
];

export default function Equipment() {
  return (
    <Section background="bone">
      <Container>
        <p className="font-condensed text-caption uppercase tracking-[0.15em] text-ink/60">
          Оборудване
        </p>
        <h2 className="mt-2 font-condensed text-h2 uppercase text-ink">
          Всичко, което ти трябва
        </h2>
        <ul className="mt-8 grid grid-cols-1 font-condensed text-body uppercase text-ink sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {equipment.map((item) => (
            <li key={item} className="border-b border-ink/15 py-3">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
