import { Form as AntForm } from 'antd';

import { GRID_CLASS, type VerticalFormProps } from './types';

export const VerticalForm = <T,>({
  columns = 1,
  children,
  scrollToFirstError = true,
  requiredMark = true,
  autoComplete = 'off',
  ...rest
}: VerticalFormProps<T>) => (
  <AntForm<T>
    layout="vertical"
    scrollToFirstError={scrollToFirstError}
    requiredMark={requiredMark}
    autoComplete={autoComplete}
    {...rest}
  >
    {columns > 1 ? <div className={GRID_CLASS[columns]}>{children}</div> : children}
  </AntForm>
);
