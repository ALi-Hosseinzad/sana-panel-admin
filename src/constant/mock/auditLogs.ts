import { type AuditLogType } from '@/features/change-log/types';

export type SnapshotEntity = 'company' | 'staff' | 'user' | 'scheme';

export interface MockAuditLog {
  id: string;
  createdAt: string;
  user: string;
  type: AuditLogType;
  details: string;
  /** وضعیت قبل از ویرایش برای بازگردانی */
  snapshot?: { entity: SnapshotEntity; id: string; before: object };
  rolledBack: boolean;
}

export const AUDIT_LOG_TYPES: { id: AuditLogType; title: string }[] = [
  { id: 'company', title: 'مربوط به شرکت‌ها' },
  { id: 'staff', title: 'مربوط به پرسنل' },
  { id: 'loan', title: 'مربوط به تخصیص وام' },
  { id: 'user', title: 'مربوط به کاربران' },
  { id: 'base', title: 'مربوط به اطلاعات پایه' },
];

export const MOCK_AUDIT_LOGS: MockAuditLog[] = [
  {
    id: 'log-3',
    createdAt: '2025-08-21T10:12:00',
    user: 'مدیر سامانه (admin)',
    type: 'loan',
    details:
      'تأیید توسط مدیر شرکت درخواست وام مریم کریمی — ۴۰,۰۰۰,۰۰۰ ریال — شرکت: شرکت صنایع غذایی آوا',
    rolledBack: false,
  },
  {
    id: 'log-2',
    createdAt: '2025-08-03T09:40:00',
    user: 'کاربر شعبه (branch)',
    type: 'loan',
    details: 'ثبت درخواست وام برای ۳ نفر — شرکت: شرکت فناوران پارس',
    rolledBack: false,
  },
  {
    id: 'log-1',
    createdAt: '2025-05-31T11:05:00',
    user: 'مدیر سامانه (admin)',
    type: 'company',
    details: 'ثبت شرکت جدید: شرکت فناوران پارس',
    rolledBack: false,
  },
];
