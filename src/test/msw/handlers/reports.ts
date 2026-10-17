import ExcelJS from 'exceljs';
import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { LOAN_STATUS } from '@/constant/loanStatus';
import { formatJalali } from '@/utils/date';

import { db } from '../db';
import { api } from '../utils';

import { activeRequests } from './credit';

type Cell = string | number;

/** ساخت فایل اکسل راست‌به‌چپ با هدر پررنگ (کاری که بک‌اند انجام می‌دهد) */
const xlsx = async (fileName: string, headers: string[], rows: Cell[][]) => {
  await delay(300);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('گزارش', { views: [{ rightToLeft: true }] });
  sheet.addRow(headers).font = { bold: true };
  rows.forEach((row) => sheet.addRow(row));
  sheet.columns.forEach((column) => {
    column.width = 22;
  });
  return new HttpResponse(await workbook.xlsx.writeBuffer(), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  });
};

const toman = (rial: number) => Math.round(rial / 10);
const jalali = (value?: string | null) => (value ? formatJalali(value) : '');
const total = (values: (number | null)[]) => values.reduce<number>((s, v) => s + (v ?? 0), 0);
const disbursed = (companyId: string) => total(activeRequests(companyId).map((r) => r.amount));
const companyName = (id: string) => db.companies.find((c) => c.id === id)?.name ?? '—';
const status = (c: (typeof db.companies)[number]) =>
  c.status === 'active' ? 'فعال' : `لغوشده (${c.cancelReason ?? '—'})`;

export const reportHandlers = [
  http.get(api(ENDPOINTS.REPORTS.COMPANIES), () =>
    xlsx(
      'شرکت‌ها.xlsx',
      [
        'نام شرکت',
        'شناسه ملی',
        'شماره تفاهم‌نامه',
        'شماره حساب',
        'تاریخ قرارداد',
        'روز افتتاح حساب',
        'حقوق از بانک سپه',
        'تعداد طرح',
        'ثبت‌کننده',
        'وضعیت',
        'مجموع میانگین (تومان)',
        'مجموع وام تخصیص‌یافته (تومان)',
        'تعداد پرسنل',
        'تعداد درخواست',
      ],
      db.companies
        .filter((c) => !c.deleted)
        .map((c) => [
          c.name,
          c.nationalId,
          c.agreementNo,
          c.accountNo,
          jalali(c.contractDate),
          jalali(c.accountOpenDate),
          c.sepahSalary ? 'بله' : 'خیر',
          c.planIds.length,
          c.registeredBy,
          status(c),
          toman(total(c.averages)),
          toman(disbursed(c.id)),
          db.staff.filter((s) => s.companyId === c.id).length,
          db.loanRequests.filter((r) => r.companyId === c.id).length,
        ]),
    ),
  ),

  http.get(api(ENDPOINTS.REPORTS.STAFF), () =>
    xlsx(
      'پرسنل.xlsx',
      [
        'شرکت',
        'نام و نام خانوادگی',
        'کد ملی',
        'موبایل',
        'کد پرسنلی',
        'تاریخ استخدام',
        'اولویت تخصیص',
      ],
      db.staff.map((s) => [
        companyName(s.companyId),
        s.fullName,
        s.nationalId,
        s.mobile,
        s.personnelCode,
        jalali(s.hireDate),
        s.priority,
      ]),
    ),
  ),

  http.get(api(ENDPOINTS.REPORTS.LOAN_REQUESTS), () =>
    xlsx(
      'درخواست‌های-وام.xlsx',
      [
        'شرکت',
        'پرسنل',
        'طرح',
        'مبلغ (ریال)',
        'مبلغ (تومان)',
        'تاریخ ثبت',
        'تاریخ تأیید/رد',
        'وضعیت',
        'توضیحات',
        'مستندات',
      ],
      db.loanRequests.map((r) => [
        companyName(r.companyId),
        r.staffName,
        r.planTitle,
        r.amount,
        toman(r.amount),
        jalali(r.createdAt),
        jalali(r.decidedAt),
        LOAN_STATUS[r.status].title,
        r.note ?? '',
        r.file?.name ?? '',
      ]),
    ),
  ),

  http.get(api(ENDPOINTS.REPORTS.AVERAGES), () =>
    xlsx(
      'میانگین‌های-ماهانه.xlsx',
      ['شرکت', ...Array.from({ length: 12 }, (_, i) => `ماه ${i + 1}`)],
      db.companies
        .filter((c) => !c.deleted)
        .map((c) => [c.name, ...c.averages.map((value) => value ?? '')]),
    ),
  ),

  http.get(api(ENDPOINTS.REPORTS.REMOVED_COMPANIES), () =>
    xlsx(
      'شرکت‌های-حذف‌شده.xlsx',
      [
        'شرکت',
        'وضعیت',
        'تاریخ حذف/لغو',
        'مجموع میانگین (تومان)',
        'مجموع وام تخصیص‌یافته (تومان)',
        'تعداد درخواست',
        'نرخ تأیید',
      ],
      db.companies
        .filter((c) => c.deleted || c.status === 'cancelled')
        .map((c) => {
          const requests = db.loanRequests.filter((r) => r.companyId === c.id);
          const approved = requests.filter((r) => r.status === 'approved').length;
          return [
            c.name,
            c.deleted ? 'حذف‌شده' : 'لغوشده',
            jalali(c.deleted ? c.deletedAt : c.cancelDate),
            toman(total(c.averages)),
            toman(disbursed(c.id)),
            requests.length,
            requests.length ? `${Math.round((approved / requests.length) * 100)}%` : '',
          ];
        }),
    ),
  ),
];
