export type Nullable<T> = T | null;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** پوشش پاسخ‌های Facility API (`FacilityBaseMessageResponseOf...`) */
export interface FacilityResponse<T> {
  statusCode: number;
  message: string | null;
  data: T;
  isSuccess: boolean;
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

/** آیتم ساده برای لیست‌های کشویی */
export interface LookupItem {
  id: string;
  title: string;
}

/** فایل آپلودشده در سرور */
export interface UploadedFile {
  id: string;
  name: string;
}

export interface PageParams {
  page: number;
  pageSize: number;
}
