import dayjs from "dayjs";
import "dayjs/locale/de";
import type { Service, CalendarDay, TimeSlot, ServiceEmployees } from "@/types/booking";
import { formattedTime } from "@/utils/formatters";

dayjs.locale(`de`);

interface CalendarOverviewProps {
  services?: Service[];
  selectedDay: CalendarDay | null;
  selectedTimeSlot: TimeSlot | null;
  serviceEmployees?: ServiceEmployees;
  onChange?: () => void;
}

export default function CalendarOverview({
  services = [],
  selectedDay,
  selectedTimeSlot,
  serviceEmployees = {},
}: CalendarOverviewProps) {
  const getDateText = (): string => {
    if (!selectedDay?.day) return `Kein Datum ausgewählt`;

    const dayObj = dayjs(selectedDay.day);

    if (dayObj.isSame(dayjs(), `day`)) {
      return `Heute, ${dayObj.format(`D. MMMM YYYY`)}`;
    } else if (dayObj.isSame(dayjs().add(1, `day`), `day`)) {
      return `Morgen, ${dayObj.format(`D. MMMM YYYY`)}`;
    } else {
      return dayObj.format(`dddd, D. MMMM YYYY`);
    }
  };

  const getTimeText = (): string => {
    if (!selectedTimeSlot?.startTime) return `Keine Zeit ausgewählt`;
    return formattedTime(selectedTimeSlot.startTime);
  };

  const parseTimeToMinutes = (timeString: string): number => {
    if (!timeString) return 0;

    const parts = timeString.split(`:`);
    if (parts.length !== 3) return 0;

    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;

    return hours * 60 + minutes + Math.round(seconds / 60);
  };

  const getTotalDuration = (): number => {
    if (!services.length) return 0;
    return services.reduce((total, service) => {
      const duration = parseTimeToMinutes(service.durationTime);
      return total + duration;
    }, 0);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}min`;
    }
  };

  const getServicePriceInfo = (service: Service) => {
    if (!service.employees?.length) {
      return { min: 0, max: 0, isRange: false };
    }

    const selectedEmployeeIds = serviceEmployees[service.id] || [];

    if (selectedEmployeeIds.includes(`all`) || selectedEmployeeIds.length === 0) {
      const prices = service.employees.map((employee) => employee.price || 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return { min: minPrice, max: maxPrice, isRange: minPrice !== maxPrice };
    }

    const filteredEmployees = service.employees.filter((employee) =>
      selectedEmployeeIds.includes(employee.id.toString()) ||
      selectedEmployeeIds.includes(String(employee.id))
    );

    if (filteredEmployees.length === 0) {
      const prices = service.employees.map((employee) => employee.price || 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return { min: minPrice, max: maxPrice, isRange: minPrice !== maxPrice };
    }

    const prices = filteredEmployees.map((employee) => employee.price || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return { min: minPrice, max: maxPrice, isRange: minPrice !== maxPrice };
  };

  const getTotalPriceInfo = () => {
    if (!services.length) return { min: 0, max: 0, isRange: false };

    let totalMin = 0;
    let totalMax = 0;
    let hasRange = false;

    services.forEach(service => {
      const priceInfo = getServicePriceInfo(service);
      totalMin += priceInfo.min;
      totalMax += priceInfo.max;
      if (priceInfo.isRange) hasRange = true;
    });

    return { min: totalMin, max: totalMax, isRange: hasRange || totalMin !== totalMax };
  };

  const formatPrice = (priceInfo: { min: number; max: number; isRange: boolean }): string => {
    if (priceInfo.isRange) {
      return `${priceInfo.min}\u20AC - ${priceInfo.max}\u20AC`;
    }
    return `${priceInfo.min}\u20AC`;
  };

  return (
    <div className="mb-4 rounded-[20px] bg-[var(--color-light-gray)] p-4">
      <div className="flex justify-between items-center gap-2 mb-4">
        <h6 className="text-1xl font-bold">
          Gewählter Termin
        </h6>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-base">
          <b>Datum:</b> {getDateText()}
        </p>
        <p className="mb-2 text-base">
          <b>Uhrzeit:</b> {getTimeText()}
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-base font-bold">
          Gewählte Services:
        </p>

        {services.length === 0 ? (
          <p className="text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] ml-2">
            Keine Services ausgewählt
          </p>
        ) : (
          services.map((service, index) => {
            const priceInfo = getServicePriceInfo(service);
            return (
              <div
                key={index}
                className="ml-2 mb-1 flex justify-between items-start gap-4"
              >
                <span className="text-sm text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
                  {service.name || `Unnamed Service`}
                </span>
                <span className="text-sm font-bold whitespace-nowrap">
                  {formatPrice(priceInfo)}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <span className="chip bg-[rgba(0,0,0,0.06)] text-sm py-1rounded-full">
          Services: <b>{services.length}</b>
        </span>
        <span className="chip bg-[rgba(0,0,0,0.06)] text-sm py-0.5 rounded-full">
          Gesamtdauer: <b>{formatDuration(getTotalDuration())}</b>
        </span>
        <span className="chip bg-[rgba(0,0,0,0.06)] text-sm py-0.5 rounded-full">
          Gesamtpreis: <b>{formatPrice(getTotalPriceInfo())}</b>
        </span>
      </div>
    </div>
  );
}
