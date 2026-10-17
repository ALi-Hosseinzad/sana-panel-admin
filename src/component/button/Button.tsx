import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger' | 'outline';

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'variant' | 'color' | 'danger'> {
  /**
   * primary = اصلی · secondary = فرعی · text = متنی · danger = خطر · outline = حاشیه‌دار
   */
  variant?: ButtonVariant;
}

const VARIANT_PROPS: Record<ButtonVariant, Pick<AntButtonProps, 'color' | 'variant'>> = {
  primary: { color: 'primary', variant: 'solid' },
  secondary: { color: 'default', variant: 'outlined' },
  text: { color: 'default', variant: 'text' },
  danger: { color: 'danger', variant: 'solid' },
  outline: { color: 'primary', variant: 'outlined' },
};

export const Button = ({ variant = 'primary', htmlType = 'button', ...rest }: ButtonProps) => (
  <AntButton {...VARIANT_PROPS[variant]} htmlType={htmlType} {...rest} />
);
