import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export type QueryValue = string | number | boolean | null | undefined | (string | number)[];

const ARRAY_SEPARATOR = ',';

const isEmpty = (value: QueryValue) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

/** خواندن/نوشتن کوئری‌پارام‌های آدرس فعلی بدون تغییر مسیر */
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  /** افزودن/به‌روزرسانی کلیدها؛ مقادیر خالی حذف می‌شوند */
  const setParams = useCallback(
    (values: Record<string, QueryValue>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(values).forEach(([key, value]) => {
            if (isEmpty(value)) next.delete(key);
            else next.set(key, Array.isArray(value) ? value.join(ARRAY_SEPARATOR) : String(value));
          });
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  /** حذف فقط کلیدهای داده‌شده؛ بقیه کوئری‌ها دست نمی‌خورند */
  const removeParams = useCallback(
    (keys: string[]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          keys.forEach((key) => next.delete(key));
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { params, searchParams, setParams, removeParams };
};
