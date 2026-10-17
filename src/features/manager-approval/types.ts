import { type LoanStatus } from '@/constant/loanStatus';

/** درخواست در انتظار تأیید مدیر شرکت */
export interface PendingRequest {
  id: string;
  staffName: string;
  planTitle: string;
  amount: number;
  createdAt: string;
  note?: string;
  status: LoanStatus;
}

export type DecisionType = 'approve' | 'reject';

/** بدنه تأیید/رد (تکی یا گروهی) */
export interface DecisionPayload {
  requestIds: string[];
  note?: string;
  fileId?: string | null;
  /** دلیل رد (فقط در مرحله تأیید اعتبارات) */
  reasonId?: string;
  /** مرحله پس از تأیید (فقط در تأیید اعتبارات) */
  stageId?: string;
  /** علت عدم اعطای تسهیلات غیرحضوری (برای مرحله‌ای که علت می‌خواهد) */
  noGrantReasonId?: string;
}

export interface DecisionFormValues {
  note?: string;
  file?: File | null;
  reasonId?: string;
  stageId?: string;
  noGrantReasonId?: string;
}

/** حداقل اطلاعات درخواست برای نمایش در مودال تصمیم */
export interface DecisionRequestInfo {
  id: string;
  staffName: string;
  planTitle: string;
  amount: number;
}
