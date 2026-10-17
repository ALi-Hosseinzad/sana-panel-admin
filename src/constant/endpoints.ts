/** همه آدرس‌های API — سمت بک‌اند فعلاً با ماک (MSW) پاسخ داده می‌شوند */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  BASE_INFO: {
    GENERAL: '/base-info/general',
    MURABAHA_RATES: '/base-info/murabaha-rates',
    TERMS: '/base-info/terms',
    USABLE_MATRIX: '/base-info/usable-matrix',
  },
  FILES: {
    UPLOAD: '/files',
  },
  LOOKUPS: {
    CANCEL_REASONS: '/lookups/cancel-reasons',
    REJECT_REASONS: '/lookups/reject-reasons',
    NO_GRANT_REASONS: '/lookups/no-grant-reasons',
    AVG_DOC_TYPES: '/lookups/avg-doc-types',
    PLANS: '/lookups/plans',
    COMPANIES: '/lookups/companies',
    /** آدرس یک آیتم از لیست (برای ویرایش/حذف) */
    ITEM: (listPath: string, id: string) => `${listPath}/${id}`,
  },
  COMPANIES: {
    LIST: '/companies',
    DETAIL: (id: string) => `/companies/${id}`,
    CANCEL: (id: string) => `/companies/${id}/cancel`,
    AVERAGES: (id: string) => `/companies/${id}/averages`,
    AVERAGE_DOCS: (id: string) => `/companies/${id}/average-docs`,
  },
  STAFF: {
    LIST: (companyId: string) => `/companies/${companyId}/staff`,
    DETAIL: (companyId: string, id: string) => `/companies/${companyId}/staff/${id}`,
    /** بارگذاری گروهی پرسنل از فایل اکسل */
    IMPORT: (companyId: string) => `/companies/${companyId}/staff/import`,
    /** فایل نمونه اکسل پرسنل */
    SAMPLE_FILE: '/staff/sample-file',
  },
} as const;
