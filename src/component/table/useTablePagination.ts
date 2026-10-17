import { useMemo, useState } from 'react';

import { type TablePaginationProps } from './TablePagination';

export interface TablePaginationConfig extends Partial<Omit<TablePaginationProps, 'onChange'>> {
  /** اگر داده شود پجینیشن سمت سرور است؛ در غیر این صورت داده‌ها در خود جدول صفحه‌بندی می‌شوند */
  onChange?: TablePaginationProps['onChange'];
}

export const DEFAULT_PAGE_SIZE = 10;

const normalizeConfig = (pagination: boolean | TablePaginationConfig) => {
  if (pagination === false) return null;
  return pagination === true ? {} : pagination;
};

const resolveServerState = (config: TablePaginationConfig | null) => ({
  current: config?.current ?? 1,
  pageSize: config?.pageSize ?? DEFAULT_PAGE_SIZE,
  total: config?.total ?? 0,
});

/** وضعیت پجینیشن جدول (سمت سرور یا داخلی) و داده‌های صفحه جاری */
export const useTablePagination = <T>(
  pagination: boolean | TablePaginationConfig,
  dataSource: readonly T[],
) => {
  const config = useMemo(() => normalizeConfig(pagination), [pagination]);
  const isServerSide = Boolean(config?.onChange);

  const [innerPage, setInnerPage] = useState(1);
  const [innerSize, setInnerSize] = useState(config?.pageSize ?? DEFAULT_PAGE_SIZE);

  const { current, pageSize, total } = isServerSide
    ? resolveServerState(config)
    : { current: innerPage, pageSize: innerSize, total: dataSource.length };

  const pageData = useMemo(() => {
    if (!config || isServerSide) return dataSource;
    const start = (current - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [config, isServerSide, dataSource, current, pageSize]);

  const onChange = (page: number, size: number) => {
    if (isServerSide) {
      config?.onChange?.(page, size);
      return;
    }
    setInnerPage(page);
    setInnerSize(size);
  };

  return {
    enabled: Boolean(config),
    config,
    current,
    pageSize,
    total,
    pageData,
    offset: config ? (current - 1) * pageSize : 0,
    onChange,
  };
};
