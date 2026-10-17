export interface BaseInfo {
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
  /** نرخ‌های مرابحه (درصد) */
  murabahaRates: number[];
  /** مدت‌های بازپرداخت (ماه) */
  terms: number[];
  /**
   * درصد قابل استفاده از میانگین.
   * هر ردیف یک مدت بازپرداخت؛ ستون اول قرض‌الحسنه و بقیه به ترتیب نرخ‌های مرابحه.
   */
  usable: number[][];
  cancelReasons: string[];
  rejectReasons: string[];
  noGrantReasons: string[];
  avgDocTypes: string[];
}
