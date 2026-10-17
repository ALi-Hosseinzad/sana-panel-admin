import { Tabs, type TabsProps } from 'antd';

import { useQueryParams } from '@/hooks/useQueryParams';

export interface TabBarProps extends TabsProps {
  /** اگر داده شود تب فعال در این کلیدِ کوئری آدرس نگه داشته می‌شود */
  queryKey?: string;
}

export const TabBar = ({ queryKey, activeKey, onChange, items, ...rest }: TabBarProps) => {
  const { params, setParams } = useQueryParams();
  const fromQuery = queryKey ? params[queryKey] : undefined;

  const handleChange = (key: string) => {
    if (queryKey) setParams({ [queryKey]: key });
    onChange?.(key);
  };

  return (
    <Tabs
      items={items}
      activeKey={activeKey ?? fromQuery ?? undefined}
      defaultActiveKey={items?.[0]?.key}
      onChange={handleChange}
      {...rest}
    />
  );
};
