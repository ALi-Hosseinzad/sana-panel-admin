const ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const TEENS = [
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هجده',
  'نوزده',
];
const TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
const HUNDREDS = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
const SCALES = ['', 'هزار', 'میلیون', 'میلیارد', 'هزار میلیارد'];

const underHundred = (value: number) => {
  if (value < 10) return ONES[value] ?? '';
  if (value < 20) return TEENS[value - 10] ?? '';
  const one = value % 10;
  const ten = TENS[Math.floor(value / 10)] ?? '';
  return one ? `${ten} و ${ONES[one]}` : ten;
};

const underThousand = (value: number) =>
  [HUNDREDS[Math.floor(value / 100)], underHundred(value % 100)].filter(Boolean).join(' و ');

/** تبدیل عدد صحیح به حروف فارسی (مثل ۱۲۵۰ → «یک هزار و دویست و پنجاه») */
export const numberToWords = (input: number) => {
  const value = Math.floor(Math.abs(input));
  if (value === 0) return 'صفر';
  const parts: string[] = [];
  let rest = value;
  for (let scale = 0; rest > 0 && scale < SCALES.length; scale += 1) {
    const group = rest % 1000;
    if (group) parts.unshift([underThousand(group), SCALES[scale]].filter(Boolean).join(' '));
    rest = Math.floor(rest / 1000);
  }
  return parts.join(' و ');
};

/** مبلغ ریالی به حروف تومان */
export const rialToTomanWords = (rial: number) => `${numberToWords(Math.round(rial / 10))} تومان`;
