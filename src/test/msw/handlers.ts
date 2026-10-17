import { delay, http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import { ENDPOINTS } from '@/constant/endpoints';
import { MOCK_USERS } from '@/constant/mock';

const api = (path: string) => `${env.apiBaseUrl}${path}`;

const findUserByToken = (authorization: string | null) => {
  const token = authorization?.replace('Bearer ', '');
  return MOCK_USERS.find((user) => user.token === token);
};

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
];
