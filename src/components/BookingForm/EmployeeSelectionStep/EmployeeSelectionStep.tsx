"use client";

import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import calendarService from "@/services/calendar.service";
import type { Service, ServiceEmployees } from "@/types/booking";
import "dayjs/locale/de";

dayjs.locale(`de`);

/**
 * Determines if employee selection step should be shown.
 * Returns true if at least one service has more than one employee.
 */
export const shouldShowEmployeeSelection = (services: Service[]): boolean => {
  if (!services || services.length === 0) return false;
  return services.some((service) => service?.employees?.length > 1);
};

/**
 * Format nearest slot date/time for display
 */
const formatNearestSlot = (slot: { date: string; time: string } | null): string | null => {
  if (!slot) return null;

  const slotDate = dayjs(slot.date);
  const today = dayjs();
  const tomorrow = today.add(1, `day`);

  // Format time (remove seconds)
  const timeParts = slot.time.split(`:`);
  const formattedTimeValue = `${timeParts[0]}:${timeParts[1]}`;

  if (slotDate.isSame(today, `day`)) {
    return `Heute, ${formattedTimeValue}`;
  }

  if (slotDate.isSame(tomorrow, `day`)) {
    return `Morgen, ${formattedTimeValue}`;
  }

  return `${slotDate.format(`dd, D. MMM`)}, ${formattedTimeValue}`;
};

interface EmployeeSelectionStepProps {
  services: Service[];
  serviceEmployees: ServiceEmployees;
  setServiceEmployees: (employees: ServiceEmployees) => void;
  onNextStep: () => void;
}

