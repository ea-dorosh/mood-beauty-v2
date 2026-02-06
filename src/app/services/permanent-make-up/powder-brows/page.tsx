import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

export const metadata: Metadata = {
  title: `Powder Brows München - MOOD BEAUTY | Natürlicher Look und gepflegte Form`,
  description: `Powder Brows in München - moderne Technik für natürliche Augenbrauen. Sanfter Schattierungseffekt, gepflegte Form. Jetzt Termin vereinbaren!`,
  keywords: `Powder Brows München, Permanent Make-up Augenbrauen München, Pudertechnik München, Ombre Brows München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/powder-brows` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": `large`,
      "max-snippet": -1,
    },
  },
  verification: { google: `your-google-verification-code` },
};

export default function PowderBrowsPage() {
  return (
    <section className="pb-8">
      <div className="container">
        <h1 className="heading-1 text-center mt-[18px] mb-[18px] uppercase text-[2.5rem]">
          Powder Brows
        </h1>

        <h2 className="heading-2 text-center mb-8 text-[1.4rem] text-gray-500 italic">
          Natürlicher Look und gepflegte Form
        </h2>

        <div className="relative w-full max-w-[600px] mx-auto mb-8 pt-[67%] overflow-hidden rounded-2xl">
          <OptimizedImage
            src="/images/services-page/service-brows.jpg"
            alt="Powder Brows München"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            quality={80}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
            }}
          />
        </div>

        <div className="max-w-[800px] mx-auto">
          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
            Powder Brows sind eine moderne Technik des permanenten Make-ups für die Augenbrauen, bei der ein sanfter Schattierungseffekt entsteht - wie leicht mit Puder oder Lidschatten betonte Brauen. Das Ergebnis wirkt gepflegt, harmonisch und gleichzeitig sehr natürlich - ganz ohne harte Konturen.
          </p>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Diese Methode eignet sich ideal für alle, die:
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              die Form und Symmetrie der Augenbrauen optimieren möchten
            </li>
            <li className="mb-2 leading-relaxed">
              visuell mehr Fülle erzielen wollen
            </li>
            <li className="mb-2 leading-relaxed">
              ihre natürlichen Gesichtszüge dezent unterstreichen möchten
            </li>
            <li className="mb-2 leading-relaxed">
              täglich Zeit beim Schminken sparen wollen
            </li>
            <li className="mb-2 leading-relaxed">
              ein langanhaltendes, aber natürliches Ergebnis für 1,5-2 Jahre wünschen
            </li>
          </ul>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Vorteile von Powder Brows:
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              Zarter, pudriger Effekt mit weicher Kontur
            </li>
            <li className="mb-2 leading-relaxed">
              Farbpigmente werden oberflächlich eingebracht und bauen sich gleichmäßig ohne Rückstände ab
            </li>
            <li className="mb-2 leading-relaxed">
              Auch für fettige oder empfindliche Haut geeignet
            </li>
            <li className="mb-2 leading-relaxed">
              Farbton und Intensität werden individuell angepasst - von sehr dezent bis leicht betont
            </li>
          </ul>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
            Die Behandlung des Powder Brows Permanent Make-ups in München wird von Natalia Dorosh durchgeführt - einer erfahrenen Spezialistin mit über 8 Jahren Praxis. Im Studio Mood Beauty verwenden wir ausschließlich zertifizierte Pigmente und arbeiten nach höchsten Hygienestandards.
          </p>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify italic text-gray-500">
            Wenn Sie sich gepflegte, gleichmäßige Brauen mit einem natürlichen Look wünschen, sind Powder Brows die perfekte Wahl.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/booking"
              className="btn btn-md btn-primary w-[304px] text-center"
            >
              Jetzt Termin vereinbaren
            </Link>

            <Link
              href="/services/permanent-make-up"
              className="btn btn-md btn-secondary text-center"
            >
              Zurück zu Permanent Make-up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
