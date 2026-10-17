import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';

import { buildPlanOptions, db, type LookupName, nextId } from '../db';
import { api } from '../utils';

/** سرویس‌های CRUD یک لیست ساده */
const lookupCrud = (path: string, name: LookupName) => [
  http.get(api(path), async () => {
    await delay(150);
    return HttpResponse.json(db.lookups[name]);
  }),

  http.post(api(path), async ({ request }) => {
    await delay(250);
    const { title } = (await request.json()) as { title: string };
    const item = { id: nextId(name), title };
    db.lookups[name].push(item);
    return HttpResponse.json(item, { status: 201 });
  }),

  http.put(api(ENDPOINTS.LOOKUPS.ITEM(path, ':id')), async ({ params, request }) => {
    await delay(250);
    const item = db.lookups[name].find((entry) => entry.id === params.id);
    if (!item) return HttpResponse.json({ message: 'مورد یافت نشد.' }, { status: 404 });
    item.title = ((await request.json()) as { title: string }).title;
    return HttpResponse.json(item);
  }),

  http.delete(api(ENDPOINTS.LOOKUPS.ITEM(path, ':id')), async ({ params }) => {
    await delay(250);
    db.lookups[name] = db.lookups[name].filter((entry) => entry.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];

export const lookupHandlers = [
  ...lookupCrud(ENDPOINTS.LOOKUPS.CANCEL_REASONS, 'cancelReasons'),
  ...lookupCrud(ENDPOINTS.LOOKUPS.REJECT_REASONS, 'rejectReasons'),
  ...lookupCrud(ENDPOINTS.LOOKUPS.NO_GRANT_REASONS, 'noGrantReasons'),
  ...lookupCrud(ENDPOINTS.LOOKUPS.AVG_DOC_TYPES, 'avgDocTypes'),

  http.get(api(ENDPOINTS.LOOKUPS.PLANS), async () => {
    await delay(200);
    return HttpResponse.json({ maxPlans: db.settings.maxPlans, items: buildPlanOptions() });
  }),

  http.get(api(ENDPOINTS.LOOKUPS.COMPANIES), async () => {
    await delay(150);
    const active = db.companies.filter((item) => !item.deleted && item.status === 'active');
    return HttpResponse.json(active.map((item) => ({ id: item.id, title: item.name })));
  }),
];
