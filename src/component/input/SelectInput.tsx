import { Select, type SelectProps } from 'antd';

export type SelectInputProps<V = unknown> = SelectProps<V>;

export const SelectInput = <V = unknown,>({
  placeholder = 'انتخاب کنید',
  allowClear = true,
  showSearch = { optionFilterProp: 'label' },
  notFoundContent = 'موردی یافت نشد',
  ...rest
}: SelectInputProps<V>) => (
  <Select<V>
    placeholder={placeholder}
    allowClear={allowClear}
    showSearch={showSearch}
    notFoundContent={notFoundContent}
    {...rest}
  />
);
