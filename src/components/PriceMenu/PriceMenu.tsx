"use client";

import { formatTimeToString } from "@/utils/formatters";
import type { Category, SubCategory, Service } from "@/services/services.service";

/**
 * Calculate price display for a service.
 * If all employees have the same price — show single price.
 * If prices differ — show range (min - max).
 * If price is 0 — show "Kostenlos" (free).
 */
const getPriceDisplay = (employees: Service["employees"]): string | null => {
  if (!employees || employees.length === 0) return null;

  const prices = employees
    .map((employee) => parseFloat(String(employee.price)))
    .filter((price) => !isNaN(price) && price >= 0);

  if (prices.length === 0) return null;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (maxPrice === 0) return `Kostenlos`;

  if (minPrice === 0 && maxPrice > 0) return `Kostenlos - ${maxPrice}€`;

  if (minPrice === maxPrice) return `${minPrice}€`;

  return `${minPrice}€ - ${maxPrice}€`;
};

/**
 * Service item component — single row in the price list
 */
function ServiceItem({ service }: { readonly service: Service }) {
  const priceDisplay = getPriceDisplay(service.employees);

  return (
    <div className="flex justify-between items-start gap-4 py-3 md:py-4 px-4 md:px-6 border-b border-[rgba(0,0,0,0.08)] last:border-b-0 transition-colors duration-200 hover:bg-[rgba(0,0,0,0.02)]">
      <div className="flex-1">
        <p className="body-text font-medium mb-0.5 leading-[1.4] text-base md:text-[1.1rem]">
          {service.name}
        </p>
        {service.durationTime && (
          <p className="body-text text-sm md:text-[0.95rem] opacity-60 font-normal">
            {formatTimeToString(service.durationTime)}
          </p>
        )}
      </div>
      {priceDisplay && (
        <p className="body-text font-semibold whitespace-nowrap text-primary text-[1.05rem] md:text-[1.15rem]">
          {priceDisplay}
        </p>
      )}
    </div>
  );
}

/**
 * SubCategory section — group of services under a subcategory heading
 */
function SubCategorySection({
  subCategory,
  categoryIndex,
  subCategoryIndex,
}: {
  readonly subCategory: SubCategory;
  readonly categoryIndex: number;
  readonly subCategoryIndex: number;
}) {
  return (
    <div className="mb-6 md:mb-8">
      <h4 className="heading-4 font-semibold text-[1.2rem] md:text-[1.4rem] mb-4 px-4 md:px-6 text-primary">
        {subCategory.subCategoryName}
      </h4>
      <div className="bg-light-gray rounded-xl overflow-hidden">
        {subCategory.services && subCategory.services.length > 0 ? (
          subCategory.services.map((service, serviceIndex) => (
            <ServiceItem
              key={`service-${categoryIndex}-${subCategoryIndex}-${serviceIndex}`}
              service={service}
            />
          ))
        ) : (
          <p className="body-text opacity-60 p-6 text-center">
            Keine Services verfügbar
          </p>
        )}
      </div>
    </div>
  );
}

interface PriceMenuProps {
  readonly categories: readonly Category[];
}

/**
 * Main PriceMenu component — full price list with categories, subcategories, and services
 */
export default function PriceMenu({ categories }: PriceMenuProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="body-text opacity-60">Keine Services verfügbar</p>
      </div>
    );
  }

  return (
    <div>
      {categories.map((category, categoryIndex) => (
        <div
          key={`category-${categoryIndex}`}
          className="mb-10 md:mb-12 last:mb-0"
        >
          {/* Category Header */}
          <div className="mb-6 md:mb-8 pb-4 border-b-2 border-primary">
            <h2 className="heading-2 font-bold text-[1.75rem] md:text-[2.2rem] lg:text-[2.5rem] text-primary">
              {category.categoryName}
            </h2>
          </div>

          {/* Category Content */}
          <div>
            {category.hasSubCategories !== false &&
            category.subCategories &&
            category.subCategories.length > 0 ? (
              category.subCategories.map((subCategory, subCategoryIndex) => (
                <SubCategorySection
                  key={`subcategory-${categoryIndex}-${subCategoryIndex}`}
                  subCategory={subCategory}
                  categoryIndex={categoryIndex}
                  subCategoryIndex={subCategoryIndex}
                />
              ))
            ) : category.services && category.services.length > 0 ? (
              <div className="bg-light-gray rounded-xl overflow-hidden">
                {category.services.map((service, serviceIndex) => (
                  <ServiceItem
                    key={`service-${categoryIndex}-${serviceIndex}`}
                    service={service}
                  />
                ))}
              </div>
            ) : (
              <p className="body-text opacity-60 text-center py-8">
                Keine Services verfügbar
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
