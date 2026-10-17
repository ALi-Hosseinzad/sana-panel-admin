/** تنظیمات عمومی طرح */
export interface GeneralSettings {
  /** نرخ تسهیلات قرض‌الحسنه (درصد) */
  qarzRate: number;
  /** حقوق‌بگیر بانک سپه */
  sepahEnabled: boolean;
  /** ضریب تأثیر حقوق‌بگیر بودن بانک سپه */
  sepahMultiplier: number;
  /** مدت قرارداد (سال) */
  contractYears: number;
  /** مهلت استفاده از مانده اعتبار پس از انقضا (ماه) */
  graceMonths: number;
  /** حداکثر تعداد طرح قابل انتخاب برای هر شرکت */
  maxPlans: number;
  /** مهلت مجاز شدن معرفی پرسنل پس از انعقاد قرارداد (ماه) */
  staffDelayMonths: number;
}

/** لیست عددی (نرخ‌های مرابحه به درصد / مدت‌های بازپرداخت به ماه) */
export interface NumberListValues {
  items: number[];
}

/** جدول درصد قابل استفاده از میانگین */
export interface UsableMatrix {
  qarzRate: number;
  murabahaRates: number[];
  terms: number[];
  /** هر ردیف یک مدت بازپرداخت؛ ستون اول قرض‌الحسنه و بقیه به ترتیب نرخ‌های مرابحه */
  values: number[][];
}
