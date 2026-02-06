import ParallaxHero from '@/components/Parallax/ParallaxHero';
import RevealSection from '@/components/Parallax/RevealSection';
import ScrollGallery from '@/components/Parallax/ScrollGallery';

export const metadata = {
  title: `Über MOOD Beauty Studio München - Permanent Make-up & Maniküre`,
  description: `MOOD Beauty Studio - Ihr modernes Kosmetikstudio in München. Spezialisiert auf Permanent Make-up und ästhetische Maniküre. Natürliche Ausstrahlung, professionelle Techniken und individuelle Beratung.`,
  keywords: `MOOD Beauty Studio München, Permanent Make-up München, Maniküre München, Kosmetikstudio München, Augenbrauen München, Lippenpigmentierung München, Nagelpflege München, Beauty Studio München, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/ueber-uns` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": `large` as const,
      "max-snippet": -1,
    },
  },
};

export default function UeberUnsPage() {
  return (
    <section className="ueber-uns-page pb-8">

      {/* ── Hero ── */}
      <div className="full-bleed mb-8">
        <ParallaxHero
          src="/images/design/ueber-uns.avif"
          alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
          headline="Über uns"
          subHeadline="MOOD Beauty Studio - Permanent Make-up & Maniküre in München"
          height="80vh"
        />
      </div>

      {/* ── Content wrapper ── */}
      <div className="container">
        <div className="max-w-[1000px] mx-auto">

          {/* ── Intro Card ── */}
          <div className="about-card mb-8">
            <h2 className="heading-2 font-semibold mb-6">
              Über MOOD Beauty Studio - Permanent Make-up &amp; Maniküre in München
            </h2>

            <p className="body-text leading-[1.7] mb-6">
              MOOD Beauty Studio ist ein modernes, stilvolles Kosmetikstudio im Zentrum von München, spezialisiert auf Permanent Make-up und ästhetische Maniküre.
            </p>

            <p className="body-text leading-[1.7]">
              Unser Fokus liegt auf natürlicher Ausstrahlung, makelloser Ausführung und individueller Beratung.
              Jede Behandlung bei MOOD ist ein persönliches Beauty-Ritual - in ruhiger Atmosphäre, mit höchsten Hygienestandards und professionellen Techniken.
            </p>
          </div>

          {/* ── Reveal: Permanent Make-up ── */}
          <RevealSection
            src="/images/design/design_1.avif"
            alt="PMU München - Augenbrauen und Lippen"
            imageSide="right"
            title="Permanent Make-up in München"
            text="Präzise, typgerechte Pigmentierung für Augenbrauen, Lippen und Lidstrich - mit Fokus auf natürliche Ausstrahlung und langanhaltende Perfektion."
          />

          {/* ── Reveal: Maniküre ── */}
          <RevealSection
            src="/images/design/manik_1_horizontal.avif"
            alt="Maniküre München - gepflegte Hände und Nägel"
            imageSide="left"
            title="Ästhetische Maniküre & Nagelpflege"
            text="Klassische Maniküre, Gel und minimalistische Nail Art - gepflegte Hände mit Stil, vereint mit Entspannung und Hautpflege."
          />
        </div>
      </div>

      {/* ── Warum MOOD — full-bleed gradient ── */}
      <div className="warum-mood-section my-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          <h3 className="heading-3 font-semibold mb-4">
            Warum MOOD?
          </h3>

          <hr className="my-4 border-black/20" />

          <ul className="about-bullet-list">
            <li>Spezialisierung auf Permanent Make-up München &amp; Maniküre München</li>
            <li>Moderne Techniken &amp; hochwertige Materialien</li>
            <li>Individuelle Beratung &amp; natürliche Ergebnisse</li>
            <li>Hygienisch einwandfreie Arbeitsweise</li>
            <li>Minimalistisches, stilvolles Studioambiente</li>
          </ul>
        </div>
      </div>

      {/* ── Content wrapper (continued) ── */}
      <div className="container">
        <div className="max-w-[1000px] mx-auto">

          {/* ── Scroll Gallery ── */}
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

          {/* ── Unsere Schwerpunkte ── */}
          <div className="about-card mt-8 mb-8">
            <h3 className="heading-3 font-semibold mb-6">
              Unsere Schwerpunkte:
            </h3>

            <div className="mb-8">
              <h4 className="heading-4 font-semibold mb-4">
                - Permanent Make-up in München
              </h4>
              <p className="body-text leading-[1.7] pl-4">
                Wir bieten präzises, typgerechtes PMU für Augenbrauen, Lippen und Lidstrich - für ein dauerhaft gepflegtes Aussehen ganz ohne Make-up.
                Nur hochwertige Farben, modernste Techniken und ein klares Ziel: Ihre natürliche Schönheit zu betonen.
              </p>
            </div>

            <div>
              <h4 className="heading-4 font-semibold mb-4">
                - Ästhetische Maniküre &amp; Nagelpflege
              </h4>
              <p className="body-text leading-[1.7] pl-4">
                Ob klassische Maniküre, Gel oder minimalistische Nail Art - wir gestalten gepflegte Hände mit Stil und Gefühl für Details.
                Unsere Manikürebehandlungen vereinen Hautpflege, Nagelästhetik und Entspannung auf höchstem Niveau.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <hr className="my-8 border-black/30" />

          {/* ── Weitere Leistungen ── */}
          <div className="about-card mb-8">
            <h3 className="heading-3 font-semibold mb-4">
              Weitere Leistungen:
            </h3>

            <ul className="about-bullet-list">
              <li>Sanfte Gesichtsbehandlungen &amp; Pflege</li>
              <li>Wimpern- und Augenbrauenstyling</li>
              <li>Entspannende Atmosphäre mit exklusiven Produkten</li>
            </ul>
          </div>

          {/* ── Divider ── */}
          <hr className="my-8 border-black/30" />

          {/* ── Closing quote ── */}
          <p className="body-text leading-[1.7] text-center italic mt-8">
            MOOD ist mehr als ein Kosmetikstudio - es ist Ihr Raum für Ruhe, Schönheit und Persönlichkeit.
            <br />
            Erleben Sie, wie präzise Ästhetik und echtes Wohlgefühl zusammenwirken.
          </p>

          <p className="body-text leading-[1.7] text-center font-semibold mt-6">
            Willkommen bei MOOD - Ihrem Studio für Permanent Make-up &amp; Maniküre in München.
          </p>
        </div>
      </div>
    </section>
  );
}
