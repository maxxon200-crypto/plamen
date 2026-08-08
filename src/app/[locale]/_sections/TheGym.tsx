import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function TheGym() {
  return (
    <Section background="ink">
      <Container className="max-w-3xl">
        <Eyebrow>Залата</Eyebrow>
        <h2 className="mt-2 font-condensed text-h2 uppercase">
          Направена на ръка, <span className="bg-blood px-2 text-white">не купена наготово</span>
        </h2>
        <div className="mt-6 space-y-4 font-sans text-body text-steel">
          <p>
            Пламен, собственикът, е построил голяма част от машините в тази
            зала със собствените си ръце. Не защото не може да купи нови — а
            защото знае точно как трябва да работи всяка от тях, и ги гради
            така, че да издържат.
          </p>
          <p>
            Желязото тук не е лъскаво и не е от вчера. Държим го поддържано,
            смазано и напълно изправно — защото това е смисълът на старата
            школа: не витрина, а инструмент, който върши работа всеки ден.
          </p>
        </div>
      </Container>
    </Section>
  );
}
