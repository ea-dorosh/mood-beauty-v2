// Google Ads Conversion Tracking
// Works with existing Google Analytics 4 (G-95J0ZJ44WD)

const PRODUCTION_HOSTNAME = `moodbeauty.de`;

/**
 * Checks if the current environment is production
 */
const isProduction = (): boolean => {
  if (typeof window === `undefined`) return false;
  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === `www.${PRODUCTION_HOSTNAME}`;
};

interface BookingCompleteData {
  readonly bookingId?: string;
  readonly price?: number;
  readonly serviceName?: string;
  readonly category?: string;
}

// Booking completed — MAIN CONVERSION FOR GOOGLE ADS
export const trackBookingComplete = (data: BookingCompleteData): void => {
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackBookingComplete:`, data);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    // 1. Google Analytics 4 event
    window.gtag(`event`, `purchase`, {
      transaction_id: data.bookingId || Date.now().toString(),
      value: data.price || 350,
      currency: `EUR`,
      items: [
        {
          item_name: data.serviceName,
          item_category: data.category || `Beauty`,
          price: data.price || 350,
        },
      ],
    });

    // 2. Google Ads Conversion — Booking completed
    window.gtag(`event`, `conversion`, {
      send_to: `AW-11025863414/yj9bCIWyoLobEPalxYkp`,
      value: data.price || 350,
      currency: `EUR`,
      transaction_id: data.bookingId || Date.now().toString(),
    });
  }
};

// Phone click — only for Google Analytics (not tracked in Google Ads)
export const trackPhoneClick = (): void => {
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackPhoneClick`);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    window.gtag(`event`, `phone_call_click`, {
      event_category: `contact`,
      event_label: `phone_button`,
    });
  }
};

// Booking start — for analytics
export const trackBookingStart = (serviceName: string): void => {
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackBookingStart:`, serviceName);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    window.gtag(`event`, `begin_checkout`, {
      service_name: serviceName,
      value: 350,
      currency: `EUR`,
    });
  }
};
