import { type GeneralSettings } from '@/features/base-info/types';
import { type LookupItem } from '@/types/common';

export const MOCK_GENERAL_SETTINGS: GeneralSettings = {
  qarzRate: 4,
  sepahEnabled: true,
  sepahMultiplier: 1.1,
  contractYears: 1,
  graceMonths: 4,
  maxPlans: 5,
  staffDelayMonths: 1,
};

export const MOCK_MURABAHA_RATES = [5, 10, 15, 20, 23];

export const MOCK_TERMS = [12, 24, 36, 48, 60];

/** ردیف: مدت بازپرداخت · ستون اول: قرض‌الحسنه، بقیه: نرخ‌های مرابحه */
export const MOCK_USABLE_VALUES = [
  [8, 10, 15, 25, 35, 45],
  [6, 8, 10, 15, 20, 25],
  [5, 6, 8, 10, 15, 20],
  [4, 4, 6, 8, 10, 15],
  [3, 3, 5, 6, 8, 10],
];

const toItems = (prefix: string, titles: string[]): LookupItem[] =>
  titles.map((title, index) => ({ id: `${prefix}-${index + 1}`, title }));

export const MOCK_LOOKUPS = {
  cancelReasons: toItems('cr', ['عدم تمدید به درخواست شرکت', 'لغو قرارداد توسط مدیریت شعب منطقه']),
  rejectReasons: toItems('rr', ['عدم کنترل سقف فردی', 'پایین بودن رتبه اعتباری']),
  noGrantReasons: toItems('ng', [
    'رتبه اعتباری غیرمجاز',
    'عدم کفایت سقف تسهیلات بر اساس اعتبارسنجی',
  ]),
  avgDocTypes: toItems('dt', ['نامه', 'تصویر بنکو']),
};
