import dayjs from "dayjs";

interface ServicesWithEmployees {
  serviceId: number;
  employeeIds: number[];
}

interface EmployeeCombination {
  key: string;
  employeeIds: number[];
}

interface OtherService {
  serviceId: number;
  employeeIds: number[];
}

const fetchTimeSlots = async (date: dayjs.Dayjs, servicesWithEmployees: ServicesWithEmployees[]) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format(`YYYY-MM-DD`)}`;

  const response = await fetch(apiUrl, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(servicesWithEmployees),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { daysToHighlight: data };
};

/**
 * Fetch nearest available time slots for multiple employee combinations
 */
const fetchNearestSlots = async (
  serviceId: number,
  employeeCombinations: EmployeeCombination[],
  otherServices: OtherService[] = [],
) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar/nearest-slot`;

  const response = await fetch(apiUrl, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      serviceId,
      employeeCombinations,
      otherServices,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

const calendarService = {
  fetchTimeSlots,
  fetchNearestSlots,
};

export default calendarService;
