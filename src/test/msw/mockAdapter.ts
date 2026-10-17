import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getResponse } from 'msw';

import { httpClient } from '@/services/http/client';

import { handlers } from './handlers';

/**
 * ماک بدون Service Worker: درخواست‌های axios مستقیماً با handlerهای MSW پاسخ داده می‌شوند.
 * روی http، https و هر دامنه‌ای کار می‌کند (در build دیپلوی هم فعال است).
 * درخواستی که handler نداشته باشد به سرور واقعی ارسال می‌شود.
 */
const realAdapter = axios.getAdapter(['xhr', 'fetch']);

const toRequest = (config: InternalAxiosRequestConfig) => {
  const method = (config.method ?? 'get').toUpperCase();
  const headers = new Headers();
  const source = AxiosHeaders.from(config.headers).toJSON() as Record<string, unknown>;
  Object.entries(source).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    headers.set(key, String(value as string));
  });
  const hasBody = !['GET', 'HEAD'].includes(method) && config.data !== undefined;
  return new Request(axios.getUri(config), {
    method,
    headers,
    body: hasBody ? (config.data as BodyInit) : undefined,
  });
};

const readBody = async (response: Response, config: InternalAxiosRequestConfig) => {
  if (config.responseType === 'blob') return response.blob();
  if (config.responseType === 'arraybuffer') return response.arrayBuffer();
  // متن خام برگردانده می‌شود تا transformResponse خود axios آن را JSON کند
  return response.text();
};

const mockAdapter: AxiosAdapter = async (config) => {
  const request = toRequest(config);
  const mocked = await getResponse(handlers, request);
  if (!mocked) return realAdapter(config);

  const response: AxiosResponse = {
    data: await readBody(mocked, config),
    status: mocked.status,
    statusText: mocked.statusText,
    headers: Object.fromEntries(mocked.headers.entries()),
    config,
    request,
  };

  const validateStatus =
    config.validateStatus ?? ((status: number) => status >= 200 && status < 300);
  if (validateStatus(response.status)) return response;

  const code = response.status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST;
  throw new AxiosError(
    `Request failed with status code ${response.status}`,
    code,
    config,
    request,
    response,
  );
};

export const enableMockAdapter = () => {
  httpClient.defaults.adapter = mockAdapter;
};
