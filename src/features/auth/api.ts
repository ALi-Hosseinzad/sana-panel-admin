import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';
import { type UserProfile } from '@/types/common';

import { type LoginRequest, type LoginResponse } from './types';

export const login = (body: LoginRequest) =>
  http.post<LoginResponse, LoginRequest>(ENDPOINTS.AUTH.LOGIN, body, {
    // خطای ۴۰۱ در صفحه لاگین یعنی نام کاربری/رمز اشتباه — رفتار پیش‌فرض (خروج) اجرا نشود
    onError: { 401: () => undefined },
  });

export const getProfile = () => http.get<UserProfile>(ENDPOINTS.AUTH.PROFILE);
