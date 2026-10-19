import { type PaginatedResponse, type UploadedFile } from '@/types/common';

export type ContractStatus = 'active' | 'cancelled';

/** وضعیت شرکت در API (`CompanyStatus`)؛ بکند هنوز معنای ۱ تا ۴ را مشخص نکرده */
export type CompanyStatus = 1 | 2 | 3 | 4;

/** ثبت‌کننده (`Common.RegistrarDto`) */
export interface CompanyRegistrar {
  panelUserId: number;
  userName: string;
  userCode: string | null;
  branchName: string | null;
  branchCode: string | null;
}

/** ردیف فهرست شرکت‌ها در API (`ReadModels.CompanyListItemDto`) */
export interface CompanyListItemDto {
  id: number;
  name: string;
  nationalId: string;
  agreementNumber: string;
  contractDate: string;
  planCount: number;
  registrar: CompanyRegistrar | null;
  status: CompanyStatus;
  branchCode: string;
}

/** خروجی `GET /Companies` (`ReadModels.CompanySearchResultDto`) */
export interface CompanySearchResultDto {
  page: {
    items: CompanyListItemDto[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
  activeCount: number;
  registeredCount: number;
}

/** پارامترهای جستجوی `GET /Companies` */
export interface CompanySearchParams {
  page: number;
  pageSize: number;
  status?: CompanyStatus;
  branchCode?: string;
  term?: string;
}

/** ردیف جدول فهرست شرکت‌ها */
export interface CompanyListItem {
  id: string;
  name: string;
  nationalId: string;
  agreementNo: string;
  contractDate: string;
  planCount: number;
  registeredBy: string;
  status: CompanyStatus;
  branchCode: string;
}

/** خروجی فهرست شرکت‌ها برای جدول */
export interface CompanyListResult extends PaginatedResponse<CompanyListItem> {
  activeCount: number;
  registeredCount: number;
}

/** اطلاعات کامل شرکت (برای ویرایش) */
export interface CompanyDetail {
  id: string;
  name: string;
  nationalId: string;
  agreementNo: string;
  accountNo: string;
  /** تاریخ انعقاد قرارداد (میلادی YYYY-MM-DD) */
  contractDate: string;
  /** روز افتتاح حساب سپرده (میلادی YYYY-MM-DD) */
  accountOpenDate: string;
  /** دریافت حقوق پرسنل از بانک سپه */
  sepahSalary: boolean;
  agreementFile: UploadedFile | null;
  planIds: string[];
}

/** مقادیر فرم ثبت/ویرایش شرکت */
export interface CompanyFormValues extends Omit<CompanyDetail, 'id' | 'agreementFile'> {
  agreementFile: File | UploadedFile | null;
}

/** بدنه درخواست ثبت/ویرایش شرکت */
export interface CompanyPayload extends Omit<CompanyDetail, 'id' | 'agreementFile'> {
  agreementFileId: string | null;
}

export interface CancelContractPayload {
  cancelDate: string;
  reasonId: string;
  note?: string;
  fileId?: string | null;
}

export interface CancelContractFormValues {
  cancelDate: string;
  reasonId: string;
  note?: string;
  file?: File | null;
}

/** میانگین موجودی یک ماه از سال جاری قرارداد */
export interface MonthlyAverage {
  month: number;
  /** میانگین موجودی (ریال)؛ null یعنی هنوز ثبت نشده */
  average: number | null;
  /** مانده اعتبار تا این ماه (محاسبه سمت سرور) */
  remainingCredit: number | null;
}

export interface SaveAveragesPayload {
  items: { month: number; average: number | null }[];
  docTypeId: string;
  fileId: string;
  note?: string;
}

export interface AverageDocFormValues {
  docTypeId: string;
  file: File | null;
  note?: string;
}

/** مستند ثبت‌شده برای تغییر میانگین‌ها */
export interface AverageDoc {
  id: string;
  createdAt: string;
  months: number[];
  docType: string;
  file: { id: string; name: string };
  note?: string;
  createdBy: string;
}
