import type { Service, Category, ServiceEmployees } from "@/types/booking";

interface SelectedServicesSummaryProps {
  services: Service[];
  categories: Category[];
  serviceEmployees?: ServiceEmployees | null;
  showEmployees?: boolean;
}

/**
 * Gets employee info for display in summary
 */
const getEmployeeInfo = (
  service: Service,
  selectedEmployeeIds: string[] | undefined,
  showEmployees: boolean,
): { name: string; price: string | null } | null => {
  // If service has only 1 employee, always show that employee with price
  if (service.employees?.length === 1) {
    const employee = service.employees[0];
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      price: employee.price ? `${employee.price}\u20AC` : null,
    };
  }

  // If employee selection wasn't shown, don't display employee info
  if (!showEmployees) {
    return null;
  }

  if (!selectedEmployeeIds || selectedEmployeeIds.length === 0) {
    return null;
  }

  if (selectedEmployeeIds.includes(`all`)) {
    // Calculate price range for "all"
    const prices = service.employees?.map((employee) => employee.price || 0) || [];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceStr = minPrice === maxPrice
      ? `${minPrice}\u20AC`
      : `${minPrice}\u20AC - ${maxPrice}\u20AC`;

    return {
      name: `Alle Mitarbeiter`,
      price: priceStr,
    };
  }

  const selectedEmployees = selectedEmployeeIds
    .map((employeeId) => {
      return service.employees?.find(
        (employee) => employee.id.toString() === employeeId.toString()
      );
    })
    .filter(Boolean);

  if (selectedEmployees.length === 0) {
    return null;
  }

  if (selectedEmployees.length === 1) {
    const employee = selectedEmployees[0]!;
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      price: employee.price ? `${employee.price}\u20AC` : null,
    };
  }

  // Multiple employees selected
  const names = selectedEmployees
    .map((employee) => `${employee!.firstName} ${employee!.lastName}`)
    .join(`, `);
  const prices = selectedEmployees.map((employee) => employee!.price || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceStr = minPrice === maxPrice
    ? `${minPrice}\u20AC`
    : `${minPrice}\u20AC - ${maxPrice}\u20AC`;

  return {
    name: names,
    price: priceStr,
  };
};

export default function SelectedServicesSummary({
  services,
  categories,
  serviceEmployees = null,
  showEmployees = false,
}: SelectedServicesSummaryProps) {
  if (!services || services.length === 0) {
    return null;
  }

  // Group services by category using categoryId to find categoryName
  const groupedByCategory = services.reduce<Record<string, Service[]>>((accumulator, service) => {
    const category = categories.find(
      (cat) => cat.categoryId === service.categoryId
    );
    const categoryName = category?.categoryName || `Sonstiges`;
    if (!accumulator[categoryName]) {
      accumulator[categoryName] = [];
    }
    accumulator[categoryName].push(service);
    return accumulator;
  }, {});

  const categoryNames = Object.keys(groupedByCategory);
  const isSingleCategory = categoryNames.length === 1;

  return (
    <div className="w-full p-3 bg-[rgba(0,171,85,0.06)] rounded-lg border border-[rgba(0,171,85,0.15)]">
      <span className="text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] font-semibold uppercase tracking-widest text-xs block mb-2">
        Ausgewählte Services
      </span>

      {categoryNames.map((categoryName, categoryIndex) => (
        <div
          key={categoryName}
          className={categoryIndex < categoryNames.length - 1 ? `mb-2` : ``}
        >
          {!isSingleCategory && (
            <span className="text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] italic text-[0.85rem] block mb-0.5">
              {categoryName}
            </span>
          )}
          {groupedByCategory[categoryName].map((service) => {
            const employeeInfo = getEmployeeInfo(
              service,
              serviceEmployees?.[service.id],
              showEmployees
            );

            return (
              <div
                key={service.id}
                className="flex flex-col gap-0.5 py-1"
              >
                <span className="font-semibold text-base">
                  {service.name}
                </span>
                {employeeInfo && (
                  <span className="text-[0.9rem] text-[color-mix(in_srgb,var(--color-black)_60%,transparent)] font-medium pl-2">
                    {`\u2192 ${employeeInfo.name}`}
                    {employeeInfo.price && ` (${employeeInfo.price})`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
