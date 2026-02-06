import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import AnalyticsScripts from "@/components/Analytics/AnalyticsScripts";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import Header from "@/components/Header/Header";
import PhoneTrackingHandler from "@/components/PhoneTrackingHandler/PhoneTrackingHandler";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import LocalBusinessSchema from "@/components/StructuredData/LocalBusinessSchema";
import "./globals.css";

// Font configuration — same as old project
// NOTE: next/font requires plain string literals (not template literals) — Turbopack limitation
const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-cormorant-garamond",
});

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: `MOOD BEAUTY - Maniküre & Pediküre | Permanent Make-Up | München`,
  description: `Professionelle Maniküre und Pediküre in München. Permanent Make-Up in München. Powder Brows, Hairstroke, Velvet Lips im MOOD BEAUTY Studio von Natalia Dorosh.`,
  keywords: [
    `Maniküre München`,
    `Pediküre München`,
    `Nagelpflege München`,
    `Gel-Lack München`,
    `Shellac München`,
    `Fußpflege München`,
    `Augenbrauen München`,
    `Lippenpigmentierung München`,
    `Wimpernkranz München`,
    `Permanent Make-Up München`,
    `Beauty Studio München`,
  ],
  openGraph: {
    type: `website`,
    locale: `de_DE`,
    url: `https://moodbeauty.de`,
    siteName: `MOOD BEAUTY München`,
    title: `MOOD BEAUTY - Maniküre & Pediküre & Permanent Make-Up München`,
    description: `Professionelle Maniküre und Pediküre in München. Permanent Make-Up in München. Powder Brows, Hairstroke, Velvet Lips im MOOD BEAUTY Studio von Natalia Dorosh.`,
    images: [
      {
        url: `https://moodbeauty.de/images/design/design_1.avif`,
        width: 1200,
        height: 630,
        alt: `MOOD BEAUTY München`,
      },
    ],
  },
  other: {
    "geo.region": `DE-BY`,
    "geo.placename": `München`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <head>
        <LocalBusinessSchema />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>
        {/* Analytics scripts only load on production (moodbeauty.de) */}
        <AnalyticsScripts />

        <Header />

        {/* Breadcrumbs container */}
        <div className="container">
          <Breadcrumbs />
        </div>

        {/* Main content */}
        <main className="grow bg-background">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 mt-auto bg-primary text-primary-contrast">
          <div className="container text-center">
            <p className="body-text">
              <span suppressHydrationWarning>{new Date().getFullYear()}</span>{` `}
              MOOD BEAUTY - Natalia Dorosh
            </p>

            <div className="flex gap-4 justify-center mt-4 mb-2">
              <a
                href="/impressum"
                className="body-text text-base hover:underline"
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="body-text text-base hover:underline"
              >
                Datenschutz
              </a>
            </div>
          </div>
        </footer>

        <CookieBanner />
        <PhoneTrackingHandler />
        <ScrollToTop />
      </body>
    </html>
  );
}
