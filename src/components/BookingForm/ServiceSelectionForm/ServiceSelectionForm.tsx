"use client";

/**
 * ServiceSelectionForm — new flat design (no accordions, no card with shadows)
 *
 * DESIGN CHANGE vs old project:
 * - Old: MUI Accordion inside a Card with shadow and rounded corners
 * - New: Flat show/hide with plain text labels, no box/shadow/border-radius wrapper
 *
 * LOGIC: 100% preserved from old project (category → subcategory → service flow,
 * collapseAll/openCategory/openService imperative API, selection persistence, etc.)
 */

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import CategoryForm from "@/components/BookingForm/CategoryForm/CategoryForm";
import ServicesList from "@/components/BookingForm/ServicesList/ServicesList";
import SubCategoryForm from "@/components/BookingForm/SubCategoryForm/SubCategoryForm";
import type { Category, SubCategory, Service } from "@/types/booking";
import { formatTimeToString, formatPriceRange } from "@/utils/formatters";

interface ServiceSelectionFormProps {
  categories: Category[];
  onServiceSelect: (service: Service) => void;
  getAvailableServices: (services: Service[]) => Service[];
  serviceData: Service | null;
  deleteService?: () => void;
  hasDeleteButton?: boolean;
  selectedServicesIds: number[];
  firstService?: boolean;
}

export interface ServiceSelectionFormRef {
  collapseAll: () => void;
  openCategory: () => void;
  openService: () => void;
}

