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
];
