export interface Employee {
  readonly price: number;
  readonly name?: string;
}

export interface Service {
  readonly name: string;
  readonly durationTime?: string;
  readonly employees?: readonly Employee[];
}

export interface SubCategory {
  readonly subCategoryName: string;
  readonly services?: readonly Service[];
}

export interface Category {
  readonly categoryName: string;
  readonly hasSubCategories?: boolean;
  readonly subCategories?: readonly SubCategory[];
  readonly services?: readonly Service[];
}

const getServices = async (): Promise<readonly Category[]> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/public/services`,
      { next: { revalidate: 300 } }, // 5 minutes
    );
    const data: Category[] = await response.json();
    return data;
  } catch {
    return [];
  }
};

const servicesService = { getServices };

export default servicesService;
