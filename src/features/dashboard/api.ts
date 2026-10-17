import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';

import {
  type CompanyCredit,
  type CompanyRank,
  type ContractsByMonth,
  type DashboardSummary,
  type MonthlyPerformance,
  type MonthOption,
  type PlanShare,
  type RankingParams,
  type RemovedCompany,
  type RequestStatusCount,
} from './types';

export const getSummary = () => http.get<DashboardSummary>(ENDPOINTS.DASHBOARD.SUMMARY);

export const getRequestStatus = () =>
  http.get<RequestStatusCount[]>(ENDPOINTS.DASHBOARD.REQUEST_STATUS);

export const getPlanShare = () => http.get<PlanShare[]>(ENDPOINTS.DASHBOARD.PLAN_SHARE);

export const getCompanyCredit = () => http.get<CompanyCredit[]>(ENDPOINTS.DASHBOARD.COMPANY_CREDIT);

export const getRequestMonths = () => http.get<MonthOption[]>(ENDPOINTS.DASHBOARD.MONTHS);

export const getRanking = (params: RankingParams) =>
  http.get<CompanyRank[]>(ENDPOINTS.DASHBOARD.RANKING, { params });

export const getContractsByMonth = () =>
  http.get<ContractsByMonth[]>(ENDPOINTS.DASHBOARD.CONTRACTS_BY_MONTH);

export const getMonthlyPerformance = () =>
  http.get<MonthlyPerformance>(ENDPOINTS.DASHBOARD.MONTHLY_PERFORMANCE);

export const getRemovedCompanies = () =>
  http.get<RemovedCompany[]>(ENDPOINTS.DASHBOARD.REMOVED_COMPANIES);

/** خروجی‌های اکسل (فایل آماده از سرور دانلود می‌شود) */
export const REPORT_EXPORTS = [
  {
    key: 'companies',
    title: 'خروجی شرکت‌ها',
    path: ENDPOINTS.REPORTS.COMPANIES,
    fileName: 'شرکت‌ها.xlsx',
  },
  {
    key: 'staff',
    title: 'خروجی پرسنل همه شرکت‌ها',
    path: ENDPOINTS.REPORTS.STAFF,
    fileName: 'پرسنل.xlsx',
  },
  {
    key: 'requests',
    title: 'خروجی همه درخواست‌های وام',
    path: ENDPOINTS.REPORTS.LOAN_REQUESTS,
    fileName: 'درخواست‌های-وام.xlsx',
  },
  {
    key: 'averages',
    title: 'خروجی میانگین‌های ماهانه',
    path: ENDPOINTS.REPORTS.AVERAGES,
    fileName: 'میانگین‌های-ماهانه.xlsx',
  },
  {
    key: 'removed',
    title: 'خروجی شرکت‌های حذف‌شده',
    path: ENDPOINTS.REPORTS.REMOVED_COMPANIES,
    fileName: 'شرکت‌های-حذف‌شده.xlsx',
  },
] as const;

export const downloadReport = (path: string, fileName: string) => http.download(path, fileName);
