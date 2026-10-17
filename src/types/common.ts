export type Nullable<T> = T | null;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  branch?: string;
  roles: string[];
}
