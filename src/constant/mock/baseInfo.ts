import { type BaseInfo } from '@/features/base-info/types';

export const MOCK_BASE_INFO: BaseInfo = {
  qarzRate: 4,
  sepahEnabled: true,
  sepahMultiplier: 1.1,
  contractYears: 1,
  graceMonths: 4,
  maxPlans: 5,
  staffDelayMonths: 1,
  murabahaRates: [5, 10, 15, 20, 23],
  terms: [12, 24, 36, 48, 60],
  usable: [
    [8, 10, 15, 25, 35, 45],
    [6, 8, 10, 15, 20, 25],
    [5, 6, 8, 10, 15, 20],
    [4, 4, 6, 8, 10, 15],
    [3, 3, 5, 6, 8, 10],
  ],
  cancelReasons: ['عدم تمدید به درخواست شرکت', 'لغو قرارداد توسط مدیریت شعب منطقه'],
  rejectReasons: ['عدم کنترل سقف فردی', 'پایین بودن رتبه اعتباری'],
  noGrantReasons: ['رتبه اعتباری غیرمجاز', 'عدم کفایت سقف تسهیلات بر اساس اعتبارسنجی'],
  avgDocTypes: ['نامه', 'تصویر بنکو'],
};
