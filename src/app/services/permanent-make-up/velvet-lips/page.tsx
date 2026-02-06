import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

export const metadata: Metadata = {
  title: `Velvet Lips München - MOOD BEAUTY | Zarte Farbe und natürlich wirkende Lippen`,
  description: `Velvet Lips in München - moderne Technik für natürliche Lippenpigmentierung. Sanfter Farbeffekt, gepflegte Lippen. Jetzt Termin vereinbaren!`,
  keywords: `Velvet Lips München, Lippenpigmentierung München, Permanent Make-up Lippen München, Nude Lips München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/velvet-lips` },
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

export default function VelvetLipsPage() {
  return (
    <section className="pb-8">
      <div className="container">
        <h1 className="heading-1 text-center mt-[18px] mb-[18px] uppercase text-[2.5rem]">
          Velvet Lips
        </h1>

        <h2 className="heading-2 text-center mb-8 text-[1.4rem] text-gray-500 italic">
          Zarte Farbe und natürlich wirkende Lippen
        </h2>

        <div className="relative w-full max-w-[600px] mx-auto mb-8 pt-[67%] overflow-hidden rounded-2xl">
          <OptimizedImage
            src="/images/services-page/service-lips.webp"
            alt="Velvet Lips München"
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
            Velvet Lips ist eine moderne Technik des permanenten Lippen-Make-ups, bei der ein sanfter, gleichmäßiger Farbeffekt entsteht - als wären die Lippen leicht getönt. Ohne harte Konturen, ohne Überzeichnung - nur eine dezente, natürliche Farbauffrischung, die die Lippen gepflegt und harmonisch aussehen lässt.
          </p>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Diese Behandlung eignet sich ideal für alle, die:
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              ihrer natürlichen Lippenfarbe mehr Frische verleihen möchten
            </li>
            <li className="mb-2 leading-relaxed">
              regelmäßig Lippenstift nachziehen müssen und sich mehr Komfort wünschen
            </li>
            <li className="mb-2 leading-relaxed">
              Form und Ton der Lippen sanft ausgleichen möchten
            </li>
            <li className="mb-2 leading-relaxed">
              ein dauerhaft gepflegtes, unaufdringliches Ergebnis bevorzugen
            </li>
          </ul>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Vorteile von Velvet Lips:
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              Aquarellähnlicher Farbeffekt mit weichen Übergängen
            </li>
            <li className="mb-2 leading-relaxed">
              Große Farbauswahl - für jeden Geschmack die passende Nuance
            </li>
            <li className="mb-2 leading-relaxed">
              Geeignet auch bei unregelmäßigem oder wenig definiertem Lippenrand
            </li>
            <li className="mb-2 leading-relaxed">
              Oberflächliche und nahezu schmerzfreie Methode
            </li>
            <li className="mb-2 leading-relaxed">
              Pigment baut sich gleichmäßig ab und verschwindet nach 1,5-2 Jahren rückstandslos
            </li>
            <li className="mb-2 leading-relaxed">
              Sanfter Heilungsverlauf ohne starke Schwellung oder Schorfbildung
            </li>
          </ul>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
            Im Studio Mood Beauty in München verwenden wir ausschließlich zertifizierte Pigmente und achten auf höchste Hygienestandards. Die Behandlung wird von Natalia Dorosh durchgeführt - Spezialistin für permanentes Make-up mit Erfahrung seit 2017.
          </p>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify italic text-gray-500">
            Velvet Lips steht für natürlich schöne, gepflegte Lippen - Tag für Tag, ganz ohne Schminke.
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
