import Image from "next/image";
import type { Service } from "@/types/booking";
import { formatTimeToString, formatPriceRange } from "@/utils/formatters";

interface ServicesListProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
  selectedServicesIds: number[];
  selectedServiceId?: number;
}

export default function ServicesList({
  services,
  onServiceSelect,
  selectedServicesIds,
  selectedServiceId,
}: ServicesListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 bg-[var(--color-light-gray)] rounded-2xl">
        <p className="text-[color-mix(in_srgb,var(--color-black)_50%,transparent)] italic">
          Alle Services aus dieser Kategorie wurden bereits ausgewählt.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {services.map((service) => {
        const isCurrentSelected = selectedServiceId === service.id;
        const isAnySelected = selectedServicesIds.includes(service.id);
        const isDisabled = isAnySelected && !isCurrentSelected;

        return (
          <div
            key={service.id}
            className="rounded-[20px] overflow-hidden bg-white border border-[rgba(0,0,0,0.1)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
          >
            {service.serviceImage && (
              <div className="relative w-full h-[140px]">
                <Image
                  src={service.serviceImage}
                  alt={service.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="p-4 px-3">
              <p className="mb-3 font-bold tracking-tight text-[1.1rem] md:text-[1.25rem]">
                {service.name}
              </p>

              {service.bookingNote && (
                <p className="mb-3 leading-relaxed text-[0.85rem] italic text-[color-mix(in_srgb,var(--color-black)_60%,transparent)]">
                  {service.bookingNote}
                </p>
              )}

              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col items-start gap-0.5 text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] text-[0.85rem]">
                  <span>
                    Dauer: <b>{formatTimeToString(service.durationTime)}</b>
                  </span>
                  {service.employees && service.employees.length > 0 && (
                    <span>
                      Preis: <b>{formatPriceRange(service.employees)}</b>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onServiceSelect(service)}
                  disabled={isDisabled}
                  className={`
                    btn btn-sm flex-shrink-0 min-w-[120px] max-w-[140px]
                    ${isAnySelected ? `btn-secondary` : `btn-primary`}
                    ${isDisabled ? `opacity-50 cursor-not-allowed` : ``}
                  `}
                >
                  {isCurrentSelected || isAnySelected ? `Ausgewählt` : `Auswählen`}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
