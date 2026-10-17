import { delay, http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import { ENDPOINTS } from '@/constant/endpoints';
import { MOCK_BASE_INFO, MOCK_USERS } from '@/constant/mock';
import { type BaseInfo } from '@/features/base-info/types';

const api = (path: string) => `${env.apiBaseUrl}${path}`;

const findUserByToken = (authorization: string | null) => {
  const token = authorization?.replace('Bearer ', '');
  return MOCK_USERS.find((user) => user.token === token);
};

// نسخه قابل تغییر در حافظه (با رفرش صفحه به مقدار اولیه برمی‌گردد)
let baseInfo: BaseInfo = structuredClone(MOCK_BASE_INFO);

export const handlers = [
  http.post(api(ENDPOINTS.AUTH.LOGIN), async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { username?: string; password?: string };
    const user = MOCK_USERS.find(
      (item) => item.username === body.username && item.password === body.password,
    );
    if (!user) {
      return HttpResponse.json({ message: 'نام کاربری یا رمز عبور اشتباه است.' }, { status: 401 });
    }
    return HttpResponse.json({ token: user.token, profile: user.profile });
  }),

  http.get(api(ENDPOINTS.AUTH.PROFILE), async ({ request }) => {
    await delay(200);
    const user = findUserByToken(request.headers.get('Authorization'));
    if (!user) return HttpResponse.json({ message: 'unauthorized' }, { status: 401 });
    return HttpResponse.json(user.profile);
  }),

  http.get(api(ENDPOINTS.BASE_INFO), async () => {
    await delay(300);
    return HttpResponse.json(baseInfo);
  }),

  http.put(api(ENDPOINTS.BASE_INFO), async ({ request }) => {
    await delay(300);
    baseInfo = (await request.json()) as BaseInfo;
    return HttpResponse.json(baseInfo);
  }),
];
