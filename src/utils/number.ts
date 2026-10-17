import { toEnglishDigits } from './date';

const groupThousands = (integer: string) => {
  const negative = integer.startsWith('-');
  const digits = negative ? integer.slice(1) : integer;
  const groups: string[] = [];
  for (let end = digits.length; end > 0; end -= 3) {
    groups.unshift(digits.slice(Math.max(0, end - 3), end));
  }
  return `${negative ? '-' : ''}${groups.join(',')}`;
};

/** جداکننده سه‌رقمی */
export const formatAmount = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === '') return '';
  const text = toEnglishDigits(String(value));
  const dotIndex = text.indexOf('.');
  if (dotIndex === -1) return groupThousands(text);
  return `${groupThousands(text.slice(0, dotIndex))}.${text.slice(dotIndex + 1)}`;
};

/** حذف جداکننده و تبدیل ارقام فارسی */
export const parseAmount = (value: string | undefined) =>
  toEnglishDigits(value ?? '').replace(/[^\d.-]/g, '');
