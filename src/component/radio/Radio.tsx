import {
  Radio as AntRadio,
  type RadioGroupProps as AntRadioGroupProps,
  type RadioProps,
} from 'antd';

export type { RadioProps };

/** رادیو تکی */
export const Radio = (props: RadioProps) => <AntRadio {...props} />;

export interface RadioGroupProps extends Omit<AntRadioGroupProps, 'orientation' | 'vertical'> {
  /** inline = کنار هم · vertical = زیر هم */
  layout?: 'inline' | 'vertical';
}

/** رادیو گروهی */
export const RadioGroup = ({
  layout = 'inline',
  optionType = 'default',
  ...rest
}: RadioGroupProps) => (
  <AntRadio.Group
    orientation={layout === 'vertical' ? 'vertical' : 'horizontal'}
    optionType={optionType}
    {...rest}
  />
);
