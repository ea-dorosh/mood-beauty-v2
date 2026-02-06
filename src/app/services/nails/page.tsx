import type { Metadata } from "next";
import ParallaxHero from "@/components/Parallax/ParallaxHero";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";
import MosaicGallery from "@/components/MosaicGallery/MosaicGallery";

const GALLERY_IMAGES = [
  {
    src: `/images/services/nails/IMG_0189.avif`,
    alt: `Professionelle Maniküre Ergebnis - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0196.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0198.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0200.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0201.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0202.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
];

export const metadata: Metadata = {
  title: `Maniküre und Pediküre München - MOOD BEAUTY | Professionelle Nagelpflege`,
  description: `Professionelle Maniküre und Pediküre in München. Höchste Hygienestandards, sanfte Behandlung und hochwertige Produkte. Jetzt Termin vereinbaren!`,
  keywords: `Maniküre München, Pediküre München, Nagelpflege München, Gel-Lack München, Shellac München, Fußpflege München, MOOD BEAUTY, Schönheitsstudio München, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/nails` },
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

export default async function NailsPage() {
  return (
    <section className="pb-8">
      <div className="full-bleed mb-8">
        <ParallaxHero
          src="/images/design/category_page_nails.avif"
          alt="Nails hero image"
          height="50vh"
          headline="Maniküre & Pediküre"
          subHeadline="Pflege, Komfort und höchste Hygienestandards"
        />
      </div>

      <div className="container">
        <MosaicGallery
          images={GALLERY_IMAGES}
          title="Unsere Arbeiten"
        />

        <CategoryInfo
          description="Gepflegte Hände und Füße sind nicht nur schön, sondern auch ein Ausdruck von Selbstfürsorge. Im Studio Mood Beauty in München bieten wir professionelle Maniküre und Pediküre mit Fokus auf Qualität, Sterilität und Wohlbefinden. Jede Behandlung ist ein Moment der bewussten Pflege. Wir schaffen einen Ort, an dem Sie sich entspannen, sich sicher fühlen und mit perfekten Nägeln sowie einem Gefühl von Leichtigkeit und Frische nach Hause gehen."
          services={[
            `Klassische, kombinierte und apparative Maniküre`,
            `Hygienische Pediküre mit sanfter Fußpflege`,
            `Gel-Lack (Shellac) - langlebig und schonend`,
            `Nagelpflege und Aufbau brüchiger Nägel`,
            `Maniküre und Pediküre für Frauen und Männer`,
            `Pflege für Nägel und Haut mit wohltuender Wirkung`,
          ]}
          advantages={[
            `Absolute Hygiene und Sicherheit - alle Instrumente werden mehrfach desinfiziert und sterilisiert`,
            `Sanfte und sorgfältige Behandlung - keine Schmerzen, kein unangenehmes Gefühl`,
            `Verwendung von hochwertigen Produkten europäischer Marken`,
            `Individuelle Betreuung mit Achtsamkeit und Präzision`,
            `Perfekt für alle, die Maniküre und Pediküre in München mit höchsten Hygienestandards suchen`,
          ]}
          conclusion="Unsere Fachkräfte arbeiten achtsam und präzise, mit viel Feingefühl für empfindliche Haut und individuelle Bedürfnisse. Wir verbinden sichtbare Pflegeergebnisse mit echtem Wohlgefühl und respektvollem Umgang."
        />
      </div>
    </section>
  );
}
