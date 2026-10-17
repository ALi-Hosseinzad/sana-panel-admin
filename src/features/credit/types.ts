import { type LoanStatus } from '@/constant/loanStatus';

export interface EligibilityMessage {
  type: 'success' | 'error';
  text: string;
}

/** وضعیت شرکت برای ثبت درخواست وام در تاریخ مبنا (محاسبه سمت سرور) */
export interface CreditEligibility {
  /** آیا ثبت درخواست مجاز است؟ */
  canAllocate: boolean;
  messages: EligibilityMessage[];
}

/** اعتبار یک طرح شرکت */
export interface PlanCredit {
  planId: string;
  typeTitle: string;
  rate: number;
  term: number;
  /** سهم طرح از میانگین (درصد) */
  sharePercent: number;
  /** درصد قابل استفاده از میانگین */
  usable: number;
  /** اعتبار ایجادشده (تجمعی) */
  created: number;
  /** مبلغ تخصیص‌یافته */
  disbursed: number;
  /** مانده اعتبار قابل استفاده در این ماه */
  available: number;
}

export interface CreditSummary {
  /** مجموع میانگین مبنای محاسبه اعتبار */
  totalAverage: number;
  /** میانگین ماه جاری */
  currentMonthAverage: number;
  plans: PlanCredit[];
}

export interface LoanRequest {
  id: string;
  staffName: string;
  paymentOrder: number;
  planTitle: string;
  amount: number;
  createdAt: string;
  decidedAt: string | null;
  status: LoanStatus;
}

export interface LoanRequestItem {
  staffId: string;
  amount: number;
  paymentOrder: number;
}

export interface CreateLoanRequestPayload {
  planId: string;
  /** تاریخ مبنا (میلادی) */
  date: string;
  items: LoanRequestItem[];
  /** تأیید تخصیص مجدد به پرسنلی که در همین ماه وام گرفته‌اند */
  confirmDuplicates?: boolean;
}

/** پاسخ ۴۰۹: پرسنلی که در همین ماه وام دریافت کرده‌اند */
export interface DuplicateLoanError {
  message: string;
  duplicates: { staffName: string; amount: number; planTitle: string }[];
}

/** مقادیر فرم ثبت درخواست */
export interface LoanRequestFormValues {
  planId?: string;
  amountMode: 'fixed' | 'variable';
  fixedAmount?: string;
  /** مبلغ و ترتیب پرداخت هر پرسنل؛ کلید = شناسه پرسنل */
  rows?: Record<string, { amount?: string; paymentOrder?: number }>;
}
