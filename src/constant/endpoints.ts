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
    /** مراحل پس از تأیید اعتبارات */
    POST_APPROVAL_STAGES: '/lookups/post-approval-stages',
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
  CREDIT: {
    /** وضعیت مجاز بودن شرکت برای تخصیص وام در تاریخ مبنا */
    ELIGIBILITY: (companyId: string) => `/companies/${companyId}/credit/eligibility`,
    /** مانده اعتبار ماه: میانگین‌ها و اعتبار هر طرح */
    SUMMARY: (companyId: string) => `/companies/${companyId}/credit/summary`,
    /** درخواست‌های وام شرکت (لیست / ثبت) */
    LOAN_REQUESTS: (companyId: string) => `/companies/${companyId}/loan-requests`,
  },
  MANAGER_APPROVALS: {
    /** درخواست‌های در انتظار تأیید مدیر شرکت */
    LIST: (companyId: string) => `/companies/${companyId}/manager-approvals`,
    APPROVE: (companyId: string) => `/companies/${companyId}/manager-approvals/approve`,
    REJECT: (companyId: string) => `/companies/${companyId}/manager-approvals/reject`,
  },
  CREDIT_APPROVALS: {
    /** درخواست‌های مرحله تأیید اعتبارات (همه شرکت‌ها یا یک شرکت) */
    LIST: '/credit-approvals',
    APPROVE: '/credit-approvals/approve',
    REJECT: '/credit-approvals/reject',
    POST_STAGE: (id: string) => `/credit-approvals/${id}/post-stage`,
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
