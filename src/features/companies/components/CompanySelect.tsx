import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { SelectInput } from '@/component/input';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getCompanyOptions } from '@/services/lookup';

interface CompanySelectProps {
  value?: string;
  onChange: (companyId: string) => void;
}

/**
 * انتخاب شرکت فعال (از سرویس شرکت‌های فعال).
 * اگر مقداری انتخاب نشده یا شرکت انتخاب‌شده دیگر فعال نیست، اولین شرکت انتخاب می‌شود.
 */
export const CompanySelect = ({ value, onChange }: CompanySelectProps) => {
  const { data: companies, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.COMPANIES,
    queryFn: getCompanyOptions,
  });

  useEffect(() => {
    const first = companies?.[0]?.id;
    if (first && !companies.some((item) => item.id === value)) onChange(first);
  }, [companies, value, onChange]);

  return (
    <div className="mb-3.5 max-w-[360px]">
      <label
        htmlFor="company-select"
        className="mb-[7px] block text-[12.5px] font-semibold text-label"
      >
        انتخاب شرکت
      </label>
      <SelectInput
        id="company-select"
        className="w-full"
        allowClear={false}
        loading={isPending}
        value={value}
        onChange={onChange}
        placeholder="ابتدا یک شرکت ثبت کنید"
        options={companies?.map((item) => ({ value: item.id, label: item.title }))}
      />
    </div>
  );
};
