import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

export const metadata: Metadata = {
  title: `Hairstroke München - MOOD BEAUTY | Maschinelle Härchenzeichnung für natürlich wirkende Augenbrauen`,
  description: `Hairstroke in München - moderne maschinelle Technik für natürliche Augenbrauen. Feine haarähnliche Linien, schmerzfrei. Jetzt Termin vereinbaren!`,
  keywords: `Hairstroke München, Permanent Make-up Augenbrauen München, Maschinelle Technik München, Natürliche Augenbrauen München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/hairstroke` },
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

export default function HairstrokePage() {
  return (
    <section className="pb-8">
      <div className="container">
        <h1 className="heading-1 text-center mt-[18px] mb-[18px] uppercase text-[2.5rem]">
          Hairstroke
        </h1>

        <h2 className="heading-2 text-center mb-8 text-[1.4rem] text-gray-500 italic">
          Maschinelle Härchenzeichnung für natürlich wirkende Augenbrauen
        </h2>

        <div className="relative w-full max-w-[600px] mx-auto mb-8 pt-[67%] overflow-hidden rounded-2xl">
          <OptimizedImage
            src="/images/services-page/service-hairstroke.webp"
            alt="Hairstroke München"
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
            Hairstroke ist eine moderne, maschinelle Technik des permanenten Augenbrauen-Make-ups, bei der feine, haarähnliche Linien in die Haut pigmentiert werden - ganz ohne Schnitte oder Verletzungen. Im Gegensatz zu Microblading erfolgt die Pigmentierung sehr oberflächlich und absolut schonend für die Haut. Die Technik ist nahezu schmerzfrei und ideal für alle, die sich ein natürliches, harmonisches Ergebnis wünschen.
          </p>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Für wen eignet sich Hairstroke?
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              Bei lückenhaften, dünnen oder asymmetrischen Augenbrauen
            </li>
            <li className="mb-2 leading-relaxed">
              Zur Kaschierung kleiner Narben oder Unregelmäßigkeiten
            </li>
            <li className="mb-2 leading-relaxed">
              Für alle, die keine dichte Schattierung wünschen
            </li>
            <li className="mb-2 leading-relaxed">
              Ideal bei empfindlicher oder feiner Haut, bei der Microblading nicht empfohlen wird
            </li>
          </ul>

          <h3 className="heading-3 mb-4 text-[1.3rem] font-semibold">
            Vorteile der maschinellen Hairstroke-Technik:
          </h3>
          <ul className="mb-8 pl-6 list-disc">
            <li className="mb-2 leading-relaxed">
              Keine Schnitte, keine Narben, keine Hautverletzungen
            </li>
            <li className="mb-2 leading-relaxed">
              Nahezu schmerzfreie Anwendung dank oberflächlicher Pigmentierung
            </li>
            <li className="mb-2 leading-relaxed">
              Sanftes Ausbleichen - die Farbe verschwindet vollständig und gleichmäßig
            </li>
            <li className="mb-2 leading-relaxed">
              Keine Verfärbungen ins Graue oder Rötliche
            </li>
            <li className="mb-2 leading-relaxed">
              Natürliches Ergebnis - fein, zart und kaum von echten Haaren zu unterscheiden
            </li>
            <li className="mb-2 leading-relaxed">
              Schnelle Heilung ohne Krusten oder Schwellung
            </li>
          </ul>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
            Die Behandlung wird im Studio Mood Beauty in München von Natalia Dorosh, erfahrene Permanent Make-up Artistin seit 2017, durchgeführt. Wir arbeiten mit hochwertigen, zertifizierten Farben, sterilen Einwegnadeln und modernen Geräten für maximale Hygiene und Präzision.
          </p>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify italic text-gray-500">
            Hairstroke ist die perfekte Wahl für alle, die sich natürlich definierte Augenbrauen ohne sichtbares Make-up wünschen.
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
