import dayjs, { type ConfigType } from 'dayjs';

import { jalaliPlugin } from './jalaliPlugin';

dayjs.extend(jalaliPlugin);

export { dayjs };
export { JALALI_MONTHS, JALALI_WEEKDAYS } from './jalaliPlugin';

export const DATE_FORMAT = 'YYYY/MM/DD';
export const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm';
/** فرمت مقداری که به سرور/کوئری فرستاده می‌شود (میلادی) */
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);

export const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));

/** نمایش تاریخ میلادی به‌صورت شمسی */
export const formatJalali = (
  value: ConfigType,
  template = DATE_FORMAT,
  options: { persianDigits?: boolean } = {},
) => {
  if (value === null || value === undefined || value === '') return '';
  const date = dayjs(value);
  if (!date.isValid()) return '';
  const result = date.formatJalali(template);
  return options.persianDigits ? toPersianDigits(result) : result;
};

/** تبدیل رشته شمسی (مثل ۱۴۰۴/۰۳/۱۰) به dayjs میلادی */
export const parseJalali = (value: string) => {
  const [year, month, day] = toEnglishDigits(value).split(/[/-]/).map(Number);
  if (!year || !month || !day) return null;
  return dayjs.fromJalali(year, month, day);
};
