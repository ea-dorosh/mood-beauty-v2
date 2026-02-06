import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Impressum - MOOD BEAUTY | Natalia Dorosh`,
  description: `Impressum und rechtliche Informationen zu MOOD BEAUTY München`,
};

export default function ImpressumPage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-[800px] mx-auto">
        <h1 className="heading-1 text-[28px] mb-4">Impressum</h1>

        <h2 className="legal-heading-2">Angaben gemäß § 5 TMG</h2>
        <p className="legal-body">
          MOOD BEAUTY
          <br />
          Natalia Dorosh
          <br />
          Otl-Aicher-Str. 46
          <br />
          80807 München
          <br />
          Deutschland
        </p>

        <h2 className="legal-heading-2">Kontakt</h2>
        <p className="legal-body">
          Telefon: 0152 073 89 443
          <br />
          E-Mail: moodbeauty.de@gmail.com
        </p>

        <h2 className="legal-heading-2">
          Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV
        </h2>
        <p className="legal-body">
          Natalia Dorosh
          <br />
          Otl-Aicher-Str. 46, 80807 München
          <br />
          Deutschland
        </p>

        <h2 className="legal-heading-2">
          Umsatzsteuer-Identifikationsnummer
        </h2>
        <p className="legal-body">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{` `}
          <strong>DE14420320346</strong>
        </p>

        <h2 className="legal-heading-2">
          Berufsbezeichnung und berufsrechtliche Regelungen
        </h2>
        <p className="legal-body">
          Berufsbezeichnung: Permanent Make-Up Artist
          <br />
          Verliehen in: Deutschland
          <br />
          Kammerzugehörigkeit: nicht anwendbar
          <br />
          Berufsrechtliche Regelungen: Tätigkeit im Rahmen der Handwerksordnung
        </p>

        <h2 className="legal-heading-2">EU-Streitschlichtung</h2>
        <p className="legal-body">
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:
          https://ec.europa.eu/consumers/odr/.
          <br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2 className="legal-heading-2">
          Verbraucherstreitbeilegung/
          <br />
          Universalschlichtungsstelle
        </h2>
        <p className="legal-body">
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
}
