import { Switch as AntSwitch, type SwitchProps as AntSwitchProps } from 'antd';
import { type ReactNode, useId } from 'react';

import { CHECKED_VALUE_PROP } from '../form/valueProp';

export interface SwitchProps extends AntSwitchProps {
  /** لیبل کنار سوئیچ؛ بدون آن فقط خود سوئیچ نمایش داده می‌شود */
  label?: ReactNode;
  /** start = لیبل قبل از سوئیچ (سمت راست) · end = بعد از آن */
  labelPosition?: 'start' | 'end';
}

export const Switch = ({ label, labelPosition = 'end', id, ...rest }: SwitchProps) => {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  if (!label) return <AntSwitch id={switchId} {...rest} />;

  const labelNode = (
    <label htmlFor={switchId} className="cursor-pointer text-[13px] text-ink select-none">
      {label}
    </label>
  );

  return (
    <span className="inline-flex items-center gap-2">
      {labelPosition === 'start' && labelNode}
      <AntSwitch id={switchId} {...rest} />
      {labelPosition === 'end' && labelNode}
    </span>
  );
};
Switch.formValuePropName = CHECKED_VALUE_PROP;
