import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';

import { db, nextId } from '../db';
import { api } from '../utils';

export const fileHandlers = [
  http.post(api(ENDPOINTS.FILES.UPLOAD), async ({ request }) => {
    await delay(400);
    const form = await request.formData();
    const file = form.get('file');
    const name = file instanceof File ? file.name : 'file';
    const id = nextId('f');
    db.files.set(id, name);
    return HttpResponse.json({ id, name });
  }),
];
