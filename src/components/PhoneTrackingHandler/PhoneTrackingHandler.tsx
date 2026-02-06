"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/gtm";

/**
 * Global handler for phone link clicks.
 * Tracks all clicks on links with href="tel:" without modifying Server Components.
 */
export default function PhoneTrackingHandler() {
  useEffect(() => {
    const handlePhoneClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest(`a[href^="tel:"]`);

      if (target) {
        trackPhoneClick();
      }
    };

    document.addEventListener(`click`, handlePhoneClick);

    return () => {
      document.removeEventListener(`click`, handlePhoneClick);
    };
  }, []);

  // Component renders nothing visible
  return null;
}
