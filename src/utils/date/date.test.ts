import { dayjs, formatJalali, parseJalali, toEnglishDigits, toPersianDigits } from '.';

describe('jalali date utils', () => {
  it('converts gregorian to jalali', () => {
    expect(formatJalali('2025-03-21')).toBe('1404/01/01');
    expect(formatJalali('2024-03-20', 'YYYY MMMM D')).toBe('1403 فروردین 1');
  });

  it('keeps escaped text and weekday names', () => {
    expect(dayjs('2025-03-21').formatJalali('[روز] dddd')).toBe('روز جمعه');
  });

  it('parses jalali string with persian digits', () => {
    expect(parseJalali('۱۴۰۴/۰۱/۰۱')?.format('YYYY-MM-DD')).toBe('2025-03-21');
    expect(parseJalali('invalid')).toBeNull();
  });

  it('converts digits both ways', () => {
    expect(toPersianDigits('1404/12')).toBe('۱۴۰۴/۱۲');
    expect(toEnglishDigits('۱۴۰۴/٠٣')).toBe('1404/03');
  });

  it('returns empty string for empty values', () => {
    expect(formatJalali(null)).toBe('');
    expect(formatJalali('')).toBe('');
  });
});