export default function EmployeeSelectionStep({
  services,
  serviceEmployees,
  setServiceEmployees,
  onNextStep,
}: EmployeeSelectionStepProps) {
  const [nearestSlots, setNearestSlots] = useState<Record<number, Record<string, { date: string; time: string } | null>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const servicesWithMultipleEmployees = services.filter(
    (service) => service?.employees?.length > 1
  );

  // Fetch nearest slots ONLY on first mount
  useEffect(() => {
    if (hasFetchedRef.current) return;
    if (servicesWithMultipleEmployees.length === 0) return;

    hasFetchedRef.current = true;

    const fetchNearestSlotsForAllServices = async () => {
      setIsLoading(true);

      try {
        const results: Record<number, Record<string, { date: string; time: string } | null>> = {};

        for (const service of servicesWithMultipleEmployees) {
          const employeeCombinations = [
            {
              key: `all`,
              employeeIds: service.employees.map((employee) => employee.id),
            },
            ...service.employees.map((employee) => ({
              key: employee.id.toString(),
              employeeIds: [employee.id],
            })),
          ];

          const otherServicesData = services
            .filter((otherService) => otherService.id !== service.id)
            .map((otherService) => ({
              serviceId: otherService.id,
              employeeIds: otherService.employees.map((employee) => employee.id),
            }));

          const slotsResult = await calendarService.fetchNearestSlots(
            service.id,
            employeeCombinations,
            otherServicesData
          );

          results[service.id] = slotsResult;
        }

        setNearestSlots(results);
      } catch (error) {
        console.error(`[EmployeeSelectionStep] Error fetching nearest slots:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearestSlotsForAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmployeeToggle = (serviceId: number, employeeId: string) => {
    const service = services.find((serviceItem) => serviceItem.id === serviceId);
    if (!service) return;

    const currentSelection = serviceEmployees[serviceId] || [`all`];

    // If clicking on "all" option
    if (employeeId === `all`) {
      setServiceEmployees({
        ...serviceEmployees,
        [serviceId]: [`all`],
      });
      return;
    }

    // If currently "all" is selected and clicking on specific employee
    if (currentSelection.includes(`all`)) {
      setServiceEmployees({
        ...serviceEmployees,
        [serviceId]: [employeeId],
      });
      return;
    }

    // Toggle specific employee
    const employeeIdStr = employeeId.toString();
    const isCurrentlySelected = currentSelection.includes(employeeIdStr);

    let newSelection: string[];
    if (isCurrentlySelected) {
      newSelection = currentSelection.filter((id) => id !== employeeIdStr);
      if (newSelection.length === 0) {
        newSelection = [`all`];
      }
    } else {
      newSelection = [...currentSelection.filter((id) => id !== `all`), employeeIdStr];
    }

    setServiceEmployees({
      ...serviceEmployees,
      [serviceId]: newSelection,
    });
  };

  const isEmployeeSelected = (serviceId: number, employeeId: string | number): boolean => {
    const currentSelection = serviceEmployees[serviceId] || [`all`];

    if (employeeId === `all`) {
      return currentSelection.includes(`all`);
    }

    return currentSelection.includes(employeeId.toString());
  };

  const getNearestSlotDisplay = (serviceId: number, employeeKey: string) => {
    const serviceSlots = nearestSlots[serviceId];

    if (isLoading) {
      return (
        <div className="w-[140px] h-[18px] mt-0.5 rounded bg-[rgba(0,0,0,0.06)] animate-pulse" />
      );
    }

    if (!serviceSlots || !serviceSlots[employeeKey]) {
      return (
        <span className="text-xs text-[rgba(0,0,0,0.35)] italic font-bold mt-0.5 block h-[18px]">
          Kein Termin verfügbar
        </span>
      );
    }

    const formattedSlotValue = formatNearestSlot(serviceSlots[employeeKey]);

    if (!formattedSlotValue) {
      return (
        <span className="text-xs text-[rgba(0,0,0,0.35)] italic font-bold mt-0.5 block h-[18px]">
          Kein Termin verfügbar
        </span>
      );
    }

    return (
      <span className="text-xs italic font-bold mt-0.5 block min-h-[18px]">
        Nächster Termin:{` `}
        <span className="whitespace-nowrap">{formattedSlotValue}</span>
      </span>
    );
  };

  return (
    <div className="mt-4">
      <h5 className="text-center text-xl font-heading mb-4 font-bold">
        Mitarbeiter auswählen
      </h5>

      <p className="text-center text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] text-m mb-6">
        Wählen Sie Ihren bevorzugten Mitarbeiter für jeden Service
      </p>

      {servicesWithMultipleEmployees.map((service) => (
        <div
          key={service.id}
          className="mb-4 border border-[rgba(0,0,0,0.1)] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
        >
          <div className="p-4">
            <p className="font-semibold text-[1.1rem] mb-3">
              {service.name}
            </p>

            {/* "Any employee" option */}
            <button
              type="button"
              onClick={() => handleEmployeeToggle(service.id, `all`)}
              className={`
                w-full flex items-start justify-between gap-2 py-2.5 px-3 mb-2
                rounded-xl cursor-pointer border transition-all duration-200
                bg-transparent text-left
                ${isEmployeeSelected(service.id, `all`)
                  ? `bg-[rgba(0,171,85,0.08)] border-[rgba(0,171,85,0.3)]`
                  : `border-transparent`
                }
              `}
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={isEmployeeSelected(service.id, `all`)}
                  readOnly
                  className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[var(--color-success)]"
                />
                <div className="min-w-0">
                  <span
                    className={`font-medium ${isEmployeeSelected(service.id, `all`) ? `text-[var(--color-success)]` : ``}`}
                  >
                    Egal / Alle Mitarbeiter
                  </span>
                  {getNearestSlotDisplay(service.id, `all`)}
                </div>
              </div>

              <span className="text-sm text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] flex-shrink-0 text-right whitespace-nowrap">
                {(() => {
                  const prices = service.employees.map((employee) => employee.price || 0);
                  const minPrice = Math.min(...prices);
                  const maxPrice = Math.max(...prices);
                  return minPrice === maxPrice
                    ? `${minPrice}\u20AC`
                    : `${minPrice}\u20AC - ${maxPrice}\u20AC`;
                })()}
              </span>
            </button>

            {/* Individual employees */}
            {service.employees.map((employee) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => handleEmployeeToggle(service.id, employee.id.toString())}
                className={`
                  w-full flex items-start justify-between gap-2 py-2.5 px-3 mb-1
                  rounded-xl cursor-pointer border transition-all duration-200
                  bg-transparent text-left
                  ${isEmployeeSelected(service.id, employee.id)
                    ? `bg-[rgba(0,171,85,0.08)] border-[rgba(0,171,85,0.3)]`
                    : `border-transparent`
                  }
                `}
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isEmployeeSelected(service.id, employee.id)}
                    readOnly
                    className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[var(--color-success)]"
                  />
                  <div className="min-w-0">
                    <span
                      className={`${isEmployeeSelected(service.id, employee.id) ? `font-medium text-[var(--color-success)]` : ``}`}
                    >
                      {employee.firstName} {employee.lastName}
                    </span>
                    {getNearestSlotDisplay(service.id, employee.id.toString())}
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold flex-shrink-0 whitespace-nowrap ${
                    isEmployeeSelected(service.id, employee.id)
                      ? `text-[var(--color-success)]`
                      : `text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]`
                  }`}
                >
                  {employee.price || 0}{`\u20AC`}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onNextStep}
          className="btn btn-md btn-primary w-[300px] max-w-full"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
