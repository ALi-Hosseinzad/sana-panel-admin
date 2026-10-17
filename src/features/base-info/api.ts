import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';
import { type PageParams, type PaginatedResponse } from '@/types/common';

import { type Scheme, type SchemeListItem, type SchemePayload } from './types';

export const getSchemes = (params: PageParams) =>
  http.get<PaginatedResponse<SchemeListItem>>(ENDPOINTS.BASE_INFO.SCHEMES, { params });

export const getScheme = (id: string) => http.get<Scheme>(ENDPOINTS.BASE_INFO.SCHEME(id));

export const createScheme = (body: SchemePayload) =>
  http.post<Scheme, SchemePayload>(ENDPOINTS.BASE_INFO.SCHEMES, body);

export const updateScheme = (id: string, body: SchemePayload) =>
  http.put<Scheme, SchemePayload>(ENDPOINTS.BASE_INFO.SCHEME(id), body);

/** حذف آخرین طرح مجاز نیست (۴۲۲) */
export const deleteScheme = (id: string) => http.delete<void>(ENDPOINTS.BASE_INFO.SCHEME(id));
