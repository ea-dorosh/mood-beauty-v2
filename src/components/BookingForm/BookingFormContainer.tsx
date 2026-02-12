"use client";

import { useState, useEffect, useRef } from "react";
import AddServiceQuestion from "@/components/BookingForm/AddServiceQuestion/AddServiceQuestion";
import CalendarForm from "@/components/BookingForm/CalendarForm/CalendarForm";
import CalendarOverview from "@/components/BookingForm/CalendarOverview/CalendarOverview";
import Confirmation from "@/components/BookingForm/Confirmation/Confirmation";
import CustomerForm from "@/components/BookingForm/CustomerForm/CustomerForm";
import EmployeeSelectionStep, {
  shouldShowEmployeeSelection,
} from "@/components/BookingForm/EmployeeSelectionStep/EmployeeSelectionStep";
import SelectedServicesSummary from "@/components/BookingForm/SelectedServicesSummary/SelectedServicesSummary";
import ServiceSelectionForm from "@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm";
import type { ServiceSelectionFormRef } from "@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm";
import { employeeSelectionTypeEnum } from "@/constants/enums";
import {
  sendGaEvent,
  trackBookingOpened,
  trackServiceSelected,
  trackEmployeeSelected,
  trackDateSelected,
  trackTimeslotSelected,
  trackCustomerFormShown,
  trackBookingSuccess,
  trackBookingError,
  trackBookingBackStep,
  trackBookingAbandoned,
} from "@/lib/ga";
import { trackBookingComplete, trackBookingStart } from "@/lib/gtm";
import appointmentsService from "@/services/appointments.service";
import type {
  Category,
  Service,
  FormState,
  ServiceEmployees,
  CalendarDay,
  TimeSlot,
  AppointmentConfirmation,
  CustomerFormData,
  FormErrors,
  EmployeeSelectionInfo,
} from "@/types/booking";

interface BookingFormContainerProps {
  categories: Category[];
}

