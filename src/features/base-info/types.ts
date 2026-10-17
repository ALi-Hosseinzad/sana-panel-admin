/** اطلاعات پایه یک طرح (همه بخش‌های فرم افزودن/ویرایش) */
export interface SchemePayload {
  /** نام طرح (مثل نگین میثاق) */
  name: string;
  /** نرخ تسهیلات قرض‌الحسنه (درصد - ثابت) */
  qarzRate: number;
  /** حقوق‌بگیر بانک سپه */
  sepahEnabled: boolean;
  /** نرخ تأثیر حقوق‌بگیر بودن بانک سپه (ضریب) */
  sepahMultiplier: number;
  /** مدت قرارداد (سال) */
  contractYears: number;
  /** مهلت استفاده از مانده اعتبار پس از انقضا (ماه) */
  graceMonths: number;
  /** حداکثر تعداد طرح قابل انتخاب برای هر شرکت */
  maxPlans: number;
  /** مهلت مجاز شدن معرفی پرسنل پس از انعقاد قرارداد (ماه) */
  staffDelayMonths: number;
  /** نرخ‌های مرابحه قابل انتخاب (درصد) */
  murabahaRates: number[];
  /** مدت‌های بازپرداخت قابل انتخاب (ماه) */
  terms: number[];
  /** درصد قابل استفاده از میانگین؛ ردیف = مدت، ستون اول قرض‌الحسنه و بقیه نرخ‌های مرابحه */
  usable: number[][];
  /** دلایل لغو قرارداد */
  cancelReasons: string[];
  /** دلایل رد درخواست وام */
  rejectReasons: string[];
  /** دلایل عدم اعطای تسهیلات غیرحضوری */
  noGrantReasons: string[];
  /** انواع مستند میانگین موجودی */
  avgDocTypes: string[];
}

export interface Scheme extends SchemePayload {
  id: string;
}

/** ردیف جدول طرح‌ها */
export type SchemeListItem = Pick<
  Scheme,
  'id' | 'name' | 'qarzRate' | 'murabahaRates' | 'terms' | 'contractYears' | 'maxPlans'
>;

/** نام لیست‌های متنی هر طرح */
export type SchemeTextList = 'cancelReasons' | 'rejectReasons' | 'noGrantReasons' | 'avgDocTypes';
