import { type BaseInfo } from './types';

const FIELD_LABELS: Record<keyof BaseInfo, string> = {
  qarzRate: 'نرخ قرض‌الحسنه',
  sepahEnabled: 'حقوق‌بگیر بانک سپه',
  sepahMultiplier: 'نرخ تأثیر حقوق‌بگیر بانک سپه',
  contractYears: 'مدت قرارداد',
  graceMonths: 'مهلت پس از انقضا',
  maxPlans: 'حداکثر تعداد طرح',
  staffDelayMonths: 'مهلت معرفی پرسنل',
  murabahaRates: 'نرخ‌های مرابحه',
  terms: 'مدت‌های بازپرداخت',
  usable: 'جدول درصد قابل استفاده',
  cancelReasons: 'دلایل لغو قرارداد',
  rejectReasons: 'دلایل رد درخواست وام',
  noGrantReasons: 'دلایل عدم اعطای تسهیلات غیرحضوری',
  avgDocTypes: 'انواع مستند میانگین موجودی',
};

const cleanList = (list: string[] = []) => list.map((item) => item.trim()).filter(Boolean);

/** مقادیر فرم را به شکل نهایی ذخیره درمی‌آورد (حذف ردیف‌های خالی فهرست‌ها) */
export const normalizeBaseInfo = (values: BaseInfo, previous: BaseInfo): BaseInfo => ({
  ...previous,
  ...values,
  cancelReasons: cleanList(values.cancelReasons),
  rejectReasons: cleanList(values.rejectReasons),
  noGrantReasons: cleanList(values.noGrantReasons),
  avgDocTypes: cleanList(values.avgDocTypes),
});

/** عنوان فیلدهایی که نسبت به قبل تغییر کرده‌اند */
export const getChangedFields = (before: BaseInfo, after: BaseInfo) =>
  (Object.keys(FIELD_LABELS) as (keyof BaseInfo)[])
    .filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
    .map((key) => FIELD_LABELS[key]);
