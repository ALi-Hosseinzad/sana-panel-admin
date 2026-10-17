import { Spin, type SpinProps } from 'antd';

export type SpinnerProps = SpinProps;

/** لودینگ کوچک (داخل دکمه، کارت یا بخشی از صفحه) */
export const Spinner = ({ size = 'small', ...rest }: SpinnerProps) => (
  <Spin size={size} {...rest} />
);
