import { InputNumber, type InputNumberProps } from 'antd';

import { formatAmount, parseAmount } from '@/utils/number';

export interface AmountInputProps extends Omit<InputNumberProps<string>, 'formatter' | 'parser'> {
  /** واحد پول که داخل فیلد نمایش داده می‌شود */
  currency?: string;
}

/** ورودی مبلغ با جداکننده سه‌رقمی؛ مقدار خروجی رشته عددی بدون جداکننده است */
export const AmountInput = ({
  currency = 'ریال',
  min = '0',
  placeholder = '۰',
  controls = false,
  stringMode = true,
  style,
  ...rest
}: AmountInputProps) => (
  <InputNumber<string>
    min={min}
    placeholder={placeholder}
    controls={controls}
    stringMode={stringMode}
    inputMode="numeric"
    suffix={currency}
    formatter={(value) => formatAmount(value)}
    parser={(value) => parseAmount(value)}
    style={{ width: '100%', ...style }}
    {...rest}
  />
);
