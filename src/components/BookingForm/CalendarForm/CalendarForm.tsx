"use client";

import dayjs from "dayjs";
import { useEffect, useState, forwardRef, useRef } from "react";
import CalendarGrid from "./CalendarGrid/CalendarGrid";

import TimeSlotSection from "./TimeSlotSection/TimeSlotSection";
import TimeSlotSkeleton from "./TimeSlotSkeleton/TimeSlotSkeleton";
import calendarService from "@/services/calendar.service";
import type { Service, ServiceEmployees, CalendarDay, TimeSlot } from "@/types/booking";
import "dayjs/locale/de";

dayjs.locale(`de`);

// Initial value for the calendar is today
const initialValue = dayjs(new Date());

interface CalendarFormProps {
  services: Service[];
  selectedDay: CalendarDay | null;
  setSelectedDay: (day: CalendarDay | null) => void;
  selectedTimeSlot: TimeSlot | null;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  serviceEmployees: ServiceEmployees;
  setServiceEmployees: (employees: ServiceEmployees) => void;
  onNextStep: () => void;
}

const CalendarForm = forwardRef<HTMLDivElement, CalendarFormProps>(function CalendarForm({
  services,
  selectedDay,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  serviceEmployees,
  setServiceEmployees,
  onNextStep,
}, ref) {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isCalendarDaysLoading, setIsCalendarDaysLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    selectedDay?.day ? dayjs(selectedDay.day).startOf(`week`) : initialValue.startOf(`week`)
  );
  const [fetchCalendarDaysError, setFetchCalendarDaysError] = useState<string | null>(null);
  const [timeSlotError, setTimeSlotError] = useState<string | null>(null);
  const [shimmerSlotCount, setShimmerSlotCount] = useState(12);
  const previousPayloadRef = useRef<Array<{ serviceId: number; employeeIds: number[] }> | null>(null);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (services.length > 0) {
      const newServiceEmployees = { ...serviceEmployees };
      let hasChanges = false;

      services.forEach(service => {
        const currentSelection = newServiceEmployees[service?.id] || [];

        const needsInit = currentSelection.length === 0;
        const needsCorrection = service?.employees?.length === 1 && currentSelection.includes(`all`);

        if (needsInit || needsCorrection) {
          if (service?.employees?.length === 1) {
            newServiceEmployees[service?.id] = [service.employees[0].id.toString()];
          } else {
            newServiceEmployees[service?.id] = [`all`];
          }
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setServiceEmployees(newServiceEmployees);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, setServiceEmployees]);

  const createServicesPayload = () => {
    const payload = services?.map(service => {
      const selectedEmployees = serviceEmployees[service?.id] || [`all`];

      const employeeIds = selectedEmployees.includes(`all`) || selectedEmployees.length === 0
        ? service?.employees?.map(employee => employee.id)
        : selectedEmployees.filter(id => id !== `all`).map(id => parseInt(id));

      return {
        serviceId: service.id,
        employeeIds: employeeIds.sort(),
      };
    });

    return payload;
  };

  const isPayloadChanged = (
    newPayload: Array<{ serviceId: number; employeeIds: number[] }>,
    previousPayload: Array<{ serviceId: number; employeeIds: number[] }> | null,
  ): boolean => {
    if (!previousPayload) return true;
    if (newPayload.length !== previousPayload.length) return true;
    return JSON.stringify(newPayload) !== JSON.stringify(previousPayload);
  };

  const fetchCalendarDays = async (
    date: dayjs.Dayjs,
    servicesPayloadOverride: Array<{ serviceId: number; employeeIds: number[] }> | null = null,
  ) => {
    setFetchCalendarDaysError(null);
    setIsCalendarDaysLoading(true);

    try {
      if (services?.length === 0) return [];

      const payload = servicesPayloadOverride || createServicesPayload();
      if (payload.length === 0) return [];

      const { daysToHighlight } = await calendarService.fetchTimeSlots(date, payload);

      return daysToHighlight;
    } catch (error) {
      console.error(error);
      setFetchCalendarDaysError(`Es ist ein Fehler aufgetreten, bitte versuchen Sie es später noch einmal`);
    } finally {
      setIsCalendarDaysLoading(false);
    }
  };

  const areEmployeesInitialized = services.length > 0 && services.every(service => {
    const selected = serviceEmployees[service.id];
    return selected && selected.length > 0;
  });

  useEffect(() => {
    async function updateCalendar() {
      if (services.length === 0 || !areEmployeesInitialized) return;

      const currentPayload = createServicesPayload();

      if (!isPayloadChanged(currentPayload, previousPayloadRef.current)) {
        return;
      }

      previousPayloadRef.current = JSON.parse(JSON.stringify(currentPayload));

      if (selectedTimeSlot) {
        const matchingService = currentPayload.find(payloadItem => payloadItem.serviceId === selectedTimeSlot.serviceId);
        if (!matchingService || !selectedTimeSlot.employeeIds?.every(id => matchingService.employeeIds.includes(id))) {
          setSelectedTimeSlot(null);
        }
      }

      isFirstLoadRef.current = true;

      const previousSelectedDay = selectedDay?.day;

      setShimmerSlotCount(selectedDay?.availableTimeslots?.length || 12);
      setSelectedDay(null);

      const daysToHighlight = await fetchCalendarDays(currentWeekStart);

      if (isFirstLoadRef.current && (!daysToHighlight || daysToHighlight.length === 0)) {
        isFirstLoadRef.current = false;
        handleWeekChange(1);
        return;
      }

      isFirstLoadRef.current = false;
      setCalendarDays(daysToHighlight || []);

      if (daysToHighlight && daysToHighlight.length > 0) {
        const previousDayStillAvailable = previousSelectedDay
          ? daysToHighlight.find((dayItem: CalendarDay) => dayItem.day === previousSelectedDay)
          : null;

        if (previousDayStillAvailable) {
          setSelectedDay(previousDayStillAvailable);
        } else {
          const firstAvailable = daysToHighlight[0];
          setSelectedDay(firstAvailable);
        }
      }
    }

    updateCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, serviceEmployees]);

  // Update selectedDay when calendarDays change to ensure it has the latest timeslot data
  useEffect(() => {
    if (calendarDays.length > 0 && selectedDay) {
      const updatedDay = calendarDays.find(dayItem => dayItem.day === selectedDay.day);
      if (updatedDay && JSON.stringify(updatedDay) !== JSON.stringify(selectedDay)) {
        setSelectedDay(updatedDay);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDays]);

  const handleWeekChange = async (direction: number) => {
    const newStart = currentWeekStart.add(direction, `week`);
    setCurrentWeekStart(newStart);
    setCalendarDays([]);
    setShimmerSlotCount(selectedDay?.availableTimeslots?.length || 12);
    setSelectedDay(null);
    setSelectedTimeSlot(null);
    setTimeSlotError(null);

    const daysToHighlight = await fetchCalendarDays(newStart);

    setCalendarDays(daysToHighlight || []);

    if (daysToHighlight && daysToHighlight.length > 0) {
      setSelectedDay(daysToHighlight[0]);
    } else {
      const defaultDate = newStart;
      const formattedDate = defaultDate.format(`YYYY-MM-DD`);
      setSelectedDay({
        day: formattedDate,
        availableTimeslots: [],
      });
    }
  };

  return (
    <div ref={ref} className="mt-4 flex flex-col">
      <h5 className="text-center text-xl font-heading font-bold">
        Datum und Zeit auswählen
      </h5>

      {/* Calendar Grid */}
      <CalendarGrid
        currentWeekStart={currentWeekStart}
        calendarDays={calendarDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setSelectedTimeSlot={setSelectedTimeSlot}
        setTimeSlotError={setTimeSlotError}
        onWeekChange={handleWeekChange}
        fetchCalendarDaysError={fetchCalendarDaysError}
      />

      {/* Loading skeleton */}
      {isCalendarDaysLoading && (
        <div className="mt-4">
          <TimeSlotSkeleton
            count={shimmerSlotCount}
            showDateText={true}
            showButton={false}
          />
        </div>
      )}

      {/* Time slots section */}
      {!isCalendarDaysLoading && (
        <TimeSlotSection
          selectedDay={selectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          setTimeSlotError={setTimeSlotError}
        />
      )}

      {/* Error message */}
      {timeSlotError && (
        <p className="mt-4 text-[var(--color-crimson)]">
          {timeSlotError}
        </p>
      )}

      {/* Next button */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          disabled={isCalendarDaysLoading}
          onClick={() => {
            if (selectedDay && selectedTimeSlot) {
              onNextStep();
            } else {
              setTimeSlotError(`Bitte wählen Sie ein Datum und eine Uhrzeit.`);
            }
          }}
          className="btn btn-md btn-primary w-[300px] max-w-full"
        >
          Weiter
        </button>
      </div>
    </div>
  );
});

export default CalendarForm;
