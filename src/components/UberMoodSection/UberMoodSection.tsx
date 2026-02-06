import Link from "next/link";
import ScrollGallery from "@/components/Parallax/ScrollGallery";

export default function UberMoodSection() {
  return (
    <section className="uber-mood-section">
      <div className="container px-0 md:px-8">
        <h2 className="heading-2 text-primary text-center font-bold tracking-[.02em] mb-4">
          Über MOOD
        </h2>

        <p className="body-text text-primary text-center opacity-85 mb-8 leading-relaxed">
          Modernes Beautystudio in München. Präzision, Ästhetik und echte
          Wohlfühlmomente - für natürliche Ergebnisse, die zu Ihnen passen.
        </p>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8">
          {/* Gallery side */}
          <div className="relative flex-[1_1_55%] min-h-[300px] md:min-h-[520px] overflow-hidden rounded-none md:rounded-3xl mx-[calc(50%-50vw)] md:mx-0 w-screen md:w-auto">
            <ScrollGallery
              images={[
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 1`,
                },
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 2`,
                },
                {
                  src: `/images/design/lashes_2.avif`,
                  alt: `Mood Beauty - Gallery 3`,
                },
              ]}
            />
          </div>

          {/* Text side */}
          <div className="flex-[1_1_45%] bg-transparent md:bg-white rounded-none md:rounded-3xl p-4 md:p-8 flex flex-col gap-4 justify-between md:shadow-[0_10px_30px_rgba(0,0,0,.06)]">
            <p className="body-text text-primary leading-[1.75]">
              Wir vereinen präzise Techniken mit einem klaren, zeitlosen
              Designanspruch. Ob Powder Brows, Velvet Lips oder ästhetische
              Maniküre - bei uns stehen Natürlichkeit, Hygiene und ihr
              Wohlbefinden im Fokus.
            </p>

            <div>
              <p className="body-text text-primary font-semibold mb-2">
                Unser Versprechen
              </p>
              <ul className="pl-4 list-disc">
                <li className="body-text leading-[1.8]">
                  Individuelle Beratung und natürliche Ergebnisse
                </li>
                <li className="body-text leading-[1.8]">
                  Moderne Techniken und hochwertige Materialien
                </li>
                <li className="body-text leading-[1.8]">
                  Ruhige Atmosphäre, minimalistisches Studioambiente
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/ueber-uns"
                className="btn btn-md btn-primary"
              >
                Mehr über uns erfahren
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
