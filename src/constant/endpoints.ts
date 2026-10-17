/** همه آدرس‌های API — سمت بک‌اند فعلاً با ماک (MSW) پاسخ داده می‌شوند */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  BASE_INFO: '/base-info',
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
  },
  COMPANIES: {
    LIST: '/companies',
    DETAIL: (id: string) => `/companies/${id}`,
    CANCEL: (id: string) => `/companies/${id}/cancel`,
    AVERAGES: (id: string) => `/companies/${id}/averages`,
    AVERAGE_DOCS: (id: string) => `/companies/${id}/average-docs`,
  },
} as const;
