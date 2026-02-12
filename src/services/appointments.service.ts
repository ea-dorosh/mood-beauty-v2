interface AppointmentData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  orderMessage: string;
  consentPrivacy: boolean;
  consentMarketing: boolean;
  date: string;
  service: TimeSlot;
  employeeSelectionType: string | null;
  employeeSelectionIds: number[] | null;
}

interface TimeSlot {
  startTime: string;
  endTime?: string;
  serviceId?: number;
  employeeIds?: number[];
  [key: string]: unknown;
}

interface CreateAppointmentResponse {
  validationErrors?: Record<string, string>;
  errorMessage?: string;
  data?: AppointmentConfirmation;
}

interface AppointmentConfirmation {
  id?: string;
  firstName: string;
  lastName: string;
  date: string;
  service: {
    name: string;
    timeStart: string;
    secondService?: {
      name: string;
    };
  };
  company: {
    branches: Array<{
      name: string;
      email: string;
      phone: string;
      addressStreet: string;
      addressZip: string;
      addressCity: string;
    }>;
  };
}

interface AppointmentByTokenResponse {
  data: {
    id: number;
    serviceName: string;
    date: string;
    timeStart: string;
    status: number;
    location: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
    };
    employee: {
      firstName: string;
      lastName: string;
    };
    groupAppointments?: GroupAppointment[];
  };
}

interface GroupAppointment {
  id: number;
  serviceName: string;
  date: string;
  timeStart: string;
  status: number;
  employee: {
    firstName: string;
    lastName: string;
  };
}

interface CancelResponse {
  cancelledCount: number;
}

const createAppointment = async (appointment: AppointmentData): Promise<CreateAppointmentResponse> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/create`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ appointment }),
    });

    // Handle server errors (500, etc.)
    if (!response.ok && response.status >= 500) {
      throw new Error(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
    }

    const responseData: CreateAppointmentResponse = await response.json();

    return responseData;
  } catch (error) {
    // Network errors, timeouts, JSON parse errors, etc.
    if (error instanceof Error && error.message.includes(`Beim Erstellen`)) {
      throw error; // Re-throw our custom error
    }
    throw new Error(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
  }
};

const getAppointmentByToken = async (token: string): Promise<AppointmentByTokenResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/by-token/${token}`, {
    method: `GET`,
    headers: { "Content-Type": `application/json` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to fetch appointment`);
  }

  const responseData: AppointmentByTokenResponse = await response.json();

  return responseData;
};

const cancelAppointmentByToken = async (
  token: string,
  cancellationReasonText: string | null = null,
  appointmentIds: number[] | null = null,
): Promise<CancelResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/cancel-by-token`, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      token,
      cancellationReasonText,
      appointmentIds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to cancel appointment`);
  }

  const responseData: CancelResponse = await response.json();

  return responseData;
};

const appointmentsService = {
  createAppointment,
  getAppointmentByToken,
  cancelAppointmentByToken,
};

export default appointmentsService;

export type {
  AppointmentData,
  TimeSlot,
  CreateAppointmentResponse,
  AppointmentConfirmation,
  AppointmentByTokenResponse,
  GroupAppointment,
  CancelResponse,
};
