"use client";

import Script from "next/script";

const GA4_ID = `G-95J0ZJ44WD`;
const GOOGLE_ADS_ID = `AW-11025863414`;
const PRODUCTION_HOSTNAME = `moodbeauty.de`;

/**
 * Checks if the current environment is production.
 * Only moodbeauty.de (without subdomains like staging.) is considered production.
 */
const isProduction = (): boolean => {
  if (typeof window === `undefined`) return false;

  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === `www.${PRODUCTION_HOSTNAME}`;
};

/**
 * Analytics scripts that only load on production.
 * Prevents polluting GA4 data with staging/localhost events.
 */
export default function AnalyticsScripts() {
  // Don't render anything on non-production environments
  if (typeof window !== `undefined` && !isProduction()) {
    return null;
  }

  return (
    <>
      {/* Consent Mode v2 defaults */}
      <Script id="consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });
        `}
      </Script>

      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { anonymize_ip: true });
        `}
      </Script>

      {/* Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
