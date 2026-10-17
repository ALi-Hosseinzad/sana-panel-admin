import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';

import { type GeneralSettings, type UsableMatrix } from './types';

export const getGeneralSettings = () => http.get<GeneralSettings>(ENDPOINTS.BASE_INFO.GENERAL);

export const updateGeneralSettings = (body: GeneralSettings) =>
  http.put<GeneralSettings, GeneralSettings>(ENDPOINTS.BASE_INFO.GENERAL, body);

export const getMurabahaRates = () => http.get<number[]>(ENDPOINTS.BASE_INFO.MURABAHA_RATES);

export const updateMurabahaRates = (body: number[]) =>
  http.put<number[], number[]>(ENDPOINTS.BASE_INFO.MURABAHA_RATES, body);

export const getTerms = () => http.get<number[]>(ENDPOINTS.BASE_INFO.TERMS);

export const updateTerms = (body: number[]) =>
  http.put<number[], number[]>(ENDPOINTS.BASE_INFO.TERMS, body);

export const getUsableMatrix = () => http.get<UsableMatrix>(ENDPOINTS.BASE_INFO.USABLE_MATRIX);

/** فقط مقادیر جدول ارسال می‌شود؛ ردیف/ستون‌ها از نرخ‌ها و مدت‌ها ساخته می‌شوند */
export const updateUsableMatrix = (values: number[][]) =>
  http.put<UsableMatrix, { values: number[][] }>(ENDPOINTS.BASE_INFO.USABLE_MATRIX, { values });
