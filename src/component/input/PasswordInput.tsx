import { LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { type PasswordProps } from 'antd/es/input';

export type PasswordInputProps = PasswordProps;

export const PasswordInput = ({
  prefix = <LockOutlined />,
  autoComplete = 'current-password',
  placeholder = 'رمز عبور',
  ...rest
}: PasswordInputProps) => (
  <Input.Password prefix={prefix} autoComplete={autoComplete} placeholder={placeholder} {...rest} />
);
