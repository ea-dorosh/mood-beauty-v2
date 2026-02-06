import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Datenschutzerklärung - MOOD BEAUTY | Natalia Dorosh`,
  description: `Datenschutzerklärung und Informationen zum Schutz Ihrer Daten bei MOOD BEAUTY München`,
};

export default function DatenschutzPage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-[800px] mx-auto">
        <h1 className="heading-1 text-[28px] mb-4">
          Datenschutzerklärung
        </h1>

        {/* Section 1 */}
        <div>
          <h2 className="legal-heading-2">
            1. Verantwortlicher und Datenschutzbeauftragter
          </h2>
          <h3 className="legal-heading-3">1.1 Verantwortlicher</h3>
          <p className="legal-body">
            Natalia Dorosh
            <br />
            Otl-Aicher Str. 46
            <br />
            80807 München
            <br />
            E-Mail: moodbeauty.de@gmail.com
          </p>
          <h3 className="legal-heading-3">
            1.2 Datenschutzbeauftragter
          </h3>
          <p className="legal-body">Nicht bestellt</p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="legal-heading-2">
            2. Hosting & Auftragsverarbeitung
          </h2>
          <h3 className="legal-heading-3">2.1 Hosting</h3>
          <p className="legal-body">
            Unsere Website (https://moodbeauty.de) und unsere interne
            CRM (Node.js-Backend mit MySQL) laufen auf Servern von{` `}
            <b>Amazon Web Services (AWS)</b> in der Region{` `}
            <b>Frankfurt (eu-central-1)</b>.
          </p>
          <h3 className="legal-heading-3">
            2.2 Auftragsverarbeitung
          </h3>
          <p className="legal-body">
            Als Auftragsverarbeiter fungiert
            <br />
            Amazon Web Services, Inc., EMEA SARL,
            <br />
            38 avenue John F. Kennedy,
            <br />
            L-1855 Luxembourg.
            <br />
            Ein <b>AWS Data Processing Addendum (DPA)</b> ist Teil der
            AWS Customer Agreement und kann in der AWS-Konsole unter{` `}
            <b>
              Artifact → Agreements → AWS Data Processing Addendum
            </b>{` `}
            eingesehen werden.
          </p>

          <h3 className="legal-heading-3">
            2.3 Content Delivery Network (CDN) und
            Website-Sicherheit
          </h3>
          <p className="legal-body">
            Wir verwenden die Dienste der{` `}
            <b>Cloudflare, Inc.</b>, 101 Townsend Street, San
            Francisco, CA 94107, USA für:
          </p>
          <ul className="legal-list">
            <li>Content Delivery Network (CDN)</li>
            <li>DDoS-Schutz und Website-Sicherheit</li>
            <li>DNS-Services</li>
            <li>Performance-Optimierung</li>
          </ul>
          <p className="legal-body">
            Dabei werden folgende Daten verarbeitet:
          </p>
          <ul className="legal-list">
            <li>IP-Adresse des Besuchers</li>
            <li>Browser-Informationen (User-Agent)</li>
            <li>Referrer-URL</li>
            <li>Zeitstempel des Zugriffs</li>
            <li>HTTP-Request-Daten</li>
          </ul>
          <p className="legal-body">
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an schneller, sicherer und
            stabiler Website-Bereitstellung)
            <br />
            <b>Aufbewahrungsdauer:</b> Log-Daten werden von Cloudflare
            nach maximal 30 Tagen gelöscht
            <br />
            <b>Datenübertragung in Drittländer:</b> Die
            Datenübertragung in die USA erfolgt auf Grundlage des
            EU-US Data Privacy Framework und angemessener Garantien
            gemäß Art. 46 DSGVO. Cloudflare ist nach dem EU-US Data
            Privacy Framework zertifiziert.
          </p>

          <h3 className="legal-heading-3">
            2.4 Soziale Netzwerke und Messaging-Dienste
          </h3>
          <p className="legal-body">
            Wir nutzen verschiedene Kommunikationskanäle für
            Kundenanfragen und Terminbuchungen:
          </p>

          <h4 className="legal-heading-4">WhatsApp Business</h4>
          <p className="legal-body">
            <b>Anbieter:</b> Meta Platforms Ireland Limited, 4 Grand
            Canal Square, Grand Canal Harbour, Dublin 2, Irland
            <br />
            <b>Datenverarbeitung:</b> Nachrichten, Telefonnummern,
            Profilbilder, Zeitstempel
            <br />
            <b>Zweck:</b> Kundenbetreuung, Terminanfragen und
            -bestätigungen
            <br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an effizienter
            Kundenkommunikation)
          </p>

          <h4 className="legal-heading-4">
            Instagram und Facebook
          </h4>
          <p className="legal-body">
            <b>Anbieter:</b> Meta Platforms Ireland Limited, 4 Grand
            Canal Square, Grand Canal Harbour, Dublin 2, Irland
            <br />
            <b>Datenverarbeitung:</b> Nachrichten, Benutzernamen,
            Profilangaben, Interaktionen
            <br />
            <b>Zweck:</b> Kundenbetreuung, Terminanfragen,
            Präsentation unserer Dienstleistungen
            <br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an Kundenkommunikation und
            Marketing)
          </p>

          <p className="legal-body">
            <b>Datenübertragung in Drittländer:</b> Meta-Dienste
            übertragen Daten in die USA auf Grundlage von
            Standardvertragsklauseln und angemessenen Garantien gemäß
            Art. 46 DSGVO.
            <br />
            <b>Aufbewahrungsdauer:</b> Kommunikationsdaten werden
            solange gespeichert, bis Sie um Löschung bitten oder kein
            berechtigtes Interesse an der Aufbewahrung mehr besteht.
            Relevante Kundendaten können in unser CRM-System
            übertragen werden.
            <br />
            <b>Datenschutzerklärung von Meta:</b>{` `}
            https://www.facebook.com/privacy/policy/
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="legal-heading-2">
            3. Verarbeitung Ihrer Daten in unserem CRM-System
          </h2>
          <h3 className="legal-heading-3">
            3.1 Kategorien personenbezogener Daten
          </h3>
          <p className="legal-body">
            Wir speichern in unserem internen CRM-System die folgenden
            Daten:
          </p>

          <h3 className="legal-heading-3">Kundendaten</h3>
          <ul className="legal-list">
            <li>
              Vor- und Nachname (first_name, last_name)
            </li>
            <li>E-Mail-Adresse (email)</li>
            <li>Telefonnummer (phone)</li>
            <li>
              Optional: Adresse (Straße, PLZ, Ort, Land) - nur für
              Rechnungsstellung
            </li>
            <li>Aufnahmedatum (added_date)</li>
          </ul>

          <h3 className="legal-heading-3">Termindaten</h3>
          <ul className="legal-list">
            <li>Termin-ID (id)</li>
            <li>
              Datum und Uhrzeit (date, time_start, time_end)
            </li>
            <li>
              Leistung (service_name, service_duration)
            </li>
            <li>
              Verweis auf Kunde (customer_id) und Duplikate
              (customer_first_name, customer_last_name,
              customer_email, customer_phone)
            </li>
            <li>Status des Termins (status)</li>
            <li>
              Nachricht / Gesamtsumme (order_message, order_total)
            </li>
            <li>
              Google Calendar Event (google_calendar_event_id)
            </li>
            <li>Standort (location, location_id)</li>
            <li>Erstellt am (created_date)</li>
          </ul>

          <h3 className="legal-heading-3">
            3.2 Zwecke und Rechtsgrundlage
          </h3>
          <ul className="legal-list">
            <li>
              Durchführung des Vertrags und Erbringung der Leistungen
              (Art. 6 Abs. 1 lit. b DSGVO)
            </li>
            <li>
              Verwaltung und Dokumentation von Terminen und
              Kundenkommunikation
            </li>
            <li>Rechnungsstellung gegenüber Kunden</li>
            <li>
              Versendung von Terminbestätigungen und -erinnerungen per
              E-Mail
            </li>
            <li>
              Versendung von SMS-Erinnerungen bei Bedarf (z.B. bei
              nicht erreichbaren Kunden)
            </li>
            <li>
              Information über Terminänderungen oder -absagen
            </li>
          </ul>

          <h3 className="legal-heading-3">
            3.3 Aufbewahrungsdauer
          </h3>
          <ul className="legal-list">
            <li>
              Aktive Daten: solange Vertragsverhältnis besteht
            </li>
            <li>
              Rechnungsrelevante Daten: 10 Jahre ab Ende des
              Kalenderjahres (Abgabenordnung)
            </li>
            <li>
              Sonstige Korrespondenzdaten: 6 Jahre ab Ende des
              Kalenderjahres (Handelsgesetzbuch)
            </li>
          </ul>

          <h3 className="legal-heading-3">
            3.4 Zugriff auf die Daten
          </h3>
          <p className="legal-body">
            Der Zugriff ist ausschließlich möglich für:
            <br />
            • die Betreiberin (Natalia Dorosh)
            <br />• autorisierte Mitarbeiter:innen des Salons
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="legal-heading-2">
            4. Datenerfassung auf dieser Website
          </h2>
          <h3 className="legal-heading-3">
            4.1 Server-Log-Dateien
          </h3>
          <p className="legal-body">
            Unser Hosting-Provider erhebt und speichert automatisch
            Log-Daten (Browsertyp/-version, Betriebssystem,
            Referrer-URL, Hostname des Rechners, Uhrzeit der Anfrage,
            IP-Adresse).
            <br />
            Verarbeitung gem. Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an Sicherheit und Stabilität).
          </p>
          <h3 className="legal-heading-3">4.2 Kontaktformular</h3>
          <p className="legal-body">
            Über unser Kontaktformular erhobene Daten (z.B. Name,
            E-Mail, Betreff, Nachricht) speichern wir zur Bearbeitung
            Ihrer Anfrage.
            <br />
            Verarbeitung gem. Art. 6 Abs. 1 lit. b DSGVO
            (Notwendigkeit zur Vertragserfüllung/Kommunikation).
          </p>
          <h3 className="legal-heading-3">
            4.3 E-Mail- und SMS-Kommunikation
          </h3>
          <p className="legal-body">
            Wir verwenden Ihre Kontaktdaten für folgende geschäftliche
            Kommunikation:
          </p>
          <ul className="legal-list">
            <li>Terminbestätigungen per E-Mail</li>
            <li>
              Erinnerungen an bevorstehende Termine per E-Mail oder
              SMS
            </li>
            <li>
              Mitteilungen über Terminänderungen oder -absagen
            </li>
            <li>
              SMS-Erinnerungen bei besonderen Umständen (z.B. wenn
              telefonisch nicht erreichbar)
            </li>
          </ul>
          <p className="legal-body">
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an ordnungsgemäßer
            Terminverwaltung)
            <br />
            <b>SMS-Versand:</b> Erfolgt über unsere eigenen
            Mobilgeräte oder Standard-SMS-Dienste ohne Weitergabe an
            Dritte
            <br />
            <b>Widerspruch:</b> Sie können jederzeit per E-Mail an{` `}
            moodbeauty.de@gmail.com der Zusendung von Erinnerungen
            widersprechen
          </p>

          <h3 className="legal-heading-3">
            4.4 QR-Code-Tracking
          </h3>
          <p className="legal-body">
            Wir verwenden anonyme QR-Code-Verfolgung zur Analyse der
            Nutzung unserer Marketing-Materialien:
          </p>
          <ul className="legal-list">
            <li>
              Anzahl der QR-Code-Scans (ohne Personenbezug)
            </li>
            <li>Zeitstempel des Scans</li>
            <li>
              Quelle des QR-Codes (z.B. &apos;public&apos; für
              öffentliche Materialien)
            </li>
          </ul>
          <p className="legal-body">
            <b>Zweck:</b> Statistische Auswertung der Wirksamkeit
            unserer Marketing-Materialien
            <br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an Marketing-Analyse)
            <br />
            <b>Datenart:</b> Ausschließlich anonyme,
            nicht-personenbezogene Statistikdaten
            <br />
            <b>Aufbewahrungsdauer:</b> 12 Monate für statistische
            Zwecke
          </p>

          <h3 className="legal-heading-3">
            4.5 Google Web Fonts
          </h3>
          <p className="legal-body">
            Diese Website nutzt zur einheitlichen Darstellung von
            Schriftarten so genannte Web Fonts, die von Google
            bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr
            Browser die benötigten Web Fonts in ihren Browsercache, um
            Texte und Schriftarten korrekt anzuzeigen.
          </p>
          <p className="legal-body">
            <b>Anbieter:</b> Google LLC, 1600 Amphitheatre Parkway,
            Mountain View, CA 94043, USA
            <br />
            <b>Datenverarbeitung:</b> IP-Adresse,
            Browser-Informationen (User-Agent), Referrer-URL,
            Zeitstempel
            <br />
            <b>Zweck:</b> Einheitliche Darstellung von Schriftarten
            auf unserer Website
            <br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an ansprechender
            Website-Gestaltung)
            <br />
            <b>Datenübertragung in Drittländer:</b> Die
            Datenübertragung in die USA erfolgt auf Grundlage des
            EU-US Data Privacy Framework und angemessener Garantien
            gemäß Art. 46 DSGVO
            <br />
            <b>Datenschutzerklärung von Google:</b>{` `}
            https://policies.google.com/privacy
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="legal-heading-2">5. Cookies</h2>
          <h3 className="legal-heading-3">
            5.1 Technisch notwendige Cookies
          </h3>
          <ul className="legal-list">
            <li>
              cookieConsent (Speicherung Ihrer Cookie-Einwilligung)
            </li>
            <li>Session-Cookies (Sitzungsmanagement)</li>
          </ul>
          <p className="legal-body">
            Verarbeitung gem. Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an Funktionalität).
          </p>
          <p className="legal-body">
            Sie können Cookies in Ihren Browsereinstellungen jederzeit
            deaktivieren; dies kann die Funktionalität der Website
            einschränken.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="legal-heading-2">6. Ihre Rechte</h2>
          <ul className="legal-list">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>
              Einschränkung der Verarbeitung (Art. 18 DSGVO)
            </li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>
              Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO)
            </li>
            <li>
              Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)
            </li>
          </ul>
          <p className="legal-body">
            Zur Ausübung Ihrer Rechte senden Sie bitte eine E-Mail
            an: moodbeauty.de@gmail.com
            <br />
            <b>Löschung von Daten:</b> Wenn Sie die Löschung Ihrer
            personenbezogenen Daten wünschen, teilen Sie uns dies per
            E-Mail mit dem Betreff &quot;Datenlöschung&quot; mit. Wir
            bearbeiten Ihren Antrag innerhalb von 30 Tagen,
            vorbehaltlich gesetzlicher Aufbewahrungspflichten.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="legal-heading-2">7. Aktualisierung</h2>
          <p className="legal-body">
            Diese Datenschutzerklärung wird bei Bedarf, spätestens
            jedoch einmal jährlich, überprüft und aktualisiert.
            <br />
            Datum letzte Aktualisierung: 02.08.2025
          </p>
        </div>
      </div>
    </div>
  );
}
