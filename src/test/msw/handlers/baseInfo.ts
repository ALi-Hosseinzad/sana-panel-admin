import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type Scheme, type SchemePayload } from '@/features/base-info/types';

import { db, nextId, resizeUsable } from '../db';
import { api } from '../utils';
import { logAction } from '../audit';

const toListItem = ({
  id,
  name,
  qarzRate,
  murabahaRates,
  terms,
  contractYears,
  maxPlans,
}: Scheme) => ({
  id,
  name,
  qarzRate,
  murabahaRates,
  terms,
  contractYears,
  maxPlans,
});

const notFound = () => HttpResponse.json({ message: 'طرح یافت نشد.' }, { status: 404 });

export const baseInfoHandlers = [
  http.get(api(ENDPOINTS.BASE_INFO.SCHEMES), async () => {
    await delay(250);
    return HttpResponse.json(db.schemes.map(toListItem));
  }),

  http.get(api(ENDPOINTS.BASE_INFO.SCHEME(':id')), async ({ params }) => {
    await delay(250);
    const scheme = db.schemes.find((item) => item.id === params.id);
    return scheme ? HttpResponse.json(scheme) : notFound();
  }),

  http.post(api(ENDPOINTS.BASE_INFO.SCHEMES), async ({ request }) => {
    await delay(300);
    const scheme = {
      id: nextId('scheme'),
      ...resizeUsable((await request.json()) as SchemePayload),
    };
    db.schemes.push(scheme);
    logAction(request, 'base', `ثبت طرح جدید: ${scheme.name}`);
    return HttpResponse.json(scheme, { status: 201 });
  }),

  http.put(api(ENDPOINTS.BASE_INFO.SCHEME(':id')), async ({ params, request }) => {
    await delay(300);
    const index = db.schemes.findIndex((item) => item.id === params.id);
    if (index < 0) return notFound();
    const scheme = {
      id: params.id as string,
      ...resizeUsable((await request.json()) as SchemePayload),
    };
    logAction(request, 'base', `ویرایش طرح: ${scheme.name}`, {
      entity: 'scheme',
      id: scheme.id,
      before: db.schemes[index] ?? {},
    });
    db.schemes[index] = scheme;
    return HttpResponse.json(scheme);
  }),

  http.delete(api(ENDPOINTS.BASE_INFO.SCHEME(':id')), async ({ params, request }) => {
    await delay(250);
    const removed = db.schemes.find((item) => item.id === params.id);
    if (removed) logAction(request, 'base', `حذف طرح: ${removed.name}`);
    db.schemes = db.schemes.filter((item) => item.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
