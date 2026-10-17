import { ENDPOINTS } from '@/constant/endpoints';
import { type LookupItem } from '@/types/common';

import { http } from '../http';

import { type PlanOptionsResponse } from './types';

export const getCancelReasons = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.CANCEL_REASONS);

export const getRejectReasons = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.REJECT_REASONS);

export const getNoGrantReasons = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.NO_GRANT_REASONS);

export const getAvgDocTypes = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.AVG_DOC_TYPES);

/** طرح‌های قابل انتخاب در قرارداد شرکت */
export const getPlanOptions = () => http.get<PlanOptionsResponse>(ENDPOINTS.LOOKUPS.PLANS);

/** شرکت‌های فعال (برای سلکت انتخاب شرکت) */
export const getCompanyOptions = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.COMPANIES);
