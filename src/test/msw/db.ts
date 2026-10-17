import {
  MOCK_COMPANIES,
  MOCK_GENERAL_SETTINGS,
  MOCK_LOOKUPS,
  MOCK_MURABAHA_RATES,
  MOCK_STAFF,
  MOCK_TERMS,
  MOCK_USABLE_VALUES,
  MOCK_USERS,
} from '@/constant/mock';
import type { PlanOption } from '@/services/lookup/types';

/**
 * دیتابیس ماک در حافظه — شبیه‌ساز بک‌اند.
 * با رفرش صفحه به مقادیر اولیه constant/mock برمی‌گردد.
 */
export const db = {
  settings: structuredClone(MOCK_GENERAL_SETTINGS),
  murabahaRates: [...MOCK_MURABAHA_RATES],
  terms: [...MOCK_TERMS],
  usable: structuredClone(MOCK_USABLE_VALUES),
  lookups: structuredClone(MOCK_LOOKUPS),
  companies: structuredClone(MOCK_COMPANIES),
  staff: structuredClone(MOCK_STAFF),
  /** نام فایل‌های آپلودشده بر اساس شناسه */
  files: new Map<string, string>(),
  sequence: 100,
};

export type LookupName = keyof typeof db.lookups;

export const nextId = (prefix: string) => {
  db.sequence += 1;
  return `${prefix}-${db.sequence}`;
};

export const fileOf = (id: string) => ({ id, name: db.files.get(id) ?? id });

export const lookupTitle = (name: LookupName, id: string) =>
  db.lookups[name].find((item) => item.id === id)?.title;

export const today = () => new Date().toISOString().slice(0, 10);

export const findUserByToken = (authorization: string | null) => {
  const token = authorization?.replace('Bearer ', '');
  return MOCK_USERS.find((user) => user.token === token);
};

/** اندازه جدول درصد قابل استفاده را با تعداد مدت‌ها و نرخ‌ها هماهنگ می‌کند */
export const resizeUsable = () => {
  const columns = db.murabahaRates.length + 1;
  db.usable = db.terms.map((_term, row) =>
    Array.from({ length: columns }, (_value, column) => db.usable[row]?.[column] ?? 0),
  );
};

/** طرح‌های قابل انتخاب از روی اطلاعات پایه ساخته می‌شوند (همان کاری که بک‌اند انجام می‌دهد) */
export const buildPlanOptions = (): PlanOption[] => {
  const { terms, murabahaRates, usable } = db;
  const qarz = terms.map((term, termIndex) => ({
    id: `qarz-${termIndex}`,
    type: 'qarz' as const,
    typeTitle: 'قرض‌الحسنه',
    rate: db.settings.qarzRate,
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
