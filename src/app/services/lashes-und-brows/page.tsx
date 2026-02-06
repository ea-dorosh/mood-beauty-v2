import type { Metadata } from "next";
import Link from "next/link";
import ParallaxHero from "@/components/Parallax/ParallaxHero";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { servicesData } from "@/constants/staticData";

export const metadata: Metadata = {
  title: `Brow & Lash Lifting München - MOOD BEAUTY | Natürlich schöner Blick`,
  description: `Brow- und Lash-Lifting in München: sanfte Laminierung, Färben und Pflege. Wacher Blick und gepflegte Brauen & Wimpern ohne tägliches Make-up. Jetzt Termin buchen!`,
  keywords: `Brow Lifting München, Lash Lifting München, Brow & Lash Lifting, Laminierung, Augenbrauenlifting, Wimpernlifting, Mood Beauty`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/lashes-und-brows` },
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

export default function LashesUndBrowsPage() {
  return (
    <section className="pb-8">
      <div className="full-bleed mb-8">
        <ParallaxHero
          src="/images/design/category_page_lashes.avif"
          alt="Lashes & Brows hero image"
          height="50vh"
          headline="Lashes & Brows"
          subHeadline="Brow- und Lash-Lifting - natürliche Pflege & Ausdruck ohne Make-up"
        />
      </div>

      <div className="container max-w-[1200px] px-4 md:px-8">
        <p className="body-text text-center max-w-[900px] mx-auto mb-8 opacity-95">
          Lifting (Laminierung) ist eine sanfte Behandlung zur Formung, Stärkung und Verschönerung der natürlichen Brauen und Wimpern - für einen frischen, gepflegten Look ganz ohne tägliches Schminken.
        </p>

        <div className="max-w-[900px] mx-auto mb-12">
          <p className="font-semibold mb-2">
            Im Studio Mood Beauty München bieten wir Ihnen:
          </p>
          <ul className="pl-4 m-0 leading-[1.8] list-disc">
            <li>
              <strong>Brow Lifting</strong>
              <ul className="pl-4 m-0 list-disc">
                <li>Bringt die Härchen in Form und hält sie in gewünschter Richtung</li>
                <li>Sorgt für mehr Fülle und Volumen</li>
                <li>Verleiht definierte Form ohne starre Linien</li>
                <li>Effekt hält 4-6 Wochen</li>
              </ul>
            </li>
            <li>
              <strong>Lash Lifting</strong>
              <ul className="pl-4 m-0 list-disc">
                <li>Hebt die Naturwimpern sichtbar an</li>
                <li>Öffnet den Blick und lässt die Augen wacher wirken</li>
                <li>Pflegt und stärkt die Wimpernstruktur</li>
                <li>Haltbarkeit bis zu 6 Wochen</li>
              </ul>
            </li>
            <li>
              <strong>Kombi: Lifting + Färben</strong>
              <ul className="pl-4 m-0 list-disc">
                <li>Ideal für helle, feine oder wenig definierte Brauen &amp; Wimpern</li>
                <li>Individuelle Farbauswahl abgestimmt auf Ihren Typ</li>
                <li>Ausdrucksstarker, gepflegter Look - ganz ohne Make-up</li>
                <li>Effekt: natürlich, sichtbar und langanhaltend</li>
              </ul>
            </li>
          </ul>

          <ul className="pl-4 m-0 leading-[1.8] list-disc mt-4">
            <li>Warum Mood Beauty?</li>
            <ul className="pl-4 m-0 list-disc">
              <li>Schonende Formeln, auch für empfindliche Haut</li>
              <li>Hochwertige Produkte &amp; professionelle Anwendung</li>
              <li>Alles in einem Termin - schnell &amp; effektiv</li>
              <li>Persönliche Beratung und liebevolle Präzision</li>
            </ul>
          </ul>

          <p className="mt-4">
            Gönnen Sie sich einen wachen Blick und gepflegte Brauen - ganz ohne tägliches Styling. Jetzt Termin buchen für Brow- &amp; Lash-Lifting bei Mood Beauty in München.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {servicesData.map((serviceCard) => (
            <div
              key={serviceCard.title}
              className="flex md:justify-center"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,.06)] h-full w-full md:w-[400px] shrink-0 flex flex-col transition-[transform,box-shadow] duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,.1)]">
                <div className="relative aspect-video">
                  <OptimizedImage
                    src={serviceCard.img}
                    alt={serviceCard.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    style={{
                      objectFit: `cover`,
                      objectPosition: `center`,
                    }}
                  />
                </div>

                <div className="p-4 md:p-6 flex flex-col gap-3">
                  <h3 className="heading-3 font-semibold">
                    {serviceCard.title}
                  </h3>

                  <p className="body-text opacity-95">
                    {serviceCard.lead}
                  </p>

                  <ul className="pl-6 m-0 list-disc">
                    {serviceCard.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="mt-3">
                    <Link
                      href="/booking"
                      className="btn btn-sm btn-primary"
                    >
                      Jetzt Termin buchen
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
