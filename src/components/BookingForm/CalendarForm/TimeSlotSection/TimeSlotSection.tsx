"use client";

import dayjs from "dayjs";
import TimeSlotButton from "@/components/BookingForm/CalendarForm/TimeSlotButton/TimeSlotButton";
import { MOCK_TIME_SLOTS } from "@/components/BookingForm/CalendarForm/TimeSlotSection/mockTimeSlots";
import type { CalendarDay, TimeSlot } from "@/types/booking";
import "dayjs/locale/de";

dayjs.locale(`de`);

interface TimeSlotSectionProps {
  selectedDay: CalendarDay | null;
  selectedTimeSlot: TimeSlot | null;
  setSelectedTimeSlot: (slot: TimeSlot) => void;
  setTimeSlotError: (error: string | null) => void;
}

export default function TimeSlotSection({
  selectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  setTimeSlotError,
}: TimeSlotSectionProps) {
  if (!selectedDay) {
    return null;
  }

  const dateText = dayjs(selectedDay?.day)?.isSame(dayjs(), `day`)
    ? `Heute, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
    : dayjs(selectedDay?.day)?.isSame(dayjs().add(1, `day`), `day`)
      ? `Morgen, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
      : `Am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)}`;

  if (selectedDay.availableTimeslots.length > 0) {
    return (
      <div className="flex flex-col mt-4">
        <div>
          {selectedDay.availableTimeslots.some(timeslot => !timeslot.disabled) ? (
            <span><b>{dateText}</b> folgende Termine sind verfügbar</span>
          ) : (
            <span><b>{dateText}</b> gibt es keine verfügbaren Zeiten. Bitte wählen Sie ein anderes Datum.</span>
          )}
        </div>

        <div className="grid grid-cols-3 w-full gap-2.5 mt-4">
          {selectedDay.availableTimeslots.map(slot => (
            <TimeSlotButton
              key={slot.startTime}
              slot={slot}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={(selectedSlot) => {
                setSelectedTimeSlot(selectedSlot);
                setTimeSlotError(null);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4">
        <b>{dateText}</b> gibt es keine verfügbaren Zeiten. <br />
        Bitte wählen Sie ein anderes Datum.
      </div>

      <div className="grid grid-cols-3 w-full gap-2.5 mt-4">
        {MOCK_TIME_SLOTS.map(slot => (
          <TimeSlotButton
            key={slot.startTime}
            slot={slot}
            selectedTimeSlot={null}
            setSelectedTimeSlot={() => {}}
          />
        ))}
      </div>
    </>
  );
}
