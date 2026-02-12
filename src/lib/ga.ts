/**
 * Google Analytics 4 Event Tracking
 *
 * Booking Funnel Steps:
 * 1. booking_opened — form opened
 * 2. booking_service_selected — service selected
 * 3. booking_employee_selected — employee selected (if step shown)
 * 4. booking_date_selected — date selected
 * 5. booking_timeslot_selected — time slot selected
 * 6. booking_customer_form_shown — customer form shown
 * 7. booking_submitted — form submitted
 * 8. booking_completed — booking successful
 * 9. booking_error — booking error
 */

const PRODUCTION_HOSTNAME = `moodbeauty.de`;

/**
 * Checks if the current environment is production
 */
function isProduction(): boolean {
  if (typeof window === `undefined`) return false;
  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === `www.${PRODUCTION_HOSTNAME}`;
}

export function sendGaEvent(eventName: string, params: Record<string, unknown> = {}): void {
  try {
    // Only send events on production
    if (!isProduction()) {
      // eslint-disable-next-line no-console
      console.log(`[GA4 Debug] Event: ${eventName}`, params);
      return;
    }

    if (typeof window !== `undefined` && typeof window.gtag === `function`) {
      window.gtag(`event`, eventName, params);
    }
  } catch (_error) {
    // noop
  }
}

// ==================== BOOKING FUNNEL EVENTS ====================

/**
 * Tracking: form opened
 */
export function trackBookingOpened(): void {
  sendGaEvent(`booking_opened`, {
    event_category: `booking_funnel`,
    funnel_step: 1,
  });
}

/**
 * Tracking: service selected
 */
export function trackServiceSelected(serviceData: {
  serviceName?: string;
  serviceId?: number;
  serviceCount?: number;
}): void {
  sendGaEvent(`booking_service_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 2,
    service_name: serviceData.serviceName || `unknown`,
    service_id: serviceData.serviceId || `unknown`,
    service_count: serviceData.serviceCount || 1,
  });
}

/**
 * Tracking: employee selected
 */
export function trackEmployeeSelected(employeeData: {
  selectionType?: string;
  employeeCount?: number;
}): void {
  sendGaEvent(`booking_employee_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 3,
    selection_type: employeeData.selectionType || `unknown`,
    employee_count: employeeData.employeeCount || 0,
  });
}

/**
 * Tracking: date selected
 */
export function trackDateSelected(dateData: {
  date?: string;
  daysFromToday?: number;
}): void {
  sendGaEvent(`booking_date_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 4,
    selected_date: dateData.date || `unknown`,
    days_from_today: dateData.daysFromToday || 0,
  });
}

/**
 * Tracking: timeslot selected
 */
export function trackTimeslotSelected(timeslotData: {
  time?: string;
}): void {
  sendGaEvent(`booking_timeslot_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 5,
    selected_time: timeslotData.time || `unknown`,
  });
}

/**
 * Tracking: customer form shown
 */
export function trackCustomerFormShown(): void {
  sendGaEvent(`booking_customer_form_shown`, {
    event_category: `booking_funnel`,
    funnel_step: 6,
  });
}

/**
 * Tracking: form submitted
 */
export function trackBookingSubmitted(bookingData: {
  serviceName?: string;
  serviceCount?: number;
}): void {
  sendGaEvent(`booking_submitted`, {
    event_category: `booking_funnel`,
    funnel_step: 7,
    service_name: bookingData.serviceName || `unknown`,
    service_count: bookingData.serviceCount || 1,
  });
}

/**
 * Tracking: booking successful
 */
export function trackBookingSuccess(bookingData: {
  bookingId?: string;
  serviceName?: string;
  totalPrice?: number;
}): void {
  sendGaEvent(`booking_completed`, {
    event_category: `booking_funnel`,
    funnel_step: 8,
    booking_id: bookingData.bookingId || `unknown`,
    service_name: bookingData.serviceName || `unknown`,
    total_price: bookingData.totalPrice || 0,
  });
}

/**
 * Tracking: booking error
 */
export function trackBookingError(errorData: {
  errorMessage?: string;
  errorStep?: string;
}): void {
  sendGaEvent(`booking_error`, {
    event_category: `booking_funnel`,
    funnel_step: 9,
    error_message: errorData.errorMessage || `unknown`,
    error_step: errorData.errorStep || `unknown`,
  });
}

/**
 * Tracking: user navigated back
 */
export function trackBookingBackStep(stepData: {
  fromStep?: string;
  toStep?: string;
}): void {
  sendGaEvent(`booking_back_step`, {
    event_category: `booking_funnel`,
    from_step: stepData.fromStep || `unknown`,
    to_step: stepData.toStep || `unknown`,
  });
}

/**
 * Tracking: user left form (beforeunload)
 */
export function trackBookingAbandoned(abandonData: {
  lastStep?: string;
  serviceSelected?: boolean;
}): void {
  sendGaEvent(`booking_abandoned`, {
    event_category: `booking_funnel`,
    last_step: abandonData.lastStep || `unknown`,
    service_selected: abandonData.serviceSelected || false,
  });
}
