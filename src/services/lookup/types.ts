export type PlanType = 'qarz' | 'murabaha';

/** یک طرح قابل انتخاب (ترکیب نوع تسهیلات، نرخ و مدت) */
export interface PlanOption {
  id: string;
  type: PlanType;
  typeTitle: string;
  /** نرخ تسهیلات (درصد) */
  rate: number;
  /** مدت بازپرداخت (ماه) */
  term: number;
  /** میزان اعتبار به نسبت میانگین ماهانه (درصد) */
  usable: number;
}

export interface PlanOptionsResponse {
  /** حداکثر تعداد طرح قابل انتخاب برای هر شرکت */
  maxPlans: number;
  items: PlanOption[];
}
