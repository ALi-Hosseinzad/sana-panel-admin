import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { PanelCard } from '@/component/card';
import { Form } from '@/component/form';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';

import { getGeneralSettings, updateGeneralSettings } from '../api';
import { type GeneralSettings } from '../types';

import { SaveButton } from './CardActions';
import { GeneralFields } from './GeneralFields';

export const GeneralSettingsCard = () => {
  const [form] = Form.useForm<GeneralSettings>();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO.GENERAL,
    queryFn: getGeneralSettings,
  });

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data, form]);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: updateGeneralSettings,
    onSuccess: (saved) => {
      queryClient.setQueryData(QUERY_KEYS.BASE_INFO.GENERAL, saved);
      // نرخ قرض‌الحسنه و حداکثر طرح در جدول درصدها و لیست طرح‌ها استفاده می‌شوند
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE_INFO.USABLE_MATRIX });
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.PLANS });
      toast.success('تنظیمات عمومی ذخیره شد.');
    },
  });

  return (
    <PanelCard
      title="اطلاعات پایه طرح نگین میثاق"
      subtitle="این مقادیر مطابق دستورالعمل رسمی طرح نگین میثاق تنظیم شده و همه محاسبات پنل از همین‌جا خوانده می‌شود."
    >
      {isPending ? (
        <Skeleton variant="form" rows={6} />
      ) : (
        <Form<GeneralSettings>
          form={form}
          initialValues={data}
          onFinish={(values) => mutate(values)}
        >
          <GeneralFields />
          <SaveButton loading={isSaving} text="ذخیره تنظیمات عمومی" />
        </Form>
      )}
    </PanelCard>
  );
};
