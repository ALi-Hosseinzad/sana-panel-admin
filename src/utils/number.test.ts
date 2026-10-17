import { formatAmount, parseAmount } from './number';

describe('amount utils', () => {
  it('groups thousands', () => {
    expect(formatAmount(1234567)).toBe('1,234,567');
    expect(formatAmount('-1000.5')).toBe('-1,000.5');
    expect(formatAmount('۱۲۳۴')).toBe('1,234');
    expect(formatAmount(null)).toBe('');
  });

  it('parses formatted amount', () => {
    expect(parseAmount('1,234,567')).toBe('1234567');
    expect(parseAmount('۱٬۲۳۴ ریال')).toBe('1234');
  });
});
