"use client";

import Link from "next/link";
import { formatTimeToString } from "@/utils/formatters";
import type { Category, Employee } from "@/services/services.service";

/**
 * Calculate price display for a service
 */
const getPriceDisplay = (employees: readonly Employee[]): string | null => {
  if (!employees || employees.length === 0) return null;

  const prices = employees
    .map((employee) => parseFloat(String(employee.price)))
    .filter((price) => !isNaN(price) && price >= 0);

  if (prices.length === 0) return null;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (maxPrice === 0) {
    return `Kostenlos`;
  }

  if (minPrice === 0 && maxPrice > 0) {
    return `Kostenlos - ${maxPrice}€`;
  }

  if (minPrice === maxPrice) {
    return `${minPrice}€`;
  }

  return `${minPrice}€ - ${maxPrice}€`;
};

interface ServiceWithCategory {
  readonly name: string;
  readonly durationTime?: string;
  readonly employees?: readonly Employee[];
  readonly categoryName: string;
  readonly subCategoryName?: string;
}

/**
 * Get first N services from all categories
 */
const getFirstServices = (
  categories: readonly Category[],
  count = 3,
): ServiceWithCategory[] => {
  const allServices: ServiceWithCategory[] = [];

  categories.forEach((category) => {
    if (category.hasSubCategories !== false && category.subCategories) {
      category.subCategories.forEach((subCategory) => {
        if (subCategory.services) {
          subCategory.services.forEach((service) => {
            allServices.push({
              ...service,
              categoryName: category.categoryName,
              subCategoryName: subCategory.subCategoryName,
            });
          });
        }
      });
    } else if (category.services) {
      category.services.forEach((service) => {
        allServices.push({
          ...service,
          categoryName: category.categoryName,
        });
      });
    }
  });

  return allServices.slice(0, count);
};

/**
 * Service item for preview
 */
function ServicePreviewItem({
  service,
  index,
  isLast,
}: {
  readonly service: ServiceWithCategory;
  readonly index: number;
  readonly isLast: boolean;
}) {
  const priceDisplay = service.employees
    ? getPriceDisplay(service.employees)
    : null;

  return (
    <div
      className={`flex justify-between items-start gap-4 py-3 md:py-4 px-4 md:px-6 transition-opacity duration-300 ${
        !isLast ? `border-b border-white/15` : ``
      } ${index === 2 ? `opacity-50` : `opacity-100`}`}
    >
      <div className="flex-1">
        <p className="body-text font-medium mb-1 leading-snug text-sm md:text-base text-secondary-contrast">
          {service.name}
        </p>
        {service.durationTime && (
          <p className="text-xs md:text-sm opacity-70 font-normal text-secondary-contrast">
            {formatTimeToString(service.durationTime)}
          </p>
        )}
      </div>
      {priceDisplay && (
        <p className="body-text font-semibold whitespace-nowrap text-secondary-contrast text-base md:text-lg">
          {priceDisplay}
        </p>
      )}
    </div>
  );
}

/**
 * Price Preview Component for Homepage
 */
interface PricePreviewProps {
  readonly categories: readonly Category[];
}

export default function PricePreview({ categories }: PricePreviewProps) {
  const previewServices = getFirstServices(categories, 3);

  if (
    !categories ||
    categories.length === 0 ||
    previewServices.length === 0
  ) {
    return null;
  }

  return (
    <section className="price-preview-section">
      <div className="container px-4 md:px-8">
        <h2 className="heading-2 text-secondary-contrast text-center font-bold tracking-[.02em] mb-4 text-[1.8rem] md:text-[2.4rem]">
          Unsere Preise
        </h2>

        <p className="body-text text-secondary-contrast text-center mb-8 opacity-85 max-w-[600px] mx-auto">
          Transparente Preise für alle unsere Beauty-Services
        </p>

        {/* Services Preview */}
        <div className="max-w-[700px] mx-auto mb-8 relative">
          <div className="bg-black/15 rounded-2xl overflow-hidden backdrop-blur-[10px]">
            {previewServices.map((service, index) => (
              <ServicePreviewItem
                key={`preview-service-${service.name}`}
                service={service}
                index={index}
                isLast={index === previewServices.length - 1}
              />
            ))}
          </div>

          {/* Fade overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none rounded-b-2xl"
            style={{
              background: `linear-gradient(to bottom, transparent, #ffffff)`,
            }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Link
            href="/preisliste"
            className="btn btn-lg btn-primary px-8"
          >
            Alle Preise ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
