import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type MockManagedUser } from '@/constant/mock';
import { type UserPayload } from '@/features/users/types';
import { toEnglishDigits } from '@/utils/date';

import { db, nextId } from '../db';
import { api } from '../utils';

const withoutPassword = ({ password: _password, ...user }: MockManagedUser) => user;

const notFound = () => HttpResponse.json({ message: 'کاربر یافت نشد.' }, { status: 404 });

const duplicate = () =>
  HttpResponse.json(
    {
      message: 'این نام کاربری قبلاً ثبت شده است.',
      errors: { username: ['این نام کاربری قبلاً ثبت شده است.'] },
    },
    { status: 409 },
  );

const isTaken = (username: string, exceptId?: string) =>
  db.users.some((user) => user.username === username && user.id !== exceptId);

/** کدها با ارقام انگلیسی ذخیره می‌شوند */
const normalize = (body: UserPayload) => ({
  ...body,
  username: body.username.trim(),
  userCode: toEnglishDigits(body.userCode),
  branchCode: toEnglishDigits(body.branchCode),
});

export const userHandlers = [
  http.get(api(ENDPOINTS.USERS.LIST), async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const start = (page - 1) * pageSize;
    return HttpResponse.json({
      items: db.users.slice(start, start + pageSize).map(withoutPassword),
      total: db.users.length,
      page,
      pageSize,
    });
  }),

  http.get(api(ENDPOINTS.USERS.DETAIL(':id')), async ({ params }) => {
    await delay(200);
    const user = db.users.find((item) => item.id === params.id);
    return user ? HttpResponse.json(withoutPassword(user)) : notFound();
  }),

  http.post(api(ENDPOINTS.USERS.LIST), async ({ request }) => {
    await delay(300);
    const body = normalize((await request.json()) as UserPayload);
    if (!body.password) {
      return HttpResponse.json({ message: 'رمز عبور الزامی است.' }, { status: 422 });
    }
    if (isTaken(body.username)) return duplicate();
    const user = { ...body, id: nextId('u'), password: body.password };
    db.users.push(user);
    return HttpResponse.json(withoutPassword(user), { status: 201 });
  }),

  http.put(api(ENDPOINTS.USERS.DETAIL(':id')), async ({ params, request }) => {
    await delay(300);
    const user = db.users.find((item) => item.id === params.id);
    if (!user) return notFound();
    const { password, ...body } = normalize((await request.json()) as UserPayload);
    if (isTaken(body.username, user.id)) return duplicate();
    Object.assign(user, body, password ? { password } : {});
    return HttpResponse.json(withoutPassword(user));
  }),

  http.delete(api(ENDPOINTS.USERS.DETAIL(':id')), async ({ params }) => {
    await delay(250);
    if (db.users.length <= 1) {
      return HttpResponse.json(
        { message: 'حداقل یک کاربر باید در سامانه باقی بماند.' },
        { status: 422 },
      );
    }
    db.users = db.users.filter((item) => item.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
