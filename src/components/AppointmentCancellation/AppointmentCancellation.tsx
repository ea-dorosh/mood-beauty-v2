"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import appointmentsService from "@/services/appointments.service";
import type { GroupAppointment } from "@/services/appointments.service";

// Map service names to category images
const getCategoryImage = (serviceName: string | undefined): string => {
  const lowerServiceName = serviceName?.toLowerCase() || ``;

  if (lowerServiceName.includes(`permanent`) ||
      lowerServiceName.includes(`powder brows`) ||
      lowerServiceName.includes(`velvet lips`) ||
      lowerServiceName.includes(`wimpernkranz`) ||
      lowerServiceName.includes(`hairstroke`)) {
    return `/images/design/pm_horizontal.avif`;
  }

  if (lowerServiceName.includes(`maniküre`) ||
      lowerServiceName.includes(`pediküre`) ||
      lowerServiceName.includes(`nails`) ||
      lowerServiceName.includes(`nagel`)) {
    return `/images/design/manik_1_horizontal.avif`;
  }

  if (lowerServiceName.includes(`lash`) ||
      lowerServiceName.includes(`brow`) ||
      lowerServiceName.includes(`wimpern`) ||
      lowerServiceName.includes(`augenbrauen`)) {
    return `/images/design/lashes_horizontal.avif`;
  }

  return `/images/design/pm_horizontal.avif`;
};

interface AppointmentData {
  id: number;
  serviceName: string;
  date: string;
  timeStart: string;
  status: number;
  location: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  };
  groupAppointments?: GroupAppointment[];
}

interface AppointmentCancellationProps {
  token: string;
}

