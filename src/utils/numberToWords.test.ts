import { numberToWords, rialToTomanWords } from './numberToWords';

describe('numberToWords', () => {
  it('converts numbers to persian words', () => {
    expect(numberToWords(0)).toBe('صفر');
    expect(numberToWords(15)).toBe('پانزده');
    expect(numberToWords(105)).toBe('صد و پنج');
    expect(numberToWords(1250)).toBe('یک هزار و دویست و پنجاه');
    expect(numberToWords(2_000_000)).toBe('دو میلیون');
  });

  it('converts rial to toman words', () => {
    expect(rialToTomanWords(15_000_000)).toBe('یک میلیون و پانصد هزار تومان');
  });
});
