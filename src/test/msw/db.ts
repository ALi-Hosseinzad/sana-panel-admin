import { MOCK_BASE_INFO, MOCK_COMPANIES, MOCK_USERS } from '@/constant/mock';
import { type BaseInfo } from '@/features/base-info/types';
import type { PlanOption } from '@/services/lookup/types';

/**
 * دیتابیس ماک در حافظه — شبیه‌ساز بک‌اند.
 * با رفرش صفحه به مقادیر اولیه constant/mock برمی‌گردد.
 */
export const db = {
  baseInfo: structuredClone(MOCK_BASE_INFO) as BaseInfo,
  companies: structuredClone(MOCK_COMPANIES),
  /** نام فایل‌های آپلودشده بر اساس شناسه */
  files: new Map<string, string>(),
  sequence: 100,
};

export const nextId = (prefix: string) => {
  db.sequence += 1;
  return `${prefix}-${db.sequence}`;
};

export const fileOf = (id: string) => ({ id, name: db.files.get(id) ?? id });

export const today = () => new Date().toISOString().slice(0, 10);

export const findUserByToken = (authorization: string | null) => {
  const token = authorization?.replace('Bearer ', '');
  return MOCK_USERS.find((user) => user.token === token);
};

/** طرح‌های قابل انتخاب از روی اطلاعات پایه ساخته می‌شوند (همان کاری که بک‌اند انجام می‌دهد) */
export const buildPlanOptions = (): PlanOption[] => {
  const { terms, murabahaRates, qarzRate, usable } = db.baseInfo;
  const qarz = terms.map((term, termIndex) => ({
    id: `qarz-${termIndex}`,
    type: 'qarz' as const,
    typeTitle: 'قرض‌الحسنه',
    rate: qarzRate,
    term,
    usable: usable[termIndex]?.[0] ?? 0,
  }));
  const murabaha = murabahaRates.flatMap((rate, rateIndex) =>
    terms.map((term, termIndex) => ({
      id: `mur-${rateIndex}-${termIndex}`,
      type: 'murabaha' as const,
      typeTitle: 'مرابحه',
      rate,
      term,
      usable: usable[termIndex]?.[rateIndex + 1] ?? 0,
    })),
  );
  return [...qarz, ...murabaha];
};

export const toLookup = (list: string[]) =>
  list.map((title, index) => ({ id: String(index), title }));
