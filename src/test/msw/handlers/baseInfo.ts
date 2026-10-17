import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type BaseInfo } from '@/features/base-info/types';

import { db } from '../db';
import { api } from '../utils';

export const baseInfoHandlers = [
  http.get(api(ENDPOINTS.BASE_INFO), async () => {
    await delay(300);
    return HttpResponse.json(db.baseInfo);
  }),

  http.put(api(ENDPOINTS.BASE_INFO), async ({ request }) => {
    await delay(300);
    db.baseInfo = (await request.json()) as BaseInfo;
    return HttpResponse.json(db.baseInfo);
  }),
];
