import { SaveOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { Form } from '@/component/form';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';

import { getBaseInfo, updateBaseInfo } from '../api';
import {
  ConfirmChangesModal,
  GeneralFields,
  NumberListFields,
  TextListField,
  UsableMatrix,
} from '../components';
import { type BaseInfo } from '../types';
import { getChangedFields, normalizeBaseInfo } from '../utils';

export const BaseInfoPage = () => {
  const [form] = Form.useForm<BaseInfo>();
  const queryClient = useQueryClient();
  const [pendingValues, setPendingValues] = useState<BaseInfo | null>(null);

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO,
    queryFn: getBaseInfo,
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: updateBaseInfo,
    onSuccess: (saved) => {
      queryClient.setQueryData(QUERY_KEYS.BASE_INFO, saved);
      form.setFieldsValue(saved);
      setPendingValues(null);
      toast.success('تنظیمات پایه ذخیره شد.');
    },
  });

  if (isPending) return <Skeleton variant="form" rows={9} />;
  if (!data) return null;

  const changes = pendingValues ? getChangedFields(data, pendingValues) : [];

  const handleFinish = (values: BaseInfo) => {
    const next = normalizeBaseInfo(values, data);
    if (getChangedFields(data, next).length === 0) {
      toast.info('تغییری نسبت به مقادیر قبلی اعمال نشده است.');
      return;
    }
    setPendingValues(next);
  };

  return (
    <PanelCard
      title="اطلاعات پایه طرح نگین میثاق"
      subtitle="این مقادیر مطابق دستورالعمل رسمی طرح نگین میثاق تنظیم شده و همه محاسبات پنل از همین‌جا خوانده می‌شود."
    >
      <Form<BaseInfo> form={form} initialValues={data} onFinish={handleFinish}>
        <GeneralFields />
        <NumberListFields
          name="murabahaRates"
          title="نرخ‌های مرابحه قابل انتخاب (درصد)"
          itemLabel="نرخ مرابحه"
        />
        <NumberListFields
          name="terms"
          title="مدت‌های بازپرداخت قابل انتخاب (ماه)"
          itemLabel="مدت"
        />
        <UsableMatrix />
        <TextListField
          name="cancelReasons"
          title="دلایل لغو قرارداد"
          subtitle="این دلایل هنگام لغو قرارداد شرکت در یک فهرست کشویی نمایش داده می‌شوند."
        />
        <TextListField
          name="rejectReasons"
          title="دلایل رد درخواست وام"
          subtitle="این دلایل هنگام رد درخواست در مرحله «تأیید اعتبارات» در یک فهرست کشویی اجباری نمایش داده می‌شوند."
        />
        <TextListField
          name="noGrantReasons"
          title="دلایل عدم اعطای تسهیلات غیرحضوری"
          subtitle="این دلایل هنگام انتخاب مرحله «عدم اعطای تسهیلات غیرحضوری» (در تب تأیید اعتبارات) نمایش داده می‌شوند."
        />
        <TextListField
          name="avgDocTypes"
          title="انواع مستند میانگین موجودی"
          subtitle="هنگام ثبت میانگین موجودی، انتخاب یکی از این انواع مستند و بارگذاری فایل آن اجباری است."
          addText="افزودن نوع مستند"
        />
        <div className="mt-6">
          <Button variant="primary" htmlType="submit" icon={<SaveOutlined />}>
            ذخیره تنظیمات پایه
          </Button>
        </div>
      </Form>

      <ConfirmChangesModal
        open={Boolean(pendingValues)}
        changes={changes}
        loading={isSaving}
        onConfirm={() => pendingValues && mutate(pendingValues)}
        onCancel={() => setPendingValues(null)}
      />
    </PanelCard>
  );
};
