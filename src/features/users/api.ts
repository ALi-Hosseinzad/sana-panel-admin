import { ENDPOINTS } from '@/constant/endpoints';
import { http, type RequestConfig } from '@/services/http';
import { type PageParams, type PaginatedResponse } from '@/types/common';

import { type User, type UserPayload } from './types';

export const getUsers = (params: PageParams) =>
  http.get<PaginatedResponse<User>>(ENDPOINTS.USERS.LIST, { params });

export const getUser = (id: string) => http.get<User>(ENDPOINTS.USERS.DETAIL(id));

/** نام کاربری تکراری → ۴۰۹ */
export const createUser = (body: UserPayload, config?: RequestConfig) =>
  http.post<User, UserPayload>(ENDPOINTS.USERS.LIST, body, config);

export const updateUser = (id: string, body: UserPayload, config?: RequestConfig) =>
  http.put<User, UserPayload>(ENDPOINTS.USERS.DETAIL(id), body, config);

/** حذف آخرین کاربر سامانه مجاز نیست (۴۲۲) */
export const deleteUser = (id: string) => http.delete<void>(ENDPOINTS.USERS.DETAIL(id));
