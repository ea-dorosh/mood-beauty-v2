"use client";

import dayjs from "dayjs";
import CalendarDay from "@/components/BookingForm/CalendarForm/CalendarDay/CalendarDay";
import type { CalendarDay as CalendarDayType, TimeSlot } from "@/types/booking";
import { formatMonthYear } from "@/utils/formatters";
import "dayjs/locale/de";

dayjs.locale(`de`);

const weekDays = [`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`];

interface CalendarGridProps {
  currentWeekStart: dayjs.Dayjs;
  calendarDays: CalendarDayType[];
  selectedDay: CalendarDayType | null;
  setSelectedDay: (day: CalendarDayType) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  setTimeSlotError: (error: string | null) => void;
  onWeekChange: (direction: number) => void;
  fetchCalendarDaysError: string | null;
}

export default function CalendarGrid({
  currentWeekStart,
  calendarDays,
  selectedDay,
  setSelectedDay,
  setSelectedTimeSlot,
  setTimeSlotError,
  onWeekChange,
  fetchCalendarDaysError,
}: CalendarGridProps) {
  return (
    <div className="flex flex-col w-[320px] max-w-full mx-auto my-4 p-4 rounded-2xl bg-[var(--color-light-gray)]">
      {/* Week navigation */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="p-1 min-w-0 border-none bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={currentWeekStart.isSame(dayjs(), `week`)}
          onClick={() => onWeekChange(-1)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h6 className="font-bold text-xl">
          {formatMonthYear(currentWeekStart)}
        </h6>

        <button
          type="button"
          className="p-1 min-w-0 border-none bg-transparent cursor-pointer"
          onClick={() => onWeekChange(1)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <span
            key={index}
            className="flex items-center justify-center w-[38px] h-[36px] text-[1.1rem]"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days grid or error */}
      {fetchCalendarDaysError ? (
        <div>
          <p className="mt-4 text-[var(--color-crimson)]">
            {fetchCalendarDaysError}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-7">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = currentWeekStart.add(index, `day`);
            const isHighlighted = calendarDays.some(({
              day: highlightedDay,
              availableTimeslots,
            }) =>
              highlightedDay === day.format(`YYYY-MM-DD`) && availableTimeslots.some((timeslot) => !timeslot.disabled)
            );

            return (
              <CalendarDay
                key={day.toString()}
                day={day}
                isHighlighted={isHighlighted}
                selectedDay={selectedDay}
                onClick={(clickedDay) => {
                  const foundDay = calendarDays.find(
                    ({ day: highlightedDay }) => highlightedDay === clickedDay.format(`YYYY-MM-DD`)
                  );

                  if (foundDay) {
                    setSelectedDay(foundDay);
                  } else {
                    setSelectedDay({
                      day: clickedDay.format(`YYYY-MM-DD`),
                      availableTimeslots: [],
                    });
                  }

                  setSelectedTimeSlot(null);
                  setTimeSlotError(null);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
