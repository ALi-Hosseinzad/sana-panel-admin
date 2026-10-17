import { Input, type InputProps } from 'antd';

export type TextInputProps = InputProps;

export const TextInput = ({ allowClear = true, autoComplete = 'off', ...rest }: TextInputProps) => (
  <Input allowClear={allowClear} autoComplete={autoComplete} {...rest} />
);
