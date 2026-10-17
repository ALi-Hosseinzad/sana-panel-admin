import { type LookupItem } from '@/types/common';

export interface DashboardSummary {
  activeCompanies: number;
  totalRequests: number;
  approvedAmount: number;
  pendingAmount: number;
}

export type RequestStatusKey = 'approved' | 'pending' | 'rejected';

export interface RequestStatusCount {
  key: RequestStatusKey;
  title: string;
  count: number;
}

export interface PlanShare {
  planTitle: string;
  count: number;
}

export interface CompanyCredit {
  companyName: string;
  /** اعتبار ایجادشده (تجمعی) */
  created: number;
  /** اعتبار تخصیص‌یافته */
  disbursed: number;
}

export type RankingSort = 'avg' | 'loan' | 'count' | 'staff';

export interface RankingParams {
  /** ماه شمسی (مثل 1404/05)؛ خالی = همه ماه‌ها (تجمعی) */
  month?: string;
  sortBy: RankingSort;
}

export interface CompanyRank {
  rank: number;
  companyName: string;
  totalAverage: number;
  disbursed: number;
  requestCount: number;
  staffCount: number;
  status: 'active' | 'cancelled';
  statusTitle: string;
}

export interface ContractsByMonth {
  month: string;
  count: number;
  companies: string[];
}

export interface MonthlyPerformance {
  months: string[];
  rows: { companyName: string; amounts: Record<string, number> }[];
}

export interface RemovedCompany {
  companyName: string;
  reason: 'deleted' | 'cancelled';
  removedAt: string | null;
  totalAverage: number;
  disbursed: number;
  requestCount: number;
  /** درصد تأیید درخواست‌ها؛ null یعنی درخواستی نداشته */
  approvalRate: number | null;
}

export type MonthOption = LookupItem;
