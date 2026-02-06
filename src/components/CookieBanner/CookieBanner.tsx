"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useState, useEffect } from "react";

const COOKIE_CONSENT_NAME = `cookieConsent`;

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 365): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(`;`);

  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.indexOf(nameEQ) === 0) {
      return trimmed.substring(nameEQ.length);
    }
  }

  return null;
};

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_CONSENT_NAME);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_CONSENT_NAME, `accepted`, 365);

    if (typeof window !== `undefined` && typeof window.gtag === `function`) {
      window.gtag(`consent`, `update`, {
        ad_user_data: `granted`,
        ad_personalization: `granted`,
        ad_storage: `granted`,
        analytics_storage: `granted`,
      });
    }

    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-end justify-center p-5">
      <div className="max-w-[650px] w-full shadow-[0px_8px_32px_rgba(0,0,0,0.3)] rounded-2xl max-h-[90vh] overflow-y-auto bg-background">
        {/* Content */}
        <div className="p-6 pb-0">
          <h2 className="heading-4 font-semibold mb-3">Cookie-Hinweis</h2>

          <p className="body-text leading-relaxed mb-4">
            Diese Website verwendet technisch notwendige Cookies für die
            Grundfunktionen unseres Online-Buchungssystems. Ohne diese Cookies
            können Sie keine Termine buchen oder sich anmelden.
          </p>

          {/* Accordion with cookie details */}
          <Accordion.Root type="single" collapsible className="mb-4">
            <Accordion.Item
              value="details"
              className="border border-black/10 rounded-lg overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-light-gray hover:bg-light-gray/80 transition-colors cursor-pointer text-left text-sm font-medium group">
                  <span>Details zu verwendeten Cookies</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content overflow-hidden">
                <div className="px-4 py-4">
                  <p className="text-sm text-black/60 mb-3">
                    <strong>Verwendete Cookies:</strong>
                    <br />
                    • <strong>cookieConsent:</strong> Speichert Ihre
                    Cookie-Einwilligung (365 Tage)
                    <br />
                    • <strong>Session-Cookies:</strong> Für Anmeldung und
                    Buchungssystem (bis Session-Ende)
                    <br />
                    • <strong>Cloudflare-Cookies:</strong> Für
                    Website-Sicherheit und Performance
                  </p>

                  <p className="text-[0.85rem] text-black/60 mb-3">
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
                    (berechtigtes Interesse an Funktionalität)
                  </p>

                  <p className="text-sm text-black/60">
                    Weitere Informationen finden Sie in unserer{` `}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline font-medium"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <button
              className="btn btn-md btn-outline order-2 sm:order-1"
              onClick={() => window.open(`/datenschutz`, `_blank`)}
            >
              Datenschutzerklärung
            </button>
            <button
              className="btn btn-md btn-primary order-1 sm:order-2"
              onClick={handleAccept}
            >
              Alle Cookies akzeptieren
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-left text-black/60 italic text-[0.8rem] px-6 py-3 font-body">
          Hinweis: Die Website funktioniert nur mit aktivierten Cookies
        </p>
      </div>
    </div>
  );
}
