import { type LoanStatus } from '@/constant/loanStatus';

export interface MockLoanRequest {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  planId: string;
  planTitle: string;
  amount: number;
  paymentOrder: number;
  createdAt: string;
  decidedAt: string | null;
  status: LoanStatus;
  note?: string;
  file?: { id: string; name: string };
  rejectReason?: string;
  /** مرحله پس از تأیید (فقط برای درخواست‌های تأییدشده) */
  postStageId?: string;
}

export const MOCK_LOAN_REQUESTS: MockLoanRequest[] = [
  {
    id: 'lr-1',
    companyId: 'c-1',
    staffId: 's-1',
    staffName: 'علی محمدی',
    planId: 'qarz-0',
    planTitle: 'قرض‌الحسنه - ۴٪ - ۱۲ ماه',
    amount: 50_000_000,
    paymentOrder: 1,
    createdAt: '2025-08-03',
    decidedAt: '2025-08-10',
    status: 'approved',
    postStageId: 'ps-1',
  },
  {
    id: 'lr-2',
    companyId: 'c-1',
    staffId: 's-2',
    staffName: 'زهرا احمدی',
    planId: 'mur-1-1',
    planTitle: 'مرابحه - ۱۰٪ - ۲۴ ماه',
    amount: 80_000_000,
    paymentOrder: 2,
    createdAt: '2025-08-03',
    decidedAt: null,
    status: 'pending_manager',
  },
  {
    id: 'lr-3',
    companyId: 'c-1',
    staffId: 's-3',
    staffName: 'محمد رضایی',
    planId: 'qarz-0',
    planTitle: 'قرض‌الحسنه - ۴٪ - ۱۲ ماه',
    amount: 30_000_000,
    paymentOrder: 3,
    createdAt: '2025-08-03',
    decidedAt: null,
    status: 'pending_manager',
  },
  {
    id: 'lr-4',
    companyId: 'c-2',
    staffId: 's-4',
    staffName: 'مریم کریمی',
    planId: 'qarz-1',
    planTitle: 'قرض‌الحسنه - ۴٪ - ۲۴ ماه',
    amount: 40_000_000,
    paymentOrder: 1,
    createdAt: '2025-08-21',
    decidedAt: '2025-08-23',
    status: 'pending_credit',
    note: 'تأیید مدیر شرکت',
  },
];
