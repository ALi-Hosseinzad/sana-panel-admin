import axios from 'axios';

import { env } from '@/config/env';
import { useAuthStore } from '@/store/useAuthStore';

import { handleHttpError } from './errorHandler';
import { type HttpError } from './types';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: HttpError) => {
    handleHttpError(error);
    return Promise.reject(error);
  },
);
