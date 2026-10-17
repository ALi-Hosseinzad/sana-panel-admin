import { type StatusTone } from '@/component/status-chip';

export type LoanStatus =
  'pending_manager' | 'rejected_manager' | 'pending_credit' | 'approved' | 'rejected';

/** عنوان و رنگ هر وضعیت درخواست وام */
export const LOAN_STATUS: Record<LoanStatus, { title: string; tone: StatusTone }> = {
  pending_manager: { title: 'در انتظار تأیید مدیر شرکت', tone: 'warning' },
  rejected_manager: { title: 'رد شده توسط مدیر شرکت', tone: 'error' },
  pending_credit: { title: 'در انتظار', tone: 'warning' },
  approved: { title: 'تأیید شده', tone: 'success' },
  rejected: { title: 'رد شده', tone: 'error' },
};
