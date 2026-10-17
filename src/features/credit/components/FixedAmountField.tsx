import { FormItem } from '@/component/form';
import { AmountInput } from '@/component/input';
import { rialToTomanWords } from '@/utils/numberToWords';

/** مبلغ یکسان برای همه پرسنل انتخاب‌شده + نمایش به حروف */
export const FixedAmountField = ({ amount }: { amount: number }) => (
  <div className="mt-3 max-w-[280px]">
    <FormItem name="fixedAmount" label="مبلغ وام برای هر نفر" className="mb-1">
      <AmountInput />
    </FormItem>
    {amount > 0 && <div className="text-xs text-ink-soft">{rialToTomanWords(amount)}</div>}
  </div>
);
