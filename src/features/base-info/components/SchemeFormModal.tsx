import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form } from 'antd';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { FormModal } from '@/component/modal';
import { QUERY_KEYS } from '@/constant/queryKeys';

import { createScheme, getScheme, updateScheme } from '../api';
import { type Scheme, type SchemePayload } from '../types';

import { GeneralFields } from './GeneralFields';
import { NumberListFields } from './NumberListFields';
import { TextListFields } from './TextListFields';
import { UsableMatrixFields } from './UsableMatrixFields';

interface SchemeFormModalProps {
  open: boolean;
  /** شناسه طرح برای ویرایش؛ خالی = افزودن */
  schemeId?: string | null;
  onClose: () => void;
}

/** فرم خالی طرح جدید: هر لیست یک ردیف خالی دارد */
const EMPTY_VALUES: Partial<SchemePayload> = {
  sepahEnabled: false,
  murabahaRates: [null as never],
  terms: [null as never],
  usable: [],
  cancelReasons: [''],
  rejectReasons: [''],
  noGrantReasons: [''],
  avgDocTypes: [''],
};

/** لیست خالی در ویرایش هم یک ردیف خالی نمایش می‌دهد */
const withRow = (list: string[]) => (list.length ? list : ['']);

const toFormValues = ({ id: _id, ...scheme }: Scheme): SchemePayload => ({
  ...scheme,
  cancelReasons: withRow(scheme.cancelReasons),
  rejectReasons: withRow(scheme.rejectReasons),
  noGrantReasons: withRow(scheme.noGrantReasons),
  avgDocTypes: withRow(scheme.avgDocTypes),
});

const LOOKUP_KEYS = [
  QUERY_KEYS.LOOKUPS.PLANS,
  QUERY_KEYS.LOOKUPS.CANCEL_REASONS,
  QUERY_KEYS.LOOKUPS.REJECT_REASONS,
  QUERY_KEYS.LOOKUPS.NO_GRANT_REASONS,
  QUERY_KEYS.LOOKUPS.AVG_DOC_TYPES,
];

export const SchemeFormModal = ({ open, schemeId, onClose }: SchemeFormModalProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<SchemePayload>();
  const isEdit = Boolean(schemeId);

  const { data: detail, isFetching } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO.DETAIL(schemeId ?? ''),
    queryFn: () => getScheme(schemeId ?? ''),
    enabled: open && isEdit,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: SchemePayload) =>
      schemeId ? updateScheme(schemeId, values) : createScheme(values),
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE_INFO.ALL });
      LOOKUP_KEYS.forEach((queryKey) => void queryClient.invalidateQueries({ queryKey }));
      toast.success(isEdit ? `طرح «${saved.name}» ویرایش شد.` : `طرح «${saved.name}» ثبت شد.`);
    },
  });

  const initialValues = useMemo(
    () => (isEdit ? detail && toFormValues(detail) : EMPTY_VALUES),
    [isEdit, detail],
  );

  /** با حذف یک مدت، ردیف متناظرش از جدول درصد قابل استفاده حذف می‌شود */
  const removeUsableRow = (row: number) =>
    form.setFieldValue(
      'usable',
      (form.getFieldValue('usable') as number[][] | undefined)?.filter((_r, i) => i !== row),
    );

  /** با حذف یک نرخ مرابحه، ستون متناظرش (بعد از ستون قرض‌الحسنه) حذف می‌شود */
  const removeUsableColumn = (index: number) =>
    form.setFieldValue(
      'usable',
      (form.getFieldValue('usable') as number[][] | undefined)?.map((cells) =>
        cells.filter((_c, column) => column !== index + 1),
      ),
    );

  return (
    <FormModal<SchemePayload>
      form={form}
      title={isEdit ? 'ویرایش طرح' : 'افزودن طرح'}
      okText={isEdit ? 'ذخیره تغییرات' : 'ثبت طرح'}
      open={open}
      width={1100}
      loading={isEdit && isFetching}
      initialValues={initialValues}
      onCancel={onClose}
      onSubmit={mutateAsync}
    >
      <GeneralFields />
      <NumberListFields
        name="murabahaRates"
        title="نرخ‌های مرابحه قابل انتخاب (درصد)"
        itemLabel="نرخ مرابحه"
        addText="افزودن نرخ"
        step={0.1}
        onRemove={removeUsableColumn}
      />
      <NumberListFields
        name="terms"
        title="مدت‌های بازپرداخت قابل انتخاب (ماه)"
        itemLabel="مدت"
        addText="افزودن مدت"
        onRemove={removeUsableRow}
      />
      <UsableMatrixFields />
      <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
        <div>
          <TextListFields
            name="cancelReasons"
            title="دلایل لغو قرارداد"
            placeholder="مثلاً عدم تمدید به درخواست شرکت"
            addText="افزودن دلیل"
          />
        </div>
        <div>
          <TextListFields
            name="rejectReasons"
            title="دلایل رد درخواست وام"
            placeholder="مثلاً پایین بودن رتبه اعتباری"
            addText="افزودن دلیل"
          />
        </div>
        <div>
          <TextListFields
            name="noGrantReasons"
            title="دلایل عدم اعطای تسهیلات غیرحضوری"
            subtitle="این دلایل هنگام انتخاب مرحله «عدم اعطای تسهیلات غیرحضوری» (در تأیید اعتبارات) نمایش داده می‌شوند."
            placeholder="مثلاً رتبه اعتباری غیرمجاز"
            addText="افزودن دلیل"
          />
        </div>
        <div>
          <TextListFields
            name="avgDocTypes"
            title="انواع مستند میانگین موجودی"
            subtitle="هنگام ثبت میانگین موجودی، انتخاب یکی از این انواع مستند و بارگذاری فایل آن اجباری است."
            placeholder="مثلاً نامه"
            addText="افزودن نوع مستند"
          />
        </div>
      </div>
    </FormModal>
  );
};
