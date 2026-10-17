import { type PluginFunc } from 'dayjs';
import { toGregorian, toJalaali } from 'jalaali-js';

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

/** ترتیب بر اساس Date#getDay (یکشنبه = 0) */
export const JALALI_WEEKDAYS = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه',
] as const;

export interface JalaliParts {
  year: number;
  month: number;
  day: number;
}

declare module 'dayjs' {
  interface Dayjs {
    /** اجزای تاریخ شمسی */
    jalali(): JalaliParts;
    /**
     * فرمت شمسی. توکن‌ها: YYYY YY MMMM MM M DD D dddd HH H mm ss
     * متن داخل [] بدون تغییر چاپ می‌شود.
     */
    formatJalali(template?: string): string;
  }

  /** ساخت dayjs از تاریخ شمسی */
  export function fromJalali(year: number, month: number, day: number): Dayjs;
}

const pad = (value: number, length = 2) => String(value).padStart(length, '0');

/** توکن‌ها به ترتیب طول (اول طولانی‌تر) */
const TOKENS = ['YYYY', 'MMMM', 'dddd', 'YY', 'MM', 'DD', 'HH', 'mm', 'ss', 'M', 'D', 'H'];

const renderTemplate = (template: string, values: Record<string, string>) => {
  let result = '';
  let index = 0;
  while (index < template.length) {
    if (template[index] === '[') {
      const close = template.indexOf(']', index);
      const end = close === -1 ? template.length : close;
      result += template.slice(index + 1, end);
      index = end + 1;
      continue;
    }
    const token = TOKENS.find((item) => template.startsWith(item, index));
    result += token ? values[token] : template[index];
    index += token ? token.length : 1;
  }
  return result;
};

export const jalaliPlugin: PluginFunc = (_option, dayjsClass, dayjsFactory) => {
  dayjsClass.prototype.jalali = function jalali() {
    const { jy, jm, jd } = toJalaali(this.year(), this.month() + 1, this.date());
    return { year: jy, month: jm, day: jd };
  };

  dayjsClass.prototype.formatJalali = function formatJalali(template = 'YYYY/MM/DD') {
    const { year, month, day } = this.jalali();
    const tokens: Record<string, string> = {
      YYYY: String(year),
      YY: pad(year % 100),
      MMMM: JALALI_MONTHS[month - 1] ?? '',
      MM: pad(month),
      M: String(month),
      DD: pad(day),
      D: String(day),
      dddd: JALALI_WEEKDAYS[this.day()] ?? '',
      HH: pad(this.hour()),
      H: String(this.hour()),
      mm: pad(this.minute()),
      ss: pad(this.second()),
    };
    return renderTemplate(template, tokens);
  };

  (dayjsFactory as unknown as { fromJalali: typeof dayjsFactory.fromJalali }).fromJalali = (
    year: number,
    month: number,
    day: number,
  ) => {
    const { gy, gm, gd } = toGregorian(year, month, day);
    return dayjsFactory(new Date(gy, gm - 1, gd));
  };
};
