import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';

import { type NumberListValues } from '../types';

import { SaveButton } from './CardActions';

interface NumberListCardProps {
  title: string;
  /** لیبل هر فیلد؛ شماره ردیف به انتهای آن اضافه می‌شود */
  itemLabel: string;
  queryKey: readonly string[];
  fetcher: () => Promise<number[]>;
  updater: (items: number[]) => Promise<number[]>;
}

/** کارت لیست عددی (نرخ‌های مرابحه / مدت‌های بازپرداخت) با سرویس گرفتن و ذخیره */
export const NumberListCard = ({
  title,
  itemLabel,
  queryKey,
  fetcher,
  updater,
}: NumberListCardProps) => {
  const [form] = Form.useForm<NumberListValues>();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({ queryKey, queryFn: fetcher });

  useEffect(() => {
    if (data) form.setFieldsValue({ items: data });
  }, [data, form]);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: updater,
    onSuccess: (saved) => {
      queryClient.setQueryData(queryKey, saved);
      // ردیف/ستون‌های جدول درصدها و لیست طرح‌ها به این مقادیر وابسته‌اند
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE_INFO.USABLE_MATRIX });
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.PLANS });
      toast.success(`${title} ذخیره شد.`);
    },
  });

  return (
    <PanelCard title={title}>
      {isPending ? (
        <Skeleton variant="form" rows={5} />
      ) : (
        <Form<NumberListValues>
          form={form}
          initialValues={{ items: data }}
          onFinish={({ items }) => mutate(items)}
        >
          <Form.List name="items">
            {(fields) => (
              <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
                {fields.map((field, index) => (
                  <FormItem
                    key={field.key}
                    name={field.name}
                    label={`${itemLabel} ${toPersianDigits(index + 1)}`}
                    required
                  >
                    <NumberInput min={0} />
                  </FormItem>
                ))}
              </div>
            )}
          </Form.List>
          <SaveButton loading={isSaving} />
        </Form>
      )}
    </PanelCard>
  );
};
