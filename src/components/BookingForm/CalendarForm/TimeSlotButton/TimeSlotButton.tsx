import type { TimeSlot } from "@/types/booking";
import { formattedTime } from "@/utils/formatters";

interface TimeSlotButtonProps {
  slot: TimeSlot;
  selectedTimeSlot: TimeSlot | null;
  setSelectedTimeSlot: (slot: TimeSlot) => void;
}

export default function TimeSlotButton({
  slot,
  selectedTimeSlot,
  setSelectedTimeSlot,
}: TimeSlotButtonProps) {
  const isSelected = slot.startTime === selectedTimeSlot?.startTime;

  return (
    <button
      type="button"
      onClick={() => setSelectedTimeSlot(slot)}
      disabled={slot.disabled}
      className={`
        btn btn-md min-w-[100px] font-bold text-base
        ${isSelected ? `btn-primary` : slot.disabled ? `btn-timeslot-disabled` : `btn-secondary`}
      `}
    >
      {formattedTime(slot.startTime)}
    </button>
  );
}
