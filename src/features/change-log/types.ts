export type AuditLogType = 'company' | 'staff' | 'loan' | 'user' | 'base';

export interface AuditLog {
  id: string;
  /** زمان عملیات (ISO) */
  createdAt: string;
  /** نام و نام کاربری انجام‌دهنده */
  user: string;
  type: AuditLogType;
  typeTitle: string;
  details: string;
  /** این عملیات اطلاعات لازم برای بازگردانی را دارد */
  canRollback: boolean;
  rolledBack: boolean;
}

export interface AuditLogFilters {
  /** خالی = همه انواع عملیات */
  type?: AuditLogType;
}
