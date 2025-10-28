export interface Category {
  id: string;
  name: string;
  description: string;
  terms: Term[];
}

export interface Term {
  id: string;
  name: string;
  description: string;
}

export interface Framework {
  id?: string;
  name: string;
  description: string;
  code: string;
  status: 'Active' | 'Draft' | 'Retired';
  type: string;
  categories: Category[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export type FrameworkFormData = Omit<Framework, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>;

export interface FrameworkFilters {
  search: string;
  status: string;
  type: string;
}