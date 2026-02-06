/**
 * Formats time to a more readable format without seconds.
 * @param parsedTime - The time in 'HH:MM:SS' or "2025-04-02 12:30:00" format.
 * @returns The formatted time in 'HH:MM' format or 'Fehler' if falsy.
 */
export const formattedTime = (parsedTime: string): string => {
  if (!parsedTime) return `Fehler`;

  const timeString = parsedTime.includes(` `)
    ? parsedTime.split(` `)[1]
    : parsedTime;

  const [hours, minutes] = timeString.split(`:`);

  return `${hours}:${minutes}`;
};

/**
 * Formats a time string into a more readable format with hours and minutes.
 * @param timeStr - The time string in 'HH:MM:SS' format.
 * @returns The formatted time string, e.g., '1 Std. 15 Min.'
 */
export const formatTimeToString = (timeStr: string): string => {
  const [hours, minutes, seconds] = timeStr.split(`:`).map(Number);

  let result = ``;

  if (hours > 0) {
    result += `${hours} Std.`;
  }

  if (minutes > 0) {
    if (result) result += ` `;
    result += `${minutes} Min.`;
  }

  if (!result && seconds > 0) {
    result = `${seconds} Sek.`;
  }

  return result;
};

/**
 * Formats a price to the Euro currency format.
 * @param price - The price amount to format.
 * @returns The formatted price in Euro, e.g., '1.000 €'.
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat(`de-DE`, {
    style: `currency`,
    currency: `EUR`,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formats a price range from employees array.
 * @param employees - Array of employees with price property.
 * @returns The formatted price range, e.g., '40€' or '40€ - 50€'.
 */
export const formatPriceRange = (
  employees: readonly { price?: number }[],
): string => {
  if (!employees || employees.length === 0) {
    return `0€`;
  }

  const prices = employees
    .map((employee) => employee.price || 0)
    .filter((price) => price > 0);

  if (prices.length === 0) {
    return `0€`;
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `${minPrice}€`;
  }

  return `${minPrice}€ - ${maxPrice}€`;
};

/**
 * Formats an ISO date string to a more readable format.
 * @param dateString - The date in 'YYYY-MM-DD' format.
 * @returns The formatted date, e.g., '01. Jan 21'.
 */
export const formatIsoDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: `short`,
    year: `2-digit`,
    day: `2-digit`,
  };
  const formattedDate = date.toLocaleDateString(`en-GB`, options);
  const [day, month, year] = formattedDate.split(` `);

  return `${day}. ${month} ${year}`;
};
