import { InputNumber, type InputNumberProps } from 'antd';

export type NumberInputProps = InputNumberProps<number>;

export const NumberInput = ({ style, controls = true, ...rest }: NumberInputProps) => (
  <InputNumber<number> controls={controls} style={{ width: '100%', ...style }} {...rest} />
);
