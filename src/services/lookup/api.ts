import { ENDPOINTS } from '@/constant/endpoints';
import { type LookupItem } from '@/types/common';

import { http } from '../http';

import { type PlanOptionsResponse } from './types';

export interface LookupBody {
  title: string;
}

/** سرویس‌های یک لیست ساده (دلایل، انواع مستند و...): لیست، افزودن، ویرایش، حذف */
const createLookupApi = (path: string) => ({
  list: () => http.get<LookupItem[]>(path),
  create: (body: LookupBody) => http.post<LookupItem, LookupBody>(path, body),
  update: (id: string, body: LookupBody) =>
    http.put<LookupItem, LookupBody>(ENDPOINTS.LOOKUPS.ITEM(path, id), body),
  remove: (id: string) => http.delete<void>(ENDPOINTS.LOOKUPS.ITEM(path, id)),
});

export type LookupApi = ReturnType<typeof createLookupApi>;

export const cancelReasonsApi = createLookupApi(ENDPOINTS.LOOKUPS.CANCEL_REASONS);
export const rejectReasonsApi = createLookupApi(ENDPOINTS.LOOKUPS.REJECT_REASONS);
export const noGrantReasonsApi = createLookupApi(ENDPOINTS.LOOKUPS.NO_GRANT_REASONS);
export const avgDocTypesApi = createLookupApi(ENDPOINTS.LOOKUPS.AVG_DOC_TYPES);

export const getCancelReasons = cancelReasonsApi.list;
export const getRejectReasons = rejectReasonsApi.list;
export const getNoGrantReasons = noGrantReasonsApi.list;
export const getAvgDocTypes = avgDocTypesApi.list;

/** طرح‌های قابل انتخاب در قرارداد شرکت */
export const getPlanOptions = () => http.get<PlanOptionsResponse>(ENDPOINTS.LOOKUPS.PLANS);

/** شرکت‌های فعال (برای سلکت انتخاب شرکت) */
export const getCompanyOptions = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.COMPANIES);