export default function BookingFormContainer({ categories }: BookingFormContainerProps) {
  const firstServiceRef = useRef<ServiceSelectionFormRef>(null);

  const [formState, setFormState] = useState<FormState>({
    firstService: null,
    secondService: null,
    hasSecondService: false,
  });

  /** State */
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showEmployeeSelection, setShowEmployeeSelection] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarOverview, setShowCalendarOverview] = useState(false);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState<FormErrors | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState<AppointmentConfirmation | null>(null);
  const [serviceEmployees, setServiceEmployees] = useState<ServiceEmployees>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if employee selection step should be shown
  const needsEmployeeSelection = shouldShowEmployeeSelection(selectedServices);

  // Track booking form opened on mount
  useEffect(() => {
    trackBookingOpened();

    // Track abandonment when user leaves the page
    const handleBeforeUnload = () => {
      if (!appointmentConfirmation && selectedServices.length > 0) {
        let lastStep = `service`;
        if (showCalendarOverview) lastStep = `customer_form`;
        else if (showCalendar) lastStep = `calendar`;
        else if (showEmployeeSelection) lastStep = `employee`;

        trackBookingAbandoned({
          lastStep,
          serviceSelected: selectedServices.length > 0,
        });
      }
    };

    window.addEventListener(`beforeunload`, handleBeforeUnload);
    return () => window.removeEventListener(`beforeunload`, handleBeforeUnload);
  }, [appointmentConfirmation, selectedServices, showCalendarOverview, showCalendar, showEmployeeSelection]);

  // Calculate current step for stepper
  const getCurrentStep = (): number => {
    if (needsEmployeeSelection) {
      if (appointmentConfirmation) return 4;
      if (showCalendarOverview) return 3;
      if (showCalendar) return 2;
      if (showEmployeeSelection) return 1;
      return 0;
    }
    if (appointmentConfirmation) return 3;
    if (showCalendarOverview) return 2;
    if (showCalendar) return 1;
    return 0;
  };

  /** Watch form state changes */
  useEffect(() => {
    if (!formState.firstService) {
      setShowCalendar(false);
      setShowEmployeeSelection(false);
    }

    const updatedServices: Service[] = [];
    if (formState.firstService) {
      updatedServices.push(formState.firstService);
    }
    if (formState.secondService) {
      updatedServices.push(formState.secondService);
    }
    setSelectedServices(updatedServices);

    // Initialize serviceEmployees for new services
    if (updatedServices.length > 0) {
      const newServiceEmployees = { ...serviceEmployees };
      let hasChanges = false;

      updatedServices.forEach(service => {
        if (!newServiceEmployees[service?.id]) {
          if (service?.employees?.length === 1) {
            newServiceEmployees[service.id] = [service.employees[0].id.toString()];
          } else {
            newServiceEmployees[service.id] = [`all`];
          }
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setServiceEmployees(newServiceEmployees);
      }
    }
  }, [formState, serviceEmployees]);

  /** Methods */
  const getAvailableServices = (services: Service[]): Service[] => {
    return services;
  };

  const onEditCalendarClick = () => {
    trackBookingBackStep({
      fromStep: `customer_form`,
      toStep: `calendar`,
    });
    setShowCalendarOverview(false);
    setShowCalendar(true);
  };

  /**
   * Determine how customer selected employee(s) for analytics tracking
   */
  const getEmployeeSelectionInfo = (): EmployeeSelectionInfo => {
    const servicesWithChoice = selectedServices.filter(
      (service) => service?.employees?.length > 1
    );

    if (servicesWithChoice.length === 0) {
      return { type: null, selectedIds: null };
    }

    for (const service of servicesWithChoice) {
      const selection = serviceEmployees[service.id] || [`all`];

      if (selection.includes(`all`)) {
        return { type: employeeSelectionTypeEnum.any, selectedIds: null };
      }

      const selectedCount = selection.length;
      const selectedIds = selection.map((id) => parseInt(id, 10));

      if (selectedCount === 1) {
        return { type: employeeSelectionTypeEnum.specific, selectedIds };
      }

      if (selectedCount > 1) {
        return { type: employeeSelectionTypeEnum.multiple, selectedIds };
      }
    }

    return { type: null, selectedIds: null };
  };

  const onSubmitCustomerFormClick = async (formData: CustomerFormData) => {
    setCreateAppointmentErrors(null);
    setGeneralError(null);
    setIsSubmitting(true);
    const employeeSelectionInfo = getEmployeeSelectionInfo();
    const appointmentData = {
      ...formData,
      date: selectedDay!.day,
      service: selectedTimeSlot!,
      employeeSelectionType: employeeSelectionInfo.type,
      employeeSelectionIds: employeeSelectionInfo.selectedIds,
    };

    try {
      const {
        validationErrors,
        errorMessage,
        data,
      } = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
        trackBookingError({
          errorMessage: `Validation errors`,
          errorStep: `customer_form`,
        });
      } else if (errorMessage) {
        setGeneralError(errorMessage);
        trackBookingError({
          errorMessage,
          errorStep: `customer_form`,
        });
      } else if (data) {
        sendGaEvent(`booking_submitted`, {
          event_category: `booking`,
          value: 1,
        });

        // Google Ads Conversion Tracking
        const totalPrice = selectedServices.reduce((sum, service) => sum + (service.price || 350), 0);
        trackBookingComplete({
          bookingId: data.id || Date.now().toString(),
          serviceName: selectedServices.map(serviceItem => serviceItem.name).join(`, `),
          category: selectedServices[0]?.category || `Beauty`,
          price: totalPrice,
        });

        // GA4 Funnel Tracking
        trackBookingSuccess({
          bookingId: data.id || Date.now().toString(),
          serviceName: selectedServices.map(serviceItem => serviceItem.name).join(`, `),
          totalPrice,
        });

        setAppointmentConfirmation(data);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: `smooth` });
        }, 100);
      }
    } catch (error) {
      const errorMsg = `Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`;
      setGeneralError(errorMsg);
      trackBookingError({
        errorMessage: error instanceof Error ? error.message : `Network error`,
        errorStep: `customer_form_submit`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get stepper step labels
  const stepLabels = needsEmployeeSelection
    ? [`Service`, `Mitarbeiter`, `Datum`, `Details`, `Bestätigung`]
    : [`Service`, `Datum`, `Details`, `Bestätigung`];

  const currentStep = getCurrentStep();

  return (
    <div className="booking-form p-4 md:p-6 bg-white z-[1]">
      {/* Stepper — sticky with frosted glass */}
      <div
        className="booking-stepper sticky top-0 z-10 -mx-4 md:-mx-6 px-4 md:px-6 py-3 mb-4 border-b border-[rgba(0,0,0,0.06)]"
        style={{
          backgroundColor: `rgba(255,255,255,0.88)`,
          backdropFilter: `saturate(180%) blur(10px)`,
          WebkitBackdropFilter: `saturate(180%) blur(10px)`,
        }}
      >
        <div className="max-w-[768px] mx-auto flex items-start">
          {stepLabels.map((label, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={label} className="contents">
                {/* Connector before (except first) */}
                {index > 0 && (
                  <div className="flex-1 flex items-center pt-[13px]">
                    <div
                      className={`h-[2px] w-full transition-colors duration-300 ${
                        isCompleted || isActive ? `bg-black` : `bg-[rgba(0,0,0,0.12)]`
                      }`}
                    />
                  </div>
                )}

                {/* Step: circle + label together */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`
                      w-[26px] h-[26px] rounded-full flex items-center justify-center text-[0.75rem] font-semibold
                      transition-all duration-300
                      ${isCompleted || isActive
                        ? `bg-black text-white`
                        : `bg-[rgba(0,0,0,0.2)] text-white`
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-[0.8rem] md:text-[0.95rem] mt-1.5 tracking-[0.01em] whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content wrapper — centered, max 768px */}
      <div className="max-w-[768px] mx-auto">

      {/* Employee Selection Step */}
      {showEmployeeSelection && !showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <div>
          <div className="mb-4 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => {
                trackBookingBackStep({ fromStep: `employee`, toStep: `service` });
                setShowEmployeeSelection(false);
              }}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[var(--color-success)] border border-[var(--color-success)] bg-[rgba(0,171,85,0.04)] hover:bg-[rgba(0,171,85,0.1)] transition-colors duration-150 cursor-pointer text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Zurück zur Serviceauswahl
            </button>

            <SelectedServicesSummary
              services={selectedServices}
              categories={categories}
              serviceEmployees={serviceEmployees}
              showEmployees={false}
            />
          </div>

          <EmployeeSelectionStep
            services={selectedServices}
            serviceEmployees={serviceEmployees}
            setServiceEmployees={setServiceEmployees}
            onNextStep={() => {
              const employeeSelectionInfo = getEmployeeSelectionInfo();
              trackEmployeeSelected({
                selectionType: employeeSelectionInfo.type || `unknown`,
                employeeCount: employeeSelectionInfo.selectedIds?.length || 0,
              });

              setShowEmployeeSelection(false);
              setShowCalendar(true);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: `smooth` });
              }, 100);
            }}
          />
        </div>
      )}

      {/* Calendar back button + summary */}
      {showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <div className="mb-4 flex flex-col items-start gap-3">
          <button
            type="button"
            onClick={() => {
              if (needsEmployeeSelection) {
                trackBookingBackStep({ fromStep: `calendar`, toStep: `employee` });
                setShowCalendar(false);
                setShowEmployeeSelection(true);
              } else {
                trackBookingBackStep({ fromStep: `calendar`, toStep: `service` });
                setShowCalendar(false);
              }
            }}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[var(--color-success)] border border-[var(--color-success)] bg-[rgba(0,171,85,0.04)] hover:bg-[rgba(0,171,85,0.1)] transition-colors duration-150 cursor-pointer text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {needsEmployeeSelection ? `Zurück zur Mitarbeiterauswahl` : `Zurück zur Serviceauswahl`}
          </button>

          <SelectedServicesSummary
            services={selectedServices}
            categories={categories}
            serviceEmployees={serviceEmployees}
            showEmployees={needsEmployeeSelection}
          />
        </div>
      )}

      {/* Service Selection */}
      {!showCalendarOverview && !showEmployeeSelection && (
        <>
          {!showCalendar && (
            <>
              <h1 className="mb-4 text-center text-2xl font-semibold tracking-wide font-heading">
                Service auswählen
              </h1>

              <ServiceSelectionForm
                ref={firstServiceRef}
                categories={categories}
                onServiceSelect={(service) => {
                  setFormState(prev => ({ ...prev, firstService: service }));
                  trackServiceSelected({
                    serviceName: service?.name,
                    serviceId: service?.id,
                    serviceCount: 1,
                  });
                }}
                getAvailableServices={getAvailableServices}
                serviceData={formState.firstService}
                hasDeleteButton={formState.hasSecondService}
                deleteService={() => {
                  setFormState(prev => ({
                    ...prev,
                    hasSecondService: false,
                    firstService: prev.secondService,
                    secondService: null,
                  }));
                }}
                selectedServicesIds={selectedServices.map(service => service.id)}
                firstService
              />

              {formState.hasSecondService && (
                <div className="mt-4">
                  <ServiceSelectionForm
                    categories={categories}
                    onServiceSelect={(service) => {
                      setFormState(prev => ({ ...prev, secondService: service }));
                      trackServiceSelected({
                        serviceName: service?.name,
                        serviceId: service?.id,
                        serviceCount: 2,
                      });
                    }}
                    hasDeleteButton
                    deleteService={() => {
                      setFormState(prev => ({
                        ...prev,
                        hasSecondService: false,
                        secondService: null,
                      }));
                    }}
                    getAvailableServices={getAvailableServices}
                    serviceData={formState.secondService}
                    selectedServicesIds={selectedServices.map(service => service.id)}
                  />
                </div>
              )}

              {/* Add Service Question */}
              {formState.firstService && !formState.hasSecondService && (
                <AddServiceQuestion
                  onAddService={() => {
                    try {
                      firstServiceRef.current?.collapseAll?.();
                    } catch (error) {
                      console.error(`[BookingFormContainer] error`, error);
                    }

                    setFormState(prev => ({ ...prev, hasSecondService: true }));
                  }}
                />
              )}

              {/* Next button */}
              {formState.firstService && !showCalendar && !showEmployeeSelection && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      sendGaEvent(`start_booking`, {
                        event_category: `booking`,
                        event_label: needsEmployeeSelection ? `step:employee` : `step:calendar`,
                      });

                      const firstServiceName = selectedServices[0]?.name || `Service`;
                      trackBookingStart(firstServiceName);

                      if (needsEmployeeSelection) {
                        setShowEmployeeSelection(true);
                      } else {
                        setShowCalendar(true);
                      }
                    }}
                    className="btn btn-md btn-primary w-[300px] max-w-full"
                  >
                    Weiter
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Calendar */}
      {showCalendar && (
        <CalendarForm
          services={selectedServices}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          serviceEmployees={serviceEmployees}
          setServiceEmployees={setServiceEmployees}
          onNextStep={() => {
            if (selectedDay) {
              const today = new Date();
              const selectedDate = new Date(selectedDay.day);
              const daysFromToday = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              trackDateSelected({ date: selectedDay.day, daysFromToday });
            }
            if (selectedTimeSlot) {
              trackTimeslotSelected({ time: selectedTimeSlot.startTime });
            }
            trackCustomerFormShown();

            setShowCalendarOverview(true);
            setShowCalendar(false);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: `smooth` });
            }, 100);
          }}
        />
      )}

      {/* Calendar Overview + Customer Form */}
      {!appointmentConfirmation && showCalendarOverview && (
        <>
          <button
            type="button"
            onClick={onEditCalendarClick}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-[var(--color-success)] border border-[var(--color-success)] bg-[rgba(0,171,85,0.04)] hover:bg-[rgba(0,171,85,0.1)] transition-colors duration-150 cursor-pointer text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Zurück zur Terminauswahl
          </button>

          <CalendarOverview
            services={selectedServices}
            selectedDay={selectedDay}
            selectedTimeSlot={selectedTimeSlot}
            serviceEmployees={serviceEmployees}
            onChange={onEditCalendarClick}
          />

          <CustomerForm
            createAppointment={onSubmitCustomerFormClick}
            formErrors={createAppointmentErrors}
          />

          {generalError && (
            <div className="mt-6 p-4 bg-[#ffebee] border-l-4 border-[#f44336] rounded">
              <p className="text-[#d32f2f] text-center font-medium">
                {generalError}
              </p>
            </div>
          )}
        </>
      )}

      {/* Confirmation */}
      {appointmentConfirmation && <Confirmation appointment={appointmentConfirmation} />}

      {/* Submitting Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div
            className="flex flex-col items-center gap-4 p-6 rounded-2xl text-center w-[90%] max-w-[400px] text-white"
            style={{
              background: `linear-gradient(135deg, rgba(0,171,85,0.96) 0%, rgba(0,200,100,0.96) 100%)`,
              boxShadow: `0 10px 30px rgba(0,0,0,0.35)`,
            }}
            role="dialog"
            aria-live="polite"
            aria-busy={isSubmitting}
          >
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />

            <p className="font-bold text-[1.1rem] md:text-[1.25rem]">
              Bitte warten Sie einen Moment — wir speichern gerade Ihre Buchung.
            </p>

            <p className="opacity-90">
              Dies kann einige Sekunden dauern.
            </p>
          </div>
        </div>
      )}

      {/* Close content wrapper */}
      </div>
    </div>
  );
}
