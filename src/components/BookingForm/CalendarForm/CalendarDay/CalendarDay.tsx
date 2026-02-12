import dayjs from "dayjs";
import type { CalendarDay as CalendarDayType } from "@/types/booking";

interface CalendarDayProps {
  isHighlighted: boolean;
  day: dayjs.Dayjs;
  onClick: (day: dayjs.Dayjs) => void;
  selectedDay: CalendarDayType | null;
}

export default function CalendarDay({
  isHighlighted,
  day,
  onClick,
  selectedDay,
}: CalendarDayProps) {
  const isSelected = selectedDay?.day === day.format(`YYYY-MM-DD`);

  return (
    <div className="relative flex flex-col items-center">
      {/* Highlight dot */}
      {isHighlighted && (
        <span
          className={`absolute top-1.5 text-[10px] leading-none ${isSelected ? `text-white` : `text-black`}`}
        >
          {`\u25CF`}
        </span>
      )}

      <button
        type="button"
        onClick={() => onClick(day)}
        className={`
          min-w-[38px] w-[40px] h-[46px] m-0 pt-5 pb-2 px-0 rounded-md
          border-none cursor-pointer font-semibold text-[0.95rem]
          transition-colors duration-150
          ${isSelected
            ? `bg-[var(--color-charcoal)] text-white`
            : `bg-transparent text-black`
          }
        `}
      >
        {day.date()}
      </button>
    </div>
  );
}
