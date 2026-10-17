import { type LoanStatus } from '@/constant/loanStatus';

/** ردیف جدول تأیید اعتبارات */
export interface CreditApprovalItem {
  id: string;
  companyName: string;
  staffName: string;
  planTitle: string;
  amount: number;
  createdAt: string;
  decidedAt: string | null;
  note?: string;
  file?: { id: string; name: string };
  status: LoanStatus;
  /** مرحله پس از تأیید (فقط برای درخواست‌های تأییدشده) */
  postStageId?: string;
}

export interface CreditApprovalFilters {
  /** خالی = همه شرکت‌ها */
  companyId?: string;
}

export interface PostStagePayload {
  stageId: string | null;
  /** علت عدم اعطای تسهیلات غیرحضوری (برای مرحله‌ای که علت می‌خواهد) */
  noGrantReasonId?: string;
}
