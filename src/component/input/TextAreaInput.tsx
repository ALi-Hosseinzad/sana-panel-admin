import { Input } from 'antd';
import { type TextAreaProps } from 'antd/es/input';

export type TextAreaInputProps = TextAreaProps;

export const TextAreaInput = ({
  autoSize = { minRows: 3, maxRows: 8 },
  allowClear = true,
  maxLength,
  showCount,
  ...rest
}: TextAreaInputProps) => (
  <Input.TextArea
    autoSize={autoSize}
    allowClear={allowClear}
    maxLength={maxLength}
    showCount={showCount ?? Boolean(maxLength)}
    {...rest}
  />
);
