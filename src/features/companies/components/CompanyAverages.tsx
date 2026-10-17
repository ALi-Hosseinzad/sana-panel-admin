import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PanelCard } from '@/component/card';
import { SelectInput } from '@/component/input';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getCompanyOptions } from '@/services/lookup';

import { AverageDocsTable } from './AverageDocsTable';
import { AveragesTable } from './AveragesTable';

/** بخش میانگین موجودی: انتخاب شرکت + جدول ماه‌ها + مستندات */
export const CompanyAverages = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const { data: companies, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.COMPANIES,
    queryFn: getCompanyOptions,
  });

  // اگر شرکتی انتخاب نشده یا شرکت انتخاب‌شده دیگر فعال نیست، اولین شرکت فعال انتخاب می‌شود
  const companyId = companies?.some((item) => item.id === selectedId)
    ? selectedId
    : companies?.[0]?.id;

  return (
    <PanelCard
      title="میانگین موجودی حساب جاری — ماه‌های سال جاری قرارداد"
      subtitle="ستون اول را دستی وارد کنید؛ ستون دوم (مانده اعتبار تا آن ماه) سمت سرور محاسبه می‌شود."
    >
      <div className="mb-3.5 max-w-[360px]">
        <label
          htmlFor="avg-company"
          className="mb-[7px] block text-[12.5px] font-semibold text-label"
        >
          انتخاب شرکت
        </label>
        <SelectInput
          id="avg-company"
          className="w-full"
          allowClear={false}
          loading={isPending}
          value={companyId}
          onChange={setSelectedId}
          placeholder="ابتدا یک شرکت ثبت کنید"
          options={companies?.map((item) => ({ value: item.id, label: item.title }))}
        />
      </div>
      {companyId && (
        <>
          <AveragesTable companyId={companyId} />
          <AverageDocsTable companyId={companyId} />
        </>
      )}
    </PanelCard>
  );
};
