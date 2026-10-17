import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';

import { buildPlanOptions, db, toLookup } from '../db';
import { api } from '../utils';

export const lookupHandlers = [
  http.get(api(ENDPOINTS.LOOKUPS.CANCEL_REASONS), async () => {
    await delay(150);
    return HttpResponse.json(toLookup(db.baseInfo.cancelReasons));
  }),

  http.get(api(ENDPOINTS.LOOKUPS.REJECT_REASONS), async () => {
    await delay(150);
    return HttpResponse.json(toLookup(db.baseInfo.rejectReasons));
  }),

  http.get(api(ENDPOINTS.LOOKUPS.NO_GRANT_REASONS), async () => {
    await delay(150);
    return HttpResponse.json(toLookup(db.baseInfo.noGrantReasons));
  }),

  http.get(api(ENDPOINTS.LOOKUPS.AVG_DOC_TYPES), async () => {
    await delay(150);
    return HttpResponse.json(toLookup(db.baseInfo.avgDocTypes));
  }),

  http.get(api(ENDPOINTS.LOOKUPS.PLANS), async () => {
    await delay(200);
    return HttpResponse.json({ maxPlans: db.baseInfo.maxPlans, items: buildPlanOptions() });
  }),

  http.get(api(ENDPOINTS.LOOKUPS.COMPANIES), async () => {
    await delay(150);
    const active = db.companies.filter((item) => !item.deleted && item.status === 'active');
    return HttpResponse.json(active.map((item) => ({ id: item.id, title: item.name })));
  }),
];
