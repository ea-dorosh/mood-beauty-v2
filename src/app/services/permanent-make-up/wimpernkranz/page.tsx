import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

export const metadata: Metadata = {
  title: `Wimpernkranz München - MOOD BEAUTY | Permanent Make-up für Augenlider`,
  description: `Wimpernkranz in München - feine Füllung des Wimpernkranzes für einen ausdrucksstarken, aber natürlichen Blick. Jetzt Termin vereinbaren!`,
  keywords: `Wimpernkranz München, Permanent Make-up Augenlider München, Augenpigmentierung München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/wimpernkranz` },
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

export default function WimpernkranzPage() {
  return (
    <section className="pb-8">
      <div className="container">
        <h1 className="heading-1 text-center mt-[18px] mb-[18px] uppercase text-[2.5rem]">
          Wimpernkranz
        </h1>

        <h2 className="heading-2 text-center mb-8 text-[1.4rem] text-gray-500 italic">
          Der Effekt eines frisch geöffneten Looks
        </h2>

        <div className="relative w-full max-w-[600px] mx-auto mb-8 pt-[67%] overflow-hidden rounded-2xl">
          <OptimizedImage
            src="/images/services-page/service-wimpernkranz.webp"
            alt="Wimpernkranz München"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            quality={80}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
            }}
          />
        </div>

        <div className="max-w-[800px] mx-auto text-center">
          <p className="leading-[1.8] mb-8 text-[1.2rem] text-gray-500">
            Detaillierte Informationen zu unserer Wimpernkranz-Behandlung werden derzeit vorbereitet.
          </p>

          <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
            Schmerzlose und sichere Behandlung mit Sterilisation, Qualität &amp; Komfort. Der Effekt eines frisch geöffneten Looks.
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
