import { type AxiosProgressEvent, type AxiosRequestConfig } from 'axios';
import { saveAs } from 'file-saver';

import { httpClient } from './client';

export type RequestConfig = AxiosRequestConfig;

const toFormData = (payload: FormData | Record<string, unknown>) => {
  if (payload instanceof FormData) return payload;
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) value.forEach((item) => formData.append(key, item as Blob | string));
    else formData.append(key, value instanceof Blob ? value : String(value as string | number));
  });
  return formData;
};

const fileNameFromHeader = (header?: string) => {
  const match = header ? /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(header) : null;
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
};

/** توابع پایه درخواست؛ خروجی مستقیماً `data` پاسخ است */
export const http = {
  get: <T>(url: string, config?: RequestConfig) =>
    httpClient.get<T>(url, config).then((res) => res.data),

  post: <T, B = unknown>(url: string, body?: B, config?: RequestConfig) =>
    httpClient.post<T>(url, body, config).then((res) => res.data),

  put: <T, B = unknown>(url: string, body?: B, config?: RequestConfig) =>
    httpClient.put<T>(url, body, config).then((res) => res.data),

  patch: <T, B = unknown>(url: string, body?: B, config?: RequestConfig) =>
    httpClient.patch<T>(url, body, config).then((res) => res.data),

  delete: <T>(url: string, config?: RequestConfig) =>
    httpClient.delete<T>(url, config).then((res) => res.data),

  /** ارسال فایل به‌صورت multipart */
  upload: <T>(
    url: string,
    payload: FormData | Record<string, unknown>,
    config?: RequestConfig & { onProgress?: (percent: number) => void },
  ) => {
    const { onProgress, ...rest } = config ?? {};
    return httpClient
      .post<T>(url, toFormData(payload), {
        ...rest,
        headers: { ...rest.headers, 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (onProgress && event.total) onProgress(Math.round((event.loaded * 100) / event.total));
        },
      })
      .then((res) => res.data);
  },

  /** دریافت فایل و ذخیره آن */
  download: async (url: string, fileName?: string, config?: RequestConfig) => {
    const res = await httpClient.get<Blob>(url, { ...config, responseType: 'blob' });
    const name =
      fileName ?? fileNameFromHeader(res.headers['content-disposition'] as string) ?? 'file';
    saveAs(res.data, name);
  },
};
