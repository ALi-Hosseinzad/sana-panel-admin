import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type GeneralSettings, type UsableMatrix } from '@/features/base-info/types';

import { db, resizeUsable } from '../db';
import { api } from '../utils';

const usableMatrix = (): UsableMatrix => ({
  qarzRate: db.settings.qarzRate,
  murabahaRates: db.murabahaRates,
  terms: db.terms,
  values: db.usable,
});

export const baseInfoHandlers = [
  http.get(api(ENDPOINTS.BASE_INFO.GENERAL), async () => {
    await delay(250);
    return HttpResponse.json(db.settings);
  }),

  http.put(api(ENDPOINTS.BASE_INFO.GENERAL), async ({ request }) => {
    await delay(300);
    db.settings = (await request.json()) as GeneralSettings;
    return HttpResponse.json(db.settings);
  }),

  http.get(api(ENDPOINTS.BASE_INFO.MURABAHA_RATES), async () => {
    await delay(200);
    return HttpResponse.json(db.murabahaRates);
  }),

  http.put(api(ENDPOINTS.BASE_INFO.MURABAHA_RATES), async ({ request }) => {
    await delay(300);
    db.murabahaRates = (await request.json()) as number[];
    resizeUsable();
    return HttpResponse.json(db.murabahaRates);
  }),

  http.get(api(ENDPOINTS.BASE_INFO.TERMS), async () => {
    await delay(200);
    return HttpResponse.json(db.terms);
  }),

  http.put(api(ENDPOINTS.BASE_INFO.TERMS), async ({ request }) => {
    await delay(300);
    db.terms = (await request.json()) as number[];
    resizeUsable();
    return HttpResponse.json(db.terms);
  }),

  http.get(api(ENDPOINTS.BASE_INFO.USABLE_MATRIX), async () => {
    await delay(250);
    return HttpResponse.json(usableMatrix());
  }),

  http.put(api(ENDPOINTS.BASE_INFO.USABLE_MATRIX), async ({ request }) => {
    await delay(300);
    db.usable = ((await request.json()) as { values: number[][] }).values;
    resizeUsable();
    return HttpResponse.json(usableMatrix());
  }),
];
