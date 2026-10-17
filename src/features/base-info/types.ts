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

/** اطلاعات پایه یک طرح (بدنه ایجاد و ویرایش) */
export interface SchemePayload extends GeneralSettings {
  /** نام طرح */
  name: string;
  /** نرخ‌های مرابحه قابل انتخاب (درصد) */
  murabahaRates: number[];
  /** مدت‌های بازپرداخت قابل انتخاب (ماه) */
  terms: number[];
  /** درصد قابل استفاده از میانگین؛ هر ردیف یک مدت بازپرداخت، ستون اول قرض‌الحسنه و بقیه به ترتیب نرخ‌های مرابحه */
  usable: number[][];
}

export interface Scheme extends SchemePayload {
  id: string;
}

/** ردیف جدول طرح‌ها */
export type SchemeListItem = Pick<
  Scheme,
  'id' | 'name' | 'qarzRate' | 'murabahaRates' | 'terms' | 'contractYears' | 'maxPlans'
>;
