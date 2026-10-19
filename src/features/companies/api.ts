import { env } from '@/config/env';
import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';
import { type FacilityResponse } from '@/types/common';

import {
  type AverageDoc,
  type CancelContractPayload,
  type CompanyDetail,
  type CompanyListItem,
  type CompanyListItemDto,
  type CompanyListResult,
  type CompanyPayload,
  type CompanySearchParams,
  type CompanySearchResultDto,
  type MonthlyAverage,
  type SaveAveragesPayload,
} from './types';

/** درخواست‌های Facility API: آدرس Gateway و احراز هویت با کوکی ورود (`token`) */
const facilityConfig = { baseURL: env.facilityApiBaseUrl, withCredentials: true };

const toListItem = (dto: CompanyListItemDto): CompanyListItem => ({
  id: String(dto.id),
  name: dto.name,
  nationalId: dto.nationalId,
  agreementNo: dto.agreementNumber,
  contractDate: dto.contractDate,
  planCount: dto.planCount,
  registeredBy: dto.registrar?.userName ?? '—',
  status: dto.status,
  branchCode: dto.branchCode,
});

/** فهرست شرکت‌ها (`Companies_Search`) */
export const getCompanies = async ({
  page,
  pageSize,
  status,
  branchCode,
  term,
}: CompanySearchParams): Promise<CompanyListResult> => {
  const { data } = await http.get<FacilityResponse<CompanySearchResultDto>>(
    ENDPOINTS.FACILITY.COMPANIES,
    {
      ...facilityConfig,
      params: {
        Page: page,
        PageSize: pageSize,
        Status: status,
        BranchCode: branchCode,
        Term: term,
      },
    },
  );
  return {
    items: data.page.items.map(toListItem),
    total: data.page.totalCount,
    page: data.page.page,
    pageSize: data.page.pageSize,
    activeCount: data.activeCount,
    registeredCount: data.registeredCount,
  };
};

export const getCompany = (id: string) => http.get<CompanyDetail>(ENDPOINTS.COMPANIES.DETAIL(id));

export const createCompany = (body: CompanyPayload) =>
  http.post<CompanyDetail, CompanyPayload>(ENDPOINTS.COMPANIES.LIST, body);

export const updateCompany = (id: string, body: CompanyPayload) =>
  http.put<CompanyDetail, CompanyPayload>(ENDPOINTS.COMPANIES.DETAIL(id), body);

/** حذف شرکت (اطلاعات برای گزارش‌گیری نزد سرور باقی می‌ماند) */
export const deleteCompany = (id: string) => http.delete<void>(ENDPOINTS.COMPANIES.DETAIL(id));

export const cancelContract = (id: string, body: CancelContractPayload) =>
  http.post<void, CancelContractPayload>(ENDPOINTS.COMPANIES.CANCEL(id), body);

/** میانگین‌های ماهانه سال جاری قرارداد (ثبت‌شده و ثبت‌نشده) */
export const getAverages = (companyId: string) =>
  http.get<MonthlyAverage[]>(ENDPOINTS.COMPANIES.AVERAGES(companyId));

export const saveAverages = (companyId: string, body: SaveAveragesPayload) =>
  http.post<MonthlyAverage[], SaveAveragesPayload>(ENDPOINTS.COMPANIES.AVERAGES(companyId), body);

export const getAverageDocs = (companyId: string) =>
  http.get<AverageDoc[]>(ENDPOINTS.COMPANIES.AVERAGE_DOCS(companyId));
