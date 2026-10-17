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
}

export interface CreditApprovalFilters {
  /** خالی = همه شرکت‌ها */
  companyId?: string;
}
