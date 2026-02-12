// ==================== Service & Category Types ====================

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  price: number;
}

export interface Service {
  id: number;
  name: string;
  durationTime: string;
  bookingNote?: string;
  serviceImage?: string;
  categoryId: number;
  subCategoryId?: number;
  employees: Employee[];
  price?: number;
  category?: string;
}

export interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  services: Service[];
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage?: string;
  hasSubCategories: boolean;
  subCategories: SubCategory[];
  services: Service[];
}

// ==================== Form State Types ====================

export interface FormState {
  firstService: Service | null;
  secondService: Service | null;
  hasSecondService: boolean;
}

export interface ServiceEmployees {
  [serviceId: number]: string[];
}

// ==================== Calendar Types ====================

export interface TimeSlot {
  startTime: string;
  endTime: string;
  disabled: boolean;
  employeeId?: number[];
  serviceId?: number;
  employeeIds?: number[];
  [key: string]: unknown;
}

export interface CalendarDay {
  day: string;
  availableTimeslots: TimeSlot[];
}

// ==================== Appointment Types ====================

export interface AppointmentConfirmation {
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

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  orderMessage: string;
  consentPrivacy: boolean;
  consentMarketing: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

// ==================== Employee Selection Types ====================

export interface EmployeeSelectionInfo {
  type: string | null;
  selectedIds: number[] | null;
}

// ==================== Country Code Types ====================

export interface CountryData {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
}
