import { Form, type FormItemProps as AntFormItemProps } from 'antd';
import { isValidElement, type ReactNode } from 'react';

import { type WithFormValueProp } from './valueProp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormItemProps<Values = any> extends AntFormItemProps<Values> {
  /** فیلد اجباری؛ قانون required با پیام فارسی به‌صورت خودکار اضافه می‌شود */
  required?: boolean;
  /** پیام اجباری بودن (پیش‌فرض: «{label} الزامی است») */
  requiredMessage?: string;
  children?: ReactNode;
}

const detectValuePropName = (children: ReactNode) => {
  if (!isValidElement(children)) return undefined;
  return (children.type as WithFormValueProp).formValuePropName;
};

const buildRequiredMessage = (label: ReactNode, custom?: string) => {
  if (custom) return custom;
  return typeof label === 'string' ? `${label} الزامی است.` : 'این فیلد الزامی است.';
};

/**
 * Form.Item با مقادیر پیش‌فرض پروژه. هر نوع ورودی (Input، Select، Checkbox، Switch، DateInput و...)
 * را به‌عنوان فرزند می‌گیرد. برای Switch و Checkbox تکی `valuePropName="checked"` خودکار ست می‌شود.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormItem = <Values = any,>({
  required,
  requiredMessage,
  rules = [],
  label,
  valuePropName,
  validateFirst = true,
  children,
  ...rest
}: FormItemProps<Values>) => {
  const mergedRules = required
    ? [{ required: true, message: buildRequiredMessage(label, requiredMessage) }, ...rules]
    : rules;

  return (
    <Form.Item<Values>
      label={label}
      required={required}
      rules={mergedRules}
      validateFirst={validateFirst}
      valuePropName={valuePropName ?? detectValuePropName(children)}
      {...rest}
    >
      {children}
    </Form.Item>
  );
};