export default function AppointmentCancellation({ token }: AppointmentCancellationProps) {
  const router = useRouter();

  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [groupAppointments, setGroupAppointments] = useState<GroupAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancellationMessage, setCancellationMessage] = useState(``);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await appointmentsService.getAppointmentByToken(token);
        setAppointment(response.data);

        if (response.data.groupAppointments && response.data.groupAppointments.length > 0) {
          setGroupAppointments(response.data.groupAppointments);
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : `Unknown error`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAppointment();
    }
  }, [token]);

  const handleCancelClick = () => {
    setShowCancelForm(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      setCancelling(true);
      const response = await appointmentsService.cancelAppointmentByToken(
        token,
        cancellationMessage || null
      );
      setCancelledCount(response.cancelledCount || 1);
      setShowCancelForm(false);
      setCancelled(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: `smooth` });
        }, 150);
      });
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : `Unknown error`);
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(`de-DE`, {
      weekday: `long`,
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });
  };

  const formatTime = (timeString: string): string => {
    const time = new Date(timeString);
    return time.toLocaleTimeString(`de-DE`, {
      hour: `2-digit`,
      minute: `2-digit`,
    });
  };

  const isAppointmentPast = (): boolean => {
    if (!appointment) return true;
    const appointmentDateTime = new Date(appointment.timeStart);
    const now = new Date();
    return appointmentDateTime < now;
  };

  const isAppointmentCancelled = (): boolean => {
    return appointment?.status === 1;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[rgba(0,0,0,0.1)] border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  // Error or not found
  if (error || !appointment) {
    return (
      <div className="max-w-[600px] mx-auto my-16 px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <div className="relative w-full h-[180px] md:h-[240px] bg-[var(--color-light-gray)]">
            <OptimizedImage
              src="/images/design/pm_horizontal.avif"
              alt="MOOD BEAUTY"
              fill
              sizes="600px"
              style={{ objectFit: `cover`, objectPosition: `center`, opacity: 0.6 }}
            />
          </div>

          <div className="py-8 px-4">
            <h4 className="mb-6 text-center font-semibold text-xl">
              Termin nicht gefunden
            </h4>
            <p className="mb-8 text-center text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
              Der gesuchte Termin existiert nicht mehr oder wurde bereits storniert.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button type="button" onClick={() => router.push(`/`)} className="btn btn-md btn-primary min-w-[150px]">
                Zur Startseite
              </button>
              <button type="button" onClick={() => router.push(`/booking`)} className="btn btn-md btn-secondary min-w-[150px]">
                Neuen Termin buchen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Successfully cancelled
  if (cancelled) {
    return (
      <div className="max-w-[700px] mx-auto my-16 px-4">
        <div className="rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8">
          <h4 className="mb-6 text-center font-semibold text-xl text-[var(--color-success)]">
            {`\u2713`} Termin erfolgreich storniert
          </h4>
          <p className="mb-6 text-center text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] text-[1.1rem]">
            {cancelledCount > 1
              ? `Ihre ${cancelledCount} Termine wurden erfolgreich storniert.`
              : `Ihr Termin wurde erfolgreich storniert.`}
          </p>

          {/* Email notification */}
          <div className="mb-8 p-4 bg-[rgba(0,140,255,0.06)] border border-[rgba(0,140,255,0.15)] rounded-lg">
            <p className="font-semibold text-sm mb-1">Bestätigungs-E-Mail versendet</p>
            <p className="text-sm">
              Wir haben Ihnen eine Bestätigung der Stornierung an <strong>{appointment?.customer?.firstName ? appointment.customer.email : `Ihre E-Mail-Adresse`}</strong> gesendet.
              Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie die E-Mail nicht erhalten.
            </p>
          </div>

          {/* Cancelled appointment details */}
          <div className="bg-[var(--color-light-gray)] rounded-2xl p-6 mb-8">
            <p className="font-semibold text-base mb-4">
              {groupAppointments.length > 1 ? `Stornierte Termine` : `Stornierter Termin`}
            </p>

            {groupAppointments.length > 1 ? (
              <div className="flex flex-col gap-6">
                {groupAppointments.map((apt, index) => (
                  <div
                    key={apt.id}
                    className={index < groupAppointments.length - 1 ? `pb-4 border-b border-[rgba(0,0,0,0.1)]` : ``}
                  >
                    <p className="text-sm font-semibold mb-3">Service {index + 1}</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-[0.95rem]"><span className="font-semibold mr-2">Service:</span>{apt.serviceName}</p>
                      <p className="text-[0.95rem]"><span className="font-semibold mr-2">Datum:</span>{formatDate(apt.date)}</p>
                      <p className="text-[0.95rem]"><span className="font-semibold mr-2">Uhrzeit:</span>{formatTime(apt.timeStart)} Uhr</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-[0.95rem]"><span className="font-semibold mr-2">Service:</span>{appointment?.serviceName}</p>
                <p className="text-[0.95rem]"><span className="font-semibold mr-2">Datum:</span>{appointment ? formatDate(appointment.date) : ``}</p>
                <p className="text-[0.95rem]"><span className="font-semibold mr-2">Uhrzeit:</span>{appointment ? formatTime(appointment.timeStart) : ``} Uhr</p>
              </div>
            )}
          </div>

          <p className="mb-8 text-center text-sm text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
            Wir hoffen, Sie bald wieder bei uns begrüßen zu dürfen!
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button type="button" onClick={() => router.push(`/`)} className="btn btn-md btn-primary min-w-[150px]">
              Zur Startseite
            </button>
            <button type="button" onClick={() => router.push(`/booking`)} className="btn btn-md btn-secondary min-w-[150px]">
              Neuen Termin buchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Appointment is past or already cancelled
  if (isAppointmentPast() || isAppointmentCancelled()) {
    const categoryImage = getCategoryImage(appointment?.serviceName);

    return (
      <div className="max-w-[600px] mx-auto my-16 px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <div className="relative w-full h-[180px] md:h-[240px] bg-[var(--color-light-gray)]">
            <OptimizedImage
              src={categoryImage}
              alt={appointment?.serviceName || `MOOD BEAUTY`}
              fill
              sizes="600px"
              style={{ objectFit: `cover`, objectPosition: `center`, opacity: 0.5 }}
            />
          </div>

          <div className="py-8 px-4">
            <h4 className="mb-6 text-center font-semibold text-xl">
              {isAppointmentCancelled() ? `Termin bereits storniert` : `Termin abgelaufen`}
            </h4>
            <p className="mb-8 text-center text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
              {isAppointmentCancelled()
                ? `Dieser Termin wurde bereits storniert.`
                : `Dieser Termin liegt in der Vergangenheit und kann nicht mehr storniert werden.`}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button type="button" onClick={() => router.push(`/`)} className="btn btn-md btn-primary min-w-[150px]">
                Zur Startseite
              </button>
              <button type="button" onClick={() => router.push(`/booking`)} className="btn btn-md btn-secondary min-w-[150px]">
                Neuen Termin buchen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active appointment — main view
  const categoryImage = getCategoryImage(appointment?.serviceName);

  return (
    <div className="max-w-[700px] mx-auto my-16 px-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        {/* Category Image Header */}
        <div className="relative w-full h-[200px] md:h-[280px] bg-[var(--color-light-gray)]">
          <OptimizedImage
            src={categoryImage}
            alt={appointment?.serviceName || `MOOD BEAUTY`}
            fill
            sizes="700px"
            style={{ objectFit: `cover`, objectPosition: `center` }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[60%]"
            style={{ background: `linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)` }}
          />
        </div>

        <div className="p-6 md:p-10">
          <h3 className="mb-2 text-center font-bold text-[1.75rem] md:text-[2.25rem]">
            Hallo {appointment.customer.firstName} {appointment.customer.lastName}!
          </h3>

          <h5 className="mb-8 text-center font-medium text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] text-[1.1rem] md:text-[1.3rem]">
            Ihr Termin bei MOOD BEAUTY
          </h5>

          {/* Appointment details */}
          <div className="bg-[var(--color-light-gray)] border-l-4 border-black p-6 mb-8 rounded">
            <p className="mb-4 font-semibold text-[1.1rem]">
              {groupAppointments.length > 1 ? `Termindetails (${groupAppointments.length} Services)` : `Termindetails`}
            </p>

            {groupAppointments.length > 1 && (
              <div className="mb-4 p-3 bg-[rgba(0,140,255,0.06)] border border-[rgba(0,140,255,0.15)] rounded text-[0.9rem]">
                Sie haben {groupAppointments.length} Services gebucht. Beide werden zusammen storniert.
              </div>
            )}

            <div className="flex flex-col gap-3">
              {groupAppointments.length > 1 ? (
                <>
                  {groupAppointments.map((apt, index) => (
                    <div
                      key={apt.id}
                      className={`flex flex-col gap-1 ${index < groupAppointments.length - 1 ? `pb-4 border-b border-[rgba(0,0,0,0.1)]` : ``}`}
                    >
                      <div>
                        <span className="font-semibold mr-2">Service {index + 1}:</span>
                        <span>{apt.serviceName}</span>
                        {apt.status === 1 && (
                          <span className="ml-2 text-[var(--color-crimson)] text-[0.9rem]">(bereits storniert)</span>
                        )}
                      </div>
                      <div className="pl-4 flex flex-col gap-1">
                        <p className="text-[0.95rem]"><span className="font-medium mr-2">Uhrzeit:</span>{formatTime(apt.timeStart)} Uhr</p>
                        <p className="text-[0.95rem]"><span className="font-medium mr-2">Spezialist:</span>{apt.employee.firstName} {apt.employee.lastName}</p>
                      </div>
                    </div>
                  ))}
                  <p><span className="font-semibold mr-2">Datum:</span>{formatDate(groupAppointments[0].date)}</p>
                  <p><span className="font-semibold mr-2">Standort:</span>{appointment.location}</p>
                </>
              ) : (
                <>
                  <p><span className="font-semibold mr-2">Service:</span>{appointment.serviceName}</p>
                  <p><span className="font-semibold mr-2">Datum:</span>{formatDate(appointment.date)}</p>
                  <p><span className="font-semibold mr-2">Uhrzeit:</span>{formatTime(appointment.timeStart)} Uhr</p>
                  <p><span className="font-semibold mr-2">Standort:</span>{appointment.location}</p>
                  <p><span className="font-semibold mr-2">Spezialist:</span>{appointment.employee.firstName} {appointment.employee.lastName}</p>
                </>
              )}
            </div>
          </div>

          <p className="mb-6 text-center leading-relaxed text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
            Wir freuen uns auf Ihren Besuch! Falls sich Ihre Pläne geändert haben
            und Sie {groupAppointments.length > 1 ? `die Termine` : `den Termin`} nicht wahrnehmen können, können Sie {groupAppointments.length > 1 ? `sie` : `ihn`} hier stornieren.
          </p>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleCancelClick}
              className="btn btn-sm btn-error px-8 py-3"
            >
              {groupAppointments.length > 1 ? `Alle Termine stornieren` : `Termin stornieren`}
            </button>
          </div>

          {/* Cancellation Modal */}
          {showCancelForm && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(event) => {
                if (event.target === event.currentTarget && !cancelling) {
                  setShowCancelForm(false);
                }
              }}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" />

              {/* Modal */}
              <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-[modalIn_0.2s_ease-out]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <h5 className="font-bold text-lg">
                    {groupAppointments.length > 1 ? `Termine stornieren` : `Termin stornieren`}
                  </h5>
                  <button
                    type="button"
                    onClick={() => !cancelling && setShowCancelForm(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                  {/* Warning */}
                  <div className="mb-5 p-3 bg-[rgba(255,152,0,0.08)] border border-[rgba(255,152,0,0.3)] rounded-lg text-sm">
                    Sie sind dabei, {groupAppointments.length > 1 ? `alle ${groupAppointments.length} Termine` : `Ihren Termin`} zu stornieren. Diese Aktion kann nicht rückgängig gemacht werden.
                  </div>

                  <p className="mb-3 font-medium text-sm">
                    Möchten Sie uns mitteilen, warum Sie {groupAppointments.length > 1 ? `die Termine` : `den Termin`} stornieren? (Optional)
                  </p>

                  <textarea
                    rows={3}
                    placeholder="Ihre Nachricht (max. 200 Zeichen)"
                    value={cancellationMessage}
                    onChange={(event) => setCancellationMessage(event.target.value)}
                    maxLength={200}
                    className="input w-full mb-1 resize-none"
                  />
                  <p className="text-xs text-[color-mix(in_srgb,var(--color-black)_40%,transparent)] mb-6">
                    {cancellationMessage.length}/200 Zeichen
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end flex-col">
                    <button
                      type="button"
                      onClick={() => setShowCancelForm(false)}
                      disabled={cancelling}
                      className="btn btn-sm btn-secondary min-w-[120px]"
                    >
                      Abbrechen
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmCancellation}
                      disabled={cancelling}
                      className="btn btn-sm btn-error min-w-[180px]"
                    >
                      {cancelling ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        `Stornierung bestätigen`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
