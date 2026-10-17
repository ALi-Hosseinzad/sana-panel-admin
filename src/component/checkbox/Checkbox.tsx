import { Checkbox as AntCheckbox, type CheckboxProps } from 'antd';
import { type CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/es/checkbox';

import { CHECKED_VALUE_PROP } from '../form/valueProp';

export type { CheckboxProps };

/** چک‌باکس تکی — داخل FormItem به‌صورت خودکار با `checked` مقداردهی می‌شود */
export const Checkbox = (props: CheckboxProps) => <AntCheckbox {...props} />;
Checkbox.formValuePropName = CHECKED_VALUE_PROP;

export interface CheckboxGroupProps<T = unknown> extends AntCheckboxGroupProps<T> {
  /** inline = کنار هم · vertical = زیر هم */
  layout?: 'inline' | 'vertical';
}

/** چک‌باکس گروهی */
export const CheckboxGroup = <T = unknown,>({
  layout = 'inline',
  style,
  ...rest
}: CheckboxGroupProps<T>) => (
  <AntCheckbox.Group<T>
    style={{
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: layout === 'vertical' ? 10 : 18,
      ...style,
    }}
    {...rest}
  />
);
