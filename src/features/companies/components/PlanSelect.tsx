import { useQuery } from '@tanstack/react-query';

import { SelectInput, type SelectInputProps } from '@/component/input';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getPlanOptions, type PlanOption } from '@/services/lookup';
import { toPersianDigits } from '@/utils/date';

/** همه ستون‌های جدول طرح‌ها در یک عنوان کنار هم */
const planLabel = (plan: PlanOption) =>
  toPersianDigits(
    `${plan.typeTitle} | نرخ ${plan.rate}٪ | ${plan.term} ماه | اعتبار ${plan.usable}٪ میانگین ماهانه`,
  );

/** انتخاب چندتایی طرح‌های مندرج در قرارداد (حداکثر تعداد از سرور می‌آید) */
export const PlanSelect = (props: SelectInputProps<string[]>) => {
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.PLANS,
    queryFn: getPlanOptions,
  });

  return (
    <SelectInput<string[]>
      mode="multiple"
      loading={isPending}
      maxCount={data?.maxPlans}
      placeholder={
        data ? `حداکثر ${toPersianDigits(data.maxPlans)} طرح قابل انتخاب است` : 'انتخاب طرح‌ها'
      }
      options={data?.items.map((plan) => ({ value: plan.id, label: planLabel(plan) }))}
      {...props}
    />
  );
};
