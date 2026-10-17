import { ENDPOINTS } from '@/constant/endpoints';
import { http, type RequestConfig } from '@/services/http';
import { type PageParams, type PaginatedResponse } from '@/types/common';

import {
  type CreateLoanRequestPayload,
  type CreditEligibility,
  type CreditSummary,
  type LoanRequest,
} from './types';

export const getEligibility = (companyId: string, date: string) =>
  http.get<CreditEligibility>(ENDPOINTS.CREDIT.ELIGIBILITY(companyId), { params: { date } });

export const getCreditSummary = (companyId: string, date: string) =>
  http.get<CreditSummary>(ENDPOINTS.CREDIT.SUMMARY(companyId), { params: { date } });

export const getLoanRequests = (companyId: string, params: PageParams) =>
  http.get<PaginatedResponse<LoanRequest>>(ENDPOINTS.CREDIT.LOAN_REQUESTS(companyId), { params });

/** ثبت درخواست وام؛ در صورت تخصیص تکراری در همین ماه سرور ۴۰۹ برمی‌گرداند */
export const createLoanRequests = (
  companyId: string,
  body: CreateLoanRequestPayload,
  config?: RequestConfig,
) =>
  http.post<{ created: number }, CreateLoanRequestPayload>(
    ENDPOINTS.CREDIT.LOAN_REQUESTS(companyId),
    body,
    config,
  );
