import { ArrowRightOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { TextInput } from '@/component/input';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';

import { createScheme, getScheme, updateScheme } from '../api';
import { type SchemePayload } from '../types';

import { GeneralFields } from './GeneralFields';
import { NumberListFields } from './NumberListFields';
import { UsableMatrixFields } from './UsableMatrixFields';

interface SchemeFormProps {
  /** طرح در حال ویرایش؛ خالی = ایجاد طرح جدید */
  schemeId: string | null;
  /** بازگشت به جدول طرح‌ها (بعد از ذخیره یا انصراف) */
  onClose: () => void;
}

/** فرم خالی ایجاد طرح */
const EMPTY_VALUES: Partial<SchemePayload> = {
  sepahEnabled: false,
  murabahaRates: [],
  terms: [],
  usable: [],
};

/** اندازه جدول درصدها با مدت‌ها و نرخ‌ها هماهنگ و خانه‌های خالی صفر می‌شوند */
const normalize = (values: SchemePayload): SchemePayload => ({
  ...values,
  name: values.name.trim(),
  usable: values.terms.map((_term, row) =>
    Array.from(
      { length: values.murabahaRates.length + 1 },
      (_value, column) => values.usable?.[row]?.[column] ?? 0,
    ),
  ),
});

/** فرم ایجاد و ویرایش اطلاعات پایه یک طرح */
export const SchemeForm = ({ schemeId, onClose }: SchemeFormProps) => {
  const [form] = Form.useForm<SchemePayload>();
  const queryClient = useQueryClient();
  const isEdit = schemeId !== null;

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO.SCHEME(schemeId ?? ''),
    queryFn: () => getScheme(schemeId ?? ''),
    enabled: isEdit,
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (body: SchemePayload) =>
      isEdit ? updateScheme(schemeId, body) : createScheme(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE_INFO.SCHEMES });
      // طرح‌های قابل انتخاب شرکت‌ها از اطلاعات پایه ساخته می‌شوند
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.PLANS });
      toast.success(isEdit ? 'تغییرات طرح ذخیره شد.' : 'طرح ایجاد شد.');
      onClose();
    },
  });

  /** با حذف یک نرخ، ستون آن (بعد از ستون قرض‌الحسنه) از جدول درصدها حذف می‌شود */
  const removeRateColumn = (index: number) => {
    const usable = form.getFieldValue('usable') as (number[] | undefined)[] | undefined;
    form.setFieldValue(
      'usable',
      usable?.map((row) => row?.filter((_value, column) => column !== index + 1)),
    );
  };

  /** با حذف یک مدت، ردیف آن از جدول درصدها حذف می‌شود */
  const removeTermRow = (index: number) => {
    const usable = form.getFieldValue('usable') as (number[] | undefined)[] | undefined;
    form.setFieldValue(
      'usable',
      usable?.filter((_row, row) => row !== index),
    );
  };

  const backButton = (
    <Button variant="secondary" size="small" icon={<ArrowRightOutlined />} onClick={onClose}>
      بازگشت به فهرست طرح‌ها
    </Button>
  );

  if (isEdit && isPending) {
    return (
      <PanelCard title="ویرایش طرح" extra={backButton}>
        <Skeleton variant="form" rows={6} />
      </PanelCard>
    );
  }

  return (
    <Form<SchemePayload>
      form={form}
      initialValues={isEdit ? data : EMPTY_VALUES}
      onFinish={(values) => mutate(normalize(values))}
    >
      <PanelCard
        title={isEdit ? `ویرایش طرح «${data?.name ?? ''}»` : 'ایجاد طرح جدید'}
        subtitle="این مقادیر مطابق دستورالعمل رسمی طرح تنظیم می‌شود و همه محاسبات پنل از همین‌جا خوانده می‌شود."
        extra={backButton}
      >
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-3">
          <FormItem
            name="name"
            label="نام طرح"
            required
            rules={[{ whitespace: true, message: 'نام طرح الزامی است.' }]}
          >
            <TextInput maxLength={200} />
          </FormItem>
        </div>
        <GeneralFields />
      </PanelCard>

      <NumberListFields
        name="murabahaRates"
        title="نرخ‌های مرابحه قابل انتخاب (درصد)"
        itemLabel="نرخ مرابحه"
        onRemove={removeRateColumn}
      />
      <NumberListFields
        name="terms"
        title="مدت‌های بازپرداخت قابل انتخاب (ماه)"
        itemLabel="مدت"
        onRemove={removeTermRow}
      />
      <UsableMatrixFields />

      <div className="flex gap-2">
        <Button variant="primary" htmlType="submit" icon={<SaveOutlined />} loading={isSaving}>
          {isEdit ? 'ذخیره تغییرات' : 'ایجاد طرح'}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          انصراف
        </Button>
      </div>
    </Form>
  );
};
