export const ROLES = {
  ADMIN: 'ADMIN',
  BRANCH: 'BRANCH',
  COMPANY_MANAGER: 'COMPANY_MANAGER',
  CREDIT_APPROVER: 'CREDIT_APPROVER',
  REPORT_VIEWER: 'REPORT_VIEWER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