const ServiceSelectionForm = forwardRef<ServiceSelectionFormRef, ServiceSelectionFormProps>(
  function ServiceSelectionForm(
    {
      categories,
      onServiceSelect,
      getAvailableServices,
      serviceData,
      deleteService,
      hasDeleteButton,
      selectedServicesIds,
      firstService,
    },
    ref,
  ) {
    const topFormPosition = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (serviceData) {
        const category = categories.find(
          (categoryItem) => categoryItem.categoryId === serviceData?.categoryId
        );
        const subCategory = category?.subCategories?.find(
          (subCategoryItem) => subCategoryItem.subCategoryId === serviceData?.subCategoryId
        );

        setSelectedCategory(category || null);
        setSelectedSubCategory(subCategory || null);
      } else {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceData]);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
      serviceData
        ? categories.find(
            (categoryItem) => categoryItem.categoryId === serviceData?.categoryId
          ) || null
        : null
    );

    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(
      selectedCategory
        ? selectedCategory?.subCategories.find(
            (subCategoryItem) =>
              subCategoryItem.subCategoryId === serviceData?.subCategoryId
          ) || null
        : null
    );

    const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

    // Expose imperative API to parent to control accordion state
    useImperativeHandle(
      ref,
      () => ({
        collapseAll: () => setExpandedPanel(null),
        openCategory: () => setExpandedPanel(`category`),
        openService: () => setExpandedPanel(`service`),
      }),
      []
    );

    const onCategorySelect = (category: Category) => {
      // If user re-selects the same category and a service is already chosen,
      // just close the panel without changing state
      if (selectedCategory?.categoryId === category.categoryId && serviceData) {
        setExpandedPanel(null);
        return;
      }

      setSelectedCategory(category);
      setSelectedSubCategory(null);
      setExpandedPanel(
        category?.hasSubCategories === false ? `service` : `subCategory`
      );

      if (topFormPosition.current) {
        topFormPosition.current.scrollIntoView({ behavior: `smooth` });
      }
    };

    const onSubCategorySelect = (subCategory: SubCategory) => {
      // If user re-selects the same subcategory and a service is already chosen,
      // just close the panel without changing state
      if (
        selectedSubCategory?.subCategoryId === subCategory.subCategoryId &&
        serviceData
      ) {
        setExpandedPanel(null);
        return;
      }

      setSelectedSubCategory(subCategory);
      setExpandedPanel(`service`);

      if (topFormPosition.current) {
        topFormPosition.current.scrollIntoView({ behavior: `smooth` });
      }
    };

    const onServiceSelectInternal = (service: Service) => {
      // First propagate selection to parent, then close the panel in next tick
      onServiceSelect(service);
      setTimeout(() => {
        setExpandedPanel(null);
        if (topFormPosition.current) {
          topFormPosition.current.scrollIntoView({ behavior: `smooth` });
        }
      }, 0);
    };

    // Collapsed states for showing checkmark in labels
    const isCategoryCollapsed =
      !!selectedCategory && expandedPanel !== `category`;
    const isSubCategoryCollapsed =
      !!selectedSubCategory && expandedPanel !== `subCategory`;
    const isServiceCollapsed =
      !!serviceData && expandedPanel !== `service`;

    // Determine if a panel is open (expanded) or show content directly (no selection yet)
    const isCategoryOpen =
      !selectedCategory ? true : expandedPanel === `category`;
    const isSubCategoryOpen =
      !selectedSubCategory ? true : expandedPanel === `subCategory`;
    const isServiceOpen = expandedPanel === `service`;

    return (
      <div ref={topFormPosition} style={{ scrollMarginTop: `100px` }}>
        {/* Delete button for multi-service */}
        {hasDeleteButton && (
          <div className="flex justify-between items-center gap-2 w-full pb-2 mb-2 border-b border-[rgba(0,0,0,0.1)]">
            <span className="text-[var(--color-success)] font-semibold text-sm">
              {firstService ? `Service 1` : `Service 2`}
            </span>
            <button
              type="button"
              onClick={deleteService}
              className="text-sm cursor-pointer bg-transparent border-none p-0"
              style={{ color: `var(--color-crimson)`, fontWeight: 700 }}
            >
              löschen
            </button>
          </div>
        )}

        {/* === Category Section === */}
        <div className="mb-1">
          {/* Category header — clickable label */}
          <button
            type="button"
            onClick={() => {
              if (selectedCategory) {
                setExpandedPanel(expandedPanel === `category` ? null : `category`);
              }
            }}
            className="w-full flex items-center justify-between py-2 px-1 cursor-pointer bg-transparent border-none text-left"
          >
            <div className="flex items-center gap-2">
              {isCategoryCollapsed && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="var(--color-success)"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="font-semibold tracking-tight">
                {!selectedCategory ? `Kategorie wählen` : selectedCategory.categoryName}
              </span>
            </div>

            {selectedCategory && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${isCategoryOpen ? `rotate-180` : ``}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>

          {/* Category content */}
          {isCategoryOpen && (
            <div className="py-2">
              <CategoryForm
                categories={categories}
                onCategorySelect={onCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>
          )}
        </div>

        {/* === SubCategory Section === */}
        {selectedCategory && selectedCategory.hasSubCategories !== false && (
          <div className="mb-1">
            <button
              type="button"
              onClick={() => {
                if (selectedSubCategory) {
                  setExpandedPanel(
                    expandedPanel === `subCategory` ? null : `subCategory`
                  );
                }
              }}
              className="w-full flex items-center justify-between py-2 px-1 cursor-pointer bg-transparent border-none text-left"
            >
              <div className="flex items-center gap-2">
                {isSubCategoryCollapsed && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="var(--color-success)"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span className="font-medium">
                  {selectedSubCategory
                    ? selectedSubCategory.subCategoryName
                    : `Unterkategorie wählen`}
                </span>
              </div>

              {selectedSubCategory && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-200 ${isSubCategoryOpen ? `rotate-180` : ``}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </button>

            {isSubCategoryOpen && (
              <div className="py-2">
                <SubCategoryForm
                  subCategories={selectedCategory.subCategories}
                  onSubCategorySelect={onSubCategorySelect}
                  selectedSubCategory={selectedSubCategory}
                />
              </div>
            )}
          </div>
        )}

        {/* === Service Section === */}
        {((selectedCategory && selectedCategory.hasSubCategories === false) ||
          selectedSubCategory) && (
          <div className="mb-1">
            <button
              type="button"
              onClick={() => {
                setExpandedPanel(
                  expandedPanel === `service` ? null : `service`
                );
              }}
              className="w-full flex items-center justify-between py-2 px-1 cursor-pointer bg-transparent border-none text-left"
            >
              {!serviceData || expandedPanel === `service` ? (
                <span className="font-semibold tracking-tight">
                  Service wählen
                </span>
              ) : (
                <div className="flex items-start gap-2 w-full">
                  {isServiceCollapsed && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="var(--color-success)"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-bold tracking-tight">
                      {serviceData.name}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-[rgba(0,0,0,0.06)] px-2.5 py-0.5 rounded-full">
                        Dauer: <b>{formatTimeToString(serviceData?.durationTime)}</b>
                      </span>
                      {serviceData?.employees &&
                        serviceData?.employees?.length > 0 && (
                          <span className="text-xs bg-[rgba(0,0,0,0.06)] px-2.5 py-0.5 rounded-full">
                            Preis: <b>{formatPriceRange(serviceData.employees)}</b>
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              )}

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`flex-shrink-0 transition-transform duration-200 ${isServiceOpen ? `rotate-180` : ``}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isServiceOpen && (
              <div className="py-2">
                <ServicesList
                  services={getAvailableServices(
                    selectedCategory?.hasSubCategories === false
                      ? selectedCategory!.services
                      : selectedSubCategory!.services
                  )}
                  onServiceSelect={onServiceSelectInternal}
                  selectedServicesIds={selectedServicesIds}
                  selectedServiceId={serviceData?.id}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ServiceSelectionForm;
